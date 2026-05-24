import { defineConfig, devices } from '@playwright/test';

const API_PORT = 3334;
const WEB_PORT = 5174;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',
  timeout: 30_000,
  use: {
    baseURL: `http://localhost:${WEB_PORT}`,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: [
    {
      name: 'api',
      command:
        'pnpm --filter @task/api db:push && pnpm --filter @task/api exec tsx src/seed.ts && pnpm --filter @task/api exec tsx src/server.ts',
      env: {
        NODE_ENV: 'production',
        PORT: String(API_PORT),
        DATABASE_URL: 'file:./e2e.db',
        JWT_SECRET: 'e2e-secret-do-not-use-in-prod',
        WEB_ORIGIN: `http://localhost:${WEB_PORT}`,
        FORCE_SEED: '1',
      },
      url: `http://localhost:${API_PORT}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      name: 'web',
      command: `vite --strictPort`,
      env: {
        VITE_DEV_PORT: String(WEB_PORT),
        VITE_API_TARGET: `http://localhost:${API_PORT}`,
      },
      url: `http://localhost:${WEB_PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  ],
});
