# Vespa Rentals — Step-by-step deploy & credentials

Use **your** credentials and **your** GitHub/deploy URLs. Below is a minimal checklist.

---

## 1. Monorepo location

The app lives at:

- **Inside your portfolio repo:** `my-portfolio/vespa-rentals/`
  - `vespa-rentals/backend/` — Rails API
  - `vespa-rentals/frontend/` — Next.js

You can either:

- **Option A:** Push `vespa-rentals` as its own repo (e.g. `Besufekad-HAZ/vespa-rentals`) and deploy from there, or  
- **Option B:** Keep it inside the portfolio repo and deploy `vespa-rentals/backend` and `vespa-rentals/frontend` as separate services (each platform points at the correct root).

---

## 2. Backend (Rails) — e.g. Render / Railway

1. **Create a new Web Service** and connect the repo (or the `vespa-rentals/backend` folder if your platform supports subfolder deploy).
2. **Build command:** `bundle install && rails db:migrate` (or `bin/rails db:create db:migrate` on first deploy).
3. **Start command:** `rails s -p $PORT` or `bundle exec puma -C config/puma.rb`.
4. **Environment variables (use your values):**
   - `DATABASE_URL` — from your host (Render/Railway provide this).
   - `SECRET_KEY_BASE` — run `rails secret` and paste.
   - `FRONTEND_URL` — your frontend URL, e.g. `https://vespa-rentals.vercel.app` (for CORS). No trailing slash.
5. **Optional:** If you use a separate JWT secret, set `JWT_SECRET_KEY` (or whatever your `devise-jwt` config expects).

After deploy, note the backend URL (e.g. `https://vespa-rentals-api.onrender.com`).

---

## 3. Frontend (Next.js) — e.g. Vercel

1. **Create a new project** and connect the same repo (or the repo that contains `vespa-rentals/frontend`).
2. **Root directory:** Set to `vespa-rentals/frontend` (if the repo is the monorepo).
3. **Environment variable:**
   - `NEXT_PUBLIC_API_URL` = your backend URL from step 2 (e.g. `https://vespa-rentals-api.onrender.com`). No trailing slash.
4. **Build / start:** Default (`pnpm build` / `next start` or `npm run build` / `npm start`) is fine.

After deploy, note the frontend URL (e.g. `https://vespa-rentals.vercel.app`).

---

## 4. Wire backend to frontend

1. In the **Rails** host, set:
   - `FRONTEND_URL` = your frontend URL from step 3 (so CORS allows it).
2. Redeploy the backend so the new env is picked up.

---

## 5. Portfolio links

In your portfolio’s `app/work/project.ts` (or wherever the Vespa Rentals project is defined), set:

- **link** — live app URL (e.g. `https://vespa-rentals.vercel.app`).
- **github** — your repo (e.g. `https://github.com/Besufekad-HAZ/vespa-rentals`).

Use your own GitHub username and repo name.

---

## 6. Run locally (optional)

- **Backend:**  
  `cd vespa-rentals/backend`  
  Copy `.env.example` to `.env`, set `DATABASE_URL` and optionally `FRONTEND_URL=http://localhost:3000`.  
  `bundle install && rails db:create db:migrate && rails s -p 4000`

- **Frontend:**  
  `cd vespa-rentals/frontend`  
  Copy `.env.local.example` to `.env.local`, set `NEXT_PUBLIC_API_URL=http://localhost:4000`.  
  `npm install` (or `pnpm install`) then `npm run dev` (or `pnpm dev`).

Use **Node 18+** for the frontend (Next 16 requires it).

---

## Summary

| Item            | Where to set it              | Example (yours)                    |
|-----------------|------------------------------|------------------------------------|
| Backend URL     | Frontend env                 | `NEXT_PUBLIC_API_URL`              |
| Frontend URL    | Backend env (CORS)           | `FRONTEND_URL`                     |
| DB              | Backend env                  | `DATABASE_URL`                     |
| Rails secret    | Backend env                  | `SECRET_KEY_BASE`                  |
| Live app link   | Portfolio `project.ts`       | `link`                             |
| GitHub repo     | Portfolio `project.ts`       | `github`                           |

All credentials and URLs should be **yours**; this doc only guides where to set them.
