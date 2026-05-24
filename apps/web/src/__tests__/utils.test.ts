import { describe, expect, it } from 'vitest';
import { cn } from '@/lib/utils';
import { typeMeta, TASK_TYPES } from '@/lib/task-types';

describe('cn', () => {
  it('merges class strings and resolves Tailwind conflicts', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('text-sm', undefined, 'font-bold')).toBe('text-sm font-bold');
    expect(cn({ active: true, inactive: false }, 'extra')).toBe('active extra');
  });
});

describe('typeMeta', () => {
  it('returns the matching type', () => {
    expect(typeMeta(2).label).toBe('Sport');
    expect(typeMeta(9).label).toBe('Gym');
  });

  it('falls back to General for unknown ids', () => {
    expect(typeMeta(999).label).toBe('General');
  });

  it('returns "Done" meta when task is marked done, regardless of original type', () => {
    expect(typeMeta(3, true).label).toBe('Done');
  });

  it('contains 10 task types', () => {
    expect(TASK_TYPES).toHaveLength(10);
    expect(TASK_TYPES.every((t) => typeof t.label === 'string')).toBe(true);
  });
});
