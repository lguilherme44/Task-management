import { createApp } from './app.js';
import { env } from './env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  const banner = `
  ╭─────────────────────────────────────────────╮
  │  Task API ready                             │
  │  http://localhost:${String(env.PORT).padEnd(5)}  •  env: ${env.NODE_ENV.padEnd(10)}  │
  ╰─────────────────────────────────────────────╯`;
  console.log(banner);
});

const shutdown = (signal: string) => () => {
  console.log(`\n[${signal}] Shutting down...`);
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown('SIGINT'));
process.on('SIGTERM', shutdown('SIGTERM'));
