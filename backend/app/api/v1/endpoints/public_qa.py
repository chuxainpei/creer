from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.api.v1.schemas import AskRequest, AskResponse
from app.retrieval.service import retrieval_service


router = APIRouter(prefix="/qa", tags=["public-qa"])


@router.post("/ask", response_model=AskResponse)
async def ask_question(payload: AskRequest) -> AskResponse:
    result = await retrieval_service.answer(payload.question)
    return AskResponse(**result)


@router.post("/stream")
async def stream_question(payload: AskRequest) -> StreamingResponse:
    return StreamingResponse(
        retrieval_service.stream_answer(payload.question),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )
