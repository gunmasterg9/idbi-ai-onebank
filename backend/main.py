"""
IDBI AI OneBank — Main Application Entry Point
FastAPI application with CORS, routing, and database initialization.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.core.database import init_db, async_session
from app.core.seed_data import seed_database
from app.api.v1.endpoints import auth, dashboard, ai, wealth, ai_modules


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: initialize database and seed data on startup."""
    await init_db()
    async with async_session() as session:
        await seed_database(session)
        await session.commit()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    description=(
        "IDBI AI OneBank — The Unified Intelligent Banking Platform.\n\n"
        "One AI Platform. Every Banking Decision.\n\n"
        "Features: AI Wealth Management, Prospect Assist, MSME Health Score, "
        "Loan Default Prediction, Fraud Detection, Voice Banking Avatar, "
        "Financial Coach, and Open Banking APIs."
    ),
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix=settings.API_V1_PREFIX)
app.include_router(dashboard.router, prefix=settings.API_V1_PREFIX)
app.include_router(ai.router, prefix=settings.API_V1_PREFIX)
app.include_router(wealth.router, prefix=settings.API_V1_PREFIX)
app.include_router(ai_modules.prospect_router, prefix=settings.API_V1_PREFIX)
app.include_router(ai_modules.msme_router, prefix=settings.API_V1_PREFIX)
app.include_router(ai_modules.default_router, prefix=settings.API_V1_PREFIX)
app.include_router(ai_modules.fraud_router, prefix=settings.API_V1_PREFIX)
app.include_router(ai_modules.ocr_router, prefix=settings.API_V1_PREFIX)
app.include_router(ai_modules.open_banking_router, prefix=settings.API_V1_PREFIX)


@app.get("/")
async def root():
    return {
        "name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "tagline": "One AI Platform. Every Banking Decision.",
        "docs": "/docs",
        "status": "operational",
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}
