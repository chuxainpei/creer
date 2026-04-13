import Link from 'next/link';
import { ArrowRight, BookText, ClipboardCheck, ShieldCheck, Sparkles } from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';

interface EntryModuleProps {
  hotTopics: string[];
}

const trustPoints = [
  {
    title: '官方优先',
    description: '涉及材料、流程、时间和政策时，回答默认优先引用学校就业中心资料。',
    icon: ShieldCheck,
  },
  {
    title: '经验补充',
    description: '官方信息未覆盖时，再补充往届去向参考，并明确标注它只是辅助判断。',
    icon: Sparkles,
  },
  {
    title: '首页即入口',
    description: '适合挂在学校官网入口模块里，学生点击即可进入独立问答页。',
    icon: BookText,
  },
];

const quickStats = [
  { label: '高频场景覆盖', value: '40+' },
  { label: '官方资料优先级', value: 'P0' },
  { label: '响应模式', value: '流式回答' },
];

export default function EntryModule({ hotTopics }: EntryModuleProps) {
  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="hero-grid surface-grad inset-line overflow-hidden rounded-[2rem] border border-white/75 px-6 py-8 shadow-panel backdrop-blur md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.95fr]">
          <div className="fade-up space-y-6">
            <Badge variant="primary" className="w-fit">
              就业服务 AI 助手
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                先看官方结论，再给经验补充的学校就业问答入口
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                面向学生提供可信、可理解、可快速行动的就业问答体验。重点覆盖三方协议、双选会、档案去向、求职补贴、简历优化等高频问题。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2">
                  进入问答中心
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Badge variant="secondary" className="px-4 py-3 text-sm">
                学校官方 + AI 可信感
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3">
              {hotTopics.map((topic) => (
                <div key={topic} className="entry-chip">
                  {topic}
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {quickStats.map((item) => (
                <Card key={item.label} className="border-white/90 bg-white/86">
                  <CardContent className="space-y-1 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="fade-up grid gap-4">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <Card key={point.title} className="border-white/80 bg-white/90">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-semibold text-foreground">{point.title}</p>
                      <p className="text-sm leading-6 text-muted-foreground">{point.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="border-primary/15 bg-primary/5">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground">面向学校官网嵌入</p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    当前可独立部署，后续可作为学校就业中心官网入口模块或内嵌页面接入。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
