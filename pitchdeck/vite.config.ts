import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Served under a sub-path behind the reverse proxy (see docker-compose.yml).
  // Vite's `base` prefixes every emitted asset/module URL and is substituted
  // for `%BASE_URL%` in index.html, so the favicon resolves under the sub-path.
  base: '/pitch/',
  server: {
    port: 3000,
  },
  plugins: [viteReact()],
})
