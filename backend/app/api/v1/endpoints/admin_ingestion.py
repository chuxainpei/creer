from pathlib import Path

from fastapi import APIRouter, File, Header, HTTPException, UploadFile
from pydantic import BaseModel

from app.config import ADMIN_TOKEN, GRADUATE_UPLOADS_DIR, OFFICIAL_UPLOADS_DIR, ensure_storage_dirs
from app.ingestion.graduate_parser import SUPPORTED_GRADUATE_EXTENSIONS, build_graduate_chunks_from_file
from app.ingestion.official_docs import SUPPORTED_OFFICIAL_EXTENSIONS, build_official_chunks_from_file
from app.retrieval.service import retrieval_service

router = APIRouter(prefix="/admin", tags=["admin"])
MAX_UPLOAD_BYTES = 10 * 1024 * 1024


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


def _validate_payload_size(data: bytes) -> None:
    if not data:
        raise HTTPException(status_code=400, detail="Empty file is not allowed")
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=400, detail="File exceeds max size limit")


def _validate_staged_content(source_kind: str, staged_path: Path) -> None:
    try:
        if source_kind == "official":
            chunks = build_official_chunks_from_file(staged_path)
        else:
            chunks = build_graduate_chunks_from_file(staged_path)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Invalid {source_kind} file: {exc}") from exc

    if not chunks:
        if source_kind == "official":
            raise HTTPException(status_code=400, detail="Official document has no readable content")
        raise HTTPException(status_code=400, detail="Graduate data has no valid records")


def _write_with_validation(target_path: Path, data: bytes, source_kind: str) -> bool:
    replaced = target_path.exists()
    staged_path = target_path.with_name(f"{target_path.stem}.uploading{target_path.suffix}")
    staged_path.write_bytes(data)

    try:
        _validate_staged_content(source_kind=source_kind, staged_path=staged_path)
        staged_path.replace(target_path)
        return replaced
    except Exception:
        staged_path.unlink(missing_ok=True)
        raise


@router.post("/upload/official")
async def upload_official(
    file: UploadFile = File(...),
    authorization: str | None = Header(default=None),
) -> dict:
    _validate_admin_token(authorization)
    data = await file.read()
    _validate_payload_size(data)
    target_path = _save_upload(file, OFFICIAL_UPLOADS_DIR, SUPPORTED_OFFICIAL_EXTENSIONS)
    replaced = _write_with_validation(target_path=target_path, data=data, source_kind="official")
    return {
        "ok": True,
        "source_type": "official",
        "filename": target_path.name,
        "bytes": len(data),
        "replaced": replaced,
    }


@router.post("/upload/graduate-data")
async def upload_graduate_data(
    file: UploadFile = File(...),
    authorization: str | None = Header(default=None),
) -> dict:
    _validate_admin_token(authorization)
    data = await file.read()
    _validate_payload_size(data)
    target_path = _save_upload(file, GRADUATE_UPLOADS_DIR, SUPPORTED_GRADUATE_EXTENSIONS)
    replaced = _write_with_validation(target_path=target_path, data=data, source_kind="graduate-data")
    return {
        "ok": True,
        "source_type": "graduate_reference",
        "filename": target_path.name,
        "bytes": len(data),
        "replaced": replaced,
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
