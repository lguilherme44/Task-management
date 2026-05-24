import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Filter } from '@/lib/api';

type FilterPillProps = {
  label: string;
  value: Filter;
  count?: number;
  active: boolean;
  onSelect: (value: Filter) => void;
  tone?: 'default' | 'danger';
};

export function FilterPill({ label, value, count, active, onSelect, tone = 'default' }: FilterPillProps) {
  const isDanger = tone === 'danger';
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
        'border border-border/60 bg-card/40 hover:bg-card cursor-pointer',
        active && 'text-primary-foreground border-transparent',
        active && isDanger && 'text-white',
      )}
    >
      {active && (
        <motion.span
          layoutId="filter-active"
          className={cn(
            'absolute inset-0 -z-10 rounded-full shadow-lg',
            isDanger
              ? 'bg-[linear-gradient(135deg,hsl(0_84%_60%),hsl(330_81%_60%))] shadow-rose-500/30'
              : 'bg-[linear-gradient(135deg,hsl(263_85%_60%),hsl(198_93%_55%))] shadow-primary/30',
          )}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative">{label}</span>
      {typeof count === 'number' && (
        <span
          className={cn(
            'relative inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold tabular-nums',
            active ? 'bg-white/25 text-white' : 'bg-muted text-muted-foreground',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
