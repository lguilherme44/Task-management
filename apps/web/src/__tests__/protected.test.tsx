import { describe, expect, it } from 'vitest';
import { Route, Routes } from 'react-router-dom';
import { renderWithProviders, screen } from '@/test/utils';
import { ProtectedRoute } from '@/routes/protected';
import { useAuthStore } from '@/lib/auth-store';

function tree() {
  return (
    <Routes>
      <Route path="/login" element={<div>Login</div>} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<div>Home</div>} />
      </Route>
    </Routes>
  );
}

describe('ProtectedRoute', () => {
  it('redirects to login when no token is present', () => {
    useAuthStore.getState().logout();
    renderWithProviders(tree(), { initialEntries: ['/'] });
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders the protected children when authenticated', () => {
    useAuthStore.getState().setSession({
      user: { id: '1', name: 'Demo', email: 'demo@taskflow.dev' },
      token: 'mock-token',
    });
    renderWithProviders(tree(), { initialEntries: ['/'] });
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
