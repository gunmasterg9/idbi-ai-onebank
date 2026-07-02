"""
IDBI AI OneBank — Secure Middlewares
Implements Rate Limiting (Redis), Security Headers (OWASP), and Automatic Audit Logging.
"""
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, Response, status
from fastapi.responses import JSONResponse
from jose import jwt
from app.core.config import settings
from app.core.database import async_session
from app.models.models import AuditLog
import redis
import asyncio
import logging

logger = logging.getLogger(__name__)

# Initialize Redis client for rate limiting
try:
    redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
except Exception as e:
    logger.warning(f"Could not connect to Redis for Rate Limiting: {e}. Rate limiting disabled.")
    redis_client = None


# ─── OWASP Security Headers Middleware ──────────────────

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        
        # Enforce HTTP strict transport security
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
        # Prevent Clickjacking
        response.headers["X-Frame-Options"] = "DENY"
        # Prevent MIME type sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        # Cross Site Scripting protection
        response.headers["X-XSS-Protection"] = "1; mode=block"
        # Referrer Policy
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        # Content Security Policy (Basic restrictive baseline)
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; "
            "font-src 'self' https://fonts.gstatic.com; "
            "img-src 'self' data:; "
            "connect-src 'self' ws:;"
        )
        return response


# ─── Redis Rate Limiter Middleware ─────────────────────

class RateLimitingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        if not redis_client:
            return await call_next(request)

        # Skip rate limit checking for API documentation
        path = request.url.path
        if path in ["/docs", "/redoc", "/openapi.json"]:
            return await call_next(request)

        client_ip = request.client.host if request.client else "unknown"
        key = f"rate_limit:{client_ip}:{path}"

        try:
            # 100 requests per minute limit per endpoint/IP
            current_requests = redis_client.get(key)
            if current_requests and int(current_requests) >= 100:
                return JSONResponse(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    content={"detail": "Too many requests. Please wait a minute before retrying."}
                )

            pipe = redis_client.pipeline()
            pipe.incr(key)
            pipe.expire(key, 60)
            pipe.execute()
        except redis.RedisError as e:
            logger.error(f"Redis rate limiter exception: {e}")
            # Fail-open: allow request to proceed if Redis is down
            pass

        return await call_next(request)


# ─── Audit Logging Middleware ──────────────────────────

class AuditLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        
        # Intercept modification requests or admin panel requests
        method = request.method
        path = request.url.path
        if method in ["POST", "PUT", "DELETE"] or "/admin" in path:
            client_ip = request.client.host if request.client else "unknown"
            user_agent = request.headers.get("user-agent", "unknown")
            
            # Attempt to extract authenticated user from JWT bearer token
            user_id = None
            auth_header = request.headers.get("authorization")
            if auth_header and auth_header.startswith("Bearer "):
                try:
                    token = auth_header.split(" ")[1]
                    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
                    user_id = payload.get("sub")
                except Exception:
                    pass  # Token invalid or expired, proceed unauthenticated log

            # Perform database insertion in a background task
            async def log_audit():
                try:
                    async with async_session() as session:
                        audit_log = AuditLog(
                            user_id=user_id,
                            action=f"{method} {path}",
                            ip_address=client_ip,
                            user_agent=user_agent[:255] if user_agent else None,
                            payload={"status_code": response.status_code}
                        )
                        session.add(audit_log)
                        await session.commit()
                except Exception as e:
                    logger.error(f"Failed to write audit log record: {e}")

            # Schedule background execution
            asyncio.create_task(log_audit())

        return response
