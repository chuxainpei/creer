import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.endpoints.admin_ingestion import router as admin_router
from app.api.v1.endpoints.public_qa import router as qa_router
from app.config import FRONTEND_ORIGINS
from app.observability import create_request_id, reset_request_id, set_request_id


app = FastAPI(title="Employment QA MVP API", version="0.1.0")
logging.basicConfig(level=logging.INFO)

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def request_id_middleware(request, call_next):
    request_id = request.headers.get("x-request-id", "").strip() or create_request_id()
    token = set_request_id(request_id)
    request.state.request_id = request_id
    try:
        response = await call_next(request)
    finally:
        reset_request_id(token)
    response.headers["x-request-id"] = request_id
    return response


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


app.include_router(qa_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1")
