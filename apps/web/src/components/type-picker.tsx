import { motion } from 'framer-motion';
import { TASK_TYPES } from '@/lib/task-types';
import { cn } from '@/lib/utils';

type TypePickerProps = {
  value: number;
  onChange: (value: number) => void;
};

export function TypePicker({ value, onChange }: TypePickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
      {TASK_TYPES.filter((t) => t.id !== 10).map((t) => {
        const Icon = t.Icon;
        const active = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            aria-pressed={active}
            className={cn(
              'group relative flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 transition-all cursor-pointer',
              'border-border/60 bg-card hover:border-primary/40 hover:-translate-y-0.5',
              active && 'border-primary/0',
            )}
          >
            {active && (
              <motion.span
                layoutId="type-active"
                className="absolute inset-0 -z-10 rounded-xl bg-primary/15 border-2 border-primary shadow-lg shadow-primary/20"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <div
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                active ? 'bg-primary text-primary-foreground' : `${t.bg} ${t.accent}`,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span
              className={cn(
                'text-[11px] font-medium',
                active ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
