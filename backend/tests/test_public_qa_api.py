import asyncio

from fastapi.testclient import TestClient

from app.api.v1.endpoints import public_qa
from app.config import GRADUATE_UPLOADS_DIR, OFFICIAL_UPLOADS_DIR, ensure_storage_dirs
from app.main import app
from app.retrieval.service import retrieval_service


client = TestClient(app)


def _seed_index_sources() -> None:
    retrieval_service.reset_runtime()
    ensure_storage_dirs()
    OFFICIAL_UPLOADS_DIR.joinpath("双选会指南.txt").write_text(
        "双选会报名需登录学校就业系统，按公告时间完成报名与材料提交。",
        encoding="utf-8",
    )
    GRADUATE_UPLOADS_DIR.joinpath("graduate.csv").write_text(
        "major,year,destination_type,institution_company,salary_range\n"
        "计算机科学与技术,2025,就业,某科技公司,15k-20k\n",
        encoding="utf-8",
    )
    retrieval_service.rebuild_indexes()


def _reset_rate_limit_state() -> None:
    limiter = getattr(public_qa, "_RATE_LIMIT_STATE", None)
    if isinstance(limiter, dict):
        limiter.clear()


def test_public_ask_returns_answer_and_tags() -> None:
    _seed_index_sources()
    response = client.post("/api/v1/qa/ask", json={"question": "双选会如何报名？"})
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "source_tags" in data
    assert isinstance(data["source_tags"], list)
    assert "evidence" in data
    assert isinstance(data["evidence"], list)
    assert data["evidence"]
    assert data["evidence"][0]["snippet"]
    assert data["evidence"][0]["source_name"]


def test_public_stream_returns_sse_events() -> None:
    _seed_index_sources()
    response = client.post("/api/v1/qa/stream", json={"question": "双选会如何报名？"})
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert "event: delta" in response.text
    assert "event: metadata" in response.text
    assert "\"evidence\"" in response.text
    assert "event: done" in response.text


def test_public_ask_enforces_rate_limit() -> None:
    _seed_index_sources()
    _reset_rate_limit_state()
    original_limit = public_qa.RATE_LIMIT_MAX_REQUESTS
    original_window = public_qa.RATE_LIMIT_WINDOW_SECONDS
    setattr(public_qa, "RATE_LIMIT_MAX_REQUESTS", 1)
    setattr(public_qa, "RATE_LIMIT_WINDOW_SECONDS", 60)

    try:
        first = client.post("/api/v1/qa/ask", json={"question": "双选会如何报名？"})
        second = client.post("/api/v1/qa/ask", json={"question": "双选会如何报名？"})
    finally:
        setattr(public_qa, "RATE_LIMIT_MAX_REQUESTS", original_limit)
        setattr(public_qa, "RATE_LIMIT_WINDOW_SECONDS", original_window)
        _reset_rate_limit_state()

    assert first.status_code == 200
    assert second.status_code == 429
    assert "请求过于频繁" in second.json()["detail"]


def test_public_ask_returns_504_when_answer_times_out() -> None:
    _seed_index_sources()

    async def slow_answer(_question: str) -> dict:
        await asyncio.sleep(0.06)
        return {
            "answer": "slow",
            "source_tags": [],
            "evidence": [],
            "used_official": False,
        }

    original_answer = retrieval_service.answer
    original_timeout = public_qa.ANSWER_TIMEOUT_SECONDS
    setattr(public_qa, "ANSWER_TIMEOUT_SECONDS", 0.01)
    retrieval_service.answer = slow_answer
    try:
        response = client.post("/api/v1/qa/ask", json={"question": "双选会如何报名？"})
    finally:
        retrieval_service.answer = original_answer
        setattr(public_qa, "ANSWER_TIMEOUT_SECONDS", original_timeout)

    assert response.status_code == 504
    assert "处理超时" in response.json()["detail"]


def test_request_id_is_propagated_for_ask_and_stream() -> None:
    _seed_index_sources()
    request_id = "qa-request-123"

    ask_response = client.post(
        "/api/v1/qa/ask",
        headers={"x-request-id": request_id},
        json={"question": "双选会如何报名？"},
    )
    stream_response = client.post(
        "/api/v1/qa/stream",
        headers={"x-request-id": request_id},
        json={"question": "双选会如何报名？"},
    )

    assert ask_response.status_code == 200
    assert stream_response.status_code == 200
    assert ask_response.headers.get("x-request-id") == request_id
    assert stream_response.headers.get("x-request-id") == request_id
