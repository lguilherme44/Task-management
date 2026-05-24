# syntax=docker/dockerfile:1.7
# ---------- deps ----------
FROM node:22-alpine AS deps
RUN corepack enable
WORKDIR /repo

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    PNPM_HOME=/pnpm pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile --filter @task/api...

# ---------- build ----------
FROM node:22-alpine AS build
RUN corepack enable
WORKDIR /repo

COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/apps/api/node_modules ./apps/api/node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api ./apps/api

WORKDIR /repo/apps/api
ENV DATABASE_URL=file:./build-shim.db
RUN pnpm exec prisma generate
RUN pnpm run build

# ---------- runtime ----------
FROM node:22-alpine AS runtime
RUN apk add --no-cache tini openssl
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3333
ENV DATABASE_URL=file:/data/app.db

# minimal runtime deps only
COPY --from=build /repo/apps/api/package.json ./package.json
COPY --from=build /repo/apps/api/dist ./dist
COPY --from=build /repo/apps/api/prisma ./prisma
COPY --from=build /repo/apps/api/node_modules ./node_modules

# Persistent volume for SQLite
RUN mkdir -p /data && chown -R node:node /data /app
USER node

EXPOSE 3333

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3333/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["sh", "-c", "node node_modules/prisma/build/index.js db push --skip-generate --accept-data-loss && node dist/seed.js && node dist/server.js"]
