# founder-hackathon

Caterists — a verified *hausgemachtes*-catering marketplace for Hamburg (see
[`PRD.md`](./PRD.md)). This repo ships two front-ends plus a small edge router that
serves them together under one origin.

| Path | App | Source |
|------|-----|--------|
| `/backoffice/` | Caterer back office (supply-side dashboard prototype) | [`backoffice/`](./backoffice) |
| `/pitch/` | Investor pitch deck (Vite + React) | [`pitchdeck/`](./pitchdeck) |
| `/` | → redirects to `/backoffice/` | [`gateway/`](./gateway) |

Each app is a self-contained static site in its own container (multi-stage build →
nginx), served under its own base path. A third tiny [`gateway/`](./gateway) container
reverse-proxies both behind a single port, so the whole stack is one domain.

```
              :8088  (local)  /  your domain  (Coolify)
                │
          ┌─────▼─────┐
          │  gateway  │  nginx reverse proxy
          └──┬─────┬──┘
 /backoffice/│     │ /pitch/        ( / → /backoffice/ )
        ┌────▼─┐ ┌─▼──────┐
        │ back │ │ pitch  │   static nginx servers (internal only)
        │office│ │ deck   │
        └──────┘ └────────┘
```

## Run the whole stack

```bash
docker compose up --build
```

- Back office → <http://localhost:8088/backoffice/>
- Pitch deck  → <http://localhost:8088/pitch/>

The host port comes from [`docker-compose.override.yml`](./docker-compose.override.yml),
which Docker Compose auto-merges locally. (Each app also has its own `Dockerfile` for
running in isolation — see the README in each folder.)

## Deploy on Coolify

1. **Add resource → Docker Compose**, pointing at this repo (root
   [`docker-compose.yml`](./docker-compose.yml)).
2. Deploy. Coolify auto-creates a private network — the three services find each other
   by name, and the gateway proxies `backoffice:80` / `pitchdeck:80`.
3. **Attach your domain to the `gateway` service** (its *Domains* field, e.g.
   `https://caterists.example.com`). Coolify's proxy routes the domain to the gateway's
   port 80 with automatic TLS. Leave `backoffice` and `pitchdeck` with **no** domain —
   they stay internal and are only reached through the gateway.

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
