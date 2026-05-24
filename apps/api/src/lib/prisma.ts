import { env } from '../env.js';
import { PrismaClient } from '@prisma/client';

const logLevels: Record<typeof env.NODE_ENV, ('warn' | 'error')[]> = {
  development: ['warn', 'error'],
  test: ['error'],
  production: ['error'],
};

export const prisma = new PrismaClient({
  datasources: { db: { url: env.DATABASE_URL } },
  log: logLevels[env.NODE_ENV],
});
