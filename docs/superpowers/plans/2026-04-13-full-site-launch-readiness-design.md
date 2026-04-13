# Full Site Launch Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the current MVP into a production-ready, school-deployable website with secure operations, stable ingestion, and complete launch safeguards.

**Architecture:** Keep the existing `Next.js + FastAPI` split, preserve official-first retrieval policy, and add missing production layers around authentication hardening, content governance, reliability, observability, and deployment controls. Execution is incremental so each task can be deployed independently.

**Tech Stack:** Next.js 14, FastAPI, pytest, Jest, Playwright, Docker Compose, Nginx/CSP controls, structured logging.

---

### Task 1: Public/Admin Access Boundary Hardening

**Files:**
- Modify: `frontend/src/components/layout/SiteHeader.tsx`
- Modify: `frontend/app/admin/page.tsx`
- Modify: `frontend/middleware.ts` (create if missing)
- Test: `frontend/__tests__/site-header.test.tsx`

- [ ] **Step 1: Write failing tests for no public admin exposure and protected admin route**
```tsx
// add one test: header does not contain admin link
// add one test: admin route requires token/session gate in UI behavior
```

- [ ] **Step 2: Run tests to verify failures**
Run: `cd frontend && npm test -- --runInBand __tests__/site-header.test.tsx`
Expected: FAIL before guard logic is complete.

- [ ] **Step 3: Implement minimal protection**
```ts
// middleware.ts: restrict /admin direct access unless required cookie/query token exists
// keep route alive for staff operations, but non-staff users are redirected
```

- [ ] **Step 4: Re-run tests**
Run: `cd frontend && npm test -- --runInBand __tests__/site-header.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add frontend/src/components/layout/SiteHeader.tsx frontend/app/admin/page.tsx frontend/middleware.ts frontend/__tests__/site-header.test.tsx
git commit -m "feat: harden public and admin access boundary"
```

### Task 2: Ingestion Quality Gate and File Governance

**Files:**
- Modify: `backend/app/api/v1/endpoints/admin_ingestion.py`
- Modify: `backend/app/ingestion/official_docs.py`
- Modify: `backend/app/ingestion/graduate_parser.py`
- Test: `backend/tests/test_admin_ingestion_api.py`
- Test: `backend/tests/test_retrieval_service.py`

- [ ] **Step 1: Write failing tests for bad files, duplicates, and oversized uploads**
```py
def test_rejects_unsupported_official_file_type(): ...
def test_rejects_empty_graduate_data_file(): ...
def test_duplicate_file_replacement_updates_status(): ...
```

- [ ] **Step 2: Run tests to verify failures**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_admin_ingestion_api.py -q`
Expected: FAIL with missing validation behavior.

- [ ] **Step 3: Implement validation and governance**
```py
# enforce file type/size/content checks
# normalize duplicate file strategy (replace with audit metadata)
# return structured error messages for admin UI
```

- [ ] **Step 4: Re-run tests**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_admin_ingestion_api.py tests/test_retrieval_service.py -q`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add backend/app/api/v1/endpoints/admin_ingestion.py backend/app/ingestion/official_docs.py backend/app/ingestion/graduate_parser.py backend/tests/test_admin_ingestion_api.py backend/tests/test_retrieval_service.py
git commit -m "feat: add ingestion quality gate and file governance"
```

### Task 3: Source Traceability and Explainability Upgrade

**Files:**
- Modify: `backend/app/retrieval/service.py`
- Modify: `backend/app/api/v1/schemas.py`
- Modify: `frontend/src/lib/types.ts`
- Modify: `frontend/src/components/qa/ChatShell.tsx`
- Modify: `frontend/src/components/qa/SourceTags.tsx`
- Test: `backend/tests/test_public_qa_api.py`
- Test: `frontend/__tests__/chat-shell.test.tsx`

- [ ] **Step 1: Write failing tests for source evidence payload**
```py
def test_ask_response_contains_source_evidence_fields(): ...
```
```tsx
test('renders source evidence snippet when provided', async () => { ... })
```

- [ ] **Step 2: Run tests to verify failures**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_public_qa_api.py -q`
Expected: FAIL due missing evidence fields.

- [ ] **Step 3: Implement minimal explainability contract**
```py
# add evidence list: source label + file name + snippet + timestamp
```
```tsx
// render collapsible evidence block below source tags
```

- [ ] **Step 4: Re-run tests**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_public_qa_api.py -q && cd ../frontend && npm test -- --runInBand __tests__/chat-shell.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add backend/app/retrieval/service.py backend/app/api/v1/schemas.py frontend/src/lib/types.ts frontend/src/components/qa/ChatShell.tsx frontend/src/components/qa/SourceTags.tsx backend/tests/test_public_qa_api.py frontend/__tests__/chat-shell.test.tsx
git commit -m "feat: add source evidence traceability in qa responses"
```

### Task 4: Reliability Layer (Rate Limit, Retry, Timeout)

**Files:**
- Modify: `backend/app/main.py`
- Modify: `backend/app/api/v1/endpoints/public_qa.py`
- Modify: `frontend/src/lib/api.ts`
- Test: `backend/tests/test_public_qa_api.py`

- [ ] **Step 1: Write failing tests for request throttling and timeout behavior**
```py
def test_qa_rate_limit_returns_429(): ...
def test_stream_timeout_returns_graceful_error(): ...
```

- [ ] **Step 2: Run tests to verify failures**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_public_qa_api.py -q`
Expected: FAIL because safeguards are missing.

- [ ] **Step 3: Implement reliability controls**
```py
# add lightweight in-memory per-ip throttle
# add timeout wrapper for stream answer generation
```
```ts
// add frontend retry/backoff for transient 5xx and timeout messages
```

- [ ] **Step 4: Re-run tests**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_public_qa_api.py -q`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add backend/app/main.py backend/app/api/v1/endpoints/public_qa.py frontend/src/lib/api.ts backend/tests/test_public_qa_api.py
git commit -m "feat: add qa reliability safeguards"
```

### Task 5: Observability and Audit Logs

**Files:**
- Create: `backend/app/observability/logging.py`
- Modify: `backend/app/main.py`
- Modify: `backend/app/api/v1/endpoints/public_qa.py`
- Modify: `backend/app/api/v1/endpoints/admin_ingestion.py`
- Create: `docs/operations.md`
- Test: `backend/tests/test_public_qa_api.py`

- [ ] **Step 1: Write failing tests for structured request ids**
```py
def test_ask_response_contains_request_id_header(): ...
```

- [ ] **Step 2: Run tests to verify failures**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_public_qa_api.py -q`
Expected: FAIL because request id is absent.

- [ ] **Step 3: Implement minimal observability**
```py
# middleware injects request_id
# structured logs for ask/stream/upload/reindex actions
```

- [ ] **Step 4: Re-run tests**
Run: `cd backend && . .venv/bin/activate && pytest tests/test_public_qa_api.py -q`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add backend/app/observability/logging.py backend/app/main.py backend/app/api/v1/endpoints/public_qa.py backend/app/api/v1/endpoints/admin_ingestion.py docs/operations.md backend/tests/test_public_qa_api.py
git commit -m "feat: add observability and audit logging"
```

### Task 6: Production Deployment Completeness

**Files:**
- Modify: `docker-compose.yml`
- Modify: `deploy/nginx.conf`
- Create: `.github/workflows/ci.yml`
- Modify: `docs/deployment.md`

- [ ] **Step 1: Add failing CI workflow baseline**
```yaml
# define jobs: backend tests, frontend tests, frontend build, compose config
```

- [ ] **Step 2: Run workflow-equivalent commands locally**
Run: `cd backend && . .venv/bin/activate && pytest -q && cd ../frontend && npm test -- --runInBand && npm run build && cd .. && docker compose config`
Expected: all pass.

- [ ] **Step 3: Implement production deployment hardening**
```nginx
# tighten security headers, gzip, cache policy
```
```yaml
# CI on push/pr with fail-fast
```

- [ ] **Step 4: Re-run local verification**
Run: same command as Step 2
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add docker-compose.yml deploy/nginx.conf .github/workflows/ci.yml docs/deployment.md
git commit -m "chore: complete production deployment and ci pipeline"
```

### Task 7: Launch UX and Content Completeness

**Files:**
- Modify: `frontend/app/page.tsx`
- Modify: `frontend/src/components/home/EntryModule.tsx`
- Modify: `frontend/app/qa/page.tsx`
- Create: `frontend/app/notice/page.tsx`
- Test: `frontend/__tests__/home-page.test.tsx`

- [ ] **Step 1: Write failing tests for launch-level content sections**
```tsx
test('homepage includes service notice and user guidance sections', () => { ... })
```

- [ ] **Step 2: Run tests to verify failures**
Run: `cd frontend && npm test -- --runInBand __tests__/home-page.test.tsx`
Expected: FAIL for missing launch sections.

- [ ] **Step 3: Implement launch UX additions**
```tsx
// add service notice, usage guide, faq entry, and help/contact block
```

- [ ] **Step 4: Re-run tests**
Run: `cd frontend && npm test -- --runInBand __tests__/home-page.test.tsx && npm run build`
Expected: PASS

- [ ] **Step 5: Commit**
```bash
git add frontend/app/page.tsx frontend/src/components/home/EntryModule.tsx frontend/app/qa/page.tsx frontend/app/notice/page.tsx frontend/__tests__/home-page.test.tsx
git commit -m "feat: complete launch ux and guidance content"
```

### Task 8: End-to-End Launch Validation and Handoff

**Files:**
- Modify: `harness/task.json`
- Modify: `harness/feature_list.json`
- Modify: `harness/progress.txt`
- Modify: `README.md`

- [ ] **Step 1: Add Playwright smoke spec (if missing)**
```ts
// cover /, /qa, /admin with one streaming path and one admin upload path
```

- [ ] **Step 2: Run full validation**
Run: `cd backend && . .venv/bin/activate && pytest -q && cd ../frontend && npm test -- --runInBand && npm run build`
Expected: PASS

- [ ] **Step 3: Capture release evidence**
Run: capture fresh screenshots and append result summary to `harness/progress.txt`
Expected: new dated release entry.

- [ ] **Step 4: Finalize docs and harness state**
```md
# README: launch status, operation notes, known limitations
```

- [ ] **Step 5: Commit and push**
```bash
git add README.md harness/task.json harness/feature_list.json harness/progress.txt
git commit -m "chore: finalize launch readiness handoff"
git push
```
