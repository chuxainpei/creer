from __future__ import annotations

from pathlib import Path

from docx import Document
from pypdf import PdfReader


SUPPORTED_OFFICIAL_EXTENSIONS = {".txt", ".md", ".pdf", ".docx"}


def _read_plain_text(file_path: Path) -> str:
    return file_path.read_text(encoding="utf-8", errors="ignore")


def _read_docx(file_path: Path) -> str:
    document = Document(str(file_path))
    return "\n".join(
        paragraph.text.strip() for paragraph in document.paragraphs if paragraph.text.strip()
    )


def _read_pdf(file_path: Path) -> str:
    reader = PdfReader(str(file_path))
    return "\n".join((page.extract_text() or "").strip() for page in reader.pages)


def read_official_file(file_path: Path) -> str:
    suffix = file_path.suffix.lower()
    if suffix not in SUPPORTED_OFFICIAL_EXTENSIONS:
        raise ValueError(f"Unsupported official document format: {file_path.suffix}")

    if suffix in {".txt", ".md"}:
        return _read_plain_text(file_path)
    if suffix == ".docx":
        return _read_docx(file_path)
    return _read_pdf(file_path)


def infer_channel(file_name: str) -> str:
    normalized = file_name.lower()
    if any(keyword in normalized for keyword in ("通知", "公告", "notice")):
        return "官方通知"
    if any(keyword in normalized for keyword in ("指南", "流程", "办理", "guide")):
        return "办事指南"
    if any(keyword in normalized for keyword in ("招聘", "双选", "宣讲", "job")):
        return "招聘活动"
    return "官方资料"


def chunk_official_text(text: str, chunk_size: int = 400) -> list[str]:
    normalized = "\n".join(line.strip() for line in text.splitlines() if line.strip())
    if not normalized:
        return []

    chunks: list[str] = []
    start = 0
    while start < len(normalized):
        chunks.append(normalized[start : start + chunk_size])
        start += chunk_size
    return chunks


def build_official_chunks(text: str, title: str, channel: str) -> list[dict]:
    chunks = chunk_official_text(text)
    return [
        {
            "text": chunk,
            "metadata": {
                "source_type": "official",
                "title": title,
                "channel": channel,
            },
        }
        for chunk in chunks
    ]


def build_official_chunks_from_file(file_path: Path) -> list[dict]:
    title = file_path.stem
    text = read_official_file(file_path)
    return build_official_chunks(text=text, title=title, channel=infer_channel(file_path.name))
