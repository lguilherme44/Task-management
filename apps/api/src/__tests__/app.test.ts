import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { testApp } from '../test/app.js';

describe('App basics', () => {
  it('GET /health responds with status ok', async () => {
    const res = await request(testApp).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.uptime).toBe('number');
  });

  it('returns JSON for unknown routes via default 404', async () => {
    const res = await request(testApp).get('/this-does-not-exist');
    expect(res.status).toBe(404);
  });
});
