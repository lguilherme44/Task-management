import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, waitFor } from '@/test/utils';
import LoginPage from '@/pages/login';
import { useAuthStore } from '@/lib/auth-store';

describe('LoginPage', () => {
  it('logs in successfully with demo credentials', async () => {
    renderWithProviders(<LoginPage />, { initialEntries: ['/login'] });

    await userEvent.click(screen.getByRole('button', { name: /try the demo account/i }));
    await userEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().token).not.toBeNull();
    });
    expect(useAuthStore.getState().user?.email).toBe('demo@taskflow.dev');
  });

  it('shows a validation error for empty email', async () => {
    renderWithProviders(<LoginPage />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'something');
    await userEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });

  it('shows an API error message when login fails', async () => {
    renderWithProviders(<LoginPage />, { initialEntries: ['/login'] });

    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'wrong@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().token).toBeNull();
    });
  });
});
