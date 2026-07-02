"""
IDBI AI OneBank — Celery Application
Sets up Celery broker, result backend, and task discovery.
"""
from celery import Celery
from app.core.config import settings

celery = Celery(
    "onebank",
    broker=settings.CELERY_BROKER_URL,
    backend=settings.CELERY_RESULT_BACKEND,
)

celery.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Kolkata",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300,  # 5 minutes max per task
)

celery.autodiscover_tasks(["app.tasks"])
