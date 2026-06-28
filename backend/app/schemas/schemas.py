"""
IDBI AI OneBank — Pydantic Schemas
Request/Response DTOs for all API endpoints.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


# ─── Auth Schemas ────────────────────────────────────────

class RegisterRequest(BaseModel):
    email: EmailStr
    phone: str = Field(..., pattern=r"^(\+91)?\d{10}$", examples=["1234567890"])
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2)
    pan_number: Optional[str] = Field(None, pattern=r"^[A-Z]{5}\d{4}[A-Z]$")
    date_of_birth: Optional[datetime] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = Field(None, pattern=r"^\d{6}$")


class LoginRequest(BaseModel):
    phone: str = Field(..., examples=["1234567890"])
    password: str


class OTPRequest(BaseModel):
    phone: str
    otp: str = Field(..., pattern=r"^\d{6}$")


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class RefreshRequest(BaseModel):
    refresh_token: str


# ─── User Schemas ────────────────────────────────────────

class UserResponse(BaseModel):
    id: str
    email: str
    phone: str
    full_name: str
    pan_number: Optional[str] = None
    date_of_birth: Optional[datetime] = None
    city: Optional[str] = None
    state: Optional[str] = None
    occupation: Optional[str] = None
    annual_income: Optional[float] = None
    risk_appetite: str = "moderate"
    is_kyc_verified: bool = False
    is_msme: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Account Schemas ─────────────────────────────────────

class AccountResponse(BaseModel):
    id: str
    account_number: str
    ifsc_code: str
    account_type: str
    balance: float
    currency: str = "INR"
    branch_name: str
    is_primary: bool
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Transaction Schemas ─────────────────────────────────

class TransactionResponse(BaseModel):
    id: str
    transaction_type: str
    transaction_mode: str
    amount: float
    balance_after: Optional[float] = None
    description: Optional[str] = None
    merchant: Optional[str] = None
    category: Optional[str] = None
    reference_id: Optional[str] = None
    counterparty: Optional[str] = None
    is_flagged: bool = False
    fraud_score: float = 0.0
    timestamp: datetime

    class Config:
        from_attributes = True


class TransactionFilter(BaseModel):
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    transaction_type: Optional[str] = None
    category: Optional[str] = None
    min_amount: Optional[float] = None
    max_amount: Optional[float] = None
    limit: int = 50
    offset: int = 0


# ─── Card Schemas ────────────────────────────────────────

class CardResponse(BaseModel):
    id: str
    card_number_masked: str
    card_type: str
    card_network: str
    card_name: Optional[str] = None
    credit_limit: Optional[float] = None
    outstanding: float = 0.0
    expiry_date: str
    is_active: bool
    is_international: bool
    reward_points: int
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Loan Schemas ────────────────────────────────────────

class LoanResponse(BaseModel):
    id: str
    loan_type: str
    principal_amount: float
    outstanding_amount: float
    interest_rate: float
    tenure_months: int
    emi_amount: float
    disbursement_date: Optional[datetime] = None
    next_emi_date: Optional[datetime] = None
    status: str
    default_probability: float = 0.0
    risk_level: str = "low"
    collateral: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class LoanEligibilityRequest(BaseModel):
    loan_type: str
    annual_income: float
    existing_emis: float = 0.0
    credit_score: int = 750
    employment_type: str = "salaried"  # salaried, self-employed, business
    years_employed: int = 1


class LoanEligibilityResponse(BaseModel):
    eligible: bool
    max_amount: float
    suggested_tenure: int
    estimated_emi: float
    interest_rate: float
    confidence_score: float
    factors: List[dict]


# ─── Investment Schemas ──────────────────────────────────

class InvestmentResponse(BaseModel):
    id: str
    investment_type: str
    scheme_name: str
    invested_amount: float
    current_value: float
    returns_percent: float
    units: Optional[float] = None
    nav: Optional[float] = None
    start_date: Optional[datetime] = None
    maturity_date: Optional[datetime] = None
    sip_amount: Optional[float] = None
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Dashboard Schemas ───────────────────────────────────

class DashboardSummary(BaseModel):
    total_balance: float
    total_investments: float
    total_loans_outstanding: float
    monthly_income: float
    monthly_expenses: float
    savings_rate: float
    credit_score: int
    ai_health_score: float  # 0-100
    recent_transactions: List[TransactionResponse]
    ai_insights: List[dict]
    spending_by_category: dict
    account_count: int
    card_count: int
    active_loans: int
    fraud_alerts_count: int


# ─── MSME Schemas ────────────────────────────────────────

class MSMEHealthResponse(BaseModel):
    business_name: str
    business_score: float
    credit_score: int
    cash_flow_score: float
    risk_level: str
    loan_capacity: float
    revenue_trend: List[dict]
    gst_compliance: float
    growth_suggestions: List[str]
    health_indicators: dict


# ─── Fraud Schemas ───────────────────────────────────────

class FraudAlertResponse(BaseModel):
    id: str
    alert_type: str
    severity: str
    description: Optional[str] = None
    amount: Optional[float] = None
    is_resolved: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ─── AI Chat Schemas ─────────────────────────────────────

class ChatMessage(BaseModel):
    role: str = "user"  # user, assistant, system
    content: str


class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None
    language: str = "en"  # en, hi, gu, mr, ta


class ChatResponse(BaseModel):
    reply: str
    suggestions: List[str] = []
    actions: List[dict] = []
    confidence: float = 0.95


# ─── AI Recommendation Schemas ───────────────────────────

class RecommendationResponse(BaseModel):
    id: str
    category: str
    title: str
    description: str
    confidence_score: float
    product_details: Optional[dict] = None
    is_accepted: bool = False
    created_at: datetime

    class Config:
        from_attributes = True
