# 🏦 IDBI AI OneBank

## The Unified Intelligent Banking Platform

> **"One AI Platform. Every Banking Decision."**

IDBI AI OneBank is a comprehensive AI-powered banking ecosystem built for the **IDBI Innovate 2026 Hackathon**. It combines 8 AI modules into a single platform covering wealth management, fraud detection, MSME health scoring, loan predictions, and intelligent banking services.

---

## 🌟 Features

| Module | Description |
|--------|-------------|
| 🤖 **AI Chat Assistant** | Multilingual conversational AI banker (EN, HI, GU, MR, TA) |
| 📈 **AI Wealth Manager** | Portfolio analysis, SIP/FD recommendations, retirement planning |
| 🎯 **Prospect Assist AI** | Lead scoring, loan eligibility, next-best-offer engine |
| 🏢 **MSME Health Score** | 360° business health from GST, UPI, bank statements, EPFO |
| 📊 **Default Prediction** | NPA risk, EMI miss probability with explainable AI |
| 🛡️ **Fraud Detection** | Real-time UPI/card/ATM fraud with behavioral biometrics |
| 📄 **Document Intelligence** | OCR for PAN, Aadhaar, salary slips with auto-form filling |
| 💡 **Recommendation Engine** | Unified product recommendations across all banking services |

---

## 🏗️ Architecture

```
Customer → Web / Mobile / Voice
    ↓
AI Avatar (Voice + Chat + Multilingual)
    ↓
AI Gateway
    ↓
┌─────────────────────────────────────┐
│ Wealth AI │ Prospect AI │ MSME AI   │
│ Default AI│ Fraud AI    │ OCR       │
│ RAG       │ Recommendations         │
└─────────────────────────────────────┘
    ↓
Open Banking APIs
    ↓
PostgreSQL / Vector DB / Object Storage
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Python 3.12+
- npm or pnpm

### Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
# → http://localhost:8000
# → API Docs: http://localhost:8000/docs
```

### Docker (Full Stack)

```bash
docker-compose -f docker/docker-compose.yml up --build
```

### Demo Credentials

```
Phone: 1234567890
Password: demo1234
OTP: 123456
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Recharts |
| **Backend** | FastAPI, Python 3.12, SQLAlchemy, Pydantic v2 |
| **AI/ML** | Gemini AI, LangChain, Scikit-learn, XGBoost, LightGBM, FAISS |
| **Database** | SQLite (dev) / PostgreSQL (prod), Redis, ChromaDB |
| **DevOps** | Docker, GitHub Actions, Docker Compose |

---

## 📁 Project Structure

```
idbi-ai-onebank/
├── frontend/          # Next.js 15 web application
├── backend/           # FastAPI Python backend
├── ai-engines/        # AI/ML modules
├── data/              # Synthetic datasets
├── docker/            # Docker configurations
├── docs/              # Documentation
├── tests/             # Test suites
├── .github/workflows/ # CI/CD pipelines
└── README.md
```

---

## 📱 Pages

- **Landing** — 3D animated hero, feature showcase, architecture diagram
- **Login** — OTP verification, biometric option, glassmorphism design
- **Dashboard** — Financial overview, AI insights, charts, transactions
- **AI Chat** — Conversational banking assistant with suggestions
- **Investments** — Portfolio tracking, asset allocation, holdings table
- **Loans** — Active loans, EMI calculator, loan product catalog
- **MSME Health** — Business health radar, cash flow, growth suggestions
- **Fraud Center** — Security alerts, threat monitoring, checklist

---

## 🔒 Security

- JWT authentication with refresh tokens
- bcrypt password hashing
- CORS protection
- Input validation with Pydantic
- Rate limiting ready
- RBI compliance framework

---

## 🏆 Hackathon Deliverables

- [x] Responsive Web Application
- [x] AI Chat Assistant
- [x] Live Dashboard with Charts
- [x] API Documentation (Swagger)
- [x] Docker Deployment
- [x] CI/CD Pipeline
- [x] Synthetic Indian Banking Data
- [ ] Android App (React Native)
- [ ] Demo Video
- [ ] Presentation (15 slides)

---

## 👥 Team

Built for **IDBI Innovate 2026** — India's premier banking innovation challenge.

---

## 📄 License

This project is built for the IDBI Innovate 2026 Hackathon. All rights reserved.
