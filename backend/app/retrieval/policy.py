from __future__ import annotations


def _is_conflicting(official_text: str, graduate_text: str) -> bool:
    pairs = [
        ("系统内", "线下"),
        ("线上", "线下"),
        ("官网", "学长说"),
    ]
    return any(a in official_text and b in graduate_text for a, b in pairs)


def resolve_context(official_hits: list[dict], graduate_hits: list[dict]) -> dict:
    official_texts = [hit["text"] for hit in official_hits if hit.get("text")]
    graduate_texts = [hit["text"] for hit in graduate_hits if hit.get("text")]

    context_parts: list[str] = []

    if official_texts:
        context_parts.append("官方信息:\n" + "\n".join(official_texts))

        non_conflicting = []
        for g_text in graduate_texts:
            if not any(_is_conflicting(o_text, g_text) for o_text in official_texts):
                non_conflicting.append(g_text)

        if non_conflicting:
            context_parts.append(
                "经验参考（仅供参考，不可替代官方口径）:\n" + "\n".join(non_conflicting)
            )
    elif graduate_texts:
        context_parts.append("经验参考:\n" + "\n".join(graduate_texts))

    return {
        "context": "\n\n".join(context_parts),
        "used_official": bool(official_texts),
    }
