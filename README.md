# Seva Health – Digital Health Wallet

A lightweight digital health wallet: patients register and get a UHID; doctors log in to view, add and delete medical records.

**Stack:** AngularJS (static frontend) · Node.js/Express · PostgreSQL (Supabase) · Render

Docs: [Technical design & diagrams](docs/ARCHITECTURE.md) · Sample data: [sample-data/sample.sql](sample-data/sample.sql) · Tests: [tests/](tests/) · License: [MIT](LICENSE)

## Setup
1. Install Node 18+ and create a PostgreSQL database (a free Supabase project works).
2. Run `schema.sql` in the Supabase SQL editor (optionally `sample-data/sample.sql`).
3. `cp .env.example .env` and fill it in.
4. `npm install && npm start`, then open http://localhost:3000.

### Environment variables
| Name | Description |
|---|---|
| DATABASE_URL | PostgreSQL connection string (Supabase "Session pooler" string recommended) |
| JWT_SECRET | Long random secret for signing tokens |
| CORS_ORIGINS | Optional extra allowed origins, comma separated |
| PORT | Server port (default 3000) |

Demo doctors are seeded on startup (e.g. `harsh` / `pass123`).

## Tests
With the server running: `BASE_URL=http://localhost:3000 npm test`

## Deploy on Render
Push to GitHub, then Render → New → Blueprint → select the repo (uses `render.yaml`). Set `DATABASE_URL` to your Supabase connection string. The service serves both the API and the frontend.
