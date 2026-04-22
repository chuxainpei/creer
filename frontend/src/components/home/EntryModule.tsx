import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCheck,
  DatabaseBackup,
  FileStack,
  FolderKanban,
  GraduationCap,
  LayoutTemplate,
  MessagesSquare,
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

const heroModes = [
  {
    title: '学生端演示',
    description: '直接进入问答体验，查看推荐结果与可信度输出。',
    href: '/qa',
  },
  {
    title: '系统后台',
    description: '查看知识库、规则与系统状态的最小控制台。',
    href: '/admin',
  },
  {
    title: '产品能力',
    description: '浏览上下文理解、自动拆解与可信输出的完整官网叙事。',
    href: '#contexts',
  },
];

const topFeaturePills = [
  {
    label: '添加引用',
    description: '引用简历、成绩、公告、岗位描述等作为上下文，得到更贴近真实情况的答案。',
  },
  {
    label: '更多模式',
    description: '同一问题可切换升学优先、就业优先、对比选择等不同分析视角。',
  },
  {
    label: '可信输出',
    description: '默认附带推荐原因、风险提示和来源标签，减少黑盒感。',
  },
];

const contextCards = [
  {
    title: '标签、资料、本地文件',
    subtitle: '一键引用，随时调用',
    description: '在你的项目里，它被翻译成“简历、成绩、岗位 JD、院校公告”四类真实上下文。',
  },
  {
    title: '划词、截图、片段',
    subtitle: '话再少，也懂你的意思',
    description: '只给一个片段，也能根据局部内容理解问题属于升学还是求职场景。',
  },
  {
    title: '历史记录与知识库',
    subtitle: '信息在对话中流动',
    description: '后台资料与上下文记忆一起工作，输出看起来更像完整系统，而不是临时问答。',
  },
];

const scenarioCards = [
  {
    title: '任务，自主拆解',
    description: '把一个模糊问题拆成推荐、风险、动作三段，让答案从“说法”变成“路径”。',
    icon: Workflow,
  },
  {
    title: '模板，触手可及',
    description: '把常见问法沉淀成升学规划、秋招安排、岗位比较等固定入口，减少重复输入。',
    icon: LayoutTemplate,
  },
  {
    title: '井然有序的后台',
    description: '官方资料、毕业去向与规则配置被收束进一个轻量后台，保持系统完整性。',
    icon: DatabaseBackup,
  },
];

const voiceCards = [
  {
    name: '林舟',
    role: '跨专业申请者',
    quote:
      '以前我总觉得 AI 只能给泛泛建议，这版系统第一次让我觉得它真的理解了我的背景和限制条件。',
  },
  {
    name: '周岚',
    role: '求职转方向用户',
    quote:
      '我最喜欢的是它不会只告诉我“去试试”，而是会明确写出先补什么能力、什么时候投递、风险在哪里。',
  },
  {
    name: '陈老师',
    role: '高校辅导老师',
    quote:
      '站在演示角度，它已经不像普通聊天页了，更像一个完整产品，前台、问答和后台是连起来的。',
  },
];

const faqItems = [
  {
    title: '这是普通聊天机器人吗？',
    description: '不是。它更像一个围绕资料、上下文和规则运行的决策系统，聊天只是入口。',
  },
  {
    title: '为什么页面做得这么克制？',
    description: '因为这次目标是高相似官网型，视觉上尽量接近成熟 AI 产品官网，弱化比赛式说明感。',
  },
  {
    title: '上线后还保留真实功能吗？',
    description: '保留，当前最低业务入口是首页、问答页和后台页，已经足够支撑现场演示。',
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

function DecisionPreview() {
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

function TemplatesPreview() {
  return (
    <div className="browser-shell p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-white/70 pb-3">
        <p className="text-sm font-semibold text-foreground">常用妙招</p>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">一键调用</span>
      </div>
      <div className="space-y-3 pt-4">
        <div className="rounded-[1.2rem] border border-white/70 bg-white/88 p-4">
          <p className="text-xs font-semibold text-primary">工作场景 / 多重视角</p>
          <div className="mt-3 grid gap-2">
            <div className="rounded-xl bg-muted/45 px-3 py-2 text-[11px] leading-5 text-foreground">帮我比较“升学优先”和“就业优先”的差异</div>
            <div className="rounded-xl bg-muted/45 px-3 py-2 text-[11px] leading-5 text-foreground">给我一个 90 天秋招推进节奏</div>
            <div className="rounded-xl bg-muted/45 px-3 py-2 text-[11px] leading-5 text-foreground">如果 GPA 一般，院校层次该怎么分配</div>
          </div>
        </div>
        <div className="rounded-[1.2rem] border border-white/70 bg-white/88 p-4">
          <p className="text-xs font-semibold text-primary">我的模板库</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">院校推荐</span>
            <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent-foreground">岗位比较</span>
            <span className="rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-muted-foreground">时间线规划</span>
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
              <span className="command-chip">星图 beta</span>
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                全中文 · 高相似官网型
              </Badge>
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">理解你的上下文、帮你组织选择、执行决策、无限可能</p>
              <h1 className="display-type max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">星图决策台</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {heroModes.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-[1.45rem] border border-white/85 bg-white/82 p-4 shadow-soft transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.description}</p>
                </a>
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
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {topFeaturePills.map((item) => (
            <div key={item.label} className="rounded-[1.5rem] border border-white/80 bg-white/72 p-4 shadow-soft backdrop-blur">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contexts" className="space-y-5">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">你看见的，就是上下文</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">告别复制粘贴，所有背景资料，一键引用</h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            这是这次改版最核心的设计语言。我们把参考站的“上下文优先”直接翻译到你的项目里，用最少业务，撑起最强的产品感。
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {contextCards.map((item, index) => (
            <Card key={item.title} className="neo-panel">
              <CardContent className="space-y-4 p-5">
                <div className="space-y-1">
                  <p className="text-lg font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm font-medium text-primary">{item.subtitle}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/80 bg-white/82 p-4 shadow-soft">
                  {index === 0 ? (
                    <div className="space-y-2">
                      <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">简历.pdf</div>
                      <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">成绩单.xlsx</div>
                      <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">岗位 JD</div>
                    </div>
                  ) : index === 1 ? (
                    <div className="grid gap-2">
                      <div className="rounded-xl bg-primary/10 px-3 py-2 text-xs text-primary">截图：某岗位要求</div>
                      <div className="rounded-xl bg-accent/10 px-3 py-2 text-xs text-accent-foreground">划词：录取条件说明</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">官方公告知识库</div>
                      <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">历史追问记录</div>
                      <div className="rounded-xl bg-muted/50 px-3 py-2 text-xs text-foreground">规则引擎摘要</div>
                    </div>
                  )}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">任务，自主执行</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">摆脱繁琐操作，系统自动接管决策拆解</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            在你的项目里，这一层不表现为“自动开网页”，而表现为“自动拆推荐、拆风险、拆行动”。视觉上依然保持参考站那种克制、平滑、产品化的表达。
          </p>
          <div className="space-y-2 text-sm leading-7 text-muted-foreground">
            <p>1. 系统先判断你是在问升学、求职还是两者比较。</p>
            <p>2. 然后生成结论、推荐路径和风险边界。</p>
            <p>3. 最后把输出整理成现场最容易讲清楚的结构化结果。</p>
          </div>
        </div>
        <ContextPreview />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <DecisionPreview />
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">妙招，触手可及</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">无需重复输入，常用问题沉淀成一键模板</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            你原来的项目已经有推荐问题，这一版会把它们看起来更像“妙招入口”，不再像堆在侧边栏的提示词，而是官网里自然出现的一套产品能力。
          </p>
          <div className="flex flex-wrap gap-3">
            {hotTopics.map((topic) => (
              <div key={topic} className="entry-chip">
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">浏览体验新可能</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">最低业务，也能做出完整可信的系统感</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            你要的是极致审美，所以我们把业务压缩到最少，但依然保留问答页和后台页。这样首页负责“像产品官网”，而其他页面负责“证明它不是纯展示图”。
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {scenarioCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.2rem] border border-white/80 bg-white/82 p-4 shadow-soft">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        <TemplatesPreview />
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <TrustPreview />
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">主动权始终在你</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">你的数据属于你，你决定答案该如何被信任</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            这一段直接继承参考站里最有说服力的气质表达。对于你的项目，我们把它落成“官方优先、来源标注、风险说明、后台可控”的四层可信逻辑。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/80 bg-white/82 p-4 shadow-soft">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                资料使用受控
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-white/80 bg-white/82 p-4 shadow-soft">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <BookOpenCheck className="h-4 w-4 text-primary" />
                输出边界明确
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="voices" className="space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">用户声音</p>
          <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">像真实产品一样，被不同角色自然接受</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {voiceCards.map((item) => (
            <Card key={item.name} className="neo-panel">
              <CardContent className="space-y-4 p-5">
                <p className="text-sm leading-7 text-foreground">{item.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {item.name.slice(0, 1)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="hero-grid overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">开始使用</p>
            <h2 className="display-type text-3xl font-semibold text-foreground sm:text-4xl">把一个聊天 Demo，做成真正像产品官网的第一印象</h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              现在你的网站会更接近参考站那种轻盈、完整、有秩序的产品表达，同时仍然保留问答页和后台页作为真实演示入口。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/92">
                  打开问答体验
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="gap-2 border-white/80 bg-white/75">
                  查看系统后台
                  <Building2 className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-[1.8rem] border border-white/85 bg-white/80 p-5 shadow-panel backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] bg-muted/45 p-4">
                <p className="text-xs font-semibold text-primary">前端观感</p>
                <p className="mt-2 text-sm leading-6 text-foreground">更接近真实 AI 官网，而不是参赛说明页</p>
              </div>
              <div className="rounded-[1.25rem] bg-muted/45 p-4">
                <p className="text-xs font-semibold text-primary">评委感受</p>
                <p className="mt-2 text-sm leading-6 text-foreground">像成熟产品，而不是单个聊天界面</p>
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
