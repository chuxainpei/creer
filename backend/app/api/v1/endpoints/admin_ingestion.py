from pathlib import Path

from fastapi import APIRouter, File, Header, HTTPException, UploadFile
from pydantic import BaseModel

from app.config import ADMIN_TOKEN, GRADUATE_UPLOADS_DIR, OFFICIAL_UPLOADS_DIR, ensure_storage_dirs
from app.ingestion.graduate_parser import SUPPORTED_GRADUATE_EXTENSIONS
from app.ingestion.official_docs import SUPPORTED_OFFICIAL_EXTENSIONS
from app.retrieval.service import retrieval_service

router = APIRouter(prefix="/admin", tags=["admin"])


class LoginRequest(BaseModel):
    token: str


def _validate_admin_token(authorization: str | None) -> None:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")

    token = authorization.removeprefix("Bearer ").strip()
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Invalid admin token")


@router.post("/login")
async def admin_login(payload: LoginRequest) -> dict:
    if payload.token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Invalid admin token")
    return {"ok": True, "access_token": ADMIN_TOKEN}


def _save_upload(file: UploadFile, target_dir: Path, allowed_extensions: set[str]) -> Path:
    ensure_storage_dirs()
    file_name = Path(file.filename or "").name
    if not file_name:
        raise HTTPException(status_code=400, detail="Missing file name")

    suffix = Path(file_name).suffix.lower()
    if suffix not in allowed_extensions:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {suffix or 'unknown'}")

    return target_dir / file_name


@router.post("/upload/official")
async def upload_official(
    file: UploadFile = File(...),
    authorization: str | None = Header(default=None),
) -> dict:
    _validate_admin_token(authorization)
    data = await file.read()
    target_path = _save_upload(file, OFFICIAL_UPLOADS_DIR, SUPPORTED_OFFICIAL_EXTENSIONS)
    target_path.write_bytes(data)
    return {
        "ok": True,
        "source_type": "official",
        "filename": target_path.name,
        "bytes": len(data),
    }


@router.post("/upload/graduate-data")
async def upload_graduate_data(
    file: UploadFile = File(...),
    authorization: str | None = Header(default=None),
) -> dict:
    _validate_admin_token(authorization)
    data = await file.read()
    target_path = _save_upload(file, GRADUATE_UPLOADS_DIR, SUPPORTED_GRADUATE_EXTENSIONS)
    target_path.write_bytes(data)
    return {
        "ok": True,
        "source_type": "graduate_reference",
        "filename": target_path.name,
        "bytes": len(data),
    }


@router.post("/reindex")
async def reindex(authorization: str | None = Header(default=None)) -> dict:
    _validate_admin_token(authorization)
    status = retrieval_service.rebuild_indexes()
    return {"ok": True, "status": "reindex_completed", **status}


@router.get("/status")
async def admin_status(authorization: str | None = Header(default=None)) -> dict:
    _validate_admin_token(authorization)
    return {"ok": True, **retrieval_service.get_status()}
