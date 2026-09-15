# Styling — Tailwind CSS v3

- Tailwind utilities only. No inline `style={{}}` (except computed values GSAP must read/write), no CSS modules, no styled-components.
- Use design tokens from `tailwind.config.ts` — `text-sand`, `bg-noir`, `text-cream`, `border-crimson-light`, etc. Never raw hex in JSX or arbitrary values like `text-[#6B1414]` when a token exists.
- **Arbitrary values are inline styles with extra syntax.** `[70vh]`, `[1.4fr_1fr]`, `[0.3em]`, `min-h-[45vh]` bypass the design system, can't be reviewed at a glance, and fail *silently* when mistyped. An arbitrary value needs either a token in `tailwind.config.ts` or a short comment saying why the scale doesn't cover it. (Never size a content section by viewport height — `layout-responsive.md` §5.)
- **A new `tailwind.config.ts` token needs a dev-server restart to take effect.** Until then the class emits nothing — no error, no style. If a style change appears to do nothing, restart the dev server before debugging further.
- Font families via the configured families, each with one job (`layout-responsive.md` §7): `font-body` (DM Sans) for everything by default, plus the `text-caps-*` headings at `font-extrabold`; `font-display` (Cormorant Garamond 300 italic) for accent phrases inside those headings and `text-2xl` component headings; `font-hserif` (Source Serif 4 600) and `font-grotesk` (Space Grotesk 400) for **header chrome only** — using either in page content is a bug. The logo is an SVG wordmark, never a font.
- Text sizes and letter-spacing come from the **closed scale** in `layout-responsive.md` §7: `text-caps-*` / `text-display-*` / `text-2xl` / `text-lg` / base / `text-sm` / `text-xs`, plus `tracking-label` (0.2em) and `tracking-eyebrow` (0.3em) for uppercase. No `text-[Npx]`, no `tracking-[…em]`, nothing below `text-xs` (12px), and uppercase text is always tracked.
- Class order: layout → box model → typography → color → state/variants. Keep it consistent; if `prettier-plugin-tailwindcss` is installed let it sort.
- Extract a repeated cluster of 6+ classes into a component, not a `@apply` soup.
- Responsive: mobile-first. Base styles are mobile; layer `sm:` `md:` `lg:` upward. Don't write desktop-first with `max-*`.
- Conditional classes: use `clsx` / `cn` helper, never string concatenation with template literals.
- Alternating TreatmentRow layout is driven by index parity (`index % 2`) → a class toggle, not duplicated markup.
- Dark ground is the default surface (`bg-noir`). Ensure text contrast: `cream` for headings, `sand` for body, `muted` only for de-emphasized secondary text **on `noir`** — it fails on `surface`, `crimson-light` and `sand` (`layout-responsive.md` §8). Every sheet has its own ground, so measure against the sheet, not the page.
- No arbitrary z-index values — use the documented scale in `tailwind.config.ts`: `z-menu` (30) → `z-header` (40) → `z-mega` (45). Sheets stack in normal flow below all three.
