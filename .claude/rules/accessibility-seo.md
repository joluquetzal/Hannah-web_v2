# Accessibility & SEO

## Accessibility
- One `<h1>` per page. Headings descend in order — no skipping levels for styling.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>` with an accessible name.
- Interactive elements are real `<button>` / `<a>` — never a `<div>` with `onClick`.
- Visible focus states on every interactive element. Don't remove outlines without a replacement.
- **Touch / pointer targets: 44×44 CSS px for primary actions** — buttons, CTAs, the nav toggle, the form submit, the language switch. **24×24 is the absolute floor** (WCAG 2.2 AA, SC 2.5.8) and must never be crossed. An unpadded `<a>` inside a paragraph (footer links, inline "más info") is ~16px tall — give inline text links in footers and info blocks real padding.
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and for UI borders/icons — verify `sand`/`muted` on `noir`.
- **`crimson` (#6B1414) is a background colour only — never text or a border on `noir`.** Measured 1.63:1; fails at any size. It was the colour of the form validation errors, the invalid-field border and the send-failure message, where it was effectively invisible. Error / alert text and borders use the `crimson-bright` token (#E0938A, ~8.2:1) or `cream`.
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
