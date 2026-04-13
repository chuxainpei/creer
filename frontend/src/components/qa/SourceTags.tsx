import type { SourceTag } from '@/src/lib/types';

interface SourceTagsProps {
  tags: SourceTag[];
}

export default function SourceTags({ tags }: SourceTagsProps) {
  return (
    <section className="card" style={{ padding: '1rem' }}>
      <h3 style={{ margin: '0.2rem 0 0.9rem', fontSize: '1rem' }}>来源</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags.map((tag) => {
          const tagStyle =
            tag.source_type === 'official'
              ? { background: '#e9f2ff', color: '#1e4f8d' }
              : { background: '#edf1f5', color: '#3a4a5a' };

          return (
            <span
              key={`${tag.source_type}-${tag.label}`}
              style={{
                ...tagStyle,
                borderRadius: '999px',
                border: '1px solid var(--line)',
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.3rem 0.7rem',
              }}
            >
              {tag.label}
            </span>
          );
        })}
      </div>
    </section>
  );
}
