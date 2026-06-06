# syntax=docker/dockerfile:1

# ---- Build stage: produce the static dist/ with Vite ----
FROM node:22-alpine AS build
WORKDIR /app

# Install deps against the lockfile for reproducible builds. Copying just the
# manifests first keeps this layer cached until dependencies actually change.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the prototype source and emit the static bundle into /app/dist.
COPY . .
RUN npm run build

# ---- Serve stage: nginx serving the static files ----
FROM nginx:1.27-alpine AS serve

# Replace the stock server block with our static-site config.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Drop in the built site under /backoffice/ (the base path it's served at).
COPY --from=build /app/dist /usr/share/nginx/html/backoffice

EXPOSE 80

# Lightweight self-check; Coolify can layer its own health check on top.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/backoffice/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
