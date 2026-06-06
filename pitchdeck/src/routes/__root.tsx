/// <reference types="vite/client" />
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Caterists Pitch Deck' },
      {
        name: 'description',
        content:
          'Caterists is a pitch deck for a verified catering marketplace in Hamburg with AI intake, broadcast matching, binding accept and a Home-Pro pathway.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      // BASE_URL is Vite's `base` ('/pitch/'), so the icon resolves under the
      // sub-path too. appCss is a `?url` import, already base-prefixed by Vite.
      { rel: 'icon', type: 'image/svg+xml', href: `${import.meta.env.BASE_URL}favicon.svg` },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
