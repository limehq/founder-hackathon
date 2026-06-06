# syntax=docker/dockerfile:1

# Plain static site — no build step, just nginx serving the files at the root.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the static assets explicitly (keeps Dockerfile/nginx.conf out of the webroot).
COPY index.html /usr/share/nginx/html/
COPY css        /usr/share/nginx/html/css/
COPY js         /usr/share/nginx/html/js/
COPY assets     /usr/share/nginx/html/assets/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
