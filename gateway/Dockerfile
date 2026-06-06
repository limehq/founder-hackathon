# syntax=docker/dockerfile:1

# Tiny edge router: stock nginx + our reverse-proxy config. Self-contained
# (config baked in) so it deploys anywhere without bind mounts.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
