"""
IDBI AI OneBank — Synthetic Indian Banking Data Seeder
Generates realistic demo data with Indian names, cities, IFSC codes, and INR amounts.
"""
import uuid
import random
from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import (
    User, Account, Transaction, Card, Loan, Investment,
    FraudAlert, AIRecommendation, MSMEBusiness,
    AccountType, TransactionType, TransactionMode,
    CardType, LoanStatus, RiskLevel
)
from app.core.security import get_password_hash

# ─── Indian Data ─────────────────────────────────────────

INDIAN_NAMES = [
    "Rajesh Kumar Sharma", "Priya Patel", "Amit Singh", "Deepika Nair",
    "Vikram Mehta", "Anita Desai", "Suresh Reddy", "Kavita Joshi",
    "Manish Agarwal", "Pooja Gupta", "Rahul Verma", "Sneha Iyer",
    "Arjun Malhotra", "Neha Kapoor", "Sanjay Tiwari", "Ritu Sharma",
    "Karan Chopra", "Meera Pillai", "Gaurav Saxena", "Divya Rao",
]

INDIAN_CITIES = [
    ("Mumbai", "Maharashtra", "400001"), ("Delhi", "Delhi", "110001"),
    ("Bangalore", "Karnataka", "560001"), ("Chennai", "Tamil Nadu", "600001"),
    ("Hyderabad", "Telangana", "500001"), ("Pune", "Maharashtra", "411001"),
    ("Ahmedabad", "Gujarat", "380001"), ("Kolkata", "West Bengal", "700001"),
    ("Jaipur", "Rajasthan", "302001"), ("Lucknow", "Uttar Pradesh", "226001"),
]

IFSC_CODES = [
    "IBKL0000001", "IBKL0000002", "IBKL0000003", "IBKL0000004",
    "IBKL0000005", "IBKL0000006", "IBKL0000007", "IBKL0000008",
]

BRANCH_NAMES = [
    "IDBI Bank Fort Branch, Mumbai", "IDBI Bank Connaught Place, Delhi",
    "IDBI Bank MG Road, Bangalore", "IDBI Bank Anna Nagar, Chennai",
    "IDBI Bank Banjara Hills, Hyderabad", "IDBI Bank Koregaon Park, Pune",
    "IDBI Bank SG Highway, Ahmedabad", "IDBI Bank Park Street, Kolkata",
]

MERCHANTS = {
    "food": ["Swiggy", "Zomato", "McDonald's India", "Domino's", "Haldiram's", "Barbeque Nation"],
    "shopping": ["Amazon India", "Flipkart", "Myntra", "Reliance Digital", "DMart", "Big Bazaar"],
    "travel": ["IRCTC", "MakeMyTrip", "Ola Cabs", "Uber India", "IndiGo Airlines", "Cleartrip"],
    "utilities": ["Jio Recharge", "Airtel", "BESCOM", "Mahanagar Gas", "Tata Power", "BSNL"],
    "entertainment": ["Netflix India", "Hotstar", "BookMyShow", "Sony LIV", "Amazon Prime"],
    "health": ["Apollo Pharmacy", "1mg", "Practo", "PharmEasy", "Medlife"],
    "education": ["Byju's", "Unacademy", "Coursera", "Udemy", "NIIT"],
    "salary": ["TCS", "Infosys", "Wipro", "HCL Technologies", "Reliance Industries"],
    "rent": ["House Rent", "Office Rent", "PG Rent"],
    "emi": ["Home Loan EMI", "Car Loan EMI", "Personal Loan EMI"],
}

MF_SCHEMES = [
    ("IDBI Nifty50 Index Fund", "mutual_fund", 14.2),
    ("IDBI Flexi Cap Fund", "mutual_fund", 16.8),
    ("IDBI Tax Advantage Fund (ELSS)", "mutual_fund", 15.5),
    ("IDBI Small Cap Fund", "mutual_fund", 22.3),
    ("IDBI Balanced Advantage Fund", "mutual_fund", 11.4),
    ("IDBI Liquid Fund", "mutual_fund", 6.8),
    ("IDBI Corporate Bond Fund", "mutual_fund", 8.2),
    ("PPF Account", "ppf", 7.1),
    ("NPS Tier-I", "nps", 10.5),
    ("Sovereign Gold Bond 2024", "gold", 8.0),
]


def uid():
    return str(uuid.uuid4())


def random_date(start_year=2023, end_year=2026):
    start = datetime(start_year, 1, 1)
    end = datetime(end_year, 6, 28)
    delta = end - start
    return start + timedelta(seconds=random.randint(0, int(delta.total_seconds())))


async def seed_database(db: AsyncSession):
    """Seed the database with synthetic Indian banking data."""
    from sqlalchemy import select

    # Check if data already exists
    existing = await db.execute(select(User).limit(1))
    if existing.scalar_one_or_none():
        print("Database already seeded. Skipping.")
        return

    print("[SEED] Seeding database with synthetic Indian banking data...")

    # ─── Demo User (primary login) ───────────────────────
    demo_user_id = uid()
    demo_user = User(
        id=demo_user_id,
        email="demo@idbibank.co.in",
        phone="+911234567890",
        hashed_password=get_password_hash("demo1234"),
        full_name="Rajesh Kumar Sharma",
        pan_number="ABCPS1234D",
        date_of_birth=datetime(1992, 5, 15),
        city="Mumbai",
        state="Maharashtra",
        pincode="400001",
        occupation="Senior Software Engineer",
        annual_income=1800000,
        risk_appetite="moderate",
        is_active=True,
        is_kyc_verified=True,
        is_msme=False,
    )
    db.add(demo_user)

    # ─── Additional Users ────────────────────────────────
    for i, name in enumerate(INDIAN_NAMES[1:10]):
        city, state, pin = random.choice(INDIAN_CITIES)
        user = User(
            id=uid(),
            email=f"user{i+1}@idbibank.co.in",
            phone=f"+91{random.randint(7000000000, 9999999999)}",
            hashed_password=get_password_hash("password123"),
            full_name=name,
            city=city, state=state, pincode=pin,
            occupation=random.choice(["Engineer", "Doctor", "Teacher", "Business Owner", "CA", "Manager"]),
            annual_income=random.randint(400000, 3000000),
            risk_appetite=random.choice(["conservative", "moderate", "aggressive"]),
            is_active=True,
            is_kyc_verified=random.random() > 0.2,
            is_msme=random.random() > 0.7,
        )
        db.add(user)

    await db.flush() # Flush all users first to satisfy foreign key dependencies

    # ─── Demo User Accounts ──────────────────────────────
    savings_id = uid()
    current_id = uid()

    savings_acc = Account(
        id=savings_id,
        user_id=demo_user_id,
        account_number="10012345678901",
        ifsc_code="IBKL0000001",
        account_type=AccountType.SAVINGS,
        balance=289000.50,
        branch_name="IDBI Bank Fort Branch, Mumbai",
        is_primary=True,
    )
    current_acc = Account(
        id=current_id,
        user_id=demo_user_id,
        account_number="10012345678902",
        ifsc_code="IBKL0000001",
        account_type=AccountType.CURRENT,
        balance=56892.30,
        branch_name="IDBI Bank Fort Branch, Mumbai",
    )
    db.add(savings_acc)
    db.add(current_acc)

    await db.flush() # Flush accounts to satisfy transaction foreign keys

    # ─── Demo User Transactions (last 6 months) ─────────
    categories = list(MERCHANTS.keys())
    running_balance = 350000.0

    for i in range(200):
        is_credit = random.random() < 0.3  # 30% credits, 70% debits
        cat = random.choice(categories)

        if is_credit:
            if cat == "salary":
                amount = random.choice([150000, 155000, 160000])
            else:
                amount = random.uniform(500, 50000)
            txn_type = TransactionType.CREDIT
            running_balance += amount
        else:
            amount = random.uniform(50, 25000)
            if cat == "emi":
                amount = random.choice([18500, 12300, 8500])
            elif cat == "rent":
                amount = 22000
            txn_type = TransactionType.DEBIT
            running_balance -= amount

        merchant = random.choice(MERCHANTS[cat])
        mode = random.choice(list(TransactionMode))

        txn = Transaction(
            id=uid(),
            account_id=savings_id,
            transaction_type=txn_type,
            transaction_mode=mode,
            amount=round(amount, 2),
            balance_after=round(running_balance, 2),
            description=f"{'Received from' if is_credit else 'Paid to'} {merchant}",
            merchant=merchant,
            category=cat,
            reference_id=f"TXN{random.randint(100000000, 999999999)}",
            counterparty=merchant,
            is_flagged=random.random() < 0.02,  # 2% flagged
            fraud_score=random.uniform(0, 0.1) if random.random() > 0.02 else random.uniform(0.6, 0.95),
            timestamp=random_date(2025, 2026),
        )
        db.add(txn)

    # ─── Demo User Cards ─────────────────────────────────
    cards = [
        Card(
            id=uid(), user_id=demo_user_id,
            card_number_masked="**** **** **** 4523",
            card_type=CardType.DEBIT, card_network="RuPay",
            card_name="IDBI RuPay Platinum Debit Card",
            expiry_date="12/28", is_active=True, reward_points=2450,
        ),
        Card(
            id=uid(), user_id=demo_user_id,
            card_number_masked="**** **** **** 8891",
            card_type=CardType.CREDIT, card_network="Visa",
            card_name="IDBI Visa Signature Credit Card",
            credit_limit=300000, outstanding=42500,
            expiry_date="09/27", is_active=True, is_international=True,
            reward_points=12800,
        ),
    ]
    for card in cards:
        db.add(card)

    # ─── Demo User Loans ─────────────────────────────────
    loans = [
        Loan(
            id=uid(), user_id=demo_user_id,
            loan_type="home", principal_amount=4500000,
            outstanding_amount=3850000, interest_rate=8.5,
            tenure_months=240, emi_amount=38500,
            disbursement_date=datetime(2022, 3, 15),
            next_emi_date=datetime(2026, 7, 5),
            status=LoanStatus.ACTIVE, default_probability=0.03,
            risk_level=RiskLevel.LOW, collateral="Flat in Andheri West, Mumbai",
        ),
        Loan(
            id=uid(), user_id=demo_user_id,
            loan_type="vehicle", principal_amount=800000,
            outstanding_amount=320000, interest_rate=9.2,
            tenure_months=60, emi_amount=16500,
            disbursement_date=datetime(2023, 8, 10),
            next_emi_date=datetime(2026, 7, 10),
            status=LoanStatus.ACTIVE, default_probability=0.05,
            risk_level=RiskLevel.LOW,
        ),
    ]
    for loan in loans:
        db.add(loan)

    # ─── Demo User Investments ───────────────────────────
    investments = []
    for scheme_name, inv_type, returns in MF_SCHEMES[:6]:
        invested = random.randint(20000, 200000)
        current_val = invested * (1 + returns / 100 * random.uniform(0.5, 2))
        investments.append(Investment(
            id=uid(), user_id=demo_user_id,
            investment_type=inv_type, scheme_name=scheme_name,
            invested_amount=round(invested, 2),
            current_value=round(current_val, 2),
            returns_percent=round((current_val - invested) / invested * 100, 1),
            units=round(invested / random.uniform(20, 500), 4),
            nav=round(random.uniform(20, 500), 2),
            start_date=random_date(2022, 2024),
            sip_amount=random.choice([1000, 2000, 3000, 5000]) if random.random() > 0.3 else None,
            is_active=True,
        ))
    for inv in investments:
        db.add(inv)

    # ─── AI Recommendations ──────────────────────────────
    recommendations = [
        AIRecommendation(
            id=uid(), user_id=demo_user_id,
            category="investment",
            title="Start a SIP in IDBI Nifty50 Index Fund",
            description="Based on your income pattern and moderate risk appetite, a monthly SIP of ₹5,000 in the Nifty50 Index Fund could grow to ₹12.4 lakhs in 10 years with an expected CAGR of 12-14%.",
            confidence_score=0.94,
            product_details={"fund_name": "IDBI Nifty50 Index Fund", "sip_amount": 5000, "expected_cagr": 13},
        ),
        AIRecommendation(
            id=uid(), user_id=demo_user_id,
            category="savings",
            title="Optimize your FD ladder",
            description="Park ₹50,000 in a 1-year IDBI FD at 7.25% p.a. Your current savings account earns only 3.5%. This simple switch earns ₹1,875 more annually.",
            confidence_score=0.89,
            product_details={"amount": 50000, "rate": 7.25, "tenure_months": 12},
        ),
        AIRecommendation(
            id=uid(), user_id=demo_user_id,
            category="insurance",
            title="Get term life insurance coverage",
            description="At age 32, a ₹1 Crore IDBI Federal term plan costs just ₹780/month. Protect your family given your ₹38,500 home loan EMI commitment.",
            confidence_score=0.87,
            product_details={"coverage": 10000000, "premium": 780, "plan": "IDBI Federal Term Plan"},
        ),
        AIRecommendation(
            id=uid(), user_id=demo_user_id,
            category="tax",
            title="Save ₹46,800 in taxes with ELSS",
            description="You can invest up to ₹1.5 lakhs in IDBI Tax Advantage Fund (ELSS) under Section 80C. Based on your 30% tax bracket, this saves ₹46,800 in taxes.",
            confidence_score=0.92,
            product_details={"max_investment": 150000, "tax_saving": 46800, "fund": "IDBI Tax Advantage Fund"},
        ),
    ]
    for rec in recommendations:
        db.add(rec)

    # ─── Fraud Alerts ────────────────────────────────────
    fraud_alerts = [
        FraudAlert(
            id=uid(), user_id=demo_user_id,
            alert_type="upi", severity=RiskLevel.MEDIUM,
            description="Unusual UPI transaction of ₹9,999 to an unknown merchant at 2:30 AM",
            amount=9999, is_resolved=False,
            created_at=datetime(2026, 6, 25, 2, 30),
        ),
        FraudAlert(
            id=uid(), user_id=demo_user_id,
            alert_type="card", severity=RiskLevel.LOW,
            description="Credit card used at a new international merchant",
            amount=15000, is_resolved=True,
            resolution="Verified by customer",
            created_at=datetime(2026, 6, 20, 14, 15),
        ),
    ]
    for alert in fraud_alerts:
        db.add(alert)

    # ─── MSME Business ───────────────────────────────────
    msme = MSMEBusiness(
        id=uid(), user_id=demo_user_id,
        business_name="Sharma Digital Solutions Pvt. Ltd.",
        business_type="IT Services & Consulting",
        gstin="27AADCS1234A1ZA",
        annual_turnover=4500000,
        employee_count=12,
        years_in_business=4,
        business_score=72.5,
        credit_score=745,
        cash_flow_score=68.0,
        risk_level=RiskLevel.MEDIUM,
        loan_capacity=1500000,
        health_data={
            "revenue_growth": 18.5,
            "profit_margin": 22.3,
            "debt_to_equity": 0.45,
            "current_ratio": 1.8,
            "gst_compliance": 95.0,
            "upi_volume_growth": 35.2,
        },
    )
    db.add(msme)

    await db.flush()
    print("[SUCCESS] Database seeded successfully with synthetic Indian banking data!")
    print("   Demo login: phone=+911234567890, password=demo1234")
