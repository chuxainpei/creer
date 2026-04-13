import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import SiteHeader from '@/src/components/layout/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  title: '就业中心智能问答',
  description: '官方优先的毕业生就业问答 MVP。',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
