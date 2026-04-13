from __future__ import annotations

import asyncio
import json
import shutil
from datetime import datetime
from pathlib import Path

from app.config import (
    GRADUATE_COLLECTION,
    GRADUATE_UPLOADS_DIR,
    INDEX_STATUS_PATH,
    INDEX_DIR,
    OFFICIAL_COLLECTION,
    OFFICIAL_UPLOADS_DIR,
    STORAGE_DIR,
    ensure_storage_dirs,
)
from app.ingestion.graduate_parser import (
    SUPPORTED_GRADUATE_EXTENSIONS,
    build_graduate_chunks_from_file,
)
from app.ingestion.official_docs import (
    SUPPORTED_OFFICIAL_EXTENSIONS,
    build_official_chunks_from_file,
)
from app.retrieval.policy import resolve_context
from app.retrieval.store import VectorStore


def _summarize(texts: list[str], limit: int = 2) -> str:
    snippets = []
    for text in texts[:limit]:
        cleaned = " ".join(text.split())
        if cleaned:
            snippets.append(cleaned)
    return "；".join(snippets)


def _event(event: str, payload: dict) -> str:
    return f"event: {event}\ndata: {json.dumps(payload, ensure_ascii=False)}\n\n"


def _clean_snippet(text: str, limit: int = 120) -> str:
    compact = " ".join(text.split())
    if len(compact) <= limit:
        return compact
    return f"{compact[:limit].rstrip()}..."


class RetrievalService:
    def __init__(self) -> None:
        self._init_stores()

    def _init_stores(self) -> None:
        ensure_storage_dirs()
        self.official_store = VectorStore(INDEX_DIR, OFFICIAL_COLLECTION)
        self.graduate_store = VectorStore(INDEX_DIR, GRADUATE_COLLECTION)

    def reset_runtime(self) -> None:
        shutil.rmtree(STORAGE_DIR, ignore_errors=True)
        self._init_stores()

    def get_status(self) -> dict:
        if not INDEX_STATUS_PATH.exists():
            return {
                "official_files": 0,
                "graduate_files": 0,
                "official_chunks": 0,
                "graduate_chunks": 0,
                "last_reindexed": None,
                "skipped_files": [],
            }
        return json.loads(INDEX_STATUS_PATH.read_text(encoding="utf-8"))

    def rebuild_indexes(self) -> dict:
        ensure_storage_dirs()

        official_chunks: list[dict] = []
        graduate_chunks: list[dict] = []
        skipped_files: list[dict] = []

        official_files = sorted(
            path for path in OFFICIAL_UPLOADS_DIR.iterdir() if path.suffix.lower() in SUPPORTED_OFFICIAL_EXTENSIONS
        )
        graduate_files = sorted(
            path for path in GRADUATE_UPLOADS_DIR.iterdir() if path.suffix.lower() in SUPPORTED_GRADUATE_EXTENSIONS
        )

        for file_path in official_files:
            try:
                official_chunks.extend(build_official_chunks_from_file(file_path))
            except Exception as exc:
                skipped_files.append({"file": file_path.name, "reason": str(exc)})

        for file_path in graduate_files:
            try:
                graduate_chunks.extend(build_graduate_chunks_from_file(file_path))
            except Exception as exc:
                skipped_files.append({"file": file_path.name, "reason": str(exc)})

        self.official_store.replace(official_chunks)
        self.graduate_store.replace(graduate_chunks)

        status = {
            "official_files": len(official_files),
            "graduate_files": len(graduate_files),
            "official_chunks": len(official_chunks),
            "graduate_chunks": len(graduate_chunks),
            "last_reindexed": datetime.now().isoformat(timespec="seconds"),
            "skipped_files": skipped_files,
        }
        INDEX_STATUS_PATH.write_text(
            json.dumps(status, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        return status

    def _ensure_index_bootstrap(self) -> None:
        status = self.get_status()
        has_files = any(OFFICIAL_UPLOADS_DIR.iterdir()) or any(GRADUATE_UPLOADS_DIR.iterdir())
        if has_files and not status["last_reindexed"]:
            self.rebuild_indexes()

    def _build_source_tags(self, resolved: dict) -> list[dict]:
        tags: list[dict] = []
        if resolved["official_texts"]:
            tags.append({"label": "官方资料", "source_type": "official"})
        if resolved["graduate_texts"]:
            tags.append({"label": "经验参考", "source_type": "graduate_reference"})
        return tags

    def _compose_answer(self, resolved: dict) -> str:
        official_summary = _summarize(resolved["official_texts"])
        graduate_summary = _summarize(resolved["graduate_texts"], limit=1)

        if official_summary:
            parts = [f"根据学校就业中心当前收录的官方资料，{official_summary}。"]
            if graduate_summary:
                parts.append(f"补充参考：{graduate_summary}。这部分仅供参考，不替代官方要求。")
            return "\n\n".join(parts)

        if graduate_summary:
            return (
                f"当前没有检索到直接对应的官方资料，结合往届去向参考，{graduate_summary}。"
                "请以学校就业中心后续通知为准。"
            )

        return "暂未检索到匹配资料，请补充专业、业务名称或时间条件后再试。"

    def _build_evidence(self, resolved: dict, limit: int = 4) -> list[dict]:
        evidence: list[dict] = []
        seen: set[tuple[str, str, str]] = set()

        def append_evidence(hit: dict) -> None:
            metadata = hit.get("metadata", {}) if isinstance(hit, dict) else {}
            source_type = str(metadata.get("source_type") or "official")

            if source_type == "official":
                title = str(metadata.get("title") or "官方资料")
                channel = str(metadata.get("channel") or "").strip()
                source_name = f"{channel} · {title}" if channel else title
            else:
                year = metadata.get("year")
                major = str(metadata.get("major") or "").strip()
                institution = str(metadata.get("institution_company") or "").strip()
                parts = [part for part in [f"{year}届" if year else "", major, institution] if part]
                source_name = " / ".join(parts) if parts else "毕业去向数据"

            snippet = _clean_snippet(str(hit.get("text", "")))
            if not snippet:
                return

            signature = (source_type, source_name, snippet)
            if signature in seen:
                return
            seen.add(signature)

            evidence.append(
                {
                    "source_type": "official" if source_type == "official" else "graduate_reference",
                    "source_name": source_name,
                    "snippet": snippet,
                }
            )

        for hit in resolved.get("official_hits", []):
            append_evidence(hit)
            if len(evidence) >= limit:
                return evidence

        for hit in resolved.get("graduate_hits", []):
            append_evidence(hit)
            if len(evidence) >= limit:
                return evidence

        return evidence

    async def answer(self, question: str) -> dict:
        self._ensure_index_bootstrap()
        official_hits = [
            hit.model_dump()
            for hit in self.official_store.query(question=question, n_results=3)
        ]
        graduate_hits = [
            hit.model_dump()
            for hit in self.graduate_store.query(question=question, n_results=3)
        ]
        resolved = resolve_context(official_hits=official_hits, graduate_hits=graduate_hits)
        return {
            "answer": self._compose_answer(resolved),
            "source_tags": self._build_source_tags(resolved),
            "evidence": self._build_evidence(resolved),
            "used_official": resolved["used_official"],
        }

    async def stream_answer(self, question: str):
        result = await self.answer(question)
        answer = result["answer"]
        for index in range(0, len(answer), 18):
            chunk = answer[index : index + 18]
            yield _event("delta", {"text": chunk})
            await asyncio.sleep(0)

        yield _event(
            "metadata",
            {
                "source_tags": result["source_tags"],
                "evidence": result["evidence"],
                "used_official": result["used_official"],
            },
        )
        yield _event("done", {"answer": answer})


retrieval_service = RetrievalService()
