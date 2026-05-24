import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import { useAuthStore } from '@/lib/auth-store';

describe('App', () => {
  it('renders the login page when unauthenticated', () => {
    useAuthStore.getState().logout();
    render(<App />);
    expect(screen.getByRole('button', { name: /^sign in$/i })).toBeInTheDocument();
  });
});
