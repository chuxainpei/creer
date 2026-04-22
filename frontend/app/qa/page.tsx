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
      <section className="tabbit-hero">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <span className="tabbit-pill">问任何问题...</span>
              <span className="tabbit-pill">产品能力演示页</span>
            </div>
            <div className="space-y-3">
              <p className="tabbit-kicker">理解你的上下文、帮你组织信息、执行决策、无限可能</p>
              <h1 className="tabbit-section-title">把真实业务，包进一张像官网截图的产品界面里</h1>
              <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                这里保留你后面继续改 Demo 最有价值的最低业务能力：输入问题，系统返回结论、推荐方案、风险提示和可信度说明。
              </p>
            </div>
          </div>
          <div className="tabbit-frame p-4 sm:p-5">
            <div className="flex items-center gap-2 border-b border-[rgba(17,24,39,0.06)] pb-3">
              <span className="browser-dot bg-[#ff8b7b]" />
              <span className="browser-dot bg-[#ffd86f]" />
              <span className="browser-dot bg-[#6ad39b]" />
              <div className="ml-2 rounded-full bg-[#f5f6f8] px-3 py-1 text-[11px] text-muted-foreground">xingtu://preview/qa</div>
            </div>
            <div className="grid gap-3 pt-4 sm:grid-cols-3">
              <div className="tabbit-pane">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">系统理解</p>
                <p className="mt-3 text-sm leading-7 text-foreground">先识别背景、目标和限制条件，再组织成真正可执行的答案。</p>
              </div>
              <div className="tabbit-pane">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">推荐输出</p>
                <p className="mt-3 text-sm leading-7 text-foreground">同时给出方案、动作和风险，不只是聊天式回应。</p>
              </div>
              <div className="tabbit-pane">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">可信解释</p>
                <p className="mt-3 text-sm leading-7 text-foreground">所有回答都保留来源标签和可信度，让演示更像成熟产品。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatShell initialPrompts={recommendedQuestions} />
    </main>
  );
}
