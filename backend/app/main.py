from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints.admin_ingestion import router as admin_router
from app.api.v1.endpoints.public_qa import router as qa_router
from app.config import FRONTEND_ORIGINS


app = FastAPI(title="Employment QA MVP API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


app.include_router(qa_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1")
