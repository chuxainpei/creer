// ── Shared types used across components ──

/** Planning mode identifier */
export type ChatMode = "postgraduate" | "employment";

/** A single chat message */
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

/** Server-Sent Events chunk from /api/chat */
export interface SSEChunk {
  type: "chunk" | "done" | "error";
  content?: string;
}

/** Accent color variants */
export type AccentColor = "navy" | "amber";
