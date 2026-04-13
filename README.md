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
