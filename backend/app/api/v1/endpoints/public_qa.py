import asyncio
import time
from collections import defaultdict, deque

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse

from app.api.v1.schemas import AskRequest, AskResponse
from app.observability import log_operation
from app.retrieval.service import retrieval_service


router = APIRouter(prefix="/qa", tags=["public-qa"])

RATE_LIMIT_MAX_REQUESTS = 30
RATE_LIMIT_WINDOW_SECONDS = 60
ANSWER_TIMEOUT_SECONDS = 8.0
_RATE_LIMIT_STATE: dict[str, deque[float]] = defaultdict(deque)


def _resolve_client_key(request: Request) -> str:
    forwarded_for = request.headers.get("x-forwarded-for", "").split(",")[0].strip()
    if forwarded_for:
        return forwarded_for
    if request.client and request.client.host:
        return request.client.host
    return "anonymous"


def _enforce_rate_limit(request: Request) -> None:
    now = time.monotonic()
    client_key = _resolve_client_key(request)
    bucket = _RATE_LIMIT_STATE[client_key]

    while bucket and now - bucket[0] > RATE_LIMIT_WINDOW_SECONDS:
        bucket.popleft()

    if len(bucket) >= RATE_LIMIT_MAX_REQUESTS:
        raise HTTPException(status_code=429, detail="请求过于频繁，请稍后再试。")

    bucket.append(now)


async def _answer_with_timeout(question: str) -> dict:
    try:
        return await asyncio.wait_for(
            retrieval_service.answer(question),
            timeout=ANSWER_TIMEOUT_SECONDS,
        )
    except TimeoutError as exc:
        raise HTTPException(status_code=504, detail="问答处理超时，请稍后重试。") from exc


@router.post("/ask", response_model=AskResponse)
async def ask_question(payload: AskRequest, request: Request) -> AskResponse:
    try:
        _enforce_rate_limit(request)
        result = await _answer_with_timeout(payload.question)
    except HTTPException as exc:
        log_operation(
            "qa.ask.failed",
            status_code=exc.status_code,
            detail=str(exc.detail),
            question_length=len(payload.question),
        )
        raise

    log_operation(
        "qa.ask.success",
        used_official=result["used_official"],
        source_tags=len(result["source_tags"]),
        evidence=len(result.get("evidence", [])),
    )
    return AskResponse(**result)


@router.post("/stream")
async def stream_question(payload: AskRequest, request: Request) -> StreamingResponse:
    try:
        _enforce_rate_limit(request)
        result = await _answer_with_timeout(payload.question)
    except HTTPException as exc:
        log_operation(
            "qa.stream.failed",
            status_code=exc.status_code,
            detail=str(exc.detail),
            question_length=len(payload.question),
        )
        raise

    log_operation(
        "qa.stream.opened",
        used_official=result["used_official"],
        source_tags=len(result["source_tags"]),
        evidence=len(result.get("evidence", [])),
    )
    return StreamingResponse(
        retrieval_service.stream_answer(payload.question, precomputed_result=result),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )
