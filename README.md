# founder-hackathon

Caterists — a verified *hausgemachtes*-catering marketplace for Hamburg (see
[`PRD.md`](./PRD.md)). This repo ships three front-ends plus a small edge router that
serves them together under one origin.

| Path | App | Source |
|------|-----|--------|
| `/` | Consumer landing page (static HTML/CSS/JS) | [`landing/`](./landing) |
| `/backoffice/` | Caterer back office (supply-side dashboard prototype) | [`backoffice/`](./backoffice) |
| `/pitch/` | Investor pitch deck (Vite + React) | [`pitchdeck/`](./pitchdeck) |

Each app is a self-contained static site in its own container, served under its own
path (the landing page needs no build step; the back office and pitch deck are
multi-stage Node → nginx builds). A small [`gateway/`](./gateway) container
reverse-proxies all three behind a single port, so the whole stack is one domain.

```
            :8088 (local)  /  your domain (Coolify)
                       │
                 ┌─────▼─────┐
                 │  gateway  │   nginx reverse proxy
                 └─────┬─────┘
        ┌──────────────┼────────────────┐
        │ /            │ /backoffice/    │ /pitch/
   ┌────▼────┐   ┌─────▼────┐   ┌────────▼─┐
   │ landing │   │backoffice│   │ pitchdeck│   static nginx (internal only)
   └─────────┘   └──────────┘   └──────────┘
```

## Run the whole stack

```bash
docker compose up --build
```

- Landing     → <http://localhost:8088/>
- Back office → <http://localhost:8088/backoffice/>
- Pitch deck  → <http://localhost:8088/pitch/>

The host port comes from [`docker-compose.override.yml`](./docker-compose.override.yml),
which Docker Compose auto-merges locally. (Each app also has its own `Dockerfile` for
running in isolation — see the README in each folder.)

## Run in dev mode (no Docker, via Claude Code)

No root orchestrator, no `concurrently`, no Docker. The back office and pitch deck are
plain Vite projects; the landing page is plain static HTML (open `landing/index.html`,
or `npx serve landing`). The fastest way to bring the two app servers up locally is to
paste this prompt into [Claude Code](https://claude.com/claude-code) from the repo root
and let it run both dev servers for you:

```text
Start both Caterists dev servers locally, without Docker. Run each in its own
background process from the repo root:

1. cd backoffice && npm install && npm run dev   → http://localhost:5173
2. cd pitchdeck  && npm install && npm run dev   → http://localhost:3000/pitch/

Install dependencies first if node_modules is missing. Keep both running, stream
their logs, and print the two URLs when they're up. Don't build any containers.
```

Claude will install dependencies (if needed) and start both Vite dev servers with hot
reload:

- Back office → <http://localhost:5173>
- Pitch deck  → <http://localhost:3000/pitch/>  (served under `/pitch/` — the Vite `base`)

There's no gateway in dev mode — the two servers run on separate ports and reload
independently. (Prefer to run them by hand? The two `npm install && npm run dev`
commands above are all there is.)

> The back office loads React, Tailwind, Babel and Lucide from public CDNs at runtime,
> so dev mode needs outbound internet too.

## Deploy on Coolify

1. **Add resource → Docker Compose**, pointing at this repo (root
   [`docker-compose.yml`](./docker-compose.yml)).
2. Deploy. Coolify auto-creates a private network — the four services find each other
   by name, and the gateway proxies `landing:80` / `backoffice:80` / `pitchdeck:80`.
3. **Attach your domain to the `gateway` service** (its *Domains* field, e.g.
   `https://caterists.example.com`). Coolify's proxy routes the domain to the gateway's
   port 80 with automatic TLS. Leave `landing`, `backoffice` and `pitchdeck` with **no**
   domain — they stay internal and are only reached through the gateway.

That's it — no env vars, no volumes, no persistence (every app is fully in-memory and
static).

**Why no host `ports` in `docker-compose.yml`:** publishing a fixed host port on a
shared Coolify server risks a port collision and bypasses the proxy/TLS. Coolify routes
external traffic by domain, not by published port, so the gateway only needs its
container port (80) exposed. The local host-port mapping lives in the override file,
which Coolify does not use.

> The pitch deck is built with Vite `base: '/pitch/'` and the back office's asset
> references are relative, so both are *designed* to live under their sub-paths. If you
> split one onto its own domain, serve it at `/` (for the deck, drop the Vite `base`)
> and rebuild.

> **Heads-up:** the back-office prototype loads React, Tailwind, Babel and Lucide from
> public CDNs at runtime, so visitors' browsers need outbound internet to those CDNs.
> The pitch deck bundles everything and has no such dependency.
