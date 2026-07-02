"""
IDBI AI OneBank — ML Engine Unit Tests
Verifies calculation of default risk, transaction anomalies, and MSME business health.
"""
from app.services.ml_engine import (
    calculate_msme_health,
    predict_default_risk,
    evaluate_transaction_fraud
)


def test_msme_health_high_grade():
    """Verify that stable business metrics calculate a high-grade GREEN status."""
    result = calculate_msme_health(
        annual_turnover=50000000.0,
        gst_filings_delayed=0,
        cash_flow_ratio=0.6,
        employee_count=80,
        years_in_business=15,
        credit_score=780
    )
    assert result["business_health_index"] >= 75.0
    assert result["traffic_light"] == "GREEN"
    assert result["risk_level"] == "low"
    assert result["credit_eligibility_limit"] > 0


def test_msme_health_low_grade():
    """Verify that delayed GST filings and low credit score trigger a RED risk status."""
    result = calculate_msme_health(
        annual_turnover=5000000.0,
        gst_filings_delayed=8,
        cash_flow_ratio=0.05,
        employee_count=2,
        years_in_business=1,
        credit_score=450
    )
    assert result["business_health_index"] < 50.0
    assert result["traffic_light"] == "RED"
    assert result["risk_level"] == "high"
    assert len(result["risk_factors"]) >= 2


def test_loan_default_high_risk():
    """Verify that low credit score and high DTI output a critical default risk."""
    result = predict_default_risk(
        annual_income=300000.0,
        credit_score=500,
        existing_loan_outstanding=1000000.0,
        emi_amount=25000.0,
        recent_delinquency=True
    )
    assert result["npa_probability"] > 0.20
    assert result["risk_category"] in ["High Risk", "Critical Risk"]
    assert result["explainable_ai_shap"]["credit_score"] > 0


def test_loan_default_low_risk():
    """Verify that strong credit score and zero delinquency output low default risk."""
    result = predict_default_risk(
        annual_income=1500000.0,
        credit_score=810,
        existing_loan_outstanding=50000.0,
        emi_amount=10000.0,
        recent_delinquency=False
    )
    assert result["npa_probability"] < 0.05
    assert result["risk_category"] == "Low Risk"
    assert result["explainable_ai_shap"]["credit_score"] < 0


def test_fraud_evaluation_alert():
    """Verify transaction variables trigger anomaly alerts (FLAG decision)."""
    result = evaluate_transaction_fraud(
        amount=120000.0,
        hour_of_day=3,
        distance_from_home=850.0,
        is_international=True,
        daily_spend_limit_percentage=0.90
    )
    assert result["fraud_score"] > 0.60
    assert result["decision"] == "FLAG"
    assert result["risk_level"] == "HIGH"
    assert len(result["anomalies_detected"]) >= 3


def test_fraud_evaluation_approve():
    """Verify standard transaction parameters get approved."""
    result = evaluate_transaction_fraud(
        amount=500.0,
        hour_of_day=14,
        distance_from_home=2.0,
        is_international=False,
        daily_spend_limit_percentage=0.01
    )
    assert result["fraud_score"] < 0.15
    assert result["decision"] == "APPROVE"
    assert result["risk_level"] == "LOW"
