import ChatShell from '@/src/components/qa/ChatShell';
import RecommendedQuestions from '@/src/components/qa/RecommendedQuestions';
import SourceTags from '@/src/components/qa/SourceTags';
import type { SourceTag } from '@/src/lib/types';

const recommendedQuestions = ['三方协议', '双选会', '简历优化', '档案去向', '求职补贴', '公务员/选调'];

const defaultTags: SourceTag[] = [
  { label: '官方通知', source_type: 'official' },
  { label: '办事指南', source_type: 'official' },
  { label: '往届去向参考', source_type: 'graduate_reference' },
];

export default function QaPage() {
  return (
    <main className="shell" style={{ padding: '2.4rem 0 3.2rem' }}>
      <section style={{ marginBottom: '1rem' }}>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem' }}>就业问答中心</h1>
        <p style={{ margin: 0, color: 'var(--soft-ink)', lineHeight: 1.65 }}>
          回答以学校就业中心官方内容为第一依据。若官方信息覆盖不足，系统会明确标注“经验参考”并避免替代官方结论。
        </p>
      </section>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr' }}>
        <RecommendedQuestions questions={recommendedQuestions} />
        <ChatShell initialQuestion="双选会如何报名？" />
        <SourceTags tags={defaultTags} />
      </div>

      <section className="card" style={{ marginTop: '1rem', padding: '1rem' }}>
        <p style={{ margin: 0, color: 'var(--soft-ink)', fontSize: '0.86rem', lineHeight: 1.6 }}>
          声明：本页面用于就业咨询辅助，具体办理时间、材料和流程请以就业中心官网及学院通知为准。
        </p>
      </section>
    </main>
  );
}
