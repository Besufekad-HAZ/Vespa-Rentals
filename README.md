# Vespa Rentals — Monorepo

Full-stack motorcycle (Vespa) rental app: **Next.js** frontend + **Ruby on Rails** API. Deploy frontend and backend separately (e.g. Vercel + Render/Railway).

## Structure

- **`backend/`** — Rails 7 API (Devise JWT, PostgreSQL). Deploy to Render, Railway, or similar.
- **`frontend/`** — Next.js 15 (App Router, Tailwind). Deploy to Vercel.

## Quick start

### Backend

```bash
cd backend
cp .env.example .env   # edit DATABASE_URL, FRONTEND_URL, etc.
bundle install
rails db:create db:migrate
rails s -p 4000
```

API: `http://localhost:4000`. Docs: `http://localhost:4000/api-docs`.

### Frontend

```bash
cd frontend
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL=http://localhost:4000
pnpm install
pnpm dev
```

App: `http://localhost:3000`.

## Environment

- **Backend**: `DATABASE_URL`, `RAILS_MASTER_KEY` (or `SECRET_KEY_BASE`), `JWT_SECRET` (if used), `FRONTEND_URL` (for CORS in production).
- **Frontend**: `NEXT_PUBLIC_API_URL` (backend base URL).

## Credentials

Use your own credentials: create a new Rails app secret (`rails secret`), set env vars on your hosting, and point GitHub/deploy links to your repos.
