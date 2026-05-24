import { Router } from 'express';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { NotFound } from '../lib/errors.js';
import { createTaskSchema, filterSchema, updateTaskSchema } from '../schemas/task.js';

const router = Router();

router.use(requireAuth);

function rangeFor(filter: string) {
  const now = new Date();
  switch (filter) {
    case 'today':
      return { gte: startOfDay(now), lte: endOfDay(now) };
    case 'week':
      return { gte: startOfWeek(now, { weekStartsOn: 1 }), lte: endOfWeek(now, { weekStartsOn: 1 }) };
    case 'month':
      return { gte: startOfMonth(now), lte: endOfMonth(now) };
    case 'year':
      return { gte: startOfYear(now), lte: endOfYear(now) };
    default:
      return null;
  }
}

router.get('/', async (req, res, next) => {
  try {
    const filter = filterSchema.parse(req.query.filter ?? 'all');
    const userId = req.userId!;

    const where: Record<string, unknown> = { userId };

    if (filter === 'late') {
      where.when = { lt: new Date() };
      where.done = false;
    } else {
      const range = rangeFor(filter);
      if (range) where.when = range;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { when: 'asc' },
    });

    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    const userId = req.userId!;
    const now = new Date();

    const [today, late, week, total, done] = await Promise.all([
      prisma.task.count({
        where: { userId, when: { gte: startOfDay(now), lte: endOfDay(now) } },
      }),
      prisma.task.count({
        where: { userId, when: { lt: now }, done: false },
      }),
      prisma.task.count({
        where: {
          userId,
          when: { gte: startOfWeek(now, { weekStartsOn: 1 }), lte: endOfWeek(now, { weekStartsOn: 1 }) },
        },
      }),
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, done: true } }),
    ]);

    res.json({ today, late, week, total, done });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await prisma.task.findFirst({
      where: { id: req.params.id, userId: req.userId! },
    });
    if (!task) throw NotFound('Task not found');
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const data = createTaskSchema.parse(req.body);
    const task = await prisma.task.create({
      data: { ...data, userId: req.userId! },
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const data = updateTaskSchema.parse(req.body);
    const existing = await prisma.task.findFirst({
      where: { id: req.params.id, userId: req.userId! },
    });
    if (!existing) throw NotFound('Task not found');

    const task = await prisma.task.update({
      where: { id: existing.id },
      data,
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/toggle', async (req, res, next) => {
  try {
    const existing = await prisma.task.findFirst({
      where: { id: req.params.id, userId: req.userId! },
    });
    if (!existing) throw NotFound('Task not found');

    const task = await prisma.task.update({
      where: { id: existing.id },
      data: { done: !existing.done },
    });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const existing = await prisma.task.findFirst({
      where: { id: req.params.id, userId: req.userId! },
    });
    if (!existing) throw NotFound('Task not found');

    await prisma.task.delete({ where: { id: existing.id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
