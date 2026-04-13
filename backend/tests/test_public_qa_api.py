from fastapi.testclient import TestClient

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
