import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import SiteHeader from '@/src/components/layout/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  title: '星图决策台',
  description: '升学与就业智能决策系统：上下文理解、推荐输出与可信度展示。',
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
