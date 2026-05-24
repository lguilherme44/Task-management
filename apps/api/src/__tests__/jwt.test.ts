import { describe, expect, it } from 'vitest';
import { signToken, verifyToken } from '../lib/jwt.js';

describe('jwt lib', () => {
  it('round-trips a payload', () => {
    const token = signToken({ userId: 'u-123' });
    expect(token).toBeTypeOf('string');
    const payload = verifyToken(token);
    expect(payload.userId).toBe('u-123');
  });

  it('throws on invalid token', () => {
    expect(() => verifyToken('not-a-token')).toThrow();
  });
});
