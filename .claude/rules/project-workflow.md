# Project structure & workflow

## Structure
- `app/` routes, `components/` reusable UI, `data/` typed content, `public/images/<category>/` assets.
- A component used by one page can sit next to that page; promote to `components/` on the second use.
- No `utils/` dumping ground — group helpers by domain (`lib/seo.ts`, `lib/format.ts`).
- Path alias `@/` for all cross-folder imports.

## Before every commit
- `npm run lint` clean — no disabled rules without a comment.
- `npm run build` succeeds (catches static-export violations early).
- No `console.log` left in committed code (`console.error` in catch blocks is fine).
- No commented-out blocks of code — delete it, git remembers.
- No unused imports, files, or `data/` entries.

## Commits
- Small, focused, present-tense summary (`add contacto form validation`).
- One concern per commit — don't mix a refactor with a feature.
- English commit messages.

## Dependencies
- Justify every new dependency — this is a small static site. Prefer a few lines of code over a package for trivial needs.
- No runtime data-fetching libraries, no state managers, no UI kits.

## Performance budget
- Lighthouse: aim ≥ 95 for Performance / Accessibility / Best Practices / SEO on the landing page.
- Watch bundle size — GSAP + ScrollTrigger is the heaviest dep; don't add more animation libs.
- Fonts: `next/font`. **DM Sans and Cormorant Garamond use `display: "block"`, not `swap`** — they compose the hero `<h1>`, and a swap rewraps it, which measured 0.10–0.15 CLS on the landing page (Phase 13.6). Source Serif 4 and Space Grotesk stay on `swap`: they set header chrome, where a swap shifts nothing. Only the weights actually used. Concept 03 ships **eight faces and no more** — Cormorant Garamond 300 + 400 italic, DM Sans 400/500/700/800, Source Serif 4 400 + 600, Space Grotesk 400. Anton is deliberately not loaded: the logo is `public/brand/hannah-wordmark.svg`. Adding a weight is a budget decision — check the built `@font-face` set before and after.
