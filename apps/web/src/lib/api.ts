import { useAuthStore } from './auth-store';

const RAW_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api';
const BASE = RAW_BASE.replace(/\/$/, '');

export type ApiError = { status: number; message: string; details?: unknown };

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (!res.ok) {
    let body: { error?: string; details?: unknown } = {};
    try {
      body = await res.json();
    } catch {
      /* noop */
    }

    if (res.status === 401) {
      useAuthStore.getState().logout();
    }

    const err: ApiError = {
      status: res.status,
      message: body.error ?? res.statusText ?? 'Request failed',
      details: body.details,
    };
    throw err;
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T = void>(path: string) => request<T>(path, { method: 'DELETE' }),
};

export type Task = {
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

export type Stats = {
  today: number;
  late: number;
  week: number;
  total: number;
  done: number;
};

export type Filter = 'all' | 'today' | 'week' | 'month' | 'year' | 'late';
