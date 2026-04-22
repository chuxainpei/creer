import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCheck,
  ChevronRight,
  FileStack,
  Globe,
  Lock,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  WandSparkles,
  Workflow,
} from 'lucide-react';

import { Button } from '@/src/components/ui/button';

interface EntryModuleProps {
  hotTopics: string[];
}

const quickCards = [
  {
    title: '问任何问题...',
    description: '在问答演示里直接测试系统如何根据上下文给出结构化答案。',
    href: '/qa',
  },
  {
    title: '添加引用',
    description: '把简历、成绩单、岗位描述、院校公告变成系统真正理解的输入。',
    href: '#context',
  },
  {
    title: '更多模式',
    description: '切换升学优先、就业优先、对比分析等不同思考方式。',
    href: '#modes',
  },
];

const contextCards = [
  {
    title: '标签、资料、本地文件',
    description: '把各种资料放进系统，让回答不再脱离真实背景。',
  },
  {
    title: '剪贴板、截图、片段',
    description: '哪怕只给一句话或一段要求，也能快速建立上下文。',
  },
  {
    title: '知识库、历史记录',
    description: '对话不是孤立发生，信息会被保留和重新利用。',
  },
];

const trustBadges = ['官方优先', '规则引擎', '经验补充'];

const testimonials = [
  {
    name: '林舟',
    role: '申请者',
    quote: '这套界面最大的变化是，它终于看起来像真正的 AI 产品，而不是一个比赛作业页面。',
  },
  {
    name: '周岚',
    role: '求职用户',
    quote: '我能很直观地理解系统“看到了什么”“怎么判断的”，这让结果更有说服力。',
  },
  {
    name: '陈老师',
    role: '指导老师',
    quote: '问答页、官网页、后台页现在是一个完整产品，而不是三个风格不同的页面。',
  },
];

const faqs = [
  {
    title: '这是一个聊天机器人官网吗？',
    description: '不是。它看起来像官网，但骨架已经为真实问答系统、后台和知识库留出了继续演进的空间。',
  },
  {
    title: '为什么要做得这么接近参考站？',
    description: '因为你后面要基于这个 Demo 继续改，所以这一步先把审美底座和页面节奏彻底定住。',
  },
  {
    title: '现在保留了哪些业务？',
    description: '只保留最小必要入口：首页、问答演示页、后台页。其他内容全部为视觉和产品感服务。',
  },
];

function BrowserFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="tabbit-frame">
      <div className="flex items-center gap-2 border-b border-[rgba(17,24,39,0.06)] px-4 py-3">
        <span className="browser-dot bg-[#ff8b7b]" />
        <span className="browser-dot bg-[#ffd86f]" />
        <span className="browser-dot bg-[#6ad39b]" />
        <div className="ml-2 rounded-full bg-[#f3f5f8] px-3 py-1 text-[11px] text-muted-foreground">{label}</div>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function HeroPreview() {
  return (
    <BrowserFrame label="xingtu://workspace/context">
      <div className="grid gap-3">
        <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <FileStack className="h-3.5 w-3.5" />
            已添加引用
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#f4f6f8] px-3 py-1 text-[11px] text-foreground">简历.pdf</span>
            <span className="rounded-full bg-[#f4f6f8] px-3 py-1 text-[11px] text-foreground">成绩单.xlsx</span>
            <span className="rounded-full bg-[#f4f6f8] px-3 py-1 text-[11px] text-foreground">岗位 JD</span>
            <span className="rounded-full bg-[#f4f6f8] px-3 py-1 text-[11px] text-foreground">招生简章</span>
          </div>
        </div>
        <div className="rounded-[1.3rem] bg-[#0f172a] px-4 py-4 text-sm leading-7 text-white">
          我是跨专业背景，预算有限，想同时规划“升学”和“秋招”，请给我一个更稳妥的路径。
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">系统理解</p>
            <div className="mt-3 space-y-2 text-xs leading-6 text-foreground">
              <p>跨专业背景</p>
              <p>预算敏感</p>
              <p>倾向稳妥选择</p>
            </div>
          </div>
          <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">下一步</p>
            <div className="mt-3 space-y-2 text-xs leading-6 text-foreground">
              <p>生成推荐层次</p>
              <p>拆分时间线</p>
              <p>标记风险边界</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function ExecutionPreview() {
  return (
    <BrowserFrame label="xingtu://workspace/plan">
      <div className="space-y-3">
        <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">结论</p>
            <span className="rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">高匹配</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">建议优先选择“就业先行，升学保留”的双路径策略。</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">推荐动作</p>
            <div className="mt-3 space-y-2 text-xs leading-6 text-foreground">
              <p>1. 补齐 2 个求职项目</p>
              <p>2. 重写简历项目表达</p>
              <p>3. 两周内启动首轮投递</p>
            </div>
          </div>
          <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">风险提示</p>
            <div className="mt-3 space-y-2 text-xs leading-6 text-foreground">
              <p>跨专业证明不足</p>
              <p>窗口期延后风险</p>
              <p>保底院校梯度过高</p>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function ModesPreview() {
  return (
    <BrowserFrame label="xingtu://workspace/modes">
      <div className="space-y-3">
        <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">工作场景 / 多重视角</p>
          <div className="mt-3 grid gap-2">
            <div className="rounded-xl bg-[#f4f6f8] px-3 py-2 text-[11px] leading-5 text-foreground">比较“升学优先”和“就业优先”的差异</div>
            <div className="rounded-xl bg-[#f4f6f8] px-3 py-2 text-[11px] leading-5 text-foreground">给我一个 90 天秋招节奏</div>
            <div className="rounded-xl bg-[#f4f6f8] px-3 py-2 text-[11px] leading-5 text-foreground">如果 GPA 一般，院校层次怎么分配</div>
          </div>
        </div>
        <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">我的模板库</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">院校推荐</span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent-foreground">岗位比较</span>
            <span className="rounded-full bg-[#f4f6f8] px-3 py-1 text-[11px] font-semibold text-foreground">时间线规划</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function TrustPreview() {
  return (
    <BrowserFrame label="xingtu://workspace/trust">
      <div className="space-y-3">
        <div className="rounded-[1.3rem] border border-[rgba(17,24,39,0.06)] bg-white p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">来源标签</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {trustBadges.map((item, index) => (
              <span
                key={item}
                className={
                  index === 0
                    ? 'rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary'
                    : index === 1
                      ? 'rounded-full bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent-foreground'
                      : 'rounded-full bg-[#f4f6f8] px-3 py-1 text-[11px] font-semibold text-foreground'
                }
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-[1.1rem] border border-[rgba(17,24,39,0.06)] bg-white p-3 shadow-soft text-[11px] text-foreground">结论把握：高</div>
          <div className="rounded-[1.1rem] border border-[rgba(17,24,39,0.06)] bg-white p-3 shadow-soft text-[11px] text-foreground">信息时效：需复核</div>
          <div className="rounded-[1.1rem] border border-[rgba(17,24,39,0.06)] bg-white p-3 shadow-soft text-[11px] text-foreground">执行难度：中等</div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export default function EntryModule({ hotTopics }: EntryModuleProps) {
  return (
    <main className="page-shell space-y-16 py-10 sm:py-14">
      <section className="tabbit-hero">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-muted-foreground shadow-soft">
              <span className="font-semibold text-foreground">星图</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">beta</span>
            </div>
            <div className="space-y-4">
              <p className="text-base text-muted-foreground">理解你的上下文、帮你组织信息、执行决策、无限可能</p>
              <h1 className="tabbit-hero-title">星图决策台</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {quickCards.map((item) => (
                <a key={item.title} href={item.href} className="tabbit-shortcut group">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:text-primary" />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </a>
              ))}
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section id="context" className="space-y-6">
        <div className="space-y-3">
          <p className="tabbit-kicker">你看见的，就是上下文</p>
          <h2 className="tabbit-section-title">告别复制粘贴，所有背景资料，一键引用</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {contextCards.map((item) => (
            <div key={item.title} className="tabbit-info-card">
              <p className="text-lg font-semibold text-foreground">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-3">
          <p className="tabbit-kicker">任务，自主执行</p>
          <h2 className="tabbit-section-title">摆脱繁琐操作，系统自动接管决策拆解</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            在这个 Demo 里，我们把你的升学与就业问题拆成结论、动作、风险三层，让它更像一个成熟 AI 产品的能力展示。
          </p>
        </div>
        <ExecutionPreview />
      </section>

      <section id="modes" className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ModesPreview />
        <div className="space-y-3">
          <p className="tabbit-kicker">妙招，触手可及</p>
          <h2 className="tabbit-section-title">无需重复输入，常见问题自然沉淀成模板</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            这部分保留了你后面继续迭代 Demo 最需要的壳：多模式、快捷入口、模板式提示，但视觉上尽量贴近原站。
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {hotTopics.map((topic) => (
              <span key={topic} className="entry-chip">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-3">
          <p className="tabbit-kicker">主动权始终在你手里</p>
          <h2 className="tabbit-section-title">你的数据属于你，你决定答案该如何被信任</h2>
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
            对于你的项目，这一层被落成“官方优先、规则引擎、经验补充、风险边界”四层可信逻辑，用最少业务支撑最完整的产品感。
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="tabbit-micro-card">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">资料使用受控</span>
            </div>
            <div className="tabbit-micro-card">
              <Lock className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">输出边界明确</span>
            </div>
          </div>
        </div>
        <TrustPreview />
      </section>

      <section id="voices" className="space-y-6">
        <div className="space-y-3">
          <p className="tabbit-kicker">用户声音</p>
          <h2 className="tabbit-section-title">像真实产品一样，被不同角色自然接受</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="tabbit-info-card">
              <p className="text-sm leading-7 text-foreground">{item.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {item.name.slice(0, 1)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="space-y-6">
        <div className="space-y-3">
          <p className="tabbit-kicker">常见问题</p>
          <h2 className="tabbit-section-title">FAQ</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((item) => (
            <div key={item.title} className="tabbit-info-card">
              <p className="text-base font-semibold text-foreground">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary">
                <CheckCheck className="h-3.5 w-3.5" />
                可继续迭代
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="tabbit-hero">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            <p className="tabbit-kicker">开始使用</p>
            <h2 className="tabbit-section-title">从这个高保真壳子出发，继续往下改你的 Demo</h2>
            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              现在的目标不是讲业务完整，而是先把审美底座彻底定住。后面你可以基于这套站壳继续替换成自己的真实内容和交互。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/qa">
                <Button size="lg" className="gap-2">
                  打开问答 Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="gap-2 bg-white">
                  查看后台 Demo
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="tabbit-info-card">
              <MessagesSquare className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">问答页</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">保留真实回答、推荐和可信度展示。</p>
            </div>
            <div className="tabbit-info-card">
              <Workflow className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">后台页</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">保留最小控制台，继续接知识库和管理能力。</p>
            </div>
            <div className="tabbit-info-card">
              <Globe className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">整站风格</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">统一成接近原站的轻盈官网节奏。</p>
            </div>
            <div className="tabbit-info-card">
              <WandSparkles className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">后续空间</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">后面你可以直接在这个壳子里替换真实内容。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
