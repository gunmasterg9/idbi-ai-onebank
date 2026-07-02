"""
IDBI AI OneBank — Storage Service
MinIO/S3 compatible storage wrapper for file uploads.
"""
import boto3
from botocore.client import Config
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)


def get_s3_client():
    """Create and return an S3/MinIO client."""
    s3_config = Config(signature_version="s3v4")
    
    # Format endpoint url
    endpoint = settings.MINIO_ENDPOINT
    if not endpoint.startswith("http://") and not endpoint.startswith("https://"):
        protocol = "https" if settings.MINIO_SECURE else "http"
        endpoint_url = f"{protocol}://{endpoint}"
    else:
        endpoint_url = endpoint

    return boto3.client(
        "s3",
        endpoint_url=endpoint_url,
        aws_access_key_id=settings.MINIO_ACCESS_KEY,
        aws_secret_access_key=settings.MINIO_SECRET_KEY,
        config=s3_config,
    )


def init_storage():
    """Ensure that the default storage bucket exists in MinIO."""
    try:
        s3 = get_s3_client()
        buckets = s3.list_buckets()
        bucket_names = [b["Name"] for b in buckets.get("Buckets", [])]
        
        if settings.MINIO_BUCKET_NAME not in bucket_names:
            s3.create_bucket(Bucket=settings.MINIO_BUCKET_NAME)
            logger.info(f"Created MinIO bucket: {settings.MINIO_BUCKET_NAME}")
        else:
            logger.info(f"MinIO bucket already exists: {settings.MINIO_BUCKET_NAME}")
    except Exception as e:
        logger.error(f"Failed to initialize MinIO bucket: {e}")


def upload_file(file_content, object_name: str, content_type: str = "application/octet-stream") -> str:
    """Upload file content to MinIO and return S3 object path."""
    s3 = get_s3_client()
    s3.put_object(
        Bucket=settings.MINIO_BUCKET_NAME,
        Key=object_name,
        Body=file_content,
        ContentType=content_type,
    )
    return f"s3://{settings.MINIO_BUCKET_NAME}/{object_name}"


def get_download_url(object_name: str, expires_in_seconds: int = 3600) -> str:
    """Generate a presigned download URL for a file in MinIO."""
    s3 = get_s3_client()
    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": settings.MINIO_BUCKET_NAME, "Key": object_name},
        ExpiresIn=expires_in_seconds,
    )
