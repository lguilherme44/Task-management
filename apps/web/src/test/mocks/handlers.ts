import { http, HttpResponse } from 'msw';
import { addDays, addHours, subDays } from 'date-fns';

let nextId = 1;

type Task = {
  id: string;
  type: number;
  title: string;
  description: string | null;
  when: string;
  done: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type User = { id: string; name: string; email: string; password: string };

let users: User[] = [];
let tasks: Task[] = [];
const TOKEN = 'mock-token';

function reset() {
  users = [];
  tasks = [];
  nextId = 1;
  seedDemo();
}

function seedDemo() {
  users.push({
    id: 'demo-1',
    name: 'Demo',
    email: 'demo@taskflow.dev',
    password: 'demo1234',
  });
  const now = new Date();
  const make = (partial: Omit<Task, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Task => {
    const id = `task-${nextId++}`;
    return {
      ...partial,
      id,
      userId: 'demo-1',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };
  };
  tasks.push(make({ type: 4, title: 'Sprint planning', description: null, when: addHours(now, 1).toISOString(), done: false }));
  tasks.push(make({ type: 1, title: 'Overdue thing', description: null, when: subDays(now, 2).toISOString(), done: false }));
  tasks.push(make({ type: 9, title: 'Workout', description: null, when: addDays(now, 1).toISOString(), done: true }));
}

reset();

function getAuthUser(request: Request): User | null {
  const header = request.headers.get('authorization');
  if (header !== `Bearer ${TOKEN}`) return null;
  return users[0] ?? null;
}

export { reset as resetMockStore, TOKEN as MOCK_TOKEN, users as mockUsers, tasks as mockTasks };

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const user = users.find((u) => u.email === body.email && u.password === body.password);
    if (!user) {
      return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    return HttpResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: TOKEN,
    });
  }),

  http.post('/api/auth/register', async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string; password: string };
    if (users.some((u) => u.email === body.email)) {
      return HttpResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    const user = { id: `u-${Date.now()}`, name: body.name, email: body.email, password: body.password };
    users.push(user);
    return HttpResponse.json(
      {
        user: { id: user.id, name: user.name, email: user.email },
        token: TOKEN,
      },
      { status: 201 },
    );
  }),

  http.get('/api/tasks', ({ request }) => {
    if (!getAuthUser(request)) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const url = new URL(request.url);
    const filter = url.searchParams.get('filter') ?? 'all';
    const now = new Date();
    let result = [...tasks];
    if (filter === 'late') result = result.filter((t) => !t.done && new Date(t.when) < now);
    if (filter === 'today') {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      result = result.filter((t) => {
        const d = new Date(t.when);
        return d >= start && d <= end;
      });
    }
    return HttpResponse.json(result);
  }),

  http.get('/api/tasks/stats', ({ request }) => {
    if (!getAuthUser(request)) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const now = new Date();
    return HttpResponse.json({
      today: tasks.filter((t) => new Date(t.when).toDateString() === now.toDateString()).length,
      late: tasks.filter((t) => !t.done && new Date(t.when) < now).length,
      week: tasks.length,
      total: tasks.length,
      done: tasks.filter((t) => t.done).length,
    });
  }),

  http.get('/api/tasks/:id', ({ request, params }) => {
    if (!getAuthUser(request)) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const task = tasks.find((t) => t.id === params.id);
    if (!task) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(task);
  }),

  http.post('/api/tasks', async ({ request }) => {
    if (!getAuthUser(request)) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = (await request.json()) as Partial<Task>;
    const now = new Date().toISOString();
    const created: Task = {
      id: `task-${nextId++}`,
      type: body.type ?? 1,
      title: body.title ?? 'Untitled',
      description: body.description ?? null,
      when: body.when ?? now,
      done: body.done ?? false,
      userId: 'demo-1',
      createdAt: now,
      updatedAt: now,
    };
    tasks.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put('/api/tasks/:id', async ({ request, params }) => {
    if (!getAuthUser(request)) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const idx = tasks.findIndex((t) => t.id === params.id);
    if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    const body = (await request.json()) as Partial<Task>;
    tasks[idx] = { ...tasks[idx], ...body, updatedAt: new Date().toISOString() } as Task;
    return HttpResponse.json(tasks[idx]);
  }),

  http.patch('/api/tasks/:id/toggle', ({ request, params }) => {
    if (!getAuthUser(request)) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const idx = tasks.findIndex((t) => t.id === params.id);
    if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    tasks[idx] = { ...tasks[idx], done: !tasks[idx].done } as Task;
    return HttpResponse.json(tasks[idx]);
  }),

  http.delete('/api/tasks/:id', ({ request, params }) => {
    if (!getAuthUser(request)) return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const idx = tasks.findIndex((t) => t.id === params.id);
    if (idx === -1) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    tasks.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
