'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, LayoutGrid, MessageSquareText, ShieldCheck, Workflow } from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { cn } from '@/src/lib/utils';

const navItems = [
  { href: '/#features', label: '能力亮点', icon: LayoutGrid },
  { href: '/#capabilities', label: '能力设计', icon: Workflow },
  { href: '/#faq', label: 'FAQ', icon: ShieldCheck },
  { href: '/qa', label: '问答中心', icon: MessageSquareText },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-background/75 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-soft transition group-hover:scale-[1.04]">
            <Workflow className="h-5 w-5" />
          </div>
          <div>
            <p className="display-type text-sm font-semibold text-foreground">星图决策台</p>
            <p className="text-xs text-muted-foreground">升学与就业智能决策系统</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/80 bg-white/70 p-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === '/qa' ? pathname === '/qa' : pathname === '/';
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="hidden sm:inline-flex">
            全中文演示版
          </Badge>
          <Link href="/qa" className="hidden sm:block">
            <Button size="sm" className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
              开始演示
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
