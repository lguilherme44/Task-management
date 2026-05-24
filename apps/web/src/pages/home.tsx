import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarDays, CheckCircle2, AlertTriangle, ListTodo, Inbox, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Header } from '@/components/header';
import { FilterPill } from '@/components/filter-pill';
import { TaskCard } from '@/components/task-card';
import { StatsPill } from '@/components/stats-pill';
import { Button } from '@/components/ui/button';
import { api, type Filter, type Stats, type Task } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';

const FILTERS: { value: Filter; label: string; tone?: 'default' | 'danger' }[] = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'year', label: 'This year' },
  { value: 'all', label: 'All' },
  { value: 'late', label: 'Late', tone: 'danger' },
];

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>('today');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const tasksQuery = useQuery({
    queryKey: ['tasks', filter],
    queryFn: () => api.get<Task[]>(`/tasks?filter=${filter}`),
  });

  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: () => api.get<Stats>('/tasks/stats'),
  });

  const toggleMutation = useMutation({
    mutationFn: (task: Task) => api.patch<Task>(`/tasks/${task.id}/toggle`),
    onMutate: async (task) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', filter] });
      const previous = queryClient.getQueryData<Task[]>(['tasks', filter]);
      queryClient.setQueryData<Task[]>(['tasks', filter], (old) =>
        old?.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)),
      );
      return { previous };
    },
    onError: (_err, _task, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(['tasks', filter], ctx.previous);
      toast.error('Could not update task');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  const tasks = tasksQuery.data ?? [];
  const stats = statsQuery.data;
  const filterMeta = FILTERS.find((f) => f.value === filter);

  return (
    <div className="aurora min-h-dvh">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Hi, <span className="gradient-text">{user?.name?.split(' ')[0] ?? 'there'}</span>
            </h1>
            <p className="mt-1 text-muted-foreground">
              {stats?.today
                ? `You have ${stats.today} task${stats.today === 1 ? '' : 's'} scheduled today.`
                : "You don't have any tasks scheduled today — enjoy your day."}
            </p>
          </motion.div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatsPill
              label="Today"
              value={stats?.today ?? 0}
              Icon={CalendarDays}
              tone="primary"
              delay={0.05}
            />
            <StatsPill
              label="This week"
              value={stats?.week ?? 0}
              Icon={ListTodo}
              tone="warning"
              delay={0.1}
            />
            <StatsPill
              label="Completed"
              value={stats?.done ?? 0}
              Icon={CheckCircle2}
              tone="success"
              delay={0.15}
            />
            <StatsPill
              label="Late"
              value={stats?.late ?? 0}
              Icon={AlertTriangle}
              tone="danger"
              delay={0.2}
            />
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <FilterPill
                key={f.value}
                label={f.label}
                value={f.value}
                active={filter === f.value}
                onSelect={setFilter}
                tone={f.tone}
                count={f.value === 'late' ? stats?.late : undefined}
              />
            ))}
          </div>

          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">
              {filterMeta?.label ?? 'Tasks'}
              <span className="ml-2 text-sm font-normal text-muted-foreground tabular-nums">
                {tasksQuery.isFetching ? '…' : tasks.length}
              </span>
            </h2>
          </div>

          {tasksQuery.isLoading ? (
            <SkeletonList />
          ) : tasks.length === 0 ? (
            <EmptyState filter={filter} onCreate={() => navigate('/task/new')} />
          ) : (
            <ul className="space-y-2.5">
              <AnimatePresence initial={false}>
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggle={(t) => toggleMutation.mutate(t)}
                  />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

function SkeletonList() {
  return (
    <ul className="space-y-2.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="h-[72px] animate-pulse rounded-xl border border-border/60 bg-card/50"
          style={{ animationDelay: `${i * 75}ms` }}
        />
      ))}
    </ul>
  );
}

function EmptyState({ filter, onCreate }: { filter: Filter; onCreate: () => void }) {
  const messages: Record<Filter, { title: string; subtitle: string }> = {
    today: { title: 'Your day is clear', subtitle: 'No tasks scheduled for today. Make one count.' },
    week: { title: 'Light week ahead', subtitle: 'Plan ahead — you have room to grow.' },
    month: { title: 'Empty month', subtitle: 'Set monthly goals to make progress.' },
    year: { title: 'Yearly view is empty', subtitle: 'Dream bigger.' },
    all: { title: 'No tasks yet', subtitle: 'Create your first task and get going.' },
    late: { title: 'Nothing late', subtitle: 'Beautiful — you are caught up.' },
  };
  const { title, subtitle } = messages[filter];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/40 px-6 py-16 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Inbox className="h-7 w-7" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Button variant="gradient" onClick={onCreate}>
        <Plus className="h-4 w-4" />
        New task
      </Button>
    </motion.div>
  );
}
