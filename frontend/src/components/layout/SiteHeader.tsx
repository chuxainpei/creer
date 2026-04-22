'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

const navItems = [
  { href: '/#context', label: '功能' },
  { href: '/#voices', label: '用户声音' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/qa', label: '问答演示' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-background/78 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="display-type text-lg font-semibold text-foreground">星图</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                beta
              </span>
            </div>
            <p className="text-xs text-muted-foreground">升学与就业智能决策系统</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const active = item.href === '/qa' ? pathname === '/qa' : false;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('tabbit-nav-link', active && 'text-foreground')}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/qa">
            <Button size="sm" className="gap-1.5 rounded-full px-4">
              打开演示
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
