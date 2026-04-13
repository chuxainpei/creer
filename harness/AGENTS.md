# AGENTS.md - Employment QA MVP Harness

Session workflow:
- restore context from harness files first
- work one feature at a time
- verify before marking complete
- keep frontend quality at MVP-demo level, not admin-tool level
- treat official-content precedence as a non-negotiable product rule

Execution order:
1. Read `harness/task.json`
2. Read `harness/feature_list.json`
3. Read `harness/progress.txt`
4. Pick highest-priority feature where `passes` is `false`
5. Execute and verify
6. Update status and append progress

Hard rules:
- Only change `passes` from `false` to `true` in `harness/feature_list.json` during execution sessions.
- Do not reorder or rewrite feature definitions.
- Commit each completed feature separately.
- Push after each feature commit.
- If blocked, write blocker details in `harness/progress.txt` and stop.
