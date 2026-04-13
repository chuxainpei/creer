from pydantic import BaseModel, Field
from typing import Literal


class AskRequest(BaseModel):
    question: str = Field(min_length=1, max_length=500)


class SourceTag(BaseModel):
    label: str
    source_type: Literal["official", "graduate_reference"]


class AskResponse(BaseModel):
    answer: str
    source_tags: list[SourceTag]
    used_official: bool = False
