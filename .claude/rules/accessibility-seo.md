# Accessibility & SEO

## Accessibility
- One `<h1>` per page. Headings descend in order — no skipping levels for styling.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with an accessible name.
- Interactive elements are real `<button>` / `<a>` — never a `<div>` with `onClick`.
- Visible focus states on every interactive element. Don't remove outlines without a replacement.
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text — verify `sand`/`muted` on `noir`.
- `prefers-reduced-motion` respected everywhere (see animations rule).
- Nav: keyboard operable, `aria-current="page"` on the active link, focus trap only if it becomes a mobile drawer.
- Images: meaningful `alt`, decorative `alt=""`.
- Form fields labelled and error-linked (see forms rule).
- Test tab order on every new page.

## SEO
- Every `page.tsx` exports `metadata` with a unique Spanish `title` and `description`.
- Set `metadataBase`, canonical URLs, and OpenGraph/Twitter card image in `app/layout.tsx`.
- `lang="es"` on `<html>`.
- Add `app/sitemap.ts` and `app/robots.ts` (static export compatible).
- Descriptive, keyword-relevant `alt` and heading text — this is a marketing site, discoverability matters.
- JSON-LD structured data for the business: `LocalBusiness` / `HealthAndBeautyBusiness` with address, hours, geo, phone.
- No `noindex` left on any production page.
