import { describe, expect, it, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { server } from '@/test/mocks/server';

describe('api client', () => {
  beforeEach(() => {
    useAuthStore.getState().setSession({
      user: { id: '1', name: 'Ada', email: 'a@b.c' },
      token: 'mock-token',
    });
  });

  it('attaches the bearer token on requests', async () => {
    let receivedAuth = '';
    server.use(
      http.get('/api/echo', ({ request }) => {
        receivedAuth = request.headers.get('authorization') ?? '';
        return HttpResponse.json({ ok: true });
      }),
    );
    await api.get('/echo');
    expect(receivedAuth).toBe('Bearer mock-token');
  });

  it('throws an ApiError with status and message on non-2xx', async () => {
    server.use(
      http.get('/api/fail', () => HttpResponse.json({ error: 'Nope' }, { status: 418 })),
    );

    await expect(api.get('/fail')).rejects.toMatchObject({ status: 418, message: 'Nope' });
  });

  it('logs the user out on 401', async () => {
    server.use(http.get('/api/protected', () => HttpResponse.json({ error: 'No' }, { status: 401 })));
    await expect(api.get('/protected')).rejects.toMatchObject({ status: 401 });
    expect(useAuthStore.getState().token).toBeNull();
  });

  it('returns undefined for 204 responses', async () => {
    server.use(http.delete('/api/things/1', () => new HttpResponse(null, { status: 204 })));
    const out = await api.delete('/things/1');
    expect(out).toBeUndefined();
  });

  it('supports post/put/patch', async () => {
    server.use(
      http.post('/api/echo', async ({ request }) => HttpResponse.json(await request.json())),
      http.put('/api/echo', async ({ request }) => HttpResponse.json(await request.json())),
      http.patch('/api/echo', async ({ request }) => HttpResponse.json(await request.json())),
    );

    expect(await api.post('/echo', { x: 1 })).toEqual({ x: 1 });
    expect(await api.put('/echo', { x: 2 })).toEqual({ x: 2 });
    expect(await api.patch('/echo', { x: 3 })).toEqual({ x: 3 });
  });
});
