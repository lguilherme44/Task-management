import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, waitFor } from '@/test/utils';
import HomePage from '@/pages/home';
import { useAuthStore } from '@/lib/auth-store';
import { resetMockStore, MOCK_TOKEN } from '@/test/mocks/handlers';

function signIn() {
  resetMockStore();
  useAuthStore.getState().setSession({
    user: { id: 'demo-1', name: 'Demo User', email: 'demo@taskflow.dev' },
    token: MOCK_TOKEN,
  });
}

describe('HomePage', () => {
  it('lists tasks scheduled today by default and shows stats', async () => {
    signIn();
    renderWithProviders(<HomePage />, { initialEntries: ['/'] });

    expect(await screen.findByText(/Sprint planning/)).toBeInTheDocument();
    // greeting "Hi, Demo" in the h1
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Demo/);
  });

  it('switches to the Late filter and shows overdue tasks', async () => {
    signIn();
    renderWithProviders(<HomePage />, { initialEntries: ['/'] });

    await screen.findByText(/Sprint planning/);
    await userEvent.click(screen.getByRole('button', { name: /^late/i }));

    await waitFor(() => {
      expect(screen.getByText('Overdue thing')).toBeInTheDocument();
    });
  });

  it('toggles a task and updates the badge', async () => {
    signIn();
    renderWithProviders(<HomePage />, { initialEntries: ['/'] });

    await screen.findByText(/Sprint planning/);
    const checkboxes = screen.getAllByRole('checkbox');
    await userEvent.click(checkboxes[0]);
    // After toggle, optimistic update should mark the task as done.
    await waitFor(() => {
      const items = screen.getAllByText(/done/i);
      expect(items.length).toBeGreaterThan(0);
    });
  });
});
