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
          className={
            tag.source_type === 'official'
              ? 'rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary'
              : 'rounded-full border border-border bg-white/80 px-3 py-1 text-xs font-semibold text-muted-foreground'
          }
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}
