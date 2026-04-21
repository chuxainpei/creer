import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import SiteHeader from '@/src/components/layout/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  title: '升学与就业决策台',
  description: '参赛版 AI 决策演示：结论、推荐排序与可信度说明。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
