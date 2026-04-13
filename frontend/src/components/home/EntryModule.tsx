import Link from 'next/link';
import { ArrowRight, BookText, CircleHelp, ClipboardCheck, LifeBuoy, Megaphone, ShieldCheck, Sparkles } from 'lucide-react';

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

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Megaphone className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold">服务公告</h2>
            </div>
            <div className="space-y-2 text-sm leading-7 text-muted-foreground">
              <p>服务时间：每日 07:00-23:00（系统维护窗口会提前公告）。</p>
              <p>适用对象：本校在读学生、应届毕业生，回答默认按学校就业中心资料优先生成。</p>
              <p>风险提醒：最终办理要求以学校就业中心官网与学院通知为准。</p>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookText className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold">使用指南</h2>
            </div>
            <ol className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li>1. 先描述你的场景：年级、专业、目标事项（如三方协议、补贴、档案）。</li>
              <li>2. 查看回答下方的来源标签和证据片段，优先执行官方口径。</li>
              <li>3. 若答案涉及时间节点，请在办理前再核对一次最新公告。</li>
            </ol>
          </CardContent>
        </Card>

        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <CircleHelp className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold">常见问题</h2>
            </div>
            <div className="space-y-3 text-sm leading-7 text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Q:</span> 为什么有时只显示官方信息？
                <br />
                <span className="font-medium text-foreground">A:</span> 当官方与经验冲突时，系统会只输出官方结论。
              </p>
              <p>
                <span className="font-medium text-foreground">Q:</span> 经验参考能直接照做吗？
                <br />
                <span className="font-medium text-foreground">A:</span> 不能。经验仅供辅助，办理动作请按学校正式通知执行。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-grad border-white/85">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <LifeBuoy className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-semibold">支持与反馈</h2>
            </div>
            <div className="space-y-2 text-sm leading-7 text-muted-foreground">
              <p>如发现回答与最新公告不一致，请在就业中心反馈通道提交问题截图与问题描述。</p>
              <p>建议反馈信息：问题原文、答案截图、你所在学院/专业、公告链接或文件名称。</p>
              <p>我们会优先处理“政策冲突”和“办理时间误差”类问题。</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
