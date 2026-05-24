import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[100px] w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-sm transition-all',
      'placeholder:text-muted-foreground',
      'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:outline-none',
      'disabled:cursor-not-allowed disabled:opacity-50 resize-y',
      className,
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';
