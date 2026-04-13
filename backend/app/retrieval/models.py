from typing import Any

from pydantic import BaseModel, Field


class RetrievalHit(BaseModel):
    text: str
    score: float = Field(default=0.0, ge=0.0, le=1.0)
    metadata: dict[str, Any] = Field(default_factory=dict)


class ContextResolution(BaseModel):
    context: str
    used_official: bool
