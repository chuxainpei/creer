"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modeDefinitions } from "@/lib/chat-content";
import type { ChatMode, Message, SSEChunk } from "@/lib/types";
import ChatMessage from "./chat-message";
import ChatComposer from "./chat-composer";
import ModeSwitcher from "./mode-switcher";
import QuickPrompts from "./quick-prompts";

export default function ChatWorkspace({ initialMode }: { initialMode?: ChatMode }) {
  const [mode, setMode] = useState<ChatMode>(initialMode || "postgraduate");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const config = modeDefinitions[mode];

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Switch mode — clear conversation
  const handleModeSwitch = useCallback((newMode: ChatMode) => {
    if (isStreaming) {
      abortRef.current?.abort();
      setIsStreaming(false);
      setStreamingId(null);
    }
    setMode(newMode);
    setMessages([]);
  }, [isStreaming]);

  // Send a message — captures current messages via callback ref pattern
  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const handleSend = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return;

    const currentMessages = messagesRef.current;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
    };

    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "",
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsStreaming(true);
    setStreamingId(assistantMsg.id);

    const controller = new AbortController();
    abortRef.current = controller;

    // Throttle: batch SSE chunks at ~30fps for performance
    let pendingContent = "";
    let lastFlush = 0;
    const THROTTLE_MS = 50;

    function flushContent() {
      if (!pendingContent) return;
      const c = pendingContent;
      pendingContent = "";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id ? { ...m, content: m.content + c } : m
        )
      );
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          messages: currentMessages.map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
          })),
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Request failed");

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
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          try {
            const data: SSEChunk = JSON.parse(trimmed.slice(6));

            if (data.type === "chunk" && data.content) {
              pendingContent += data.content;
              const now = Date.now();
              if (now - lastFlush >= THROTTLE_MS) {
                flushContent();
                lastFlush = now;
              }
            } else if (data.type === "error") {
              pendingContent = data.content || "处理出错，请重试。";
              flushContent();
            }
          } catch {
            // Skip unparseable lines
          }
        }
      }

      // Final flush
      flushContent();

      // Mark as complete
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, isStreaming: false }
            : m
        )
      );
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        flushContent();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id ? { ...m, isStreaming: false } : m
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? {
                  ...m,
                  content: "抱歉，处理请求时出现错误。请稍后重试。",
                  isStreaming: false,
                }
              : m
          )
        );
      }
    } finally {
      setIsStreaming(false);
      setStreamingId(null);
      abortRef.current = null;
    }
  }, [mode, isStreaming]); // Removed messages dependency — uses ref instead

  // Stop generation
  const handleStop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  // New conversation
  const handleNewChat = useCallback(() => {
    if (isStreaming) {
      abortRef.current?.abort();
      setIsStreaming(false);
      setStreamingId(null);
    }
    setMessages([]);
  }, [isStreaming]);

  return (
    <div className="flex flex-col h-screen bg-bg-warm">
      {/* Top bar */}
      <header className="flex-shrink-0 border-b border-border bg-bg-warm/80 backdrop-blur-sm z-10">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-serif font-bold text-xl text-text-primary hover:text-accent-navy transition-colors">
              Creator
            </a>
            <ModeSwitcher currentMode={mode} onSwitch={handleModeSwitch} />
          </div>
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={handleNewChat}
                className="text-sm text-text-secondary/60 hover:text-text-secondary transition-colors"
              >
                新对话
              </button>
            )}
            <a
              href="/"
              className="text-sm text-text-secondary/40 hover:text-text-secondary transition-colors hidden sm:inline"
            >
              ← 返回首页
            </a>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="py-16 sm:py-24"
            >
              <div className="text-center mb-10">
                <span className="text-4xl mb-4 block">{config.icon}</span>
                <h1 className="font-serif font-bold text-[clamp(28px,3.5vw,44px)] leading-[1.2] text-text-primary mb-3">
                  {config.heroTitle}
                </h1>
                <p className="text-lg text-text-secondary max-w-lg mx-auto">
                  {config.description}
                </p>
              </div>

              <QuickPrompts prompts={config.quickPrompts} onSelect={handleSend} />

              <div className="mt-10">
                <span className="text-xs font-mono text-text-secondary/40 uppercase tracking-wider mb-3 block text-center">
                  建议先做
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {config.recommendedActions.map((action) => (
                    <span
                      key={action}
                      className="px-3 py-1.5 text-sm border border-border/60 bg-white text-text-secondary/70"
                    >
                      {action}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-6 space-y-6">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChatMessage message={msg} />
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Bottom composer */}
      <div className="flex-shrink-0 border-t border-border bg-bg-warm">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6">
          <ChatComposer
            onSend={handleSend}
            onStop={handleStop}
            isStreaming={isStreaming}
            placeholder={`向 ${config.shortLabel} 顾问提问...`}
          />
        </div>
      </div>
    </div>
  );
}
