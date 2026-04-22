import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCheck,
  FileStack,
  FolderKanban,
  GraduationCap,
  LayoutTemplate,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent } from '@/src/components/ui/card';

interface EntryModuleProps {
  hotTopics: string[];
}

const highlightStats = [
  { label: '支持场景', value: '升学 / 就业双链路' },
  { label: '回答结构', value: '结论 + 推荐 + 风险 + 下一步' },
  { label: '演示状态', value: '在线可交互' },
];

const capabilityCards = [
  {
    title: '你的资料，就是上下文',
    description: '把简历、成绩、岗位描述、院校公告和聊天历史放进同一条决策链里，不再来回复制粘贴。',
    icon: FileStack,
  },
  {
    title: '推荐不是一句话',
    description: '系统默认先给结论，再展开推荐排序、适配原因、风险提示和执行动作，看起来更像真实产品。',
    icon: Target,
  },
  {
    title: '从问答走向执行',
    description: '不仅回答问题，还帮你拆时间线、补能力项、识别关键卡点，让演示更像“工作流工具”。',
    icon: Workflow,
  },
];

const scenarioCards = [
  {
    title: '升学规划',
    description: '基于 GPA、项目经历、目标城市与预算，生成冲刺/稳妥/保底梯度建议。',
    icon: GraduationCap,
  },
  {
    title: '就业决策',
    description: '比较岗位方向、安排秋招节奏、生成投递优先级和能力补齐清单。',
    icon: BriefcaseBusiness,
  },
  {
    title: '管理后台',
    description: '可接入公告、知识库和规则配置，演示时能展示“系统不是死模板”。',
    icon: Building2,
  },
];

const faqItems = [
  {
    title: '这个系统只能做聊天问答吗？',
    description: '不是。它的核心价值是把问答升级成决策流程，所以输出会带推荐、风险与行动建议。',
  },
  {
    title: '适合比赛现场怎么演示？',
    description: '建议先演示一个院校推荐，再切到岗位方向比较，最后展示来源标签和后台能力，完整体现产品闭环。',
  },
  {
    title: '可以接入真实数据吗？',
    description: '可以，当前前端已经为知识库、规则引擎和后台管理预留了对应展示位，后续可以平滑接入真实服务。',
  },
];

function ContextPreview() {
  return (
    <div className="browser-shell p-4 sm:p-5">
      <div className="flex items-center gap-2 border-b border-white/70 pb-3">
        <span className="browser-dot bg-[#ff8b7b]" />
        <span className="browser-dot bg-[#ffd86f]" />
        <span className="browser-dot bg-[#6ad39b]" />
        <div className="ml-2 rounded-full bg-white/70 px-3 py-1 text-[11px] text-muted-foreground">xingtu://decision/context</div>
      </div>
      <div className="grid gap-3 pt-4">
        <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.35rem] border border-white/70 bg-white/88 p-4 shadow-soft">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <FolderKanban className="h-3.5 w-3.5" />
              已引用资料
            </div>
            <div className="mt-3 grid gap-2">
              <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">简历.pdf</div>
              <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">成绩单.xlsx</div>
              <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">院校招生简章</div>
              <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">目标岗位 JD</div>
            </div>
          </div>
          <div className="rounded-[1.35rem] border border-white/70 bg-gradient-to-br from-primary/12 to-white p-4 shadow-soft">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <ScanSearch className="h-3.5 w-3.5" />
              系统理解
            </div>
            <div className="mt-3 space-y-2 text-xs leading-6 text-muted-foreground">
              <p>跨专业背景</p>
              <p>目标城市偏一线</p>
              <p>预算敏感</p>
              <p>更偏执行型岗位</p>
            </div>
          </div>
        </div>
        <div className="rounded-[1.35rem] border border-white/70 bg-slate-950 px-4 py-3 text-xs leading-6 text-slate-100">
          @ 简历 @ 成绩单 @ 招生简章 @ 岗位 JD
          <br />
          帮我给出「升学优先」和「就业优先」两套策略，并标出风险差异。
        </div>
      </div>
    </div>
  );
}

function WorkflowPreview() {
  return (
    <div className="browser-shell p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-white/70 pb-3">
        <div className="flex items-center gap-2">
          <span className="browser-dot bg-[#ff8b7b]" />
          <span className="browser-dot bg-[#ffd86f]" />
          <span className="browser-dot bg-[#6ad39b]" />
        </div>
        <div className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">自动生成推荐链路</div>
      </div>
      <div className="grid gap-3 pt-4">
        <div className="rounded-[1.25rem] border border-white/70 bg-white/90 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">结论</p>
            <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">高匹配</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">建议优先投递数据分析方向，同时保留一条产品运营保底路径。</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.25rem] border border-white/70 bg-white/88 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">推荐动作</p>
            <div className="mt-3 space-y-2 text-xs leading-6 text-foreground">
              <p>1. 补 SQL 与可视化项目</p>
              <p>2. 重写简历项目描述</p>
              <p>3. 两周内完成首轮投递</p>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-white/70 bg-white/88 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">风险提示</p>
            <div className="mt-3 space-y-2 text-xs leading-6 text-foreground">
              <p>跨专业需要补硬技能证明</p>
              <p>投递窗口过晚会降低通过率</p>
              <p>作品集要避免泛泛而谈</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustPreview() {
  return (
    <div className="browser-shell p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-white/70 pb-3">
        <p className="text-sm font-semibold text-foreground">来源与可信度</p>
        <span className="rounded-full bg-warning/10 px-2.5 py-1 text-[11px] font-semibold text-warning-foreground">官方优先</span>
      </div>
      <div className="space-y-3 pt-4">
        <div className="rounded-[1.2rem] border border-white/70 bg-white/88 p-4">
          <p className="text-xs font-semibold text-primary">来源标签</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">官方公告</span>
            <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent-foreground">规则引擎</span>
            <span className="rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-muted-foreground">经验补充</span>
          </div>
        </div>
        <div className="rounded-[1.2rem] border border-white/70 bg-white/88 p-4">
          <p className="text-xs font-semibold text-primary">可信度说明</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl bg-muted/45 px-3 py-2 text-[11px] leading-5 text-foreground">结论把握：高</div>
            <div className="rounded-xl bg-muted/45 px-3 py-2 text-[11px] leading-5 text-foreground">信息时效：需复核本年度公告</div>
            <div className="rounded-xl bg-muted/45 px-3 py-2 text-[11px] leading-5 text-foreground">执行难度：中等</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EntryModule({ hotTopics }: EntryModuleProps) {
  return (
    <main className="page-shell space-y-10 py-10 sm:space-y-14 sm:py-14">
      <section className="hero-grid relative overflow-hidden rounded-[2.2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="command-chip">AI 决策系统官网版</span>
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                全中文 · 面向比赛演示
              </Badge>
            </div>
            <div className="space-y-4">
              <h1 className="display-type max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                理解你的背景
                <br />
                帮你组织信息
                <br />
                再给出清晰决策
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                这不是普通聊天框，而是面向升学与就业场景的智能决策系统。它会整合资料、分析上下文，并生成更像真实产品的推荐与执行路径。
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/92">
                  进入问答演示
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#capabilities">
                <Button size="lg" variant="outline" className="gap-2 border-white/80 bg-white/75">
                  查看能力设计
                  <LayoutTemplate className="h-4 w-4" />
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
              {highlightStats.map((item) => (
                <Card key={item.label} className="border-white/90 bg-white/85 shadow-soft">
                  <CardContent className="space-y-1 p-4">
                    <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glow-orb glow-orb-primary" />
            <div className="glow-orb glow-orb-accent" />
            <div className="relative">
              <ContextPreview />
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">核心能力</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">你看见的，就是系统的上下文</h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            我们把 Tabbit 那种“围绕上下文展开”的体验，适配成你的升学与就业产品形态，让页面一眼就更像成熟系统。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {capabilityCards.map((item) => {
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

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit px-3 py-1">
            Step 1 · 资料理解
          </Badge>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">把分散信息收束成一条决策线</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            参考站的强项是把“你眼前看到的一切”变成 AI 可用上下文。放到你的项目里，就是把简历、成绩、公告、岗位要求和聊天记录汇成统一输入。
          </p>
          <div className="space-y-2 text-sm leading-7 text-muted-foreground">
            <p>1. 支持引入本地材料、后台规则和历史对话。</p>
            <p>2. 自动提炼用户目标、背景差异与限制条件。</p>
            <p>3. 为后续推荐排序和风险判断打底。</p>
          </div>
        </div>
        <ContextPreview />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <WorkflowPreview />
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit px-3 py-1">
            Step 2 · 自主拆解
          </Badge>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">问题不只被回答，而是被拆成可执行动作</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            我们把参考站那种“任务，自主执行”的感觉，改造成更适合你系统的“决策，自主拆解”。这样用户看到的不再是空泛答复，而是一份可落实的建议清单。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card className="border-white/80 bg-white/82 shadow-soft">
              <CardContent className="space-y-2 p-4">
                <p className="text-sm font-semibold text-foreground">升学侧</p>
                <p className="text-xs leading-6 text-muted-foreground">给出冲刺/稳妥/保底层次和材料准备优先级。</p>
              </CardContent>
            </Card>
            <Card className="border-white/80 bg-white/82 shadow-soft">
              <CardContent className="space-y-2 p-4">
                <p className="text-sm font-semibold text-foreground">就业侧</p>
                <p className="text-xs leading-6 text-muted-foreground">给出岗位方向比较、投递时间线和能力补齐建议。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-4">
          <Badge variant="secondary" className="w-fit px-3 py-1">
            Step 3 · 可信输出
          </Badge>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">产品最像真的地方，是它敢把依据一起亮出来</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            这一层是你项目最应该强化的差异点。参考站给人强烈“不是玩具”的感觉，其中一个关键就是信息组织和控制感。你这里则可以把它体现成来源标签、可信度说明和风险边界。
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.2rem] border border-white/80 bg-white/82 p-4 shadow-soft">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-semibold text-foreground">官方优先</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/80 bg-white/82 p-4 shadow-soft">
              <BookOpenCheck className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-semibold text-foreground">经验补充</p>
            </div>
            <div className="rounded-[1.2rem] border border-white/80 bg-white/82 p-4 shadow-soft">
              <Bot className="h-5 w-5 text-primary" />
              <p className="mt-3 text-sm font-semibold text-foreground">规则引擎</p>
            </div>
          </div>
        </div>
        <TrustPreview />
      </section>

      <section className="space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">适配场景</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">和你的项目天然匹配的三种展示方式</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {scenarioCards.map((item) => {
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

      <section className="hero-grid overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">开始演示</p>
            <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">把一个聊天 Demo，做成像真正产品官网的第一印象</h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              现在这套首页会更接近 Tabbit 那种高级、轻盈、产品化的官网表达，但内容全部是你的系统逻辑，不会看起来像换了个壳。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/92">
                  进入问答页
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#faq">
                <Button size="lg" variant="outline" className="gap-2 border-white/80 bg-white/75">
                  查看 FAQ
                  <Sparkles className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          <div className="rounded-[1.8rem] border border-white/85 bg-white/80 p-5 shadow-panel backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] bg-muted/45 p-4">
                <p className="text-xs font-semibold text-primary">前端观感</p>
                <p className="mt-2 text-sm leading-6 text-foreground">官网式叙事结构 + 产品截图感卡片</p>
              </div>
              <div className="rounded-[1.25rem] bg-muted/45 p-4">
                <p className="text-xs font-semibold text-primary">评委感受</p>
                <p className="mt-2 text-sm leading-6 text-foreground">更像成熟 SaaS，而不是单页聊天原型</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="space-y-4 pb-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">FAQ</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">常见问题</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {faqItems.map((item) => (
            <Card key={item.title} className="border-white/80 bg-white/82 shadow-soft">
              <CardContent className="space-y-3 p-5">
                <p className="text-base font-semibold text-foreground">{item.title}</p>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCheck className="h-3.5 w-3.5" />
                  已适配当前项目
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
