import { z } from 'zod';

export const TASK_TYPES = [
  'default',
  'football',
  'food',
  'job',
  'people',
  'study',
  'shopping',
  'airplane',
  'gym',
  'done',
] as const;

export type TaskType = (typeof TASK_TYPES)[number];

export const createTaskSchema = z.object({
  type: z.coerce.number().int().min(1).max(10),
  title: z.string().min(1, 'Title is required').max(120),
  description: z.string().max(2000).optional().nullable(),
  when: z.coerce.date(),
  done: z.boolean().default(false),
});

export const updateTaskSchema = createTaskSchema.partial();

export const filterSchema = z.enum(['all', 'today', 'week', 'month', 'year', 'late']);
export type Filter = z.infer<typeof filterSchema>;

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
