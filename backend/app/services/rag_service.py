"""
IDBI AI OneBank — RAG (Retrieval-Augmented Generation) Service
Integrates Gemini LLM, PGVector semantic search, and document retrieval.
"""
import google.generativeai as genai
import numpy as np
import json
import logging
from typing import List, Dict, Any, Optional
from sqlalchemy import select, text
from app.core.config import settings
from app.core.database import async_session
from app.models.models import KBChunk

logger = logging.getLogger(__name__)


# ─── Embedding & LLM Functions ──────────────────────────

def get_embedding(text_content: str) -> List[float]:
    """Generates a 768-dimensional vector embedding using Google Gemini API."""
    if not settings.GEMINI_API_KEY:
        # Deterministic dummy embedding for mock mode
        hash_val = sum(ord(c) for c in text_content) % 1000
        np.random.seed(hash_val)
        return list(np.random.normal(0, 0.1, 768))

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        result = genai.embed_content(
            model="models/embedding-001",
            content=text_content,
            task_type="retrieval_document"
        )
        return result["embedding"]
    except Exception as e:
        logger.error(f"Error generating Gemini embedding: {e}")
        # Fallback dummy embedding
        return [0.01] * 768


def generate_llm_response(prompt: str, context: Optional[str] = None) -> str:
    """Generates a text response from Gemini model, incorporating context."""
    if not settings.GEMINI_API_KEY:
        return "Gemini API key is not configured. Running in local rule-based simulation mode."

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-2.0-flash")
        
        full_prompt = prompt
        if context:
            full_prompt = (
                f"Use the following IDBI Bank document context to answer the user request. "
                f"Be professional, accurate, and concise. "
                f"If the answer cannot be found in the context, use your general knowledge but state clearly "
                f"that it is general information.\n\n"
                f"Context:\n{context}\n\n"
                f"User Request: {prompt}"
            )
            
        response = model.generate_content(full_prompt)
        return response.text
    except Exception as e:
        logger.error(f"Error generating LLM response: {e}")
        return "I encountered an error communicating with the AI brain. Please try again."


# ─── Cosine Similarity Fallback (for SQLite) ───────────

def cosine_similarity(a: List[float], b: List[float]) -> float:
    """Computes cosine similarity between two vectors."""
    arr_a = np.array(a)
    arr_b = np.array(b)
    norm_a = np.linalg.norm(arr_a)
    norm_b = np.linalg.norm(arr_b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(np.dot(arr_a, arr_b) / (norm_a * norm_b))


# ─── Semantic Search Query ──────────────────────────────

async def query_knowledge_base(query: str, limit: int = 3) -> List[Dict[str, Any]]:
    """
    Performs vector similarity search on KBChunk.
    Uses pgvector <=> cosine distance in Postgres, and numpy fallback in SQLite.
    """
    query_vector = get_embedding(query)
    
    async with async_session() as session:
        # Determine database dialect
        bind = session.bind
        dialect_name = bind.dialect.name if bind else "postgresql"
        
        if dialect_name == "postgresql":
            # PostgreSQL pgvector search
            stmt = select(KBChunk).order_by(text("embedding <=> :emb")).limit(limit)
            result = await session.execute(stmt, {"emb": str(query_vector)})
            chunks = result.scalars().all()
            return [
                {
                    "title": c.title,
                    "content": c.content,
                    "metadata": c.metadata_info,
                    "score": 1.0  # Normalized indicator
                }
                for c in chunks
            ]
        else:
            # SQLite fallback similarity search
            stmt = select(KBChunk)
            result = await session.execute(stmt)
            chunks = result.scalars().all()
            
            scored_chunks = []
            for chunk in chunks:
                if chunk.embedding:
                    emb = chunk.embedding
                    if isinstance(emb, str):
                        try:
                            emb = json.loads(emb)
                        except Exception:
                            continue
                    if isinstance(emb, list) and len(emb) == len(query_vector):
                        sim = cosine_similarity(query_vector, emb)
                        scored_chunks.append((sim, chunk))
            
            scored_chunks.sort(key=lambda x: x[0], reverse=True)
            return [
                {
                    "title": item.title,
                    "content": item.content,
                    "metadata": item.metadata_info,
                    "score": round(score, 4)
                }
                for score, item in scored_chunks[:limit]
            ]


# ─── Knowledge Seeding ──────────────────────────────────

BANK_DOCUMENTS = [
    {
        "title": "IDBI Super Savings Account",
        "content": "IDBI Super Savings Account offers high flexibility. Features include standard 3.0% to 3.5% p.a. interest rates, zero charges for online NEFT/RTGS/IMPS transactions, free international debit card, and a minimum average quarterly balance requirement of ₹5,000 for semi-urban and ₹10,000 for metro areas.",
        "metadata": {"category": "savings", "interest_rate": "3.5%"},
    },
    {
        "title": "IDBI Kutumb Home Loan",
        "content": "IDBI Kutumb Home Loan provides financing for buying, constructing, or renovating homes. Interest rates start at 8.40% p.a. linked to Repo Rate. Maximum tenure is 30 years. Features include zero prepayment penalties, quick approval, and additional top-up loan options for existing borrowers.",
        "metadata": {"category": "loans", "interest_rate": "8.40%"},
    },
    {
        "title": "IDBI MSME Sahyog Scheme",
        "content": "IDBI MSME Sahyog Scheme is designed for micro, small, and medium enterprises. It offers working capital loans and term loans up to ₹5 Crore. Collateral-free options are available under CGTMSE cover up to ₹2 Crore. Interest rate is competitive and linked to EBLR.",
        "metadata": {"category": "msme", "max_limit": "5 Cr"},
    },
    {
        "title": "IDBI Tax Saving Fixed Deposit Scheme",
        "content": "IDBI Tax Saving FD scheme offers tax exemption under Section 80C of the Income Tax Act. Lock-in period is 5 years. Interest rates are competitive, currently at 7.25% p.a. for general citizens and 7.75% p.a. for senior citizens. Minimum deposit is ₹10,000.",
        "metadata": {"category": "investment", "lock_in": "5 years"},
    }
]

async def seed_knowledge_base():
    """Seeds default banking documents into pgvector/SQLite database."""
    async with async_session() as session:
        # Check if already seeded
        stmt = select(KBChunk).limit(1)
        res = await session.execute(stmt)
        if res.scalars().first():
            return  # Already seeded

        logger.info("Seeding knowledge base vector chunks...")
        for doc in BANK_DOCUMENTS:
            emb = get_embedding(doc["content"])
            chunk = KBChunk(
                title=doc["title"],
                content=doc["content"],
                metadata_info=doc["metadata"],
                embedding=emb
            )
            session.add(chunk)
        await session.commit()
