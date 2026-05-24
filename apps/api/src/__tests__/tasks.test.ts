import { describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { addDays, addHours, setHours, startOfDay, subDays } from 'date-fns';
import { testApp } from '../test/app.js';
import { createTask, createUser } from '../test/factories.js';
import { prisma } from '../lib/prisma.js';

function auth(token: string) {
  return { Authorization: `Bearer ${token}` };
}

describe('GET /tasks', () => {
  it('returns user tasks ordered by `when` ASC', async () => {
    const { user, token } = await createUser();
    const t1 = await createTask(user.id, { title: 'Later', when: addDays(new Date(), 3) });
    const t2 = await createTask(user.id, { title: 'Sooner', when: addDays(new Date(), 1) });

    const res = await request(testApp).get('/tasks?filter=all').set(auth(token));

    expect(res.status).toBe(200);
    expect(res.body.map((t: { id: string }) => t.id)).toEqual([t2.id, t1.id]);
  });

  it('isolates tasks per user', async () => {
    const { user: u1, token: t1 } = await createUser();
    const { user: u2 } = await createUser();
    await createTask(u1.id, { title: 'Mine' });
    await createTask(u2.id, { title: 'Yours' });

    const res = await request(testApp).get('/tasks?filter=all').set(auth(t1));

    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Mine');
  });

  it('filter=today returns only tasks scheduled today', async () => {
    const { user, token } = await createUser();
    const today = startOfDay(new Date());
    await createTask(user.id, { title: 'Today', when: setHours(today, 14) });
    await createTask(user.id, { title: 'Tomorrow', when: addDays(setHours(today, 14), 1) });

    const res = await request(testApp).get('/tasks?filter=today').set(auth(token));

    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Today');
  });

  it('filter=week returns tasks within current ISO week', async () => {
    const { user, token } = await createUser();
    await createTask(user.id, { title: 'This week', when: addDays(new Date(), 1) });
    await createTask(user.id, { title: 'Next month', when: addDays(new Date(), 60) });

    const res = await request(testApp).get('/tasks?filter=week').set(auth(token));

    const titles = res.body.map((t: { title: string }) => t.title);
    expect(titles).toContain('This week');
    expect(titles).not.toContain('Next month');
  });

  it('filter=month returns tasks in current month', async () => {
    const { user, token } = await createUser();
    await createTask(user.id, { title: 'This month', when: new Date() });
    await createTask(user.id, { title: 'Far future', when: addDays(new Date(), 365) });

    const res = await request(testApp).get('/tasks?filter=month').set(auth(token));

    const titles = res.body.map((t: { title: string }) => t.title);
    expect(titles).toContain('This month');
    expect(titles).not.toContain('Far future');
  });

  it('filter=year returns tasks in current year', async () => {
    const { user, token } = await createUser();
    await createTask(user.id, { title: 'This year', when: new Date() });
    await createTask(user.id, { title: 'Year+2', when: addDays(new Date(), 365 * 2) });

    const res = await request(testApp).get('/tasks?filter=year').set(auth(token));

    const titles = res.body.map((t: { title: string }) => t.title);
    expect(titles).toContain('This year');
    expect(titles).not.toContain('Year+2');
  });

  it('filter=late returns only past undone tasks', async () => {
    const { user, token } = await createUser();
    await createTask(user.id, { title: 'Overdue', when: subDays(new Date(), 2), done: false });
    await createTask(user.id, { title: 'Overdue done', when: subDays(new Date(), 2), done: true });
    await createTask(user.id, { title: 'Future', when: addDays(new Date(), 1), done: false });

    const res = await request(testApp).get('/tasks?filter=late').set(auth(token));

    expect(res.body).toHaveLength(1);
    expect(res.body[0].title).toBe('Overdue');
  });

  it('defaults filter to "all" when omitted', async () => {
    const { user, token } = await createUser();
    await createTask(user.id);

    const res = await request(testApp).get('/tasks').set(auth(token));
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('rejects unknown filter with 400', async () => {
    const { token } = await createUser();
    const res = await request(testApp).get('/tasks?filter=bogus').set(auth(token));
    expect(res.status).toBe(400);
  });

  it('returns 401 without a token', async () => {
    const res = await request(testApp).get('/tasks?filter=all');
    expect(res.status).toBe(401);
  });
});

describe('GET /tasks/stats', () => {
  it('counts today / week / late / total / done', async () => {
    const { user, token } = await createUser();
    await createTask(user.id, { when: addHours(new Date(), 1), done: false });
    await createTask(user.id, { when: subDays(new Date(), 2), done: false });
    await createTask(user.id, { when: addDays(new Date(), 1), done: true });

    const res = await request(testApp).get('/tasks/stats').set(auth(token));

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        today: expect.any(Number),
        late: expect.any(Number),
        week: expect.any(Number),
        total: 3,
        done: 1,
      }),
    );
    expect(res.body.today).toBe(1);
    expect(res.body.late).toBe(1);
  });

  it('returns 500 when the database errors', async () => {
    const { token } = await createUser();
    const spy = vi.spyOn(prisma.task, 'count').mockRejectedValueOnce(new Error('db down'));

    const res = await request(testApp).get('/tasks/stats').set(auth(token));
    expect(res.status).toBe(500);

    spy.mockRestore();
  });
});

describe('GET /tasks/:id', () => {
  it('returns 200 with the task when owned', async () => {
    const { user, token } = await createUser();
    const task = await createTask(user.id, { title: 'Read' });

    const res = await request(testApp).get(`/tasks/${task.id}`).set(auth(token));
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Read');
  });

  it('returns 404 when not found', async () => {
    const { token } = await createUser();
    const res = await request(testApp).get('/tasks/nope').set(auth(token));
    expect(res.status).toBe(404);
  });

  it('returns 404 when task belongs to another user', async () => {
    const { user: u1 } = await createUser();
    const { token: t2 } = await createUser();
    const task = await createTask(u1.id);

    const res = await request(testApp).get(`/tasks/${task.id}`).set(auth(t2));
    expect(res.status).toBe(404);
  });
});

describe('POST /tasks', () => {
  it('creates a task', async () => {
    const { token, user } = await createUser();

    const res = await request(testApp)
      .post('/tasks')
      .set(auth(token))
      .send({
        type: 4,
        title: 'Refactor billing',
        description: 'Audit the math',
        when: addDays(new Date(), 2).toISOString(),
      });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Refactor billing');

    const persisted = await prisma.task.findUnique({ where: { id: res.body.id } });
    expect(persisted?.userId).toBe(user.id);
  });

  it('rejects invalid payload with 400', async () => {
    const { token } = await createUser();

    const res = await request(testApp)
      .post('/tasks')
      .set(auth(token))
      .send({ type: 99, title: '', when: 'not-a-date' });

    expect(res.status).toBe(400);
    expect(res.body.details).toBeDefined();
  });
});

describe('PUT /tasks/:id', () => {
  it('updates a task and returns the new state', async () => {
    const { user, token } = await createUser();
    const task = await createTask(user.id, { title: 'Old' });

    const res = await request(testApp)
      .put(`/tasks/${task.id}`)
      .set(auth(token))
      .send({ title: 'New' });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New');
  });

  it('returns 404 when task does not exist', async () => {
    const { token } = await createUser();
    const res = await request(testApp)
      .put('/tasks/nope')
      .set(auth(token))
      .send({ title: 'x' });
    expect(res.status).toBe(404);
  });

  it('prevents cross-user updates', async () => {
    const { user: u1 } = await createUser();
    const { token: t2 } = await createUser();
    const task = await createTask(u1.id, { title: 'Theirs' });

    const res = await request(testApp)
      .put(`/tasks/${task.id}`)
      .set(auth(t2))
      .send({ title: 'Hijacked' });

    expect(res.status).toBe(404);
    const unchanged = await prisma.task.findUnique({ where: { id: task.id } });
    expect(unchanged?.title).toBe('Theirs');
  });

  it('rejects invalid payload', async () => {
    const { user, token } = await createUser();
    const task = await createTask(user.id);
    const res = await request(testApp)
      .put(`/tasks/${task.id}`)
      .set(auth(token))
      .send({ type: 999 });
    expect(res.status).toBe(400);
  });
});

describe('PATCH /tasks/:id/toggle', () => {
  it('flips the done flag', async () => {
    const { user, token } = await createUser();
    const task = await createTask(user.id, { done: false });

    const res = await request(testApp)
      .patch(`/tasks/${task.id}/toggle`)
      .set(auth(token));

    expect(res.status).toBe(200);
    expect(res.body.done).toBe(true);

    const res2 = await request(testApp)
      .patch(`/tasks/${task.id}/toggle`)
      .set(auth(token));
    expect(res2.body.done).toBe(false);
  });

  it('returns 404 when task missing', async () => {
    const { token } = await createUser();
    const res = await request(testApp).patch('/tasks/nope/toggle').set(auth(token));
    expect(res.status).toBe(404);
  });
});

describe('DELETE /tasks/:id', () => {
  it('removes the task and returns 204', async () => {
    const { user, token } = await createUser();
    const task = await createTask(user.id);

    const res = await request(testApp).delete(`/tasks/${task.id}`).set(auth(token));
    expect(res.status).toBe(204);

    const after = await prisma.task.findUnique({ where: { id: task.id } });
    expect(after).toBeNull();
  });

  it('returns 404 when missing', async () => {
    const { token } = await createUser();
    const res = await request(testApp).delete('/tasks/nope').set(auth(token));
    expect(res.status).toBe(404);
  });

  it('prevents cross-user deletes', async () => {
    const { user: u1 } = await createUser();
    const { token: t2 } = await createUser();
    const task = await createTask(u1.id);

    const res = await request(testApp).delete(`/tasks/${task.id}`).set(auth(t2));
    expect(res.status).toBe(404);

    const persisted = await prisma.task.findUnique({ where: { id: task.id } });
    expect(persisted).not.toBeNull();
  });
});
