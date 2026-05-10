import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator Career Guidance — AI 升学与就业规划工作台",
  description:
    "Creator 是一个 AI 升学与就业规划工作台，帮助学生和顾问把复杂决策整理成结构化、可执行的行动计划。涵盖研究生申请、实习校招、简历优化和面试准备。",
  openGraph: {
    title: "Creator — 把复杂决策变成清晰规划",
    description:
      "AI 升学与就业规划工作台。判断框架 × 行动计划 × 可信表达。",
    siteName: "Creator Career Guidance",
    type: "website",
  },
  icons: {
    icon: "/visuals/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
