from app.api.v1.schemas import AskRequest, AskResponse, SourceTag


def test_ask_request_accepts_public_question() -> None:
    req = AskRequest(question="双选会怎么参加？")
    assert req.question == "双选会怎么参加？"


def test_source_tag_requires_known_type() -> None:
    tag = SourceTag(label="官方通知", source_type="official")
    assert tag.source_type == "official"


def test_ask_response_contains_summary_tags() -> None:
    res = AskResponse(
        answer="请先登录就业系统报名。",
        source_tags=[SourceTag(label="官方通知", source_type="official")],
    )
    assert res.source_tags[0].label == "官方通知"
