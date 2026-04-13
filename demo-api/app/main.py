from __future__ import annotations

import os
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


def _parse_allowed_origins() -> list[str]:
    raw = os.getenv("ALLOWED_ORIGINS", "")
    return [item.strip() for item in raw.split(",") if item.strip()]


ALLOWED_ORIGINS = _parse_allowed_origins()
GITHUB_PAGES_REGEX = r"^https://[a-zA-Z0-9-]+\.github\.io(/.*)?$"


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
    evidence: list[SourceEvidence]
    used_official: bool = True


def build_demo_answer(question: str) -> AskResponse:
    if "双选会" in question:
        snippet = "双选会报名需登录学校就业系统，按公告时间完成报名与材料提交。"
    elif "三方" in question or "协议" in question:
        snippet = "三方协议需在学校就业系统内提交，审核流程以就业中心官网通知为准。"
    elif "档案" in question:
        snippet = "档案去向确认应以学校就业系统派遣信息和学院通知为准。"
    elif "补贴" in question:
        snippet = "求职补贴申请请按当年政策公告执行，务必在规定时间窗口内提交材料。"
    else:
        snippet = "请优先参考学校就业中心官网最新公告办理，必要时联系学院就业老师。"

    return AskResponse(
        answer=f"【演示 API】根据官方资料，{snippet} 若与经验信息冲突，请仅执行官方结论。",
        source_tags=[
            SourceTag(label="官方资料", source_type="official"),
            SourceTag(label="经验参考", source_type="graduate_reference"),
        ],
        evidence=[
            SourceEvidence(
                source_type="official",
                source_name="就业中心官网公告（演示接口）",
                snippet=snippet,
            )
        ],
        used_official=True,
    )


app = FastAPI(title="Employment QA Demo API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=GITHUB_PAGES_REGEX,
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict:
    return {"ok": True}


@app.post("/api/v1/qa/ask", response_model=AskResponse)
async def ask(payload: AskRequest) -> AskResponse:
    return build_demo_answer(payload.question)
