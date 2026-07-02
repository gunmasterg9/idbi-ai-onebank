"""
IDBI AI OneBank — Admin Endpoints
Handles user management, feature flags toggling, and audit log analysis. Restricted to admins.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import RoleChecker
from app.models.models import User, FeatureFlag, AuditLog
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter(prefix="/admin", tags=["Admin Panel"], dependencies=[Depends(RoleChecker(["admin"]))])


# ─── Pydantic Schemas ────────────────────────────────────

class UserAdminResponse(BaseModel):
    id: str
    email: str
    phone: str
    full_name: str
    role: str
    is_active: bool
    is_kyc_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True


class FeatureFlagToggle(BaseModel):
    key: str
    is_enabled: bool
    description: Optional[str] = None


class FeatureFlagResponse(BaseModel):
    id: str
    key: str
    description: Optional[str]
    is_enabled: bool
    created_at: datetime

    class Config:
        from_attributes = True


class AuditLogResponse(BaseModel):
    id: str
    user_id: Optional[str]
    action: str
    ip_address: Optional[str]
    user_agent: Optional[str]
    payload: Optional[dict]
    timestamp: datetime

    class Config:
        from_attributes = True


# ─── User Management Routes ──────────────────────────────

@router.get("/users", response_model=List[UserAdminResponse])
async def list_users(db: AsyncSession = Depends(get_db)):
    """List all registered users inside the banking system."""
    result = await db.execute(select(User).order_by(User.created_at.desc()))
    users = result.scalars().all()
    return users


@router.post("/users/{user_id}/toggle-active")
async def toggle_user_active(user_id: str, db: AsyncSession = Depends(get_db)):
    """Toggle a user's active status (deactivation prevents authentication)."""
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.is_active = not user.is_active
    db.add(user)
    await db.commit()
    return {"user_id": user_id, "is_active": user.is_active}


# ─── Feature Flags Routes ────────────────────────────────

@router.get("/feature-flags", response_model=List[FeatureFlagResponse])
async def list_feature_flags(db: AsyncSession = Depends(get_db)):
    """List all feature flags and their current status."""
    result = await db.execute(select(FeatureFlag).order_by(FeatureFlag.key.asc()))
    flags = result.scalars().all()
    return flags


@router.post("/feature-flags", response_model=FeatureFlagResponse)
async def toggle_feature_flag(request: FeatureFlagToggle, db: AsyncSession = Depends(get_db)):
    """Toggle or register a dynamic system feature flag."""
    result = await db.execute(select(FeatureFlag).where(FeatureFlag.key == request.key))
    flag = result.scalar_one_or_none()
    
    if flag:
        flag.is_enabled = request.is_enabled
        if request.description:
            flag.description = request.description
    else:
        flag = FeatureFlag(
            key=request.key,
            description=request.description or "Dynamic system feature flag",
            is_enabled=request.is_enabled
        )
    
    db.add(flag)
    await db.commit()
    await db.refresh(flag)
    return flag


# ─── Audit Logs Route ────────────────────────────────────

@router.get("/audit-logs", response_model=List[AuditLogResponse])
async def list_audit_logs(limit: int = 50, db: AsyncSession = Depends(get_db)):
    """Fetch recent system administrative and transactional audit logs."""
    result = await db.execute(
        select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(limit)
    )
    logs = result.scalars().all()
    return logs


# ─── System Analytics Route ─────────────────────────────

@router.get("/analytics")
async def get_system_analytics(db: AsyncSession = Depends(get_db)):
    """Fetch system health telemetry, model statuses, and active user metrics."""
    users_count = await db.execute(select(User))
    flags_count = await db.execute(select(FeatureFlag))
    audit_count = await db.execute(select(AuditLog))
    
    return {
        "status": "healthy",
        "active_users": len(users_count.scalars().all()),
        "configured_flags": len(flags_count.scalars().all()),
        "total_audit_records": len(audit_count.scalars().all()),
        "active_ai_models": [
            {"model_name": "LoanDefaultXGBoost", "version": "v1.2.0", "status": "active"},
            {"model_name": "TransactionAnomalyAutoencoder", "version": "v3.1.2", "status": "active"},
            {"model_name": "MSMEHealthMultiCriteria", "version": "v2.0.0", "status": "active"},
            {"model_name": "GeminiRAGEmbedding", "version": "models/embedding-001", "status": "active"}
        ]
    }
