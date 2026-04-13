from __future__ import annotations

import hashlib
import json
import math
import uuid
from pathlib import Path

from app.retrieval.models import RetrievalHit


EMBEDDING_SIZE = 192


def _normalized_text(text: str) -> str:
    lowered = text.lower()
    return " ".join(lowered.split())


def _token_stream(text: str) -> list[str]:
    compact = "".join(
        char for char in _normalized_text(text) if char.isalnum() or "\u4e00" <= char <= "\u9fff"
    )
    if not compact:
        return []

    bigrams = [compact[index : index + 2] for index in range(max(len(compact) - 1, 1))]
    words = [word for word in _normalized_text(text).split(" ") if word]
    return words + bigrams


def build_embedding(text: str) -> list[float]:
    vector = [0.0] * EMBEDDING_SIZE
    tokens = _token_stream(text)
    if not tokens:
        return vector

    for token in tokens:
        digest = hashlib.sha256(token.encode("utf-8")).digest()
        index = int.from_bytes(digest[:4], "big") % EMBEDDING_SIZE
        vector[index] += 1.0

    norm = math.sqrt(sum(value * value for value in vector)) or 1.0
    return [value / norm for value in vector]


def _cosine_similarity(left: list[float], right: list[float]) -> float:
    return sum(a * b for a, b in zip(left, right, strict=False))


class VectorStore:
    def __init__(self, persist_dir: Path, collection_name: str):
        self.persist_dir = persist_dir
        self.collection_name = collection_name
        self.persist_dir.mkdir(parents=True, exist_ok=True)
        self.snapshot_path = self.persist_dir / f"{collection_name}.json"
        self.records = self._load_records()

    def _load_records(self) -> list[dict]:
        if not self.snapshot_path.exists():
            return []
        return json.loads(self.snapshot_path.read_text(encoding="utf-8"))

    def _persist(self) -> None:
        self.snapshot_path.write_text(
            json.dumps(self.records, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    def reset(self) -> None:
        self.records = []
        self._persist()

    def replace(self, chunks: list[dict]) -> None:
        self.records = [
            {
                "id": str(uuid.uuid4()),
                "text": chunk["text"],
                "metadata": chunk["metadata"],
                "embedding": build_embedding(chunk["text"]),
            }
            for chunk in chunks
        ]
        self._persist()

    def query(self, question: str, n_results: int = 4) -> list[RetrievalHit]:
        if not self.records:
            return []

        query_embedding = build_embedding(question)
        ranked = sorted(
            self.records,
            key=lambda record: _cosine_similarity(query_embedding, record["embedding"]),
            reverse=True,
        )[:n_results]

        return [
            RetrievalHit(
                text=record["text"],
                metadata=record["metadata"],
                score=max(0.0, min(_cosine_similarity(query_embedding, record["embedding"]), 1.0)),
            )
            for record in ranked
        ]
