import bcrypt from 'bcryptjs';
import { addDays, addHours } from 'date-fns';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';

let counter = 0;

export async function createUser(overrides: Partial<{ name: string; email: string; password: string }> = {}) {
  counter += 1;
  const password = overrides.password ?? 'password123';
  const user = await prisma.user.create({
    data: {
      name: overrides.name ?? `User ${counter}`,
      email: overrides.email ?? `user${counter}-${Date.now()}@test.dev`,
      password: await bcrypt.hash(password, 10),
    },
  });
  const token = signToken({ userId: user.id });
  return { user, token, rawPassword: password };
}

export async function createTask(
  userId: string,
  overrides: Partial<{ type: number; title: string; description: string | null; when: Date; done: boolean }> = {},
) {
  return prisma.task.create({
    data: {
      type: overrides.type ?? 1,
      title: overrides.title ?? 'Sample task',
      description: overrides.description ?? null,
      when: overrides.when ?? addHours(new Date(), 1),
      done: overrides.done ?? false,
      userId,
    },
  });
}

export function futureDate(daysAhead = 1) {
  return addDays(new Date(), daysAhead);
}

export function pastDate(daysAgo = 1) {
  return addDays(new Date(), -daysAgo);
}
