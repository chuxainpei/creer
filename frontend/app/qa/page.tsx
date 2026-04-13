import ChatShell from '@/src/components/qa/ChatShell';

const recommendedQuestions = [
  '三方协议怎么办',
  '双选会报名流程',
  '简历优化怎么准备',
  '档案去向怎么确认',
  '求职补贴什么时候申请',
  '公务员/选调要关注什么',
];

export default function QaPage() {
  return (
    <main className="page-shell py-8 sm:py-10">
      <section className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            官方优先
          </span>
          <span className="rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
            可嵌入官网入口
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">就业中心智能问答</h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            回答优先依据学校就业中心官方资料生成；若官方资料未完全覆盖，才会附加经验参考，并明确说明它不能替代正式要求。
          </p>
        </div>
      </section>

      <ChatShell initialPrompts={recommendedQuestions} />
    </main>
  );
}
