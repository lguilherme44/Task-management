import { describe, expect, it } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { testApp } from '../test/app.js';
import { signToken } from '../lib/jwt.js';

describe('requireAuth middleware', () => {
  it('returns 401 when Authorization header is missing', async () => {
    const res = await request(testApp).get('/auth/me');
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/missing or malformed/i);
  });

  it('returns 401 when header is not Bearer', async () => {
    const res = await request(testApp).get('/auth/me').set('Authorization', 'Basic abc');
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/missing or malformed/i);
  });

  it('returns 401 for malformed JWT', async () => {
    const res = await request(testApp).get('/auth/me').set('Authorization', 'Bearer not-a-jwt');
    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid or expired/i);
  });

  it('returns 401 for expired JWT', async () => {
    const token = jwt.sign({ userId: 'abc' }, process.env.JWT_SECRET!, { expiresIn: '-1s' });
    const res = await request(testApp).get('/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(401);
  });

  it('returns 401 for token signed with another secret', async () => {
    const token = jwt.sign({ userId: 'abc' }, 'other-secret');
    const res = await request(testApp).get('/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(401);
  });

  it('forwards the request when token is valid (no user, returns 401 from route)', async () => {
    const token = signToken({ userId: 'non-existent' });
    const res = await request(testApp).get('/auth/me').set('Authorization', `Bearer ${token}`);
    // Middleware passes, route then 401s because user no longer exists.
    expect(res.status).toBe(401);
  });
});
