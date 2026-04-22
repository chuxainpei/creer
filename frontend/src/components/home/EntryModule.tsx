import Link from 'next/link';
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  Cable,
  CheckCheck,
  Code2,
  Database,
  FileSearch,
  GraduationCap,
  Layers3,
  MessagesSquare,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundCheck,
  Workflow,
  ArrowRight,
} from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';

interface EntryModuleProps {
  hotTopics: string[];
}

const featureCards = [
  {
    title: '多模型协同',
    description: '统一接入规则引擎与生成模型，输出更稳定的结构化结论。',
    icon: Bot,
  },
  {
    title: '推荐排序引擎',
    description: '按背景条件生成可执行的院校或岗位推荐，并标注优先级。',
    icon: TrendingUp,
  },
  {
    title: '材料智能解析',
    description: '支持对简历、项目描述、成绩信息做快速结构化分析。',
    icon: FileSearch,
  },
  {
    title: '上下文记忆',
    description: '连续追问保留上下文，给出连贯而非割裂的决策建议。',
    icon: BrainCircuit,
  },
  {
    title: '可信度分层',
    description: '官方信息优先，经验信息补充，清晰展示来源标签。',
    icon: ShieldCheck,
  },
  {
    title: '流式实时反馈',
    description: '先返回关键结论，再逐步补齐证据与行动建议，观感更真实。',
    icon: Workflow,
  },
];

const quickStats = [
  { label: '核心场景', value: '升学规划 / 就业决策' },
  { label: '回答结构', value: '结论 + 推荐 + 风险 + 行动' },
  { label: '演示状态', value: '在线可交互' },
];

const integrationItems = ['学校官网公告', '招聘平台职位库', '本地知识库', '管理员后台', '飞书机器人', '企业微信', 'Notion', 'GitHub'];

const plans = [
  {
    name: '演示版',
    price: '¥0',
    desc: '适合路演与功能验证',
    features: ['每日 100 次问答', '基础推荐模板', '来源标签展示', '社区支持'],
    cta: '立即体验',
    popular: false,
  },
  {
    name: '专业版',
    price: '¥199/月',
    desc: '适合学院与小团队',
    features: ['不限问答次数', '升学+就业双策略', '自定义提示词模板', '接口联调能力', '优先技术支持'],
    cta: '开始试用',
    popular: true,
  },
  {
    name: '机构版',
    price: '定制',
    desc: '适合学校与企业中心',
    features: ['私有化部署', '单点登录与权限控制', '专属知识库训练', 'SLA 服务保障'],
    cta: '联系咨询',
    popular: false,
  },
];

export default function EntryModule({ hotTopics }: EntryModuleProps) {
  return (
    <main className="page-shell space-y-9 py-10 sm:py-14">
      <section className="hero-grid float-in overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="command-chip">由星图决策引擎驱动</span>
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                支持路演全流程演示
              </Badge>
            </div>
            <div className="space-y-4">
              <h1 className="display-type max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
                你的升学与就业
                <br />
                智能决策助手平台
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                输入问题后，系统优先给出可执行结论，再呈现推荐排序、风险提示和下一步动作，帮助你把复杂选择变成清晰路径。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/92">
                  立即开始问答
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#pricing">
                <Button size="lg" variant="outline" className="gap-2 border-primary/25 bg-white/80">
                  查看方案
                  <Layers3 className="h-4 w-4" />
                </Button>
              </a>
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
                    <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">{item.label}</p>
                    <p className="text-base font-semibold text-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="neo-panel">
            <CardContent className="space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="display-type text-lg font-semibold">智能助手在线演示</p>
                <span className="inline-flex items-center gap-1 rounded-full border border-success/20 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  在线
                </span>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/70 bg-white/85 p-4">
                <div className="rounded-2xl rounded-bl-md border border-border/70 bg-white px-3 py-2 text-sm text-foreground">
                  你可以帮我规划“保研失败后的秋招路线”吗？
                </div>
                <div className="rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm text-primary-foreground">
                  可以。先给结论：你需要“岗位先定向 + 时间线反推 + 简历专项强化”。我已为你生成三条推荐路径和对应风险点。
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-xl border border-border/70 bg-white/80 p-3">
                  <p className="text-xs font-semibold text-foreground">推荐路径 A</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">互联网产品运营方向，强调实习复盘与商业分析案例。</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-white/80 p-3">
                  <p className="text-xs font-semibold text-foreground">推荐路径 B</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">数据分析方向，强化 SQL、可视化与业务指标拆解能力。</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">核心能力</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">为真实决策系统而设计</h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            从简单问答到复杂决策链路，这一套界面与能力都围绕“可演示、可解释、可执行”构建。
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="neo-panel">
                <CardContent className="space-y-3 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="demo" className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">问答演示</span>
              <span className="rounded-full border border-border bg-white/85 px-3 py-1 text-xs font-semibold text-muted-foreground">岗位规划</span>
              <span className="rounded-full border border-border bg-white/85 px-3 py-1 text-xs font-semibold text-muted-foreground">院校推荐</span>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/70 bg-white/88 p-4">
              <div className="flex items-start gap-2.5">
                <UserRoundCheck className="mt-1 h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-foreground">我背景是计算机跨专业，GPA 一般，应该怎么选院校梯度？</p>
              </div>
              <div className="flex items-start gap-2.5">
                <MessagesSquare className="mt-1 h-4 w-4 text-primary" />
                <div className="space-y-2">
                  <p className="text-sm text-foreground">建议采用“冲刺 20% + 稳妥 50% + 保底 30%”策略，并优先关注项目实践权重高的院校。</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="rounded-lg border border-border/70 bg-muted/35 p-2.5 text-xs text-muted-foreground">冲刺层：985 新工科</div>
                    <div className="rounded-lg border border-border/70 bg-muted/35 p-2.5 text-xs text-muted-foreground">稳妥层：211 应用导向项目</div>
                    <div className="rounded-lg border border-border/70 bg-muted/35 p-2.5 text-xs text-muted-foreground">保底层：双非强专业院校</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <p className="text-sm font-semibold text-foreground">系统协同视图</p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-white/85 px-3 py-2">
                <div className="inline-flex items-center gap-2 text-sm text-foreground">
                  <Database className="h-4 w-4 text-primary" />
                  官方资料索引
                </div>
                <span className="text-xs font-semibold text-success">已同步</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-white/85 px-3 py-2">
                <div className="inline-flex items-center gap-2 text-sm text-foreground">
                  <Route className="h-4 w-4 text-primary" />
                  推荐规则引擎
                </div>
                <span className="text-xs font-semibold text-success">运行中</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/70 bg-white/85 px-3 py-2">
                <div className="inline-flex items-center gap-2 text-sm text-foreground">
                  <Target className="h-4 w-4 text-primary" />
                  风险提示模块
                </div>
                <span className="text-xs font-semibold text-success">已启用</span>
              </div>
            </div>
            <Link href="/qa">
              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/92">
                打开真实问答页面
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      <section id="integrations" className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <Cable className="h-4 w-4 text-primary" />
              与现有系统快速集成
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              可对接学校/企业已有数据与协作平台，几分钟内完成演示环境串联，满足比赛现场的稳定展示需求。
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {integrationItems.map((item) => (
                <div key={item} className="rounded-xl border border-border/70 bg-white/85 px-3 py-2 text-center text-xs font-medium text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="neo-panel">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
              <Code2 className="h-4 w-4 text-primary" />
              接口调用示例
            </div>
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-slate-950 p-4">
              <pre className="overflow-x-auto text-xs leading-6 text-slate-100">
                <code>{`import { DecisionClient } from '@xingtu/sdk'

const client = new DecisionClient({
  apiKey: process.env.XINGTU_API_KEY
})

const result = await client.ask({
  scene: 'career',
  question: '我应该先投产品岗还是数据岗？',
  stream: true
})

for await (const chunk of result) {
  process.stdout.write(chunk.text)
}`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="pricing" className="space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">价格方案</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">透明简单，按需升级</h2>
          <p className="text-sm leading-7 text-muted-foreground">从免费演示到机构部署，都可以根据比赛和落地阶段灵活选择。</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={`neo-panel ${plan.popular ? 'border-primary/30 ring-2 ring-primary/20' : ''}`}>
              <CardContent className="space-y-4 p-5 sm:p-6">
                {plan.popular ? (
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    最受欢迎
                  </span>
                ) : null}
                <div>
                  <p className="text-lg font-semibold text-foreground">{plan.name}</p>
                  <p className="mt-1 text-3xl font-semibold text-foreground">{plan.price}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                </div>
                <div className="space-y-2">
                  {plan.features.map((item) => (
                    <div key={item} className="inline-flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCheck className="mt-0.5 h-4 w-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/92">{plan.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="hero-grid rounded-[2rem] px-6 py-8 text-center sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">准备开始</p>
        <h2 className="display-type mt-2 text-3xl font-semibold text-foreground sm:text-4xl">现在就把你的系统做成可演示产品</h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          用中文叙事、结构化回答和真实业务界面，给评委一个“不是概念图，而是可落地系统”的第一印象。
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/qa">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/92">
              进入问答演示
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#features">
            <Button size="lg" variant="outline" className="gap-2 border-primary/25 bg-white/80">
              查看能力亮点
              <Sparkles className="h-4 w-4" />
            </Button>
          </a>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">无需信用卡 · 支持免费演示方案 · 系统状态正常</p>
      </section>

      <footer className="pb-2 text-center text-xs text-muted-foreground">
        星图决策平台 © 2026 · 升学与就业双场景智能问答系统
      </footer>
    </main>
  );
}
