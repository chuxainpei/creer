interface RecommendedQuestionsProps {
  questions: string[];
}

export default function RecommendedQuestions({ questions }: RecommendedQuestionsProps) {
  return (
    <section className="card" style={{ padding: '1rem' }}>
      <h3 style={{ margin: '0.2rem 0 0.9rem', fontSize: '1rem' }}>推荐问题</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {questions.map((item) => (
          <span
            key={item}
            style={{
              border: '1px solid var(--line)',
              background: 'var(--muted)',
              borderRadius: '999px',
              padding: '0.3rem 0.7rem',
              fontSize: '0.85rem',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
