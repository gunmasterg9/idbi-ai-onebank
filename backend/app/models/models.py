"""
IDBI AI OneBank — Database Models
All SQLAlchemy ORM models for the banking platform.
"""
import uuid
import json
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Float, Integer, Boolean, DateTime, Text,
    ForeignKey, Enum as SQLEnum, JSON, TypeDecorator
)
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum


def generate_uuid():
    return str(uuid.uuid4())


def utc_now():
    return datetime.now(timezone.utc)


# ─── Enums ───────────────────────────────────────────────

class AccountType(str, enum.Enum):
    SAVINGS = "savings"
    CURRENT = "current"
    FD = "fixed_deposit"
    RD = "recurring_deposit"
    LOAN = "loan"


class TransactionType(str, enum.Enum):
    CREDIT = "credit"
    DEBIT = "debit"


class TransactionMode(str, enum.Enum):
    UPI = "upi"
    NEFT = "neft"
    RTGS = "rtgs"
    IMPS = "imps"
    CARD = "card"
    ATM = "atm"
    CHEQUE = "cheque"
    INTERNAL = "internal"


class CardType(str, enum.Enum):
    DEBIT = "debit"
    CREDIT = "credit"
    PREPAID = "prepaid"


class LoanStatus(str, enum.Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    DEFAULT = "default"
    OVERDUE = "overdue"


class RiskLevel(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


# ─── User Model ──────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(15), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    pan_number = Column(String(10), unique=True, nullable=True)
    aadhaar_hash = Column(String(64), nullable=True)  # Hashed for security
    date_of_birth = Column(DateTime, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    pincode = Column(String(6), nullable=True)
    occupation = Column(String(100), nullable=True)
    annual_income = Column(Float, nullable=True)
    risk_appetite = Column(String(20), default="moderate")  # conservative, moderate, aggressive
    role = Column(String(20), default="customer")  # customer, employee, admin
    is_active = Column(Boolean, default=True)
    is_kyc_verified = Column(Boolean, default=False)
    is_msme = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    # Relationships
    accounts = relationship("Account", back_populates="user", cascade="all, delete-orphan")
    cards = relationship("Card", back_populates="user", cascade="all, delete-orphan")
    loans = relationship("Loan", back_populates="user", cascade="all, delete-orphan")
    investments = relationship("Investment", back_populates="user", cascade="all, delete-orphan")


# ─── Account Model ───────────────────────────────────────

class Account(Base):
    __tablename__ = "accounts"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    account_number = Column(String(20), unique=True, nullable=False)
    ifsc_code = Column(String(11), nullable=False, default="IBKL0000001")
    account_type = Column(SQLEnum(AccountType), nullable=False, default=AccountType.SAVINGS)
    balance = Column(Float, default=0.0)
    currency = Column(String(3), default="INR")
    branch_name = Column(String(255), default="IDBI Bank Main Branch")
    is_primary = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utc_now)

    # Relationships
    user = relationship("User", back_populates="accounts")
    transactions = relationship("Transaction", back_populates="account", cascade="all, delete-orphan")


# ─── Transaction Model ───────────────────────────────────

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String, primary_key=True, default=generate_uuid)
    account_id = Column(String, ForeignKey("accounts.id"), nullable=False)
    transaction_type = Column(SQLEnum(TransactionType), nullable=False)
    transaction_mode = Column(SQLEnum(TransactionMode), nullable=False)
    amount = Column(Float, nullable=False)
    balance_after = Column(Float, nullable=True)
    description = Column(String(500), nullable=True)
    merchant = Column(String(255), nullable=True)
    category = Column(String(100), nullable=True)  # food, travel, shopping, salary, etc.
    reference_id = Column(String(50), nullable=True)
    counterparty = Column(String(255), nullable=True)
    is_flagged = Column(Boolean, default=False)  # Fraud flag
    fraud_score = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=utc_now, index=True)

    # Relationships
    account = relationship("Account", back_populates="transactions")


# ─── Card Model ──────────────────────────────────────────

class Card(Base):
    __tablename__ = "cards"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    card_number_masked = Column(String(19), nullable=False)  # **** **** **** 1234
    card_type = Column(SQLEnum(CardType), nullable=False)
    card_network = Column(String(20), default="Visa")  # Visa, Mastercard, RuPay
    card_name = Column(String(100), nullable=True)
    credit_limit = Column(Float, nullable=True)
    outstanding = Column(Float, default=0.0)
    expiry_date = Column(String(5), nullable=False)  # MM/YY
    is_active = Column(Boolean, default=True)
    is_international = Column(Boolean, default=False)
    reward_points = Column(Integer, default=0)
    created_at = Column(DateTime, default=utc_now)

    # Relationships
    user = relationship("User", back_populates="cards")


# ─── Loan Model ──────────────────────────────────────────

class Loan(Base):
    __tablename__ = "loans"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    loan_type = Column(String(50), nullable=False)  # home, personal, business, vehicle, education
    principal_amount = Column(Float, nullable=False)
    outstanding_amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    tenure_months = Column(Integer, nullable=False)
    emi_amount = Column(Float, nullable=False)
    disbursement_date = Column(DateTime, nullable=True)
    next_emi_date = Column(DateTime, nullable=True)
    status = Column(SQLEnum(LoanStatus), default=LoanStatus.ACTIVE)
    default_probability = Column(Float, default=0.0)  # AI-predicted
    risk_level = Column(SQLEnum(RiskLevel), default=RiskLevel.LOW)
    collateral = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=utc_now)

    # Relationships
    user = relationship("User", back_populates="loans")


# ─── Investment Model ────────────────────────────────────

class Investment(Base):
    __tablename__ = "investments"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    investment_type = Column(String(50), nullable=False)  # mutual_fund, fd, sip, stocks, ppf, nps
    scheme_name = Column(String(255), nullable=False)
    invested_amount = Column(Float, nullable=False)
    current_value = Column(Float, nullable=False)
    returns_percent = Column(Float, default=0.0)
    units = Column(Float, nullable=True)
    nav = Column(Float, nullable=True)
    start_date = Column(DateTime, nullable=True)
    maturity_date = Column(DateTime, nullable=True)
    sip_amount = Column(Float, nullable=True)  # Monthly SIP amount if applicable
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utc_now)

    # Relationships
    user = relationship("User", back_populates="investments")


# ─── MSME Business Model ────────────────────────────────

class MSMEBusiness(Base):
    __tablename__ = "msme_businesses"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    business_name = Column(String(255), nullable=False)
    business_type = Column(String(100), nullable=False)
    gstin = Column(String(15), nullable=True)
    annual_turnover = Column(Float, nullable=True)
    employee_count = Column(Integer, nullable=True)
    years_in_business = Column(Integer, nullable=True)
    business_score = Column(Float, default=0.0)  # AI-calculated 0-100
    credit_score = Column(Integer, default=0)  # 300-900
    cash_flow_score = Column(Float, default=0.0)
    risk_level = Column(SQLEnum(RiskLevel), default=RiskLevel.MEDIUM)
    loan_capacity = Column(Float, default=0.0)
    health_data = Column(JSON, nullable=True)  # Detailed health metrics
    last_gst_filing = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)


# ─── Fraud Alert Model ──────────────────────────────────

class FraudAlert(Base):
    __tablename__ = "fraud_alerts"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    transaction_id = Column(String, ForeignKey("transactions.id"), nullable=True)
    alert_type = Column(String(50), nullable=False)  # upi, card, atm, phishing
    severity = Column(SQLEnum(RiskLevel), nullable=False)
    description = Column(Text, nullable=True)
    amount = Column(Float, nullable=True)
    is_resolved = Column(Boolean, default=False)
    resolution = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)


# ─── AI Recommendation Model ────────────────────────────

# ─── AI Recommendation Model ────────────────────────────

class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    category = Column(String(50), nullable=False)  # investment, loan, insurance, savings
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    confidence_score = Column(Float, default=0.0)
    product_details = Column(JSON, nullable=True)
    is_accepted = Column(Boolean, default=False)
    is_dismissed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)


# ─── Audit Log Model ────────────────────────────────────

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=generate_uuid)
    user_id = Column(String, ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)  # e.g., login, transfer, file_upload
    ip_address = Column(String(45), nullable=True)
    user_agent = Column(String(255), nullable=True)
    payload = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=utc_now, index=True)

    # Relationship
    user = relationship("User")


# ─── Feature Flag Model ─────────────────────────────────

class FeatureFlag(Base):
    __tablename__ = "feature_flags"

    id = Column(String, primary_key=True, default=generate_uuid)
    key = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(String(255), nullable=True)
    is_enabled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)


# ─── Database-agnostic Vector Type ─────────────────────

class SafeVector(TypeDecorator):
    """Custom type to support pgvector on PostgreSQL and fallback to JSON on SQLite."""
    impl = Text
    cache_ok = True

    def __init__(self, dimensions=None):
        super().__init__()
        self.dimensions = dimensions

    def load_dialect_impl(self, dialect):
        if dialect.name == "postgresql":
            try:
                from pgvector.sqlalchemy import Vector
                return dialect.type_descriptor(Vector(self.dimensions))
            except ImportError:
                pass
        return dialect.type_descriptor(Text())

    def process_bind_param(self, value, dialect):
        if value is None:
            return None
        if dialect.name == "postgresql":
            return value
        return json.dumps(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return None
        if dialect.name == "postgresql":
            return value
        try:
            return json.loads(value)
        except Exception:
            return value


# ─── Knowledge Base Chunk (RAG) Model ───────────────────

class KBChunk(Base):
    __tablename__ = "kb_chunks"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    metadata_info = Column(JSON, nullable=True)  # Named metadata_info to avoid metadata confusion
    embedding = Column(SafeVector(768), nullable=True)  # Using 768 dimensions (standard Gemini/Google embeddings)
    created_at = Column(DateTime, default=utc_now)

