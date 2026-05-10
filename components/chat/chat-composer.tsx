"use client";

import { useState, useRef, useCallback, useEffect, useId } from "react";

interface ChatComposerProps {
  onSend: (content: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  placeholder?: string;
}

export default function ChatComposer({
  onSend,
  onStop,
  isStreaming,
  placeholder = "输入你的问题...",
}: ChatComposerProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 160) + "px";
  }, [input]);

  const handleSubmit = useCallback(() => {
    if (!input.trim() || isStreaming) return;
    onSend(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [input, isStreaming, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <div className="py-3 sm:py-4">
      <div className="flex items-end gap-3 bg-white border border-border/60 px-4 py-2">
        <label htmlFor={inputId} className="sr-only">
          输入你的问题
        </label>
        <textarea
          ref={textareaRef}
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          maxLength={8000}
          className="flex-1 resize-none bg-transparent text-[15px] text-text-primary placeholder:text-text-secondary/40
            outline-none py-2 leading-relaxed max-h-[160px]"
          disabled={isStreaming}
        />

        <div className="flex-shrink-0 pb-1">
          {isStreaming ? (
            <button
              onClick={onStop}
              className="w-9 h-9 flex items-center justify-center border border-accent-navy/30
                text-accent-navy hover:bg-accent-navy/5 transition-colors"
              title="停止生成"
              aria-label="停止生成"
            >
              <span className="block w-3 h-3 bg-accent-navy" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="w-9 h-9 flex items-center justify-center border border-accent-navy
                text-accent-navy hover:bg-accent-navy hover:text-white transition-all duration-200
                disabled:opacity-30 disabled:cursor-not-allowed"
              title="发送 (Enter)"
              aria-label="发送消息"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-text-secondary/30 font-mono mt-2 text-center">
        Enter 发送 · Shift+Enter 换行
      </p>
    </div>
  );
}
