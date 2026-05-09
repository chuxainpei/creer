"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatWorkspace from "@/components/chat/chat-workspace";
import type { ChatMode } from "@/lib/chat-content";

function ChatContent() {
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const initialMode: ChatMode =
    modeParam === "employment" ? "employment" : "postgraduate";

  return <ChatWorkspace initialMode={initialMode} />;
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-bg-warm flex items-center justify-center">
          <div className="text-text-secondary/40 font-mono text-sm">加载中...</div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
