from __future__ import annotations

import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
STORAGE_DIR = Path(os.getenv("EMPLOYMENT_QA_STORAGE_DIR", BASE_DIR / ".storage"))
OFFICIAL_UPLOADS_DIR = STORAGE_DIR / "official"
GRADUATE_UPLOADS_DIR = STORAGE_DIR / "graduate"
INDEX_DIR = STORAGE_DIR / "index"
INDEX_STATUS_PATH = STORAGE_DIR / "status.json"

ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "admin-dev-token")
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "FRONTEND_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3006,http://127.0.0.1:3006",
    ).split(",")
    if origin.strip()
]

OFFICIAL_COLLECTION = "employment_official"
GRADUATE_COLLECTION = "employment_graduate"


def ensure_storage_dirs() -> None:
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    OFFICIAL_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    GRADUATE_UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    INDEX_DIR.mkdir(parents=True, exist_ok=True)
