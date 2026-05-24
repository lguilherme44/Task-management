import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient, screen, waitFor, render } from '@/test/utils';
import TaskEditPage from '@/pages/task-edit';
import HomePage from '@/pages/home';
import { useAuthStore } from '@/lib/auth-store';
import { MOCK_TOKEN, mockTasks, resetMockStore } from '@/test/mocks/handlers';

function renderAt(path: string) {
  const client = makeQueryClient();
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/task/:id" element={<TaskEditPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function signIn() {
  resetMockStore();
  useAuthStore.getState().setSession({
    user: { id: 'demo-1', name: 'Demo User', email: 'demo@taskflow.dev' },
    token: MOCK_TOKEN,
  });
}

describe('TaskEditPage — new task', () => {
  it('creates a task and navigates home', async () => {
    signIn();
    renderAt('/task/new');

    await userEvent.type(screen.getByLabelText('Title'), 'Write release notes');
    await userEvent.click(screen.getByRole('button', { name: /^create$/i }));

    await waitFor(() => {
      expect(mockTasks.some((t) => t.title === 'Write release notes')).toBe(true);
    });
  });

  it('validates required title before submit', async () => {
    signIn();
    renderAt('/task/new');

    await userEvent.click(screen.getByRole('button', { name: /^create$/i }));
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
  });

  it('changes the task category through TypePicker', async () => {
    signIn();
    renderAt('/task/new');

    await userEvent.click(screen.getByRole('button', { name: /^sport$/i }));
    await userEvent.type(screen.getByLabelText('Title'), 'Run 5k');
    await userEvent.click(screen.getByRole('button', { name: /^create$/i }));

    await waitFor(() => {
      const created = mockTasks.find((t) => t.title === 'Run 5k');
      expect(created?.type).toBe(2);
    });
  });
});

describe('TaskEditPage — edit existing', () => {
  it('loads an existing task and saves changes', async () => {
    signIn();
    const targetId = mockTasks[0].id;
    renderAt(`/task/${targetId}`);

    const titleInput = await screen.findByLabelText('Title');
    await waitFor(() => expect((titleInput as HTMLInputElement).value).toBe(mockTasks[0].title));

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated title');
    await userEvent.click(screen.getByRole('button', { name: /^save$/i }));

    await waitFor(() => {
      const persisted = mockTasks.find((t) => t.id === targetId);
      expect(persisted?.title).toBe('Updated title');
    });
  });

  it('deletes a task when confirmed', async () => {
    signIn();
    const target = mockTasks[1];
    vi.spyOn(window, 'confirm').mockReturnValueOnce(true);

    renderAt(`/task/${target.id}`);
    await screen.findByLabelText('Title');
    await userEvent.click(screen.getByRole('button', { name: /^delete$/i }));

    await waitFor(() => {
      expect(mockTasks.find((t) => t.id === target.id)).toBeUndefined();
    });
  });

  it('does NOT delete a task when not confirmed', async () => {
    signIn();
    const target = mockTasks[0];
    vi.spyOn(window, 'confirm').mockReturnValueOnce(false);

    renderAt(`/task/${target.id}`);
    await screen.findByLabelText('Title');
    await userEvent.click(screen.getByRole('button', { name: /^delete$/i }));

    expect(mockTasks.find((t) => t.id === target.id)).toBeDefined();
  });
});
