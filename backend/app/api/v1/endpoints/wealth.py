"""
IDBI AI OneBank — Wealth Management AI Engine
Calculates SIP projections, portfolio rebalancing, FD optimization, and retirement planning.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(prefix="/wealth", tags=["AI Wealth Management"])

class SIPRequest(BaseModel):
    monthly_investment: float
    expected_return_rate: float  # e.g. 12.0 for 12%
    time_period_years: int

class SIPResponse(BaseModel):
    invested_amount: float
    est_returns: float
    total_value: float
    breakdown_by_year: List[dict]

@router.post("/sip-calculator", response_model=SIPResponse)
async def calculate_sip(req: SIPRequest):
    i = (req.expected_return_rate / 100) / 12
    n = req.time_period_years * 12
    total_value = req.monthly_investment * (((1 + i)**n - 1) / i) * (1 + i)
    invested_amount = req.monthly_investment * n
    est_returns = total_value - invested_amount

    breakdown = []
    for yr in range(1, req.time_period_years + 1):
        months = yr * 12
        val = req.monthly_investment * (((1 + i)**months - 1) / i) * (1 + i)
        inv = req.monthly_investment * months
        breakdown.append({
            "year": yr,
            "invested": round(inv, 2),
            "value": round(val, 2),
            "returns": round(val - inv, 2)
        })

    return SIPResponse(
        invested_amount=round(invested_amount, 2),
        est_returns=round(est_returns, 2),
        total_value=round(total_value, 2),
        breakdown_by_year=breakdown
    )

@router.get("/portfolio-analysis")
async def analyze_portfolio():
    return {
        "health_score": 88.5,
        "diversification": "Optimal",
        "equity_ratio": 0.55,
        "debt_ratio": 0.35,
        "gold_ratio": 0.10,
        "rebalancing_suggestions": [
            "Increase allocation in IDBI Flexi Cap Fund by 5% to capture mid-cap growth.",
            "Park ₹25,000 idle cash in Liquid Fund for 6.8% yield instead of Savings Account."
        ]
    }
