import 'dotenv/config';
import { z } from 'zod';

const defaults = {
  NODE_ENV: 'development',
  PORT: '3333',
  DATABASE_URL: 'file:./dev.db',
  JWT_SECRET: 'dev-secret-change-in-production',
  JWT_EXPIRES_IN: '7d',
  WEB_ORIGIN: 'http://localhost:5173',
} as const;

for (const [key, value] of Object.entries(defaults)) {
  if (!process.env[key]) {
    process.env[key] = value;
  }
}

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(8),
  JWT_EXPIRES_IN: z.string(),
  WEB_ORIGIN: z.string(),
});

export const env = schema.parse(process.env);
