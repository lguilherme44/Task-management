import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { queryClient } from '@/lib/query-client';
import { useApplyTheme, useThemeStore } from '@/lib/theme-store';

import LoginPage from '@/pages/login';
import RegisterPage from '@/pages/register';
import HomePage from '@/pages/home';
import TaskEditPage from '@/pages/task-edit';
import NotFoundPage from '@/pages/not-found';
import { ProtectedRoute } from '@/routes/protected';

function ThemedShell({ children }: { children: React.ReactNode }) {
  useApplyTheme();
  const theme = useThemeStore((s) => s.theme);
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        theme={theme}
        toastOptions={{
          className: 'border border-border/60',
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemedShell>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/task/:id" element={<TaskEditPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ThemedShell>
    </QueryClientProvider>
  );
}
