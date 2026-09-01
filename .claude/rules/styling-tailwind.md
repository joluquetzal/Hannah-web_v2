# Styling — Tailwind CSS v3

- Tailwind utilities only. No inline `style={{}}` (except computed values GSAP must read/write), no CSS modules, no styled-components.
- Use design tokens from `tailwind.config.ts` — `text-sand`, `bg-noir`, `text-cream`, `border-crimson`, etc. Never raw hex in JSX or arbitrary values like `text-[#6B1414]` when a token exists.
- Font families via the configured families: `font-display` (Cormorant Garamond) for headings/treatment names, `font-body` (DM Sans) for everything else.
- Class order: layout → box model → typography → color → state/variants. Keep it consistent; if `prettier-plugin-tailwindcss` is installed let it sort.
- Extract a repeated cluster of 6+ classes into a component, not a `@apply` soup.
- Responsive: mobile-first. Base styles are mobile; layer `sm:` `md:` `lg:` upward. Don't write desktop-first with `max-*`.
- Conditional classes: use `clsx` / `cn` helper, never string concatenation with template literals.
- Alternating TreatmentRow layout is driven by index parity (`index % 2`) → a class toggle, not duplicated markup.
- Dark ground is the default surface (`bg-noir`). Ensure text contrast: `cream` for headings, `sand` for body, `muted` only for de-emphasized secondary text.
- No arbitrary z-index values — keep a small documented scale (nav above content, modal/overlay above nav).
