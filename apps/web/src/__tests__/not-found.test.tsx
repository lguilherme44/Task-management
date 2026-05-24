import { describe, expect, it } from 'vitest';
import NotFoundPage from '@/pages/not-found';
import { renderWithProviders, screen } from '@/test/utils';

describe('NotFoundPage', () => {
  it('renders the 404 page', () => {
    renderWithProviders(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back home/i })).toBeInTheDocument();
  });
});
