from fastapi import FastAPI

from app.api.v1.endpoints.admin_ingestion import router as admin_router
from app.api.v1.endpoints.public_qa import router as qa_router


app = FastAPI(title="Employment QA MVP API", version="0.1.0")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


app.include_router(qa_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1")
