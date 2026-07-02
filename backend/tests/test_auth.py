"""
IDBI AI OneBank — Authentication API Integration Tests
"""
import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.database import Base, get_db
from app.models.models import User
from main import app

# Test database URL
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(TEST_DATABASE_URL, future=True)
TestingSessionLocal = async_sessionmaker(
    test_engine, class_=AsyncSession, expire_on_commit=False
)


async def override_get_db():
    async with TestingSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


app.dependency_overrides[get_db] = override_get_db


@pytest_asyncio.fixture(scope="module", autouse=True)
async def initialize_test_db():
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.mark.asyncio
async def test_register_and_login():
    # Set transport as app to execute ASGI requests correctly
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # 1. Register User
        reg_payload = {
            "email": "testuser@idbi.com",
            "phone": "9876543210",
            "password": "securepassword123",
            "full_name": "Test User",
            "pan_number": "ABCDE1234F",
            "date_of_birth": "1990-01-01T00:00:00",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400001"
        }
        res = await ac.post("/api/v1/auth/register", json=reg_payload)
        assert res.status_code == 201
        data = res.json()
        assert "access_token" in data
        assert "refresh_token" in data
        
        # 2. Login User
        login_payload = {
            "phone": "9876543210",
            "password": "securepassword123"
        }
        res_login = await ac.post("/api/v1/auth/login", json=login_payload)
        assert res_login.status_code == 200
        data_login = res_login.json()
        assert "access_token" in data_login
        assert "refresh_token" in data_login
