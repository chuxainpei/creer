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
    <main className="page-shell py-8 sm:py-10">
      <section className="hero-grid mb-6 space-y-4 rounded-[1.7rem] p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="command-chip">现场演示模式</span>
          <span className="rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold text-muted-foreground">Atlas 交互壳体</span>
          <span className="rounded-full border border-warning/20 bg-warning/10 px-3 py-1 text-xs font-semibold text-warning-foreground">推荐导向回答</span>
        </div>
        <div className="space-y-2">
          <h1 className="display-type text-3xl font-semibold tracking-tight sm:text-4xl">升学与就业决策驾驶舱</h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            这一页专门用于路演演示“真实产品感”：输入问题后，系统会先给结论，再展示推荐排序、行动建议、风险提示与可信度说明。
          </p>
        </div>
      </section>

      <section className="mb-6 grid gap-4 lg:grid-cols-3">
        <div className="neo-panel rounded-[1.2rem] p-4">
          <p className="text-sm font-semibold text-foreground">演示重点</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">重点展示“推荐排序 + 行动建议 + 风险提示”的完整决策链路。</p>
        </div>
        <div className="neo-panel rounded-[1.2rem] p-4">
          <p className="text-sm font-semibold text-foreground">可信度策略</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">官方口径优先，经验信息仅补充，不替代正式办理或招生要求。</p>
        </div>
        <div className="neo-panel rounded-[1.2rem] p-4">
          <p className="text-sm font-semibold text-foreground">评委观感</p>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">用结构化答案减少“聊天玩具感”，强调“可落地产品感”。</p>
        </div>
      </section>

      <ChatShell initialPrompts={recommendedQuestions} />
    </main>
  );
}
