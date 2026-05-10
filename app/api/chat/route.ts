import { NextRequest } from "next/server";
import { modeDefinitions } from "@/lib/chat-content";
import { getDemoReply, chunkDemoReply } from "@/lib/demo-replies";
import type { ChatMode } from "@/lib/types";

// ── Message types for the chat API ──
interface ChatMessage {
  id?: string;
  role: "user" | "assistant" | "system";
  parts?: Array<{ type: string; text: string }>;
  content?: string;
}

interface ChatRequest {
  mode: string;
  messages: ChatMessage[];
}

// ── Convert internal message format to DeepSeek API format ──
function toDeepSeekMessages(
  messages: ChatMessage[],
  systemPrompt: string
): Array<{ role: string; content: string }> {
  const result: Array<{ role: string; content: string }> = [
    { role: "system", content: systemPrompt },
  ];

  for (const msg of messages) {
    // Handle both { role, content } and { role, parts: [{ text }] } formats
    let content = "";
    if (msg.content) {
      content = msg.content;
    } else if (msg.parts && Array.isArray(msg.parts)) {
      content = msg.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("\n");
    }

    if (content && (msg.role === "user" || msg.role === "assistant")) {
      result.push({ role: msg.role, content });
    }
  }

  return result;
}

// ── Stream from DeepSeek API ──
async function* streamFromDeepSeek(
  messages: ChatMessage[],
  systemPrompt: string
): AsyncGenerator<string> {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  const baseUrl = process.env.AI_GATEWAY_BASE_URL || "https://api.deepseek.com";
  const model = process.env.AI_MODEL || "deepseek-chat";

  if (!apiKey) {
    throw new Error("AI_GATEWAY_API_KEY not configured");
  }

  const deepseekMessages = toDeepSeekMessages(messages, systemPrompt);

  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: deepseekMessages,
      stream: true,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("DeepSeek API error:", response.status, errorText);
    throw new Error(`API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed === "data: [DONE]") continue;
      if (!trimmed.startsWith("data: ")) continue;

      try {
        const json = JSON.parse(trimmed.slice(6));
        const content = json.choices?.[0]?.delta?.content;
        if (content) yield content;
      } catch {
        // Skip unparseable chunks
      }
    }
  }
}

// ── Stream demo reply character-by-character with natural pacing ──
async function* streamDemo(mode: ChatMode): AsyncGenerator<string> {
  const reply = getDemoReply(mode);
  const chunks = chunkDemoReply(reply);

  for (const chunk of chunks) {
    yield chunk;
    // Vary delay: shorter for english/punctuation, longer for chinese characters
    const delay = chunk.length <= 2 ? 15 : 25 + Math.random() * 20;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

// ── POST /api/chat ──
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body: ChatRequest = await request.json();

    if (!body.mode || !["postgraduate", "employment"].includes(body.mode)) {
      return new Response(
        JSON.stringify({ error: 'Invalid mode. Must be "postgraduate" or "employment".' }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!body.messages || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const mode = body.mode as ChatMode;
    const config = modeDefinitions[mode];
    const systemPrompt = config.systemPrompt;

    // Check if we should use real AI or demo
    const hasKey = !!process.env.AI_GATEWAY_API_KEY;

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (hasKey) {
            // Real AI streaming
            for await (const chunk of streamFromDeepSeek(body.messages, systemPrompt)) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: "chunk", content: chunk })}\n\n`)
              );
            }
          } else {
            // Demo streaming
            for await (const chunk of streamDemo(mode)) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ type: "chunk", content: chunk })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          // Don't expose internal errors to client
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", content: "处理请求时出现错误，请稍后重试。" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ error: "Invalid request format." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
