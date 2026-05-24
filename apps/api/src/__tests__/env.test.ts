import { describe, expect, it } from 'vitest';
import { env } from '../env.js';

describe('env', () => {
  it('parses defaults when no overrides are set', () => {
    expect(env.NODE_ENV).toBe('test');
    expect(env.PORT).toBe(3333);
    expect(env.JWT_SECRET).toBeTypeOf('string');
    expect(env.JWT_SECRET.length).toBeGreaterThanOrEqual(8);
    expect(env.DATABASE_URL).toMatch(/^file:/);
  });
});
