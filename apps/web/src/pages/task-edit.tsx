import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { TypePicker } from '@/components/type-picker';
import { api, type ApiError, type Task } from '@/lib/api';

const schema = z.object({
  type: z.coerce.number().int().min(1).max(9),
  title: z.string().min(1, 'Title is required').max(120),
  description: z.string().max(2000).optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  done: z.boolean().default(false),
});

type FormValues = z.infer<typeof schema>;

function combineDateTime(date: string, time: string): string {
  return new Date(`${date}T${time}`).toISOString();
}

export default function TaskEditPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === 'new';
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const taskQuery = useQuery({
    queryKey: ['task', id],
    queryFn: () => api.get<Task>(`/tasks/${id}`),
    enabled: !isNew,
  });

  const now = new Date();
  const defaultValues: FormValues = {
    type: 1,
    title: '',
    description: '',
    date: format(now, 'yyyy-MM-dd'),
    time: format(now, 'HH:mm'),
    done: false,
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (taskQuery.data) {
      const d = new Date(taskQuery.data.when);
      reset({
        type: taskQuery.data.type,
        title: taskQuery.data.title,
        description: taskQuery.data.description ?? '',
        date: format(d, 'yyyy-MM-dd'),
        time: format(d, 'HH:mm'),
        done: taskQuery.data.done,
      });
    }
  }, [taskQuery.data, reset]);

  const saveMutation = useMutation({
    mutationFn: (values: FormValues) => {
      const payload = {
        type: values.type,
        title: values.title,
        description: values.description || null,
        when: combineDateTime(values.date, values.time),
        done: values.done,
      };
      return isNew
        ? api.post<Task>('/tasks', payload)
        : api.put<Task>(`/tasks/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success(isNew ? 'Task created' : 'Task saved');
      navigate('/');
    },
    onError: (err: ApiError) => {
      toast.error(err.message || 'Could not save');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      toast.success('Task deleted');
      navigate('/');
    },
    onError: (err: ApiError) => {
      toast.error(err.message || 'Could not delete');
    },
  });

  const typeValue = watch('type');
  const doneValue = watch('done');

  return (
    <div className="aurora min-h-dvh">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? (
              <>
                Create a <span className="gradient-text">new task</span>
              </>
            ) : (
              <>
                Edit <span className="gradient-text">task</span>
              </>
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a category, set the date and time, and you are good to go.
          </p>
        </motion.div>

        {taskQuery.isLoading && !isNew ? (
          <div className="mt-10 flex justify-center">
            <Spinner className="h-6 w-6 text-primary" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit((v) => saveMutation.mutate(v))}
            className="mt-8 space-y-6"
          >
            <section className="space-y-2">
              <Label>Category</Label>
              <TypePicker value={typeValue} onChange={(v) => setValue('type', v, { shouldValidate: true })} />
            </section>

            <section className="grid gap-4 sm:grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="What needs to be done?" {...register('title')} />
                {errors.title && <p className="text-xs text-rose-400">{errors.title.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Add details, links, or context"
                  {...register('description')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" {...register('date')} />
                  {errors.date && <p className="text-xs text-rose-400">{errors.date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" {...register('time')} />
                  {errors.time && <p className="text-xs text-rose-400">{errors.time.message}</p>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="done"
                  checked={doneValue}
                  onCheckedChange={(c) => setValue('done', c === true)}
                />
                <Label htmlFor="done" className="cursor-pointer">
                  Mark as completed
                </Label>
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              {!isNew ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    if (confirm('Delete this task?')) deleteMutation.mutate();
                  }}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? <Spinner /> : <Trash2 className="h-4 w-4" />}
                  Delete
                </Button>
              ) : (
                <span />
              )}

              <div className="flex gap-2 sm:justify-end">
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="gradient"
                  disabled={saveMutation.isPending}
                >
                  {saveMutation.isPending ? <Spinner /> : <Save className="h-4 w-4" />}
                  {isNew ? 'Create' : 'Save'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
