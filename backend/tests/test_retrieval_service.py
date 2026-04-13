import asyncio

from app.config import GRADUATE_UPLOADS_DIR, OFFICIAL_UPLOADS_DIR, ensure_storage_dirs
from app.retrieval.service import retrieval_service


def test_rebuild_indexes_and_answer_use_real_uploaded_sources() -> None:
    retrieval_service.reset_runtime()
    ensure_storage_dirs()

    OFFICIAL_UPLOADS_DIR.joinpath("三方协议通知.txt").write_text(
        "三方协议需在学校就业系统内提交，审核进度以官网通知为准。",
        encoding="utf-8",
    )
    GRADUATE_UPLOADS_DIR.joinpath("graduate.csv").write_text(
        "major,year,destination_type,institution_company,salary_range\n"
        "计算机科学与技术,2025,就业,某科技公司,15k-20k\n",
        encoding="utf-8",
    )

    status = retrieval_service.rebuild_indexes()
    assert status["official_chunks"] > 0
    assert status["graduate_chunks"] > 0

    result = asyncio.run(retrieval_service.answer("三方协议应该怎么提交？"))
    assert result["used_official"] is True
    assert "系统内提交" in result["answer"]
    assert any(tag["source_type"] == "official" for tag in result["source_tags"])


def test_rebuild_indexes_records_invalid_graduate_file_as_skipped() -> None:
    retrieval_service.reset_runtime()
    ensure_storage_dirs()

    OFFICIAL_UPLOADS_DIR.joinpath("就业通知.txt").write_text(
        "请关注学校就业系统的最新公告。",
        encoding="utf-8",
    )
    GRADUATE_UPLOADS_DIR.joinpath("invalid.csv").write_text(
        "major,year\n计算机科学与技术,2025\n",
        encoding="utf-8",
    )

    status = retrieval_service.rebuild_indexes()
    assert status["official_chunks"] > 0
    assert status["graduate_chunks"] == 0
    assert status["skipped_files"]
    assert status["skipped_files"][0]["file"] == "invalid.csv"
