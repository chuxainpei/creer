import * as React from 'react';

import { cn } from '@/src/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-2xl border border-input bg-white/90 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export { Input };
