# UI Reference Audit

Reference clones:
- `/Users/bran/chat/reference-repos/vercel-chatbot`
- `/Users/bran/chat/reference-repos/chatbot-ui`
- `/Users/bran/chat/reference-repos/vercel-ai-chatbot-supabase`
- `/Users/bran/chat/reference-repos/creer` (empty repository as of 2026-04-13)

Why these were used:
- the project needed a real AI-product visual baseline instead of a hand-built form page
- `vercel/chatbot` has strong patterns for app shell rhythm, chat composition, empty states, loading states, and dashboard-like cards
- `chatbot-ui` provides stronger multi-message bubble spacing and interaction hierarchy for dense chat pages
- `vercel-ai-chatbot-supabase` provides practical shadcn/tailwind layout patterns and chat panel structure
- the product still needed to stay school-specific and backend-independent, so only the visual and interaction logic was transplanted

## Transplanted Ideas

- app-shell spacing and header rhythm
- large chat surface with a dedicated composer area
- empty-state framing and starter prompt cards
- streaming-oriented answer rendering
- clean badge/card language for metadata and status
- polished admin-console layout patterns instead of raw forms
- higher contrast conversational bubbles and clearer user/assistant identity
- more layered hero composition and visual depth on public pages

## Deliberately Discarded

- Auth.js user accounts
- Postgres and chat-history persistence
- Vercel AI SDK route handlers
- Supabase auth/storage coupling
- model switching and personal conversation history
- any product copy that implies a general-purpose AI assistant
- public navigation entry to admin console

## Repo-Specific Adaptations

- public answer labels are limited to `官方资料` and `经验参考`
- official-first conflict handling is enforced in the FastAPI retrieval layer, not in the frontend
- `/admin` remains token-based and lightweight so the school can adopt it gradually, but the public header no longer exposes an admin link
- visual direction stays light, institutional, and trust-first instead of consumer-chat branding
