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
            tag.source_type === 'official' && 'border-primary/20 bg-primary/12 text-primary',
            tag.source_type === 'model_rule' && 'border-foreground/20 bg-foreground/10 text-foreground',
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
