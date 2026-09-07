# Styling — Tailwind CSS v3

- Tailwind utilities only. No inline `style={{}}` (except computed values GSAP must read/write), no CSS modules, no styled-components.
- Use design tokens from `tailwind.config.ts` — `text-sand`, `bg-noir`, `text-cream`, `border-crimson-light`, etc. Never raw hex in JSX or arbitrary values like `text-[#6B1414]` when a token exists.
- **Arbitrary values are inline styles with extra syntax.** `[70vh]`, `[1.4fr_1fr]`, `[0.3em]`, `min-h-[45vh]` bypass the design system, can't be reviewed at a glance, and fail *silently* when mistyped. An arbitrary value needs either a token in `tailwind.config.ts` or a short comment saying why the scale doesn't cover it. (Never size a content section by viewport height — `layout-responsive.md` §5.)
- **A new `tailwind.config.ts` token needs a dev-server restart to take effect.** Until then the class emits nothing — no error, no style. If a style change appears to do nothing, restart the dev server before debugging further.
- Font families via the configured families: `font-display` (Cormorant Garamond) for headings/treatment names, `font-body` (DM Sans) for everything else.
- Text sizes and letter-spacing come from the **closed scale** in `layout-responsive.md` §7: `text-display-*` / `text-2xl` / `text-lg` / base / `text-sm` / `text-xs`, plus `tracking-label` (0.2em) and `tracking-eyebrow` (0.3em) for uppercase. No `text-[Npx]`, no `tracking-[…em]`, nothing below `text-xs` (12px), and uppercase text is always tracked.
- Class order: layout → box model → typography → color → state/variants. Keep it consistent; if `prettier-plugin-tailwindcss` is installed let it sort.
- Extract a repeated cluster of 6+ classes into a component, not a `@apply` soup.
- Responsive: mobile-first. Base styles are mobile; layer `sm:` `md:` `lg:` upward. Don't write desktop-first with `max-*`.
- Conditional classes: use `clsx` / `cn` helper, never string concatenation with template literals.
- Alternating TreatmentRow layout is driven by index parity (`index % 2`) → a class toggle, not duplicated markup.
- Dark ground is the default surface (`bg-noir`). Ensure text contrast: `cream` for headings, `sand` for body, `muted` only for de-emphasized secondary text.
- No arbitrary z-index values — keep a small documented scale (nav above content, modal/overlay above nav).
