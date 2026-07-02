"""
IDBI AI OneBank — Authentication Endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import (
    get_password_hash, verify_password,
    create_access_token, create_refresh_token, decode_token
)
from app.models.models import User
from app.schemas.schemas import (
    RegisterRequest, LoginRequest, TokenResponse,
    RefreshRequest
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """Register a new user."""
    # Check if user exists
    existing = await db.execute(
        select(User).where((User.email == request.email) | (User.phone == request.phone))
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email or phone already exists"
        )

    # Create user
    user = User(
        email=request.email,
        phone=request.phone,
        hashed_password=get_password_hash(request.password),
        full_name=request.full_name,
        pan_number=request.pan_number,
        date_of_birth=request.date_of_birth,
        city=request.city,
        state=request.state,
        pincode=request.pincode,
    )
    db.add(user)
    await db.flush()

    # Generate tokens
    token_data = {"sub": user.id, "email": user.email, "role": user.role}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=30 * 60,
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login with phone and password."""
    clean_phone = request.phone.strip()
    alt_phone = f"+91{clean_phone}" if not clean_phone.startswith("+") else clean_phone.replace("+91", "")
    
    result = await db.execute(
        select(User).where((User.phone == clean_phone) | (User.phone == alt_phone))
    )
    user = result.scalar_one_or_none()

    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token_data = {"sub": user.id, "email": user.email, "role": user.role}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=30 * 60,
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh_token(request: RefreshRequest, db: AsyncSession = Depends(get_db)):
    """Refresh access token."""
    payload = decode_token(request.refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=400, detail="Invalid refresh token")

    user_id = payload["sub"]
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    token_data = {"sub": user.id, "email": user.email, "role": user.role}
    access_token = create_access_token(token_data)
    new_refresh = create_refresh_token(token_data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=new_refresh,
        expires_in=30 * 60,
    )


@router.post("/send-otp")
async def send_otp(phone: str):
    """Send OTP to phone number (simulated)."""
    return {
        "message": f"OTP sent to {phone}",
        "otp": "123456",  # Demo: always returns 123456
        "expires_in": 300,
    }
