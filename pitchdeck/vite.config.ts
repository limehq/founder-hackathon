import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // Served under a sub-path behind the reverse proxy (see docker-compose.yml).
  // Vite's `base` prefixes every emitted asset/module URL; the router's
  // `basepath` (src/router.tsx) must match so routes + links agree.
  base: '/pitch/',
  server: {
    port: 3000,
  },
  plugins: [tanstackStart(), viteReact()],
})
