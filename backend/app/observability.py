from __future__ import annotations

import contextvars
import json
import logging
import uuid

_request_id_ctx: contextvars.ContextVar[str] = contextvars.ContextVar(
    "request_id",
    default="-",
)

logger = logging.getLogger("employment_qa")


def create_request_id() -> str:
    return f"req-{uuid.uuid4().hex[:12]}"


def set_request_id(request_id: str) -> contextvars.Token[str]:
    return _request_id_ctx.set(request_id)


def reset_request_id(token: contextvars.Token[str]) -> None:
    _request_id_ctx.reset(token)


def get_request_id() -> str:
    return _request_id_ctx.get()


def log_operation(event: str, **fields: object) -> None:
    payload = {"event": event, "request_id": get_request_id(), **fields}
    logger.info(json.dumps(payload, ensure_ascii=False))
