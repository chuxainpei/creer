from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_public_ask_returns_answer_and_tags() -> None:
    response = client.post("/api/v1/qa/ask", json={"question": "双选会如何报名？"})
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "source_tags" in data
    assert isinstance(data["source_tags"], list)


def test_public_stream_returns_sse_events() -> None:
    response = client.post("/api/v1/qa/stream", json={"question": "双选会如何报名？"})
    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/event-stream")
    assert "event: delta" in response.text
    assert "event: metadata" in response.text
    assert "event: done" in response.text
