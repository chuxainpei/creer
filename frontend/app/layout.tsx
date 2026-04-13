import type { Metadata } from 'next';
import { Manrope, Noto_Sans_SC } from 'next/font/google';
import type { ReactNode } from 'react';

import SiteHeader from '@/src/components/layout/SiteHeader';

import './globals.css';

export const metadata: Metadata = {
  title: '就业中心智能问答',
  description: '官方优先的毕业生就业问答 MVP。',
};

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
});

const notoSansSc = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-cn',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${manrope.variable} ${notoSansSc.variable}`}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
