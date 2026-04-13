from __future__ import annotations


def chunk_official_text(text: str, chunk_size: int = 400) -> list[str]:
    normalized = " ".join(text.split())
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
