import { defineConfig } from 'vite'

// The back office is a static, CDN-based prototype: React UMD + Tailwind CDN +
// in-browser Babel (the <script type="text/babel"> tags in index.html). We do NOT
// want Vite to transform those .jsx files through its own module pipeline — Babel
// must receive them verbatim. So the prototype source lives in `public/`, which
// Vite serves and copies as-is, untouched. Vite is used purely as the static
// dev server (and a zero-config bundler for `build`/`preview`).
export default defineConfig({
  server: { port: 5173, strictPort: true },
  preview: { port: 5173, strictPort: true },
})
