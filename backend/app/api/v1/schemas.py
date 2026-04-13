from pydantic import BaseModel, Field
from typing import Literal


class AskRequest(BaseModel):
    question: str = Field(min_length=1, max_length=500)


class SourceTag(BaseModel):
    label: str
    source_type: Literal["official", "graduate_reference"]


class SourceEvidence(BaseModel):
    source_type: Literal["official", "graduate_reference"]
    source_name: str
    snippet: str = Field(min_length=1, max_length=220)


class AskResponse(BaseModel):
    answer: str
    source_tags: list[SourceTag]
    evidence: list[SourceEvidence] = Field(default_factory=list)
    used_official: bool = False
