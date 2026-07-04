"""
IDBI AI OneBank — Database Setup
Async SQLAlchemy engine and session management.
"""
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# Engine configuration with pooling for PostgreSQL
engine_kwargs = {}
if settings.DATABASE_URL.startswith("postgresql"):
    engine_kwargs = {
        "pool_size": 20,
        "max_overflow": 10,
        "pool_timeout": 30,
        "pool_recycle": 1800,
    }

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    future=True,
    **engine_kwargs
)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    """FastAPI dependency for database sessions."""
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def init_db():
    """Create all tables on startup."""
    # Enable pgvector extension if we are on PostgreSQL
    if settings.DATABASE_URL.startswith("postgresql"):
        async with engine.begin() as conn:
            from sqlalchemy import text
            await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))

    async with engine.begin() as conn:
        # SQLite doesn't natively support all DDL/migrations easily, 
        # but conn.run_sync creates standard tables.
        await conn.run_sync(Base.metadata.create_all)
