"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-warm flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif font-bold text-3xl text-text-primary mb-4">
          页面加载出错
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          抱歉，页面加载时出现了问题。请尝试刷新页面。
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 border border-accent-navy text-accent-navy text-sm font-medium
            hover:bg-accent-navy hover:text-white transition-colors duration-200"
        >
          刷新页面
        </button>
      </div>
    </div>
  );
}
