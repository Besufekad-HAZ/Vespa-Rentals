# Vespa Rentals — Monorepo

Full-stack motorcycle (Vespa) rental app: **Next.js** frontend + **Ruby on Rails** API. Deploy frontend and backend separately (e.g. Vercel + Render/Railway).

## Structure

- **`backend/`** — Rails 7 API (Devise JWT, PostgreSQL). Deploy to Render, Railway, or similar.
- **`frontend/`** — Next.js 15 (App Router, Tailwind). Deploy to Vercel.

## Prerequisites

- **Ruby 3.3** (e.g. rbenv, asdf, or Ruby installer on Windows)
- **Node.js ≥ 20.9** (e.g. nvm, fnm; required by Next.js 16)
- **PostgreSQL** (for the Rails backend)
- **Bundler**: `gem install bundler` (with Ruby 3.3)

## Quick start

Use **two terminals**: one for the backend, one for the frontend.

### Terminal 1 — Backend

```bash
cd backend
cp .env.example .env   # edit DATABASE_URL, FRONTEND_URL if needed
bundle install
rails db:create db:migrate
rails server -p 4000
```

- API: **http://localhost:4000**
- Swagger docs: **http://localhost:4000/api-docs**

### Terminal 2 — Frontend

```bash
cd frontend
cp .env.local.example .env.local   # already points to http://localhost:4000
npm install
nvm use                            # use Node from .nvmrc (avoids version mismatch)
node scripts/run-next.js dev        # start dev server with this Node
```

- App: **http://localhost:3000** (frontend talks to backend at 4000)
- If you prefer `npm run dev`, ensure `node -v` and the Node used by `npm` are the same (e.g. run `nvm use` first).

## Environment

- **Backend**: `DATABASE_URL`, `RAILS_MASTER_KEY` (or `SECRET_KEY_BASE`), `JWT_SECRET` (if used), `FRONTEND_URL` (for CORS and **forgot-password** reset link in emails; e.g. `http://localhost:3000`).
- **Frontend**: `NEXT_PUBLIC_API_URL` (backend base URL).

## Credentials

Use your own credentials: create a new Rails app secret (`rails secret`), set env vars on your hosting, and point GitHub/deploy links to your repos.
