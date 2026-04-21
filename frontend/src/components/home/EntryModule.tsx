import Link from 'next/link';
import { ArrowRight, BookText, BriefcaseBusiness, CircleAlert, ClipboardCheck, Radar, ShieldCheck, Sparkles } from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';

interface EntryModuleProps {
  hotTopics: string[];
}

const trustPoints = [
  {
    title: '决策结构化输出',
    description: '每次回答默认包含结论、推荐项、风险提示和下一步动作。',
    icon: ClipboardCheck,
  },
  {
    title: '来源可信度层',
    description: '同屏展示官方优先、经验补充和规则引擎标签，减少黑盒感。',
    icon: ShieldCheck,
  },
  {
    title: '升学/就业双场景',
    description: '同一交互壳体承载两类问题，适合比赛里连续演示不同案例。',
    icon: Radar,
  },
];

const quickStats = [
  { label: '推荐模式', value: '结论 + 排序' },
  { label: '场景覆盖', value: '升学 / 就业' },
  { label: '演示状态', value: 'Live 可交互' },
];

export default function EntryModule({ hotTopics }: EntryModuleProps) {
  return (
    <main className="page-shell py-10 sm:py-14">
      <section className="hero-grid surface-grad inset-line overflow-hidden rounded-[2rem] border border-white/75 px-6 py-8 shadow-panel backdrop-blur md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="fade-up space-y-6">
            <Badge variant="primary" className="w-fit">
              2026 参赛版 · Industrial
            </Badge>
            <div className="space-y-4">
              <h1 className="display-type max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                把升学与就业问题，
                <br />
                变成可执行的推荐清单
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                这不是“聊天玩具”，而是可演示的决策界面：先给结论，再给推荐项与风险提示，并把可信度依据一起展示出来。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2">
                  进入决策台
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Badge variant="secondary" className="px-4 py-3 text-sm">
                全中文叙事 + 工业视觉
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
                <Card key={item.label} className="border-white/90 bg-white/90">
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
                <Card key={point.title} className="border-white/85 bg-white/92">
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
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                    <CircleAlert className="h-4 w-4" />
                  </div>
                  <p className="text-base font-semibold text-foreground">评审演示建议</p>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  建议先演示一个院校推荐问题，再切换到岗位推荐问题，突出同一系统对两类决策任务的承载能力。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookText className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">演示逻辑</h2>
            </div>
            <ol className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li>1. 提出一个推荐类问题（院校/岗位）。</li>
              <li>2. 展示系统如何给出“推荐排序 + 风险提示”。</li>
              <li>3. 强调来源和可信度层如何降低决策不确定性。</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BriefcaseBusiness className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">产品定位</h2>
            </div>
            <div className="space-y-2 text-sm leading-7 text-muted-foreground">
              <p>定位不是替代老师/导师，而是用结构化方式帮助学生更快完成决策分层和行动拆解。</p>
              <p>在比赛场景中，它展示的是“可信赖的 AI 产品形态”，而不是单次问答准确率本身。</p>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">可信度声明</h2>
            </div>
            <div className="space-y-2 text-sm leading-7 text-muted-foreground">
              <p>系统默认官方口径优先，经验信息仅用于补充视角。</p>
              <p>演示内容用于呈现产品能力，正式办理请以最新公告为准。</p>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <h2 className="display-type text-lg font-semibold">下一步扩展</h2>
            </div>
            <div className="space-y-2 text-sm leading-7 text-muted-foreground">
              <p>后续可接入真实知识库和角色化推荐模板，把演示版升级为可试点版本。</p>
              <p>当前版本重点保障路演稳定性和观感一致性。</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
