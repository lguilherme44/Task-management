import { describe, expect, it } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import { testApp } from '../test/app.js';
import { prisma } from '../lib/prisma.js';
import { signToken } from '../lib/jwt.js';

describe('POST /auth/register', () => {
  it('creates a new user and returns a JWT', async () => {
    const res = await request(testApp).post('/auth/register').send({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secret123',
    });

    expect(res.status).toBe(201);
    expect(res.body.user).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
    });
    expect(res.body.user.id).toBeTypeOf('string');
    expect(res.body.user.password).toBeUndefined();
    expect(res.body.token).toBeTypeOf('string');

    const persisted = await prisma.user.findUnique({ where: { email: 'ada@example.com' } });
    expect(persisted).not.toBeNull();
    expect(await bcrypt.compare('secret123', persisted!.password)).toBe(true);
  });

  it('rejects duplicate emails with 409', async () => {
    await request(testApp).post('/auth/register').send({
      name: 'Ada',
      email: 'dup@example.com',
      password: 'secret123',
    });

    const res = await request(testApp).post('/auth/register').send({
      name: 'Other',
      email: 'dup@example.com',
      password: 'secret123',
    });

    expect(res.status).toBe(409);
    expect(res.body.error).toMatch(/already registered/i);
  });

  it('rejects invalid payload with 400 and field errors', async () => {
    const res = await request(testApp).post('/auth/register').send({
      name: 'A',
      email: 'not-an-email',
      password: '123',
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/validation/i);
    expect(res.body.details).toEqual(
      expect.objectContaining({
        name: expect.any(Array),
        email: expect.any(Array),
        password: expect.any(Array),
      }),
    );
  });
});

describe('POST /auth/login', () => {
  it('returns user + token on valid credentials', async () => {
    await request(testApp).post('/auth/register').send({
      name: 'Login User',
      email: 'login@example.com',
      password: 'secret123',
    });

    const res = await request(testApp)
      .post('/auth/login')
      .send({ email: 'login@example.com', password: 'secret123' });

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe('login@example.com');
    expect(res.body.token).toBeTypeOf('string');
  });

  it('returns 401 for wrong password', async () => {
    await request(testApp).post('/auth/register').send({
      name: 'Wrong',
      email: 'wrong@example.com',
      password: 'secret123',
    });

    const res = await request(testApp)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  it('returns 401 for unknown email', async () => {
    const res = await request(testApp)
      .post('/auth/login')
      .send({ email: 'ghost@example.com', password: 'whatever' });

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  it('rejects malformed payload with 400', async () => {
    const res = await request(testApp).post('/auth/login').send({ email: 'bad', password: '' });
    expect(res.status).toBe(400);
  });
});

describe('GET /auth/me', () => {
  it('returns the authenticated user', async () => {
    const created = await request(testApp).post('/auth/register').send({
      name: 'Me',
      email: 'me@example.com',
      password: 'secret123',
    });
    const token = created.body.token;

    const res = await request(testApp).get('/auth/me').set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      name: 'Me',
      email: 'me@example.com',
    });
    expect(res.body.password).toBeUndefined();
  });

  it('returns 401 when token is missing', async () => {
    const res = await request(testApp).get('/auth/me');
    expect(res.status).toBe(401);
  });

  it('returns 401 when token belongs to a deleted user', async () => {
    const token = signToken({ userId: 'non-existent-id' });
    const res = await request(testApp).get('/auth/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(401);
  });
});
