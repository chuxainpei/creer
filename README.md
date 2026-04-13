# Employment QA MVP Rebuild v2

Student-facing employment Q&A product for a school employment center.

This branch rebuilds the earlier MVP around a stronger product shell:
- homepage trust framing and clear CTA into `/qa`
- real multi-message chat with streaming answers and concise source tags
- lightweight `/admin` console for uploads, reindexing, and status checks
- official materials and graduate destination data in one retrieval flow
- absolute official-first behavior when evidence conflicts

## Architecture

- `frontend/`: Next.js 14 + TypeScript + Tailwind CSS + shadcn-style UI primitives
- `backend/`: FastAPI + Pydantic + file-backed retrieval service
- `backend/app/ingestion/official_docs.py`: parses `PDF`, `DOCX`, `TXT`, `MD`
- `backend/app/ingestion/graduate_parser.py`: parses `CSV`, `XLSX`
- `backend/app/retrieval/policy.py`: enforces official-first resolution
- `backend/app/retrieval/store.py`: local persisted vector-like index for MVP reliability

The UI direction is intentionally based on `vercel/chatbot` patterns, but adapted for a school employment-center product instead of importing its auth, database, or multi-user chat stack. The transplant notes live in [docs/reference-audit.md](/Users/bran/.config/superpowers/worktrees/employment-qa-mvp/v2-rebuild/docs/reference-audit.md).

## Public Product Scope

- `/`: homepage entry with trust framing and recommended employment topics
- `/qa`: streaming chat, starter prompts, source labels, retry/error handling
- `/admin`: token login, official file upload, graduate data upload, reindex, status cards

Student login, cross-session history, and multi-model switching are intentionally out of scope for v1.

## Local Development

### Backend

```bash
cd backend
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend defaults to `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000 npm run dev
```

Frontend defaults to `http://127.0.0.1:3000`.

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: frontend API origin
- `ADMIN_TOKEN`: backend admin token, default `admin-dev-token`
- `EMPLOYMENT_QA_STORAGE_DIR`: optional override for uploaded files and built indexes
- `FRONTEND_ORIGINS`: comma-separated allowed CORS origins for the backend
- `SCHOOL_DOMAIN`: optional exact campus domain for stricter embed CSP in the frontend

## Verification Commands

```bash
cd backend && . .venv/bin/activate && pytest -q
cd frontend && npm test -- --runInBand
cd frontend && npm run build
docker compose config
```

## Deployment Notes

- independent deployment comes first; the school homepage links into this product
- future iframe/embed support is controlled by `frame-ancestors` in `frontend/next.config.js`
- full topology and ops notes live in [docs/deployment.md](/Users/bran/.config/superpowers/worktrees/employment-qa-mvp/v2-rebuild/docs/deployment.md)
