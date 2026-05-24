import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative h-8 w-8">
        <div className="absolute inset-0 rounded-lg bg-[linear-gradient(135deg,hsl(263_85%_60%)_0%,hsl(198_93%_60%)_50%,hsl(330_81%_60%)_100%)] shadow-lg shadow-primary/40" />
        <svg
          viewBox="0 0 24 24"
          className="absolute inset-0 h-8 w-8 p-1.5 text-white"
          fill="none"
          strokeWidth={3}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12.5 9 17.5 20 6.5" />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight">
        Task<span className="gradient-text">Flow</span>
      </span>
    </div>
  );
}
