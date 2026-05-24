import { format, isPast, isToday } from 'date-fns';
import { motion } from 'framer-motion';
import { Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { typeMeta } from '@/lib/task-types';
import { cn } from '@/lib/utils';
import type { Task } from '@/lib/api';
import { Checkbox } from '@/components/ui/checkbox';

type TaskCardProps = {
  task: Task;
  onToggle?: (task: Task) => void;
};

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const meta = typeMeta(task.type, task.done);
  const Icon = meta.Icon;
  const when = new Date(task.when);
  const late = !task.done && isPast(when) && !isToday(when);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 360, damping: 30 }}
      className="list-none"
    >
      <div
        className={cn(
          'group relative flex items-stretch gap-3 overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm transition-all',
          'hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10',
          task.done && 'opacity-60',
        )}
      >
        <div
          aria-hidden
          className={cn(
            'w-1 shrink-0',
            late
              ? 'bg-[linear-gradient(180deg,hsl(0_84%_60%),hsl(330_81%_60%))]'
              : 'bg-[linear-gradient(180deg,hsl(263_85%_65%),hsl(198_93%_55%))]',
          )}
        />

        <div className="flex-1 flex items-center gap-3 p-3 sm:p-4">
          <div className="flex items-center pt-0.5">
            <Checkbox
              checked={task.done}
              onCheckedChange={() => onToggle?.(task)}
              onClick={(e) => e.stopPropagation()}
              aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
            />
          </div>

          <Link
            to={`/task/${task.id}`}
            className="flex-1 flex items-center gap-3 min-w-0 focus:outline-none"
          >
            <div
              className={cn(
                'flex h-11 w-11 shrink-0 items-center justify-center rounded-lg',
                meta.bg,
                meta.accent,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className={cn(
                  'truncate text-sm font-semibold sm:text-base',
                  task.done && 'line-through text-muted-foreground',
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="truncate text-xs text-muted-foreground sm:text-sm">
                  {task.description}
                </p>
              )}
            </div>

            <div className="ml-2 flex shrink-0 flex-col items-end gap-1">
              <span
                className={cn(
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
                  late
                    ? 'bg-rose-500/15 text-rose-400'
                    : task.done
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                {late ? (
                  <>
                    <Clock className="h-3 w-3" />
                    late
                  </>
                ) : task.done ? (
                  <>
                    <Check className="h-3 w-3" />
                    done
                  </>
                ) : (
                  format(when, 'HH:mm')
                )}
              </span>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {format(when, 'MMM d')}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </motion.li>
  );
}
