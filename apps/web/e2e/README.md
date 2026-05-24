# End-to-end tests

Playwright tests that drive the real UI against the real API.

The Playwright config under `apps/web/playwright.config.ts` brings the whole
stack up:

- spawns the API on port `3334` against an isolated SQLite database (`prisma/e2e.db`)
- runs the demo seed (`FORCE_SEED=1`)
- builds the web bundle if needed, then serves it via `vite preview` on port `5174`

Run locally:

```bash
pnpm install
pnpm --filter @task/web exec playwright install --with-deps chromium
pnpm --filter @task/web build
pnpm --filter @task/web test:e2e
```

In CI you can drop the `install --with-deps` flag if the runner already has
the browser available (the official GitHub Actions runner image does).
