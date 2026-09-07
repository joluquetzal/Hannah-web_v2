# Frontend conventions — HannaH

**These rules are binding.** Read this file before changing any markup, Tailwind class, or
layout in `app/` or `components/`. If a task requires breaking a rule here, say so and get
agreement first — do not deviate silently.

Every number in this file was measured by rendering the app in Chromium at real viewport
sizes, not inferred from reading source. Two earlier attempts to fix layout by reading the
code produced changes that moved none of the numbers. **Reading source tells you what the
CSS says; only rendering tells you what it does.**

---

## 1. Semantic HTML

Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<address>`,
`<dl>`, `<footer>` for structure. Reach for `<div>` only when no element carries the
meaning.

Current state is good — the app already uses 8 `<section>`, 2 `<article>`, 2 `<figure>`,
2 `<address>`, a `<dl>` for clinic details, and real `<label>`s. Hold that line.

- One `<h1>` per page; never skip heading levels for visual size — change the class, not the tag.
- A `<section>` should have an accessible name: either a heading inside it or `aria-labelledby`.
- Form fields always have a `<label>` (not a placeholder standing in for one).

## 2. Structure vs. style, in a Tailwind codebase

The project is **Tailwind-only** — no inline `style={{}}`, no CSS modules. Separation of
concerns happens at the *component* boundary, not the file boundary: a repeated utility
string becomes a component, not a copy-paste.

**Arbitrary values are inline styles with extra syntax.** `[70vh]`, `[1.4fr_1fr]`,
`[0.3em]` bypass the design system, can't be reviewed at a glance, and fail *silently*
when mistyped. Rule:

- An arbitrary value needs either a token in `tailwind.config.ts` or a comment saying why the scale doesn't cover it.
- New Tailwind config tokens require a **dev-server restart**. A missing token produces no error — the class simply does nothing. If a change appears to have no effect, restart before debugging.

## 3. Grid for macro-layout, flex for micro-layout

CSS Grid for page structure (contact columns, treatment rows, footer, hero). Flexbox for
alignment inside a component (nav, button groups, form rows). Already followed throughout.

## 4. Responsive: mobile-first **with an upper bound**

Tailwind is mobile-first by construction (`md:` = `min-width`) — base classes are the
mobile design, breakpoint prefixes add complexity. Keep that.

Mobile-first is only half the rule, and the missing half caused every layout complaint this
project has had. Scaling *up* from 375px says nothing about 1920 or 2560. Without a cap,
every page rendered into a 1792px band and dropped ~640px of content into 868–1013px
columns; the leftover read as large empty regions.

- **Every page's content lives in a centered shell**: `mx-auto max-w-shell px-gutter`, where `shell` = `80rem` (1280px).
- **One alignment axis site-wide: left-aligned within the shell.** No page centers its own content column — this was a deliberate decision, `/nosotros` included.
- Never let a layout stretch to the viewport edge except a deliberate full-bleed element (a background image, the fixed nav).

## 5. Relative units — but height follows content

`rem` / `em` / `%` / `ch` for type, spacing and measure. Tailwind's default scale is
already rem-based, so this is mostly automatic.

**The exception that matters:** viewport-height units are relative units too, and they are
what reserved 450–700px of section height for 150–190px of text on `/nosotros`.

- **Never size a content section by viewport height.** Height comes from content plus padding.
- `min-h-[100svh]` is allowed on the landing hero only, because a full-screen hero is the deliberate intent there.
- No fixed `px` heights on content containers. Media containers get an aspect ratio instead (§9).

## 6. Spacing scale

Use the Tailwind scale (`4/8/12/16/24…`) plus the project's fluid tokens, and nothing else:

| Token | Use |
|---|---|
| `px-gutter` | horizontal page margin (clamps 1.5→4rem) |
| `pt-top-clear` | clearance under the fixed nav |
| `pb-section-b` / `pb-section-b-lg` | bottom of a page's content |
| `max-w-shell` | the 1280px content cap (§4) |
| `max-w-prose` | long-form text measure (§7) |

Don't invent one-off values. If a value is needed twice, it's a token.

## 7. Typography and measure

- Display/headings: Cormorant Garamond, light italic, via the fluid `text-display-lg|md|sm` tokens.
- Body/UI: DM Sans. **Lead and body paragraphs are 18px (`text-lg`)** — this applies to page intros, hero subtext and treatment descriptions alike. A 16px body paragraph is a bug, not a variant.
- Labels/eyebrows: 12px uppercase with wide tracking. Never below 12px.
- Visual hierarchy comes from size, weight and contrast — never from a heading tag chosen for its default size.

**Line length: 50–75 characters.** Measured today: body copy runs 46–68ch, which is
healthy. Two things to watch:

- The one remaining 16px paragraph measures **76ch** — fixing it to `text-lg` also fixes the measure.
- `max-w-prose` clamps up to `56rem`, which reaches ~79ch on a 2560px monitor. Cap the token near **70ch** rather than 56rem.

## 8. Color and contrast

Minimum 4.5:1 for body text, 3:1 for large text. Measured against `noir` (#0E0A0A):

| Pair | Ratio | |
|---|---|---|
| `cream` #F0E8DC | 16.20:1 | ✅ |
| `sand` #C9A27A | 8.38:1 | ✅ |
| `cream` on `crimson` button | 9.96:1 | ✅ |
| `sand` on `crimson-light` | 6.56:1 | ✅ |
| `muted` #847A6F | 4.68:1 | ✅ (just passes — don't darken it) |
| `crimson-bright` #E0938A as text | 8.17:1 | ✅ (error / alert text + borders) |
| **`crimson` #6B1414 as text or border** | **1.63:1** | ❌ **fails at any size** |

**`crimson` is a background colour, never a text or border colour on `noir`.** A
`crimson-bright` token (#E0938A, ~8:1) was added for this: `ContactForm.tsx` validation
errors, the invalid-field border and the send-failure message now use it, as does the
signature-treatment ★ and the draft banner on the legal pages. If you see `text-crimson`
or `border-crimson` on a dark surface, it's a bug — use `crimson-bright` or `cream`.

Keep the colour table in `CLAUDE.md` in sync with `tailwind.config.ts` — the doc currently
lists `muted` as `#7A6E65`, which measures 3.98:1 and fails; the config correctly uses
`#847A6F`.

## 9. Images and media

- `next/image` for every image — no bare `<img>`.
- Every media container declares an **aspect ratio**; never a fixed height. An unconstrained ratio in a wide column produced an image taller than the viewport.
- `object-cover` on anything that fills a frame.
- **Placeholders are placeholders.** `public/images/**` currently holds ~600-byte SVGs and 42-byte GIFs. They render exactly as coded. Any region meant to be carried by a photo will look empty until real assets arrive — that is a content gap, not a CSS bug, and must not be "fixed" in CSS. Judge layout with representative content, never with blank placeholders.

## 10. Interactive targets

- **≥44×44 CSS px** for primary actions (buttons, CTAs, nav toggles).
- **24×24 is the absolute floor** (WCAG 2.2 AA, SC 2.5.8). 44×44 is the target we hold; 24×24 is the line that must never be crossed.
- Inline text links in footers and info blocks need real padding — an unpadded `<a>` inside a paragraph is ~16px tall.

Measured failures at 390px today, all pages affected: footer links (phone, email, WhatsApp,
Contáctanos) at **16px tall**, `Escríbenos` and `Abrir en Google Maps` at **16px**, the
submit button at **40px**, `Ver servicios` / `Contacto` / `Agendar cita` at **42px**, the
mobile menu button at **40×40**. The contact page's whole purpose is getting someone to tap
a phone number.

## 11. Component boundaries and nesting

Keep the DOM shallow — currently max depth 10 with 13–19 elements inside `<main>`. Hold it.

**A component that exists only to attach a ref or behaviour must not introduce a
layout-affecting box.** `HeroReveal` wrapped its children in an unstyled `<div>`; as a flex
item that div shrink-wrapped, so `mx-auto` on the content inside had nothing to centre
against and the hero sat pinned to the left with 1253px empty beside it. The wrapper was
the only attribute-less div in the app and it broke the page.

When wrapping is needed: give the wrapper `w-full` (or `display: contents`), or forward the
ref to the child instead of adding an element.

## 12. Verification — the rule that makes the others real

**Any change to layout, spacing or typography is verified by rendering and measuring, not
by reading the diff.**

Minimum bar before calling a layout change done:

1. `npm run build` (this is a static export — build catches what dev hides).
2. Load the affected routes at **390 / 768 / 1024 / 1440 / 2560**.
3. `document.documentElement.scrollWidth - window.innerWidth === 0` at every width. Horizontal overflow is always a bug.
4. Spot-check the numbers the change was supposed to move, and state them.

For reference, the wide-viewport pass targets at 1920×1000: no empty band above/below a
text column beyond ~80px, contact inputs ~640px (not 1013px), `/nosotros` page height
~2020px (not 2948px).

## 13. Progressive enhancement

- All GSAP is lazily imported and wrapped in a `prefers-reduced-motion` check. Keep it that way — content must render fully with animation disabled and with JS unavailable.
- `:has()`, `svh` units and cascade layers are safe for this audience (current mobile Safari and Chrome in Mexico). Browser support is not the real risk here.
- The real silent-failure risk is Tailwind: a mistyped class or a missing config token produces no error and no style. Verify visually (§12), don't assume.

## 14. Open — not yet decided

An automated layout check (`scripts/layout-check.mjs`) has been drafted but **is not
adopted**. Pending decisions:

- **Scope**: narrow (cross-viewport overflow + line length + empty-band ceiling) with `@axe-core/playwright` for contrast and target size, or one self-contained script with no extra dependency?
- **Empty-band threshold**: include it at a loose 150px, or omit it because the number is arbitrary and a noisy check gets ignored?
- **Target**: the static build (`out/`, slower, matches production) or the dev server (faster, less faithful)?
- **Trigger**: manual `npm run check:layout`, or a GitHub Action so it runs without being remembered?

Until this is settled, §12 is performed by hand.
