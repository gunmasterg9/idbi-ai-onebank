"""
IDBI AI OneBank — Dashboard & Account Endpoints
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.models import (
    User, Account, Transaction, Card, Loan,
    Investment, FraudAlert, AIRecommendation,
    TransactionType
)
from app.schemas.schemas import (
    UserResponse, AccountResponse, TransactionResponse,
    CardResponse, LoanResponse, InvestmentResponse,
    DashboardSummary
)
from typing import List

router = APIRouter(tags=["Dashboard & Accounts"])


@router.get("/users/me", response_model=UserResponse)
async def get_current_user_profile(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get current user's profile."""
    result = await db.execute(select(User).where(User.id == current_user["user_id"]))
    user = result.scalar_one_or_none()
    if not user:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/accounts", response_model=List[AccountResponse])
async def get_accounts(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all accounts for current user."""
    result = await db.execute(
        select(Account).where(Account.user_id == current_user["user_id"])
    )
    return result.scalars().all()


@router.get("/accounts/{account_id}", response_model=AccountResponse)
async def get_account(
    account_id: str,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get specific account details."""
    result = await db.execute(
        select(Account).where(
            Account.id == account_id,
            Account.user_id == current_user["user_id"]
        )
    )
    account = result.scalar_one_or_none()
    if not account:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Account not found")
    return account


@router.get("/transactions", response_model=List[TransactionResponse])
async def get_transactions(
    account_id: str = None,
    limit: int = 50,
    offset: int = 0,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List transactions, optionally filtered by account."""
    query = select(Transaction).join(Account).where(
        Account.user_id == current_user["user_id"]
    )
    if account_id:
        query = query.where(Transaction.account_id == account_id)
    
    query = query.order_by(Transaction.timestamp.desc()).limit(limit).offset(offset)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/cards", response_model=List[CardResponse])
async def get_cards(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all cards for current user."""
    result = await db.execute(
        select(Card).where(Card.user_id == current_user["user_id"])
    )
    return result.scalars().all()


@router.get("/loans", response_model=List[LoanResponse])
async def get_loans(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all loans for current user."""
    result = await db.execute(
        select(Loan).where(Loan.user_id == current_user["user_id"])
    )
    return result.scalars().all()


@router.get("/investments", response_model=List[InvestmentResponse])
async def get_investments(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """List all investments for current user."""
    result = await db.execute(
        select(Investment).where(Investment.user_id == current_user["user_id"])
    )
    return result.scalars().all()


@router.get("/dashboard/summary", response_model=DashboardSummary)
async def get_dashboard_summary(
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get aggregated dashboard summary with AI insights."""
    user_id = current_user["user_id"]

    # Fetch accounts
    accounts_result = await db.execute(
        select(Account).where(Account.user_id == user_id)
    )
    accounts = accounts_result.scalars().all()
    total_balance = sum(a.balance for a in accounts)

    # Fetch investments
    inv_result = await db.execute(
        select(Investment).where(Investment.user_id == user_id, Investment.is_active)
    )
    investments = inv_result.scalars().all()
    total_investments = sum(i.current_value for i in investments)

    # Fetch loans
    loans_result = await db.execute(
        select(Loan).where(Loan.user_id == user_id, Loan.status == "active")
    )
    loans = loans_result.scalars().all()
    total_loans = sum(loan.outstanding_amount for loan in loans)

    # Fetch recent transactions
    account_ids = [a.id for a in accounts]
    txn_query = select(Transaction).where(
        Transaction.account_id.in_(account_ids)
    ).order_by(Transaction.timestamp.desc()).limit(10)
    txn_result = await db.execute(txn_query)
    recent_txns = txn_result.scalars().all()

    # Calculate spending by category
    spending_by_cat = {}
    for txn in recent_txns:
        if txn.transaction_type == TransactionType.DEBIT and txn.category:
            spending_by_cat[txn.category] = spending_by_cat.get(txn.category, 0) + txn.amount

    # Calculate monthly income/expenses (simplified from recent transactions)
    monthly_income = sum(
        t.amount for t in recent_txns if t.transaction_type == TransactionType.CREDIT
    )
    monthly_expenses = sum(
        t.amount for t in recent_txns if t.transaction_type == TransactionType.DEBIT
    )
    savings_rate = ((monthly_income - monthly_expenses) / monthly_income * 100) if monthly_income > 0 else 0

    # Fraud alerts count
    fraud_result = await db.execute(
        select(func.count(FraudAlert.id)).where(
            FraudAlert.user_id == user_id,
            FraudAlert.is_resolved.is_(False)
        )
    )
    fraud_count = fraud_result.scalar() or 0

    # AI Insights (from recommendations table)
    rec_result = await db.execute(
        select(AIRecommendation).where(
            AIRecommendation.user_id == user_id,
            AIRecommendation.is_dismissed.is_(False)
        ).limit(5)
    )
    recs = rec_result.scalars().all()
    ai_insights = [
        {
            "id": r.id,
            "category": r.category,
            "title": r.title,
            "description": r.description,
            "confidence": r.confidence_score,
        }
        for r in recs
    ]

    # Cards count
    cards_result = await db.execute(
        select(func.count(Card.id)).where(Card.user_id == user_id)
    )
    card_count = cards_result.scalar() or 0

    return DashboardSummary(
        total_balance=total_balance,
        total_investments=total_investments,
        total_loans_outstanding=total_loans,
        monthly_income=monthly_income,
        monthly_expenses=monthly_expenses,
        savings_rate=round(savings_rate, 1),
        credit_score=782,  # Simulated
        ai_health_score=85.5,  # Simulated AI health score
        recent_transactions=[
            TransactionResponse.model_validate(t) for t in recent_txns[:5]
        ],
        ai_insights=ai_insights,
        spending_by_category=spending_by_cat,
        account_count=len(accounts),
        card_count=card_count,
        active_loans=len(loans),
        fraud_alerts_count=fraud_count,
    )
