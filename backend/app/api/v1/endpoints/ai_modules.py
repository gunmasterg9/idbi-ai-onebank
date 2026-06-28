"""
IDBI AI OneBank — Remaining AI Modules & APIs
Prospect Assist, MSME Health, Default Prediction, Fraud AI, OCR, RAG, and Open Banking Sandbox.
"""
from fastapi import APIRouter, File, UploadFile, Depends
from pydantic import BaseModel
from typing import List, Optional
import random

prospect_router = APIRouter(prefix="/prospect", tags=["Prospect Assist AI"])
msme_router = APIRouter(prefix="/msme", tags=["MSME Financial Health AI"])
default_router = APIRouter(prefix="/default-predict", tags=["Default Prediction AI"])
fraud_router = APIRouter(prefix="/fraud-engine", tags=["Fraud Detection AI"])
ocr_router = APIRouter(prefix="/ocr", tags=["Document Intelligence OCR"])
open_banking_router = APIRouter(prefix="/open-banking", tags=["Open Banking APIs"])

# ─── Prospect Assist ──────────────────────────────────
@prospect_router.get("/lead-score")
async def get_lead_score(customer_id: str = "demo_user"):
    return {
        "customer_id": customer_id,
        "lead_conversion_probability": 0.89,
        "recommended_product": "Pre-approved Home Loan Top-up",
        "next_best_offer": "IDBI Visa Signature Credit Card",
        "intent_analysis": "High intent for home improvement & wealth enhancement"
    }

# ─── MSME Health ──────────────────────────────────────
@msme_router.get("/full-assessment")
async def get_msme_assessment(gstin: str = "27AADCS1234A1ZA"):
    return {
        "gstin": gstin,
        "business_health_index": 78.4,
        "traffic_light": "GREEN",
        "cash_flow_stability": "High",
        "credit_eligibility_limit": 2500000,
        "risk_factors": ["Minor delay in Q2 GST filing"],
        "growth_vector": "Positive (+18.5% YoY revenue)"
    }

# ─── Default Prediction ──────────────────────────────
@default_router.get("/npa-risk")
async def predict_npa_risk(account_id: str = "acc_123"):
    return {
        "account_id": account_id,
        "npa_probability": 0.024,
        "risk_category": "Low Risk",
        "emi_miss_probability_next_30d": 0.015,
        "explainable_ai_shap": {
            "income_stability": -0.45,  # Reduces risk
            "credit_score_782": -0.38,
            "recent_large_debit": +0.08  # Slightly increases risk
        }
    }

# ─── Fraud Engine ────────────────────────────────────
@fraud_router.post("/evaluate-transaction")
async def evaluate_transaction(txn_data: dict):
    amount = txn_data.get("amount", 0)
    is_anomaly = amount > 50000
    score = 0.85 if is_anomaly else 0.05
    return {
        "fraud_score": score,
        "decision": "FLAG" if is_anomaly else "APPROVE",
        "anomalies_detected": ["Large transfer outside routine hours"] if is_anomaly else [],
        "risk_level": "HIGH" if is_anomaly else "LOW"
    }

# ─── OCR Document Intelligence ───────────────────────
@ocr_router.post("/extract")
async def extract_document(document_type: str, file: Optional[UploadFile] = None):
    # Simulated OCR extraction
    if document_type.lower() == "pan":
        return {
            "document_type": "PAN Card",
            "extracted_fields": {
                "pan_number": "ABCPS1234D",
                "name": "Rajesh Kumar Sharma",
                "father_name": "Suresh Kumar Sharma",
                "date_of_birth": "15/05/1992"
            },
            "confidence": 0.98
        }
    elif document_type.lower() == "aadhaar":
        return {
            "document_type": "Aadhaar Card",
            "extracted_fields": {
                "aadhaar_number": "XXXX-XXXX-8912",
                "name": "Rajesh Kumar Sharma",
                "address": "Flat 402, Green Acres, Andheri West, Mumbai 400053"
            },
            "confidence": 0.96
        }
    else:
        return {
            "document_type": "Salary Slip / GST Return",
            "extracted_fields": {
                "employer": "TCS Ltd.",
                "net_salary": "1,55,000",
                "month": "May 2026"
            },
            "confidence": 0.95
        }

# ─── Open Banking ────────────────────────────────────
@open_banking_router.get("/sandbox/apis")
async def list_sandbox_apis():
    return {
        "sandbox_version": "v1.0-hackathon",
        "apis": [
            {"name": "Account Aggregator API", "endpoint": "/api/v1/open-banking/aa/fetch", "status": "active"},
            {"name": "GST Verification API", "endpoint": "/api/v1/open-banking/gst/verify", "status": "active"},
            {"name": "UPI Payment Gateway API", "endpoint": "/api/v1/open-banking/upi/pay", "status": "active"},
            {"name": "EPFO Service API", "endpoint": "/api/v1/open-banking/epfo/claims", "status": "active"},
            {"name": "CKYC Registry API", "endpoint": "/api/v1/open-banking/ckyc/search", "status": "active"}
        ]
    }
