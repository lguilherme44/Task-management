import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useThemeStore, useApplyTheme } from '@/lib/theme-store';
import { queryClient } from '@/lib/query-client';
import { renderWithProviders, screen } from '@/test/utils';

describe('useApplyTheme', () => {
  it('adds the .dark class when theme is dark', () => {
    document.documentElement.classList.remove('dark');
    useThemeStore.getState().setTheme('dark');

    renderHook(() => useApplyTheme());
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('removes the .dark class when theme switches to light', () => {
    useThemeStore.getState().setTheme('dark');
    const { rerender } = renderHook(() => useApplyTheme());
    rerender();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    act(() => {
      useThemeStore.getState().setTheme('light');
    });
    rerender();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('UI primitives', () => {
  it('Card renders children with role region equivalent', () => {
    renderWithProviders(<Card>hello card</Card>);
    expect(screen.getByText('hello card')).toBeInTheDocument();
  });

  it('Textarea accepts user input', () => {
    renderWithProviders(<Textarea aria-label="note" defaultValue="foo" />);
    expect(screen.getByLabelText('note')).toHaveValue('foo');
  });
});

describe('queryClient', () => {
  it('is a configured QueryClient singleton', () => {
    expect(queryClient.getDefaultOptions().queries?.retry).toBe(1);
    expect(queryClient.getDefaultOptions().queries?.refetchOnWindowFocus).toBe(false);
  });
});
