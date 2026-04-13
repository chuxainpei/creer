from app.retrieval.policy import resolve_context


class RetrievalService:
    async def answer(self, question: str) -> dict:
        official_hits = [{"text": f"官方答复：{question}", "score": 0.9}]
        graduate_hits: list[dict] = []

        resolved = resolve_context(official_hits=official_hits, graduate_hits=graduate_hits)
        return {
            "answer": resolved["context"] or "当前没有可用参考信息。",
            "source_tags": [
                {
                    "label": "官方通知" if resolved["used_official"] else "往届去向参考",
                    "source_type": "official" if resolved["used_official"] else "graduate_reference",
                }
            ],
            "used_official": resolved["used_official"],
        }


retrieval_service = RetrievalService()
