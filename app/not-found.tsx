import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-warm flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="text-sm font-mono text-accent-navy/40 uppercase tracking-[0.2em] mb-6 block">
          404
        </span>
        <h1 className="font-serif font-bold text-3xl text-text-primary mb-4">
          页面未找到
        </h1>
        <p className="text-text-secondary mb-8 leading-relaxed">
          你访问的页面不存在，或者已经被移动。请返回首页继续使用 智升学。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-accent-navy text-accent-navy text-sm font-medium
            hover:bg-accent-navy hover:text-white transition-colors duration-200"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
