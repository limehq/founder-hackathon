# Caterists — Caterer Back Office (prototype)

A fully clickable, in-memory prototype of the supply-side dashboard for **Caterists**,
the verified hausgemachtes-catering marketplace from [`../PRD.md`](../PRD.md).

Persona: **Aylin Demir**, a Home-Pro cook (Pathway Stage 2) in Ottensen, Hamburg.
The model is the locked Uber-style pool: a request is broadcast to every eligible cook,
the **first binding Accept wins** and closes it for everyone; cancelling re-broadcasts it
to the pool; after accepting, cook and buyer chat to sort the details.

This is a design handoff from Claude Design, dropped in **as-is**: it renders with CDN
React + Tailwind and transpiles its JSX in the browser via Babel — no build step, no
framework. [Vite](https://vite.dev) is used purely as the static dev server.

## Run it

```bash
cd backoffice
npm install
npm run dev          # Vite → http://localhost:5173
```

Then open <http://localhost:5173>. Requires an internet connection (React, Tailwind,
Babel and Lucide load from CDNs).

To produce a deployable static bundle:

```bash
npm run build        # → dist/
npm run preview      # serve dist/ on http://localhost:5173
```

> **Why Vite serves from `public/`:** the prototype's `.jsx` files are fetched and
> transpiled by Babel *in the browser*, so Vite must hand them over verbatim. They live
> in `public/`, which Vite serves and copies untouched — they never go through Vite's own
> module pipeline. (This also means the app can't be opened as a bare `file://`; it must
> be served over HTTP, which `npm run dev`/`preview` handle.)

## Run in a container

A two-stage [`Dockerfile`](./Dockerfile) builds the static bundle with Node, then
serves it with nginx (`nginx.conf`). The final image is ~50 MB and listens on port 80.
The app is served under **`/backoffice/`** (asset paths are relative, so it's
base-path-agnostic — `npm run dev` still serves it at `/`).

```bash
docker build -t caterists-backoffice .
docker run --rm -p 8089:80 caterists-backoffice   # → http://localhost:8089/backoffice/
```

Or with Compose:

```bash
docker compose up --build                          # → http://localhost:8089/backoffice/
```

> To run both apps together behind one entry point, use the stack compose at the
> repo root instead (see the top-level `README.md`).

### Deploy on Coolify

Point a new Coolify resource at this repo with **Base Directory** `backoffice`:

- **Dockerfile** build pack (recommended for this single static container) — Coolify
  builds the `Dockerfile`, detects the exposed port (80), and you attach a domain. No
  env vars needed; the app is fully in-memory and self-contained.
- **Docker Compose** build pack — point it at `docker-compose.yml` instead; Coolify
  manages the public port/domain via its proxy (the `8080` host mapping is for local
  use only).

The image's `HEALTHCHECK` hits `/`, so Coolify's health status reflects nginx being up.

## The demo flow (hero)

1. The dashboard loads on the **calm** layout. About 4.5s in, a **live request from
   Velt Studios** arrives as a countdown toast (top-right).
2. Open it (**View details**) — see the match reasons, the "How this reached you"
   broadcast flow, and your capacity fit.
3. **Accept order** before the deadline → binding-accept dialog → "You've got it"
   banner, the buyer chat opens, your standing ticks up.
4. Explore **Requests** (live / confirmed / history), **Availability** (per-day
   capacity), **Kitchen** (private matching profile, *not* a buyer-facing menu),
   **Earnings** (12% take-rate, payouts), and **Profile** (Home-Pro pathway +
   Verified Gate + what's left to advance).

## Screens

| Nav | File | What it shows |
|-----|------|---------------|
| Dashboard | `public/app/dashboard.jsx` | KPIs, the live hero lead, standing, today, pathway. Three layouts (focus / command / **calm** = default). |
| Requests | `public/app/leads.jsx` | Broadcast inbox + lead detail, binding accept, pass, cancel → re-broadcast, post-accept chat. |
| Availability | `public/app/calendar.jsx` | 5-week capacity calendar, per-day covers, block-off. |
| Kitchen | `public/app/kitchen.jsx` | Cuisines, dietary, allergens, reach & capacity — private, used only to match orders. |
| Earnings | `public/app/earnings.jsx` | Net chart, next payout, 12% take-rate breakdown, payouts table. |
| Profile | `public/app/profile.jsx` | Home-Pro pathway timeline, Verified Gate, next steps, compliance note. |

Shared: `public/app/data.jsx` (mock data), `public/app/ui.jsx` (countdown, charts,
badges), `public/app/main.jsx` (shell, sidebar, routing, incoming-lead flow),
`public/lib/components.jsx` (shadcn/ui kit), `public/lib/colors_and_type.css` (tokens).
The entry `index.html` lives at the project root and pulls these in.

## Notes

- **In-memory only** — no backend, no persistence; state resets on reload (matches the
  PRD scope: mockups, no real services).
- **Theme** — light, warm stone neutrals + terracotta brand accent.
- The floating **Tweaks** panel (`public/lib/tweaks-panel.jsx`) is design-tool chrome;
  it stays hidden unless activated by a Claude Design host, so it doesn't appear here.
- **Deploy** — `npm run build` emits a plain static `dist/`. Drop it on any static host
  (Vercel, Netlify, GitHub Pages) and point at `index.html`, or ship the container (see
  [Run in a container](#run-in-a-container) for Coolify).
