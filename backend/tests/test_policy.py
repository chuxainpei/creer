from app.retrieval.policy import resolve_context


def test_official_content_wins_on_conflict() -> None:
    result = resolve_context(
        official_hits=[{"text": "三方协议需在系统内提交", "score": 0.91}],
        graduate_hits=[{"text": "学长说可以线下交表", "score": 0.95}],
    )
    assert result["used_official"] is True
    assert "系统内提交" in result["context"]
    assert "线下交表" not in result["context"]


def test_graduate_reference_can_append_when_not_conflicting() -> None:
    result = resolve_context(
        official_hits=[{"text": "秋招时间见官网通知", "score": 0.88}],
        graduate_hits=[{"text": "计算机专业常见去向为互联网和制造业", "score": 0.86}],
    )
    assert result["used_official"] is True
    assert "官网通知" in result["context"]
    assert "常见去向" in result["context"]
