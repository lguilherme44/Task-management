import { execSync } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, beforeEach } from 'vitest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEST_DB = path.resolve(__dirname, '../../prisma/test.db');

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = `file:${TEST_DB}`;
process.env.JWT_SECRET = 'test-secret-do-not-use-in-prod';
process.env.JWT_EXPIRES_IN = '1h';
process.env.WEB_ORIGIN = 'http://localhost:5173';

beforeAll(() => {
  // Reset test database before the whole suite
  for (const suffix of ['', '-journal']) {
    const f = TEST_DB + suffix;
    if (existsSync(f)) unlinkSync(f);
  }
  execSync('pnpm exec prisma db push --skip-generate --force-reset --accept-data-loss', {
    cwd: path.resolve(__dirname, '../..'),
    env: { ...process.env },
    stdio: 'pipe',
  });
});

beforeEach(async () => {
  const { prisma } = await import('../lib/prisma.js');
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  const { prisma } = await import('../lib/prisma.js');
  await prisma.$disconnect();
});
