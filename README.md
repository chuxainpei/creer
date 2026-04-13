# Employment QA MVP Rebuild v2

Student-facing employment Q&A product for a school employment center.

This branch rebuilds the earlier MVP around a stronger product shell:
- homepage trust framing and clear CTA into `/qa`
- real multi-message chat with streaming answers and concise source tags
- lightweight `/admin` console for uploads, reindexing, and status checks
- official materials and graduate destination data in one retrieval flow
- absolute official-first behavior when evidence conflicts

## Launch Readiness

Release baseline is now complete for `F1-F8` launch tasks:
- public/admin boundary hardening (`/admin` route gate + hidden public entry)
- ingestion governance (format validation, duplicate replacement, structured errors)
- explainability (answer-level source evidence with snippet + source name)
- reliability guardrails (rate limit, timeout, frontend retry/backoff)
- observability (request-id middleware + structured operation logs)
- CI/deploy baseline (GitHub Actions + hardened Nginx proxy config)
- launch UX completion (service notice, usage guide, FAQ/help, support blocks)
- release evidence package (full verification + refreshed screenshots)

## Architecture

- `frontend/`: Next.js 14 + TypeScript + Tailwind CSS + shadcn-style UI primitives
- `backend/`: FastAPI + Pydantic + file-backed retrieval service
- `backend/app/ingestion/official_docs.py`: parses `PDF`, `DOCX`, `TXT`, `MD`
- `backend/app/ingestion/graduate_parser.py`: parses `CSV`, `XLSX`
- `backend/app/retrieval/policy.py`: enforces official-first resolution
- `backend/app/retrieval/store.py`: local persisted vector-like index for MVP reliability

The UI direction is intentionally based on `vercel/chatbot` patterns, but adapted for a school employment-center product instead of importing its auth, database, or multi-user chat stack. The transplant notes live in [docs/reference-audit.md](docs/reference-audit.md).

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

## Release Artifacts

- latest screenshots:
  - `docs/screenshots/home.png`
  - `docs/screenshots/qa.png`
  - `docs/screenshots/admin.png`
- CI workflow: `.github/workflows/ci.yml`
- deployment hardening notes: `docs/deployment.md`

## Deployment Notes

- independent deployment comes first; the school homepage links into this product
- future iframe/embed support is controlled by `frame-ancestors` in `frontend/next.config.js`
- full topology and ops notes live in [docs/deployment.md](docs/deployment.md)

## Known Limitations (v1)

- no student account system and no cross-session history
- admin relies on token gate + token login (no RBAC)
- source ingestion is file-upload based only (no URL crawling / pasted-rich-text pipeline)
