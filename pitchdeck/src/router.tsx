import { createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({
    routeTree,
    scrollRestoration: true,
    // Must match Vite's `base` in vite.config.ts so SSR + client links and
    // asset URLs are all prefixed for sub-path hosting behind the proxy.
    basepath: '/pitch',
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
