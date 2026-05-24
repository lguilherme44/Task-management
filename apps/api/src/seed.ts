import bcrypt from 'bcryptjs';
import { addDays, addHours, setHours, startOfDay } from 'date-fns';
import { env } from './env.js';
import { prisma } from './lib/prisma.js';

const DEMO_EMAIL = 'demo@taskflow.dev';
const DEMO_PASSWORD = 'demo1234';

async function seed({ force = false }: { force?: boolean } = {}) {
  const existing = await prisma.user.findUnique({ where: { email: DEMO_EMAIL } });

  if (existing && !force) {
    console.log(`[seed] demo user already exists — skipping (set FORCE_SEED=1 to override)`);
    return;
  }

  const password = await bcrypt.hash(DEMO_PASSWORD, 10);
  const user = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: { name: 'Demo', email: DEMO_EMAIL, password },
  });

  await prisma.task.deleteMany({ where: { userId: user.id } });

  const today = startOfDay(new Date());
  const tasks = [
    { type: 4, title: 'Sprint planning', description: 'Review backlog and pick stories', when: setHours(today, 10), done: false },
    { type: 3, title: 'Lunch with team', description: 'Try the new ramen place', when: setHours(today, 12), done: false },
    { type: 9, title: 'Workout', description: 'Pull day', when: setHours(today, 18), done: true },
    { type: 5, title: 'Read 30min', description: 'Continue Designing Data-Intensive Apps', when: setHours(today, 21), done: false },
    { type: 6, title: 'Groceries', description: 'Coffee, oats, eggs', when: addDays(setHours(today, 11), 1), done: false },
    { type: 2, title: 'Football match', description: 'Champions League final', when: addDays(setHours(today, 20), 2), done: false },
    { type: 7, title: 'Flight to Lisbon', description: 'Gate B12, terminal 3', when: addDays(setHours(today, 7), 5), done: false },
    { type: 1, title: 'Late task example', description: 'Looks orange because it slipped past', when: addHours(today, -36), done: false },
  ];

  for (const task of tasks) {
    await prisma.task.create({ data: { ...task, userId: user.id } });
  }

  console.log(`[seed] Seeded ${tasks.length} tasks for ${DEMO_EMAIL} / ${DEMO_PASSWORD} (${env.NODE_ENV})`);
}

const isMain =
  import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith('seed.js') ||
  process.argv[1]?.endsWith('seed.ts');

if (isMain) {
  const force = process.env.FORCE_SEED === '1';
  seed({ force })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}

export { seed };
