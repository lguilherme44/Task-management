import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatsPillProps = {
  label: string;
  value: number;
  Icon: LucideIcon;
  tone: 'primary' | 'success' | 'warning' | 'danger';
  delay?: number;
};

const tones = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-emerald-500/10 text-emerald-400',
  warning: 'bg-amber-500/10 text-amber-400',
  danger: 'bg-rose-500/10 text-rose-400',
} as const;

export function StatsPill({ label, value, Icon, tone, delay = 0 }: StatsPillProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/70 backdrop-blur p-3 sm:p-4"
    >
      <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', tones[tone])}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold leading-none tabular-nums">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </motion.div>
  );
}
