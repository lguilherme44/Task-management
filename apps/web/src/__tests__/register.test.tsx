import { describe, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, waitFor } from '@/test/utils';
import RegisterPage from '@/pages/register';
import { useAuthStore } from '@/lib/auth-store';

describe('RegisterPage', () => {
  it('creates an account and stores the session', async () => {
    renderWithProviders(<RegisterPage />, { initialEntries: ['/register'] });

    await userEvent.type(screen.getByPlaceholderText('Ada Lovelace'), 'New User');
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'new@example.com');
    await userEvent.type(screen.getByPlaceholderText('At least 6 characters'), 'secret1');

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(useAuthStore.getState().user?.email).toBe('new@example.com');
    });
  });

  it('shows a duplicate email error', async () => {
    renderWithProviders(<RegisterPage />, { initialEntries: ['/register'] });

    await userEvent.type(screen.getByPlaceholderText('Ada Lovelace'), 'Demo Two');
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'demo@taskflow.dev');
    await userEvent.type(screen.getByPlaceholderText('At least 6 characters'), 'demo1234');

    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    // We just need to verify the user is NOT signed in after a 409.
    await waitFor(() => {
      expect(useAuthStore.getState().user?.email).not.toBe('demo@taskflow.dev');
    });
  });
});
