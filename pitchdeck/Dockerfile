# syntax=docker/dockerfile:1

# ---- Build stage: compile the Vite + React bundle ----
FROM node:22-alpine AS build
WORKDIR /app

# Install against the lockfile first so this layer caches until deps change.
COPY package.json package-lock.json ./
RUN npm ci

# Build the static bundle into /app/dist (Vite base is /pitch/).
COPY . .
RUN npm run build

# ---- Serve stage: nginx serving the static bundle under /pitch/ ----
FROM nginx:1.27-alpine AS serve

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vite emits asset URLs prefixed with /pitch/, so the bundle lives under that
# same sub-path (see nginx.conf for the why).
COPY --from=build /app/dist /usr/share/nginx/html/pitch

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/pitch/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
