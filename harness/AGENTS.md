# AGENTS.md - Employment QA MVP Rebuild v2 Harness

Context:
- active implementation branch: `v2-rebuild`
- active isolated worktree: `/Users/bran/.config/superpowers/worktrees/employment-qa-mvp/v2-rebuild`
- reference UI donor: `/Users/bran/chat/reference-repos/vercel-chatbot`

Session workflow:
1. Read `README.md`
2. Read `docs/reference-audit.md`
3. Read `harness/task.json`
4. Read `harness/feature_list.json`
5. Read `harness/progress.txt`
6. Pick the highest-priority feature where `passes` is `false`
7. Execute and verify
8. Append progress and keep branch state clean

Non-negotiable rules:
- official content precedence wins whenever evidence conflicts
- public UX quality matters as much as API correctness
- do not reintroduce auth/database complexity from the reference repo
- do not claim completion without command-based verification
- if remote push is blocked, record the blocker instead of pretending delivery is finished
