from io import BytesIO

from fastapi.testclient import TestClient

from app.main import app
from app.retrieval.service import retrieval_service


client = TestClient(app)


def test_admin_login_works() -> None:
    response = client.post("/api/v1/admin/login", json={"token": "admin-dev-token"})
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True


def test_admin_upload_and_reindex_routes() -> None:
    retrieval_service.reset_runtime()
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
        files={
            "file": (
                "graduate.csv",
                BytesIO(
                    (
                        "major,year,destination_type,institution_company,salary_range\n"
                        "计算机科学与技术,2025,就业,某科技公司,15k-20k\n"
                    ).encode("utf-8")
                ),
                "text/csv",
            )
        },
    )
    assert graduate.status_code == 200

    reindex = client.post("/api/v1/admin/reindex", headers=headers)
    assert reindex.status_code == 200
    reindex_data = reindex.json()
    assert reindex_data["official_chunks"] > 0
    assert reindex_data["graduate_chunks"] > 0

    status = client.get("/api/v1/admin/status", headers=headers)
    assert status.status_code == 200
    assert status.json()["ok"] is True
