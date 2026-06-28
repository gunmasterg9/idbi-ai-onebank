"""
IDBI AI OneBank — AI Chat Endpoint
Handles conversational AI requests for the banking avatar.
"""
from fastapi import APIRouter, Depends
from app.core.security import get_current_user
from app.schemas.schemas import ChatRequest, ChatResponse

router = APIRouter(prefix="/ai", tags=["AI Services"])


# Simulated AI responses for demo
AI_RESPONSES = {
    "balance": {
        "reply": "Your total balance across all accounts is ₹3,45,892. Your savings account has ₹2,89,000 and your current account has ₹56,892. Would you like me to show your recent transactions?",
        "suggestions": ["Show transactions", "Transfer money", "View investments"],
    },
    "invest": {
        "reply": "Based on your spending pattern and risk profile (Moderate), I recommend:\n\n📈 **SIP in IDBI Nifty50 Index Fund** — ₹5,000/month (Expected CAGR: 12-14%)\n💰 **IDBI Tax Advantage Fund** — ₹2,000/month for 80C benefits\n🏦 **IDBI FD** — Park ₹50,000 at 7.25% for 1 year\n\nShall I start a SIP for you?",
        "suggestions": ["Start SIP", "Compare funds", "FD rates", "Retirement planning"],
    },
    "loan": {
        "reply": "I can see you're eligible for multiple loan products:\n\n🏠 **Home Loan** — Up to ₹45,00,000 at 8.5% p.a.\n🚗 **Vehicle Loan** — Up to ₹8,00,000 at 9.2% p.a.\n💼 **Personal Loan** — Up to ₹5,00,000 at 10.5% p.a.\n\nYour credit score of 782 qualifies you for premium rates. Would you like to apply?",
        "suggestions": ["Apply for loan", "EMI calculator", "Compare rates"],
    },
    "fraud": {
        "reply": "🛡️ Your account security status is **Strong**.\n\nNo suspicious activity detected in the last 30 days. Here are your security stats:\n\n✅ 2FA enabled\n✅ Biometric login active\n✅ International transactions disabled\n⚠️ You have 1 unverified device\n\nWould you like me to review your security settings?",
        "suggestions": ["Review devices", "Enable alerts", "Block card"],
    },
    "default": {
        "reply": "Namaste! 🙏 I'm your IDBI AI Banking Assistant. I can help you with:\n\n💰 **Account & Balance** — Check balances, transactions\n📊 **Investments** — Mutual funds, SIPs, FDs\n💳 **Loans** — Eligibility, EMI calculator, apply\n🛡️ **Security** — Fraud alerts, card controls\n📈 **MSME Health** — Business score, growth tips\n🏦 **Banking Services** — Transfers, bill payments\n\nHow can I assist you today?",
        "suggestions": ["Check balance", "Investment advice", "Loan eligibility", "Account security"],
    }
}


import httpx
from app.core.config import settings

@router.post("/chat", response_model=ChatResponse)
async def ai_chat(
    request: ChatRequest,
    current_user: dict = Depends(get_current_user),
):
    """Chat with the AI banking assistant (Supports local Ollama PC AI setup & cloud LLMs)."""
    message_lower = request.message.lower()

    # If local PC AI (Ollama) is enabled
    if settings.LLM_PROVIDER == "ollama":
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                ollama_prompt = (
                    f"You are IDBI AI Banker, a helpful and expert AI banking assistant for IDBI Bank.\n"
                    f"User question: {request.message}\n"
                    f"Provide a concise, helpful banking answer in markdown format."
                )
                res = await client.post(
                    f"{settings.OLLAMA_BASE_URL}/api/generate",
                    json={
                        "model": settings.LLM_MODEL,
                        "prompt": ollama_prompt,
                        "stream": False,
                    }
                )
                if res.status_code == 200:
                    data = res.json()
                    return ChatResponse(
                        reply=data.get("response", "Thank you for contacting IDBI AI OneBank."),
                        suggestions=["Check balance", "Investment advice", "Loan options"],
                        actions=[],
                        confidence=0.98,
                    )
        except Exception:
            # Fallback to offline rule engine if local Ollama server is not currently active
            pass

    # Domain keyword matching fallback
    if any(w in message_lower for w in ["balance", "account", "money", "kitna"]):
        response_data = AI_RESPONSES["balance"]
    elif any(w in message_lower for w in ["invest", "sip", "mutual", "fd", "stock", "portfolio"]):
        response_data = AI_RESPONSES["invest"]
    elif any(w in message_lower for w in ["loan", "emi", "borrow", "credit", "eligib"]):
        response_data = AI_RESPONSES["loan"]
    elif any(w in message_lower for w in ["fraud", "secure", "security", "hack", "suspicious", "block"]):
        response_data = AI_RESPONSES["fraud"]
    else:
        response_data = AI_RESPONSES["default"]

    return ChatResponse(
        reply=response_data["reply"],
        suggestions=response_data.get("suggestions", []),
        actions=[],
        confidence=0.92,
    )


@router.get("/recommendations")
async def get_recommendations(
    current_user: dict = Depends(get_current_user),
):
    """Get AI-powered product recommendations."""
    return {
        "recommendations": [
            {
                "id": "rec_1",
                "category": "investment",
                "title": "Start a SIP in IDBI Nifty50 Index Fund",
                "description": "Based on your income and spending patterns, investing ₹5,000/month in an index fund could grow to ₹12.4L in 10 years.",
                "confidence": 0.94,
                "potential_return": "12-14% CAGR",
                "action": "start_sip",
            },
            {
                "id": "rec_2",
                "category": "savings",
                "title": "Optimize your FD portfolio",
                "description": "Your ₹2,00,000 FD expires next month. Renewing with FD laddering could increase returns by ₹8,400/year.",
                "confidence": 0.89,
                "potential_return": "7.25% p.a.",
                "action": "renew_fd",
            },
            {
                "id": "rec_3",
                "category": "insurance",
                "title": "Get IDBI Term Life Insurance",
                "description": "At age 32, a ₹1 Crore term cover costs only ₹780/month. Protect your family's financial future.",
                "confidence": 0.87,
                "potential_return": "₹1 Cr coverage",
                "action": "buy_insurance",
            },
            {
                "id": "rec_4",
                "category": "loan",
                "title": "Pre-approved Personal Loan at 10.5%",
                "description": "You qualify for a pre-approved personal loan up to ₹5,00,000 at competitive interest rates.",
                "confidence": 0.91,
                "potential_return": "10.5% p.a.",
                "action": "apply_loan",
            },
        ]
    }


@router.get("/health-score")
async def get_ai_health_score(
    current_user: dict = Depends(get_current_user),
):
    """Get overall AI financial health score."""
    return {
        "overall_score": 85.5,
        "grade": "A",
        "breakdown": {
            "savings_score": 78,
            "investment_score": 82,
            "debt_score": 91,
            "insurance_score": 65,
            "emergency_fund": 88,
            "spending_discipline": 79,
        },
        "trends": {
            "last_month": 83.2,
            "last_quarter": 80.1,
            "last_year": 75.8,
        },
        "insights": [
            "Your savings rate improved by 3.2% this month 📈",
            "Consider increasing your emergency fund to 6 months of expenses",
            "Your investment portfolio is well-diversified",
            "Adding life insurance would boost your score by ~8 points",
        ],
    }
