## EVAL DEFINITION: contest-frontend-revamp

### Capability Evals
1. Landing page has stronger industrial visual hierarchy and still links into /qa.
2. QA page supports recommendation-oriented universal answers with structured sections.
3. Assistant responses display credibility metadata cards (demo-safe, no external links required).
4. Demo mode still returns deterministic answers for common school/job recommendation intents.

### Regression Evals
1. Existing frontend unit tests pass.
2. Next.js production build succeeds.
3. Creator-demo repo remains unchanged.

### Success Metrics
- pass@1 >= 75% on capability eval checks (manual + deterministic checks)
- pass^1 = 100% on regression evals
