<div align="center">

<img src="apps/web/public/logo.svg" alt="TaskFlow logo" width="96" height="96" />

# TaskFlow

**A modern, beautiful, deeply tested task manager.**

[![CI](https://img.shields.io/github/actions/workflow/status/guilhermelellis/Task-management/ci.yml?branch=master&label=CI&logo=github)](../../actions/workflows/ci.yml)
[![tests](https://img.shields.io/badge/tests-110%20passing-22c55e?logo=vitest&logoColor=white)](#testing-strategy)
[![coverage](https://img.shields.io/badge/api%20coverage-100%25-22c55e?logo=vitest&logoColor=white)](#testing-strategy)
[![docker](https://img.shields.io/badge/docker-ready-2496ED?logo=docker&logoColor=white)](#run-with-docker-zero-config)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](#license)

Created in 2020 as my **first full-stack project**. Rewritten in 2026 from the ground up with the tools and discipline I've grown into since.

</div>

---

## Why this exists

This is the project I shipped when I was still learning JavaScript. It hung on my GitHub pinned-list for years — proud, but slowly rotting under deprecated dependencies (React 17 + react-scripts, Material UI v4, Native Base 2, a Mongoose-style API on top of Sequelize, you name it).

I kept the **soul** of the original — visual task types, smart filters, JWT auth, a beautiful dashboard — and rebuilt everything else into something I'm proud to show to a recruiter today. No tutorials, no copy-paste — just deliberate engineering.

## Highlights

- **Monorepo** (`pnpm` workspaces) with two apps: `apps/api` and `apps/web`.
- **API** — Node.js · TypeScript · Express · **Prisma + SQLite** · Zod · JWT · bcryptjs.
- **Web** — Vite · React 19 · TypeScript · **Tailwind v4** · Radix UI · TanStack Query · Zustand · Framer Motion · React Hook Form + Zod.
- **110 tests** across three layers — unit, integration, end-to-end — at **100% backend coverage**.
- **Dockerized** end-to-end. `docker compose up` and you have the whole app running with a seeded demo account.
- **CI on every PR** — typecheck, tests, coverage, Docker image builds, Playwright E2E (GitHub Actions).
- Mobile-first responsive, **dark mode by default**, accessible focus rings, motion-aware micro-interactions.

> Demo credentials, seeded on first boot: **`demo@taskflow.dev`** / **`demo1234`**

---

## Run with Docker (zero config)

The fastest path. Requires only Docker Desktop.

```bash
docker compose up --build
```

Then open **http://localhost:8080**. On first boot the API runs `prisma db push` against a volume and seeds a `demo@taskflow.dev` account with eight tasks across categories and filters.

To start over with a clean database:

```bash
docker compose down -v
docker compose up --build
```

## Run locally (without Docker)

Requires Node.js 20+ and pnpm 11.

```bash
pnpm install
pnpm setup            # generates Prisma client + creates SQLite db + seeds demo data
pnpm dev              # runs api (http://localhost:3333) and web (http://localhost:5173) in parallel
```

That's it. Visit **http://localhost:5173**.

---

## Project structure

```
.
├── apps/
│   ├── api/                     # @task/api — Express + Prisma + SQLite + JWT
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/
│   │       ├── routes/          # auth.ts, tasks.ts
│   │       ├── middleware/      # auth.ts, error-handler.ts
│   │       ├── schemas/         # Zod validation
│   │       ├── lib/             # prisma, jwt, errors
│   │       ├── test/            # vitest setup + factories
│   │       └── __tests__/       # 52 tests, 100% coverage
│   │
│   └── web/                     # @task/web — Vite + React 19 + Tailwind v4
│       ├── src/
│       │   ├── components/      # ui primitives + app components
│       │   ├── pages/           # login, register, home, task-edit, 404
│       │   ├── routes/          # protected route guard
│       │   ├── lib/             # api client, auth store, theme store, query client
│       │   ├── test/            # vitest setup + MSW handlers
│       │   └── __tests__/       # 51 component & integration tests
│       └── e2e/                 # 7 Playwright end-to-end tests
│
├── .github/workflows/ci.yml     # typecheck · test · build · e2e · docker
├── docker-compose.yml           # api + web + persistent volume
└── pnpm-workspace.yaml
```

---

## Features

### Tasks

- **CRUD** with optimistic UI (toggle done, edit, delete).
- **10 visual categories** — work, study, food, sport, gym, travel, shopping, social, general, done.
- **Smart filters** — today, this week, this month, this year, all, **late** (overdue & not done).
- **Dashboard stats** — today, week, completed, late — animated entry, tabular numerals.

### Auth

- Register & login with **JWT** + **bcryptjs**-hashed passwords.
- Tokens persist via `localStorage` (Zustand `persist` middleware).
- A 401 response auto-logs out and redirects to login.

### Visual & UX

- Dark mode by default with a light toggle; theme persists across sessions.
- **Aurora background** with layered radial gradients; **glassmorphism** panels.
- Animated filter pills (Framer Motion layout-id), spring-easing on cards.
- Empty states that change copy depending on the active filter.
- Sonner toasts, accessible focus rings, skeleton loaders.
- Mobile-first responsive layout — header collapses, stats wrap, cards adapt.

---

## Testing strategy

| Layer | Tooling | Files | Tests | Coverage |
| --- | --- | --- | --- | --- |
| **Backend** unit + integration | Vitest + supertest + Prisma SQLite (isolated `test.db`) | 7 | **52** | **100%** statements / 100% branches / 100% functions / 100% lines |
| **Frontend** components + integration | Vitest + Testing Library + MSW (mock service worker) | 12 | **51** | 96.47% statements / 88.83% branches |
| **End-to-end** | Playwright (Chromium) against real API + Vite dev server with isolated `e2e.db` | 2 | **7** | full user flows |

```bash
# unit + integration
pnpm --filter @task/api test
pnpm --filter @task/web test

# with coverage
pnpm --filter @task/api test:coverage
pnpm --filter @task/web test:coverage

# end-to-end
pnpm --filter @task/web exec playwright install chromium  # first run only
pnpm --filter @task/web test:e2e
```

The backend test suite spins up an isolated SQLite database per CI run, exercises every route + middleware + error path, includes a forced DB-failure case for the stats endpoint, and asserts the cross-user isolation rules (user A cannot read, update, or delete user B's tasks).

---

## API surface

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | — | Create account, returns user + JWT |
| POST | `/auth/login` | — | Authenticate, returns user + JWT |
| GET | `/auth/me` | bearer | Current user |
| GET | `/tasks?filter=<f>` | bearer | List tasks; `f` ∈ `all`, `today`, `week`, `month`, `year`, `late` |
| GET | `/tasks/stats` | bearer | Counts for today / week / late / total / done |
| GET | `/tasks/:id` | bearer | Get one (404 if missing or owned by another user) |
| POST | `/tasks` | bearer | Create |
| PUT | `/tasks/:id` | bearer | Update |
| PATCH | `/tasks/:id/toggle` | bearer | Flip the `done` flag |
| DELETE | `/tasks/:id` | bearer | Delete |
| GET | `/health` | — | Liveness probe (used by Docker healthcheck) |

All bodies and query params are validated with Zod and return `400` with a `{ error, details }` shape on failure.

---

## Tech-by-decision

| Decision | Why |
| --- | --- |
| **SQLite + Prisma** | A pinned portfolio repo must run with zero infra setup. Postgres would mean docker-compose for everyone or a hosted database; SQLite gives you `docker compose up` and you're in. Prisma keeps schema migrations sane. |
| **Vite + React 19 + Tailwind v4** | Hot-reload sub-second, tree-shaken to ~600 KB / 186 KB gzipped, Tailwind v4 uses CSS-first `@theme` tokens — no `tailwind.config.js` to drift. |
| **Radix primitives** | Accessible behaviour (focus traps, ARIA, keyboard nav) without owning the visual layer. |
| **Framer Motion `layoutId`** | The filter pill's moving highlight is one of the small details I refuse to skip. |
| **TanStack Query** | Optimistic updates, caching, and request deduplication out of the box. The `toggle done` UX is instant because of this. |
| **Zustand + persist** | Smaller than Redux, simpler than Context, persists auth and theme automatically. |
| **MSW for frontend tests** | Real network layer in tests — the same code paths run in jsdom and in production. |
| **Playwright over Cypress** | Native multi-browser support, faster, modern API, first-class TypeScript. |

---

## Scripts cheat-sheet

```bash
# from the repo root
pnpm dev                 # api + web in parallel
pnpm dev:api             # only the api
pnpm dev:web             # only the web
pnpm build               # production builds (both apps)
pnpm setup               # install + prisma generate + db push + seed
pnpm clean               # blast all node_modules and the dev sqlite
```

```bash
# api-only
pnpm --filter @task/api db:studio        # open Prisma Studio
pnpm --filter @task/api db:seed          # re-seed demo account
pnpm --filter @task/api test:coverage    # 100% coverage report
```

---

## License

MIT © Luis Guilherme Lellis — [linkedin](https://www.linkedin.com/in/guilhermelellis/) · [github](https://github.com/guilhermelellis)
