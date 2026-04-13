# Deployment Guide

## Topology

- Deploy as an independent site first (recommended subdomain: `employment-qa.school.edu.cn`).
- Frontend (`Next.js`) serves public pages (`/`, `/qa`, `/admin`).
- Backend (`FastAPI`) serves API routes under `/api/v1/*`.
- Nginx (optional) proxies web traffic to frontend/backend as defined in `deploy/nginx.conf`.
- Uploaded files and generated indexes live under backend storage and can be relocated with `EMPLOYMENT_QA_STORAGE_DIR`.

## Homepage Integration Path

- Add a prominent link or card on the school employment center homepage that points to the independent deployment URL.
- Suggested entry wording: `就业中心智能问答（测试版）`.

## Future Embed Path

- Keep independent deployment as the source of truth.
- For future iframe embed into a campus portal, tighten `frame-ancestors` in `frontend/next.config.js` with `SCHOOL_DOMAIN`.
- Default policy is conservative for education domains:
  - `frame-ancestors 'self' https://*.edu.cn`

## Required Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: public frontend pointer to the backend API, such as `https://employment-qa.school.edu.cn/api`.
- `ADMIN_TOKEN`: admin upload/reindex authentication token (backend).
- `EMPLOYMENT_QA_STORAGE_DIR`: optional storage path for uploaded files and built indexes.
- `FRONTEND_ORIGINS`: comma-separated CORS allowlist for frontend hosts.
- `SCHOOL_DOMAIN`: optional exact campus domain used for stricter embed CSP (frontend), such as `career.example.edu.cn`.

## Deployment Checklist

1. Install frontend and backend dependencies.
2. Run backend tests: `cd backend && . .venv/bin/activate && pytest -q`.
3. Run frontend tests and build: `cd frontend && npm test -- --runInBand && npm run build`.
4. Validate compose config: `docker compose config`.
5. Deploy and smoke-test `/`, `/qa`, `/admin`, `/api/v1/qa/ask`, and `/api/v1/qa/stream`.
