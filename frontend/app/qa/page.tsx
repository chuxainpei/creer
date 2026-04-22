import ChatShell from '@/src/components/qa/ChatShell';

const recommendedQuestions = [
  '我目前背景适合冲刺哪些计算机硕士项目？',
  '我该主攻产品运营还是数据分析岗位？',
  '给我一个 3 个月求职节奏建议，目标是拿到实习 offer。',
  '如果 GPA 一般但项目经历不错，该怎么选院校梯度？',
  '应届生简历要怎么排版，才能提高通过率？',
  '我想转方向做 AI 产品，先补哪些能力最划算？',
];

export default function QaPage() {
  return (
    <main className="page-shell space-y-8 py-8 sm:space-y-10 sm:py-10">
      <section className="hero-grid rounded-[2rem] px-6 py-8 sm:px-8">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="command-chip">问任何问题...</span>
            <span className="rounded-full border border-white/80 bg-white/78 px-3 py-1 text-xs font-semibold text-muted-foreground">
              产品能力演示页
            </span>
          </div>
          <div className="space-y-2">
            <h1 className="display-type text-3xl font-semibold tracking-tight sm:text-5xl">把问题交给系统，把路径带走</h1>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              这里保留最低业务能力：输入一个问题，系统理解背景后返回结论、推荐路径、风险提示和可信度说明。
            </p>
          </div>
        </div>
      </section>

      <ChatShell initialPrompts={recommendedQuestions} />
    </main>
  );
}
