import Link from 'next/link';

interface EntryModuleProps {
  hotTopics: string[];
}

export default function EntryModule({ hotTopics }: EntryModuleProps) {
  return (
    <section className="shell" style={{ padding: '4.5rem 0 3rem' }}>
      <div className="card" style={{ padding: '2.2rem' }}>
        <p
          style={{
            margin: 0,
            fontSize: '0.8rem',
            letterSpacing: '0.14em',
            color: '#24507d',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Employment Center AI Desk
        </p>
        <h1 style={{ margin: '0.6rem 0 0', fontSize: '2rem', lineHeight: 1.2 }}>
          先看官方口径，再补充往届经验
        </h1>
        <p style={{ margin: '0.85rem 0 1.4rem', color: '#334155', lineHeight: 1.65, maxWidth: '680px' }}>
          面向毕业生的就业问答助手。回答优先基于就业中心通知、办事指南和流程文件，再在不冲突时补充往届去向参考，方便你快速决策。
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {hotTopics.map((topic) => (
            <span
              key={topic}
              style={{
                background: 'var(--muted)',
                border: '1px solid var(--line)',
                borderRadius: '999px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.86rem',
              }}
            >
              {topic}
            </span>
          ))}
        </div>

        <Link
          href="/qa"
          style={{
            display: 'inline-flex',
            background: 'var(--primary)',
            color: '#fff',
            padding: '0.72rem 1.2rem',
            borderRadius: '999px',
            fontWeight: 700,
          }}
        >
          进入就业问答
        </Link>
      </div>
    </section>
  );
}
