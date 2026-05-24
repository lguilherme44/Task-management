import { describe, expect, it, beforeEach } from 'vitest';
import { useAuthStore } from '@/lib/auth-store';
import { useThemeStore } from '@/lib/theme-store';

describe('auth store', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('starts unauthenticated', () => {
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('sets and clears session', () => {
    useAuthStore.getState().setSession({
      user: { id: '1', name: 'Ada', email: 'ada@example.com' },
      token: 'abc',
    });
    expect(useAuthStore.getState().token).toBe('abc');
    expect(useAuthStore.getState().user?.name).toBe('Ada');

    useAuthStore.getState().logout();
    expect(useAuthStore.getState().token).toBeNull();
  });
});

describe('theme store', () => {
  beforeEach(() => {
    useThemeStore.getState().setTheme('dark');
  });

  it('defaults to dark', () => {
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('toggles between dark and light', () => {
    useThemeStore.getState().toggle();
    expect(useThemeStore.getState().theme).toBe('light');
    useThemeStore.getState().toggle();
    expect(useThemeStore.getState().theme).toBe('dark');
  });

  it('setTheme overrides the current theme', () => {
    useThemeStore.getState().setTheme('light');
    expect(useThemeStore.getState().theme).toBe('light');
  });
});
