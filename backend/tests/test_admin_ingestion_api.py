from io import BytesIO

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_admin_login_works() -> None:
    response = client.post("/api/v1/admin/login", json={"token": "admin-dev-token"})
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True


def test_admin_upload_and_reindex_routes() -> None:
    headers = {"Authorization": "Bearer admin-dev-token"}

    official = client.post(
        "/api/v1/admin/upload/official",
        headers=headers,
        files={"file": ("notice.txt", BytesIO(b"official notice"), "text/plain")},
    )
    assert official.status_code == 200

    graduate = client.post(
        "/api/v1/admin/upload/graduate-data",
        headers=headers,
        files={"file": ("graduate.xlsx", BytesIO(b"fake-bytes"), "application/octet-stream")},
    )
    assert graduate.status_code == 200

    reindex = client.post("/api/v1/admin/reindex", headers=headers)
    assert reindex.status_code == 200
