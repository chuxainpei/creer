from fastapi import APIRouter

from app.api.v1.schemas import AskRequest, AskResponse
from app.retrieval.service import retrieval_service


router = APIRouter(prefix="/qa", tags=["public-qa"])


@router.post("/ask", response_model=AskResponse)
async def ask_question(payload: AskRequest) -> AskResponse:
    result = await retrieval_service.answer(payload.question)
    return AskResponse(**result)
