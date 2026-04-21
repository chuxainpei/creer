import type { SourceTag } from '@/src/lib/types';

interface SourceTagsProps {
  tags: SourceTag[];
}

export default function SourceTags({ tags }: SourceTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={`${tag.source_type}-${tag.label}`}
          className={[
            'rounded-full px-3 py-1 text-xs font-semibold shadow-soft border',
            tag.source_type === 'official' && 'border-primary/20 bg-primary/10 text-primary',
            tag.source_type === 'model_rule' && 'border-accent/20 bg-accent/10 text-accent-foreground',
            tag.source_type !== 'official' &&
              tag.source_type !== 'model_rule' &&
              'border-border bg-white/82 text-muted-foreground',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
