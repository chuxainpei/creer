# Employment QA MVP

Student-facing employment Q&A web app for the school employment center.

Core constraints:
- independent deployment first
- homepage entry module + dedicated Q&A page
- official materials and graduate destination data both supported
- official information overrides graduate-data references on conflict
- concise source tags in answers

Base decisions:
- frontend: Next.js app with composable AI chat UI patterns
- backend: FastAPI service with explicit retrieval-policy layer
- no reuse of archived frontend page files except for copy reference

Deployment notes:
- independent deployment comes first; homepage integration starts as an external link
- future iframe/embed support is controlled by CSP `frame-ancestors` in `frontend/next.config.js`
- use `SCHOOL_DOMAIN` to tighten embed policy when the exact campus domain is known
- detailed topology and runbook: `docs/deployment.md`
