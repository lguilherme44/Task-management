import express from 'express';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { ZodError, z } from 'zod';
import { errorHandler } from '../middleware/error-handler.js';
import { HttpError, BadRequest, Conflict, NotFound, Unauthorized } from '../lib/errors.js';

function buildApp(errorThrower: () => unknown) {
  const app = express();
  app.get('/boom', (_req, _res, next) => {
    try {
      const v = errorThrower();
      if (v instanceof Promise) v.catch(next);
      else next(v as Error);
    } catch (err) {
      next(err);
    }
  });
  app.use(errorHandler);
  return app;
}

describe('errorHandler', () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('formats ZodError into 400 with details', async () => {
    const app = buildApp(() => {
      try {
        z.object({ name: z.string() }).parse({ name: 1 });
        return null;
      } catch (err) {
        return err as ZodError;
      }
    });

    const res = await request(app).get('/boom');
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
    expect(res.body.details).toEqual({ name: expect.any(Array) });
  });

  it('returns HttpError status + message', async () => {
    const app = buildApp(() => new HttpError(418, "I'm a teapot"));
    const res = await request(app).get('/boom');
    expect(res.status).toBe(418);
    expect(res.body.error).toBe("I'm a teapot");
  });

  it('returns 500 for plain Errors and logs them', async () => {
    const app = buildApp(() => new Error('boom'));
    const res = await request(app).get('/boom');
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('boom');
    expect(logSpy).toHaveBeenCalled();
  });

  it('returns 500 with default message for non-Error throws', async () => {
    const app = buildApp(() => 'just-a-string');
    const res = await request(app).get('/boom');
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Internal server error');
  });
});

describe('Error helpers', () => {
  it('BadRequest, Conflict, NotFound, Unauthorized produce matching HttpErrors', () => {
    expect(BadRequest('x').status).toBe(400);
    expect(Conflict().status).toBe(409);
    expect(NotFound().status).toBe(404);
    expect(Unauthorized().status).toBe(401);
    expect(BadRequest('hi').message).toBe('hi');
  });
});
