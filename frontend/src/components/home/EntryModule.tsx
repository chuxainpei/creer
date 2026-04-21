import Link from 'next/link';
import {
  ArrowRight,
  BookText,
  BriefcaseBusiness,
  CircleAlert,
  ClipboardCheck,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';

interface EntryModuleProps {
  hotTopics: string[];
}

const trustPoints = [
  {
    title: '结论先行的输出结构',
    description: '回答优先交付可执行结论，再展开推荐项与下一步动作。',
    icon: Workflow,
  },
  {
    title: '可解释的可信度层',
    description: '同屏展示官方优先、经验补充与规则引擎，让判断过程透明。',
    icon: ShieldCheck,
  },
  {
    title: '双场景一体化承载',
    description: '同一界面支持升学与就业，适合评审现场连贯展示多个案例。',
    icon: Radar,
  },
];

const quickStats = [
  { label: '回答范式', value: '结论 + 排序 + 风险' },
  { label: '覆盖场景', value: '升学 / 求职双域' },
  { label: '状态', value: '实时可演示' },
];

export default function EntryModule({ hotTopics }: EntryModuleProps) {
  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="hero-grid float-in overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="command-chip">UI/UX PRO MAX 方案</span>
              <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground">
                竞赛路演版
              </span>
            </div>
            <div className="space-y-4">
              <h1 className="display-type max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                把“聊天回答”
                <br />
                升级成“决策驾驶舱”
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                通过结构化结论、推荐排序、行动建议和来源可信度，现场直接展示产品真实感，而不是仅展示模型会答题。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/92">
                  进入决策驾驶舱
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Badge variant="secondary" className="px-4 py-3 text-sm">
                万能回答 + 可解释证据
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
                <Card key={item.label} className="border-white/90 bg-white/88">
                  <CardContent className="space-y-1 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{item.label}</p>
                    <p className="text-base font-semibold text-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <Card key={point.title} className="neo-panel">
                  <CardContent className="flex items-start gap-4 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
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

            <Card className="neo-panel border-accent/20 bg-gradient-to-br from-accent/10 to-white/85">
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-accent shadow-soft">
                    <CircleAlert className="h-4 w-4" />
                  </div>
                  <p className="text-base font-semibold text-foreground">评审演示顺序建议</p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  先演示院校推荐，再切到岗位推荐，最后展示来源和风险提示，三步就能说明“可落地产品能力”。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookText className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">演示主线</h2>
            </div>
            <ol className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li>1. 提一个推荐类问题，快速拿到结论。</li>
              <li>2. 展示推荐排序与行动建议的可执行性。</li>
              <li>3. 通过来源与可信度模块证明答案可解释。</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">产品价值</h2>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              这个系统的价值不是替代导师，而是把复杂决策拆成“结论-路径-风险”三段，让学生在短时间内获得清晰行动方案。
            </p>
          </CardContent>
        </Card>

        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">可信度边界</h2>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              系统默认官方信息优先，经验信息只作补充，演示用于体现产品能力，正式办理请以最新公告为准。
            </p>
          </CardContent>
        </Card>

        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">后续升级路线</h2>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              后续可接入真实知识库和用户画像分层推荐，把赛场演示版平滑升级为院校或就业服务的试点产品。
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
