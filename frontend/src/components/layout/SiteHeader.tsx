'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseBusiness, LayoutDashboard, MessageSquareText } from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { cn } from '@/src/lib/utils';

const navItems = [
  { href: '/', label: '首页', icon: BriefcaseBusiness },
  { href: '/qa', label: '问答中心', icon: MessageSquareText },
  { href: '/admin', label: '管理后台', icon: LayoutDashboard },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-white/75 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">就业中心智能问答</p>
            <p className="text-xs text-muted-foreground">学校官方 + AI 可信服务</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Badge variant="primary">官方优先</Badge>
      </div>
    </header>
  );
}
