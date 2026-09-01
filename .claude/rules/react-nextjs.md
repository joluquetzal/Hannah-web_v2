# React & Next.js (App Router, static export)

## Server vs client components
- Server components by default. Add `"use client"` only for: form state, hover/interaction state, GSAP, `useEffect`, browser APIs, event handlers.
- Push `"use client"` to the leaf. A page stays a server component; the interactive piece (form, animated section) is its own client component.
- Never `"use client"` on `app/layout.tsx` or a route `page.tsx` unless the whole page is genuinely interactive.

## Static export constraints (`output: 'export'`)
- No API routes, no route handlers, no server actions, no middleware, no `next/headers` or `cookies()`.
- No dynamic `generateMetadata` that needs a request. Static `metadata` exports only.
- `next/image` requires `images.unoptimized: true` (already set for export) — keep it.
- All data is imported at build time from `data/`. No runtime fetching for content.

## Structure
- One route = one folder with `page.tsx`. Route-specific components can live beside the page; anything reused goes in `components/`.
- Co-locate `metadata` (title, description, OpenGraph) in every `page.tsx`. Spanish copy.
- Use the `<Link>` component for internal navigation, never `<a>` for internal routes.
- Keep pages independent — no shared client state, no global store, no context for content.

## Components
- Functional only, no class components.
- One component per file, PascalCase filename matching the export.
- Props: destructure in the signature, give defaults inline, mark optional props with `?`.
- Prefer composition over boolean-flag prop explosions.
- No business logic in JSX — compute above the `return`.
