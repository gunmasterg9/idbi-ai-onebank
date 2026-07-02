"""
IDBI AI OneBank — Celery Background Tasks
Handles asynchronous jobs like document OCR extraction, S3 storage saving, and transactional fraud analysis.
"""
from app.core.celery_app import celery
from app.services.ocr_service import run_ocr
from app.services.ml_engine import evaluate_transaction_fraud
from app.core.database import async_session
from app.models.models import User, FraudAlert, Transaction, RiskLevel
from sqlalchemy import select
import asyncio
import logging

logger = logging.getLogger(__name__)


# Helper to run async code inside Celery synchronous worker threads
def run_sync_task(coro):
    return asyncio.get_event_loop().run_until_complete(coro)


@celery.task(name="app.tasks.process_document_ocr")
def process_document_ocr(s3_path: str, filename: str, document_type: str, user_id: str):
    """Processes document OCR asynchronously by pulling from MinIO, and updates User KYC info."""
    logger.info(f"Starting Celery OCR task for user {user_id}, file: {filename}, S3: {s3_path}")
    
    # 1. Download file content from MinIO
    from app.core.storage import get_s3_client
    file_bytes = None
    try:
        s3 = get_s3_client()
        parts = s3_path.replace("s3://", "").split("/", 1)
        bucket_name = parts[0]
        object_key = parts[1]
        
        response = s3.get_object(Bucket=bucket_name, Key=object_key)
        file_bytes = response["Body"].read()
        logger.info(f"Downloaded file from MinIO for OCR processing: {len(file_bytes)} bytes")
    except Exception as e:
        logger.error(f"Failed to retrieve file from MinIO in Celery worker: {e}")
        return {"status": "failed", "error": f"MinIO download failed: {str(e)}"}

    # 2. Run OCR Extraction
    ocr_result = run_ocr(file_bytes, filename, document_type)
    logger.info(f"OCR results extracted: {ocr_result}")

    # 3. Update Database (running async query in sync thread)
    async def update_db():
        async with async_session() as session:
            stmt = select(User).where(User.id == user_id)
            res = await session.execute(stmt)
            user = res.scalars().first()
            if user:
                # Update user profile with extracted data
                extracted = ocr_result.get("extracted_fields", {})
                if document_type.lower() == "pan":
                    user.pan_number = extracted.get("pan_number", user.pan_number)
                elif document_type.lower() == "aadhaar":
                    # Hash Aadhaar for security
                    import hashlib
                    aadhaar_raw = extracted.get("aadhaar_number", "")
                    user.aadhaar_hash = hashlib.sha256(aadhaar_raw.encode()).hexdigest()
                
                # Assume document upload leads to KYC verification progress
                user.is_kyc_verified = True
                session.add(user)
                await session.commit()
                logger.info(f"User {user_id} profile updated. KYC verified.")

    try:
        run_sync_task(update_db())
    except Exception as e:
        logger.error(f"Failed to update user KYC status in database: {e}")

    return {
        "status": "completed",
        "s3_path": s3_path,
        "ocr_result": ocr_result
    }


@celery.task(name="app.tasks.evaluate_transaction_fraud_async")
def evaluate_transaction_fraud_async(txn_id: str, amount: float, hour_of_day: int, distance_from_home: float, is_international: bool, daily_spend_limit_percentage: float, user_id: str):
    """Asynchronously evaluates fraud scores and raises database alerts for flagged transactions."""
    logger.info(f"Evaluating fraud asynchronously for transaction {txn_id} of user {user_id}")
    
    # 1. Evaluate fraud score
    fraud_result = evaluate_transaction_fraud(
        amount=amount,
        hour_of_day=hour_of_day,
        distance_from_home=distance_from_home,
        is_international=is_international,
        daily_spend_limit_percentage=daily_spend_limit_percentage
    )
    score = fraud_result["fraud_score"]
    decision = fraud_result["decision"]
    
    logger.info(f"Transaction {txn_id} evaluated. Score: {score}, Decision: {decision}")

    # 2. Write alert to database if suspicious
    async def save_fraud_alerts():
        async with async_session() as session:
            # Update transaction fraud stats
            stmt = select(Transaction).where(Transaction.id == txn_id)
            res = await session.execute(stmt)
            txn = res.scalars().first()
            if txn:
                txn.fraud_score = score
                if decision == "FLAG":
                    txn.is_flagged = True
                session.add(txn)

            # Generate formal Fraud Alert if flagged
            if decision == "FLAG":
                severity = RiskLevel.HIGH if score > 0.80 else RiskLevel.MEDIUM
                alert = FraudAlert(
                    user_id=user_id,
                    transaction_id=txn_id,
                    alert_type="upi" if is_international else "card",
                    severity=severity,
                    description=f"Automated alert: Anomaly score {score:.2f}. " + ", ".join(fraud_result["anomalies_detected"]),
                    amount=amount,
                    is_resolved=False
                )
                session.add(alert)
            await session.commit()

    try:
        run_sync_task(save_fraud_alerts())
    except Exception as e:
        logger.error(f"Failed to record transaction fraud evaluation: {e}")

    return {
        "status": "evaluated",
        "fraud_score": score,
        "decision": decision
    }
