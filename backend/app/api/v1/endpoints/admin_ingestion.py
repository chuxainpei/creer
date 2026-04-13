import os

from fastapi import APIRouter, File, Header, HTTPException, UploadFile
from pydantic import BaseModel


router = APIRouter(prefix="/admin", tags=["admin"])
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "admin-dev-token")


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


@router.post("/upload/official")
async def upload_official(
    file: UploadFile = File(...),
    authorization: str | None = Header(default=None),
) -> dict:
    _validate_admin_token(authorization)
    data = await file.read()
    return {"ok": True, "source_type": "official", "filename": file.filename, "bytes": len(data)}


@router.post("/upload/graduate-data")
async def upload_graduate_data(
    file: UploadFile = File(...),
    authorization: str | None = Header(default=None),
) -> dict:
    _validate_admin_token(authorization)
    data = await file.read()
    return {
        "ok": True,
        "source_type": "graduate_reference",
        "filename": file.filename,
        "bytes": len(data),
    }


@router.post("/reindex")
async def reindex(authorization: str | None = Header(default=None)) -> dict:
    _validate_admin_token(authorization)
    return {"ok": True, "status": "reindex_started"}
