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
- The landing hero is allowed to fill the screen, because a full-screen hero is the deliberate intent there. Since Phase 4 it does that with `min-h-window` (below), not a raw `100svh` — the sticky header is part of the page now, so the hero should fill what is left under it.
- No fixed `px` heights on content containers. Media containers get an aspect ratio instead (§9).

**The one other exception: `min-h-window`** (Concept 03, pipeline D1). The token is
`calc(100svh - var(--header-h))` — the space left below the sticky header — and it exists so
the redesign can show one treatment, or the three `/servicios` columns, per screen. Its
limits are the whole reason it is allowed:

- **Only `ServiceColumns`, `TreatmentWindow` and the landing hero may use it.** Any fourth caller is a rule change, not a judgement call. (The hero was added in Phase 4: §5 already allowed it a full-viewport height, and now that the header is sticky and in normal flow, "full screen" means the space *below* the header — which is exactly what this token computes. Using it beats hand-rolling `calc(100svh - var(--header-h))` at the call site.)
- **Always `min-h-`, never `h-`.** A sheet whose content outgrows the window must still grow; that is the difference between this and the `min-h-[45vh]` pattern §5 exists to forbid.
- `svh`, not `vh`, so mobile browser chrome doesn't clip the sheet.
- Everything else still sizes to content. `/nosotros` in particular: `py-20`, not a viewport fraction.

## 6. Spacing scale

Use the Tailwind scale (`4/8/12/16/24…`) plus the project's fluid tokens, and nothing else:

| Token | Use |
|---|---|
| `px-gutter` | horizontal page margin — `clamp(1.25rem, 0.5rem + 3vw, 4rem)`, the mockup's (20px @390, 51px @1440) |
| `pb-section-b` / `pb-section-b-lg` | bottom of a page's content |
| `max-w-shell` | the 1280px content cap (§4) |
| `max-w-prose` | long-form text measure (§7) |

Don't invent one-off values. If a value is needed twice, it's a token.

## 7. Typography, size scale and measure

**The text-size scale is closed. Use these and nothing else:**

| Class | px | Role |
|---|---|---|
| `text-caps-*` | fluid | **Display type** — DM Sans **800**, uppercase, `tracking-caps`, leading `0.9`. Named by role, never by size: `caps-hero`, `caps-page`, `caps-talk`, `caps-link`, `caps-name`, `caps-col`, `caps-word`, `caps-about`, `caps-statement`, `caps-card`, `caps-contact`, `caps-form`, `caps-footer`. Each value is the size the **mockup renders** (Phase 13). |
| `text-display-*` | fluid | Cormorant Garamond light italic — long-form legal headings only. The accent phrase inside a heavy-caps heading uses `font-display` at `text-[1.04em] font-normal italic`. |
| `text-2xl` (`text-3xl` sparingly) | 24 / 30 | Cormorant italic component headings — the `/contacto` eyebrow, footer brand. |
| `text-lg` | 18 | Lead **and** body paragraphs, `leading-relaxed`, `max-w-prose`. A 16px body paragraph is a bug. |
| base | 16 | Form controls, and footer / info links at weight **500**. Below 16px iOS Safari zooms on focus — **never** `text-sm` on a form control. |
| `text-sm` | 14 | Dense secondary content only. Never a running paragraph. |
| `text-arrow` | 12.5 | Arrow links — DM Sans **700**, uppercase, `tracking-arrow`. |
| `text-btn` | 12 | Button text — DM Sans **700**, uppercase, `tracking-label`. |
| `text-eyebrow` | 11.5 | Eyebrows — DM Sans **700**, uppercase, `tracking-eyebrow`. |
| `text-label` | 11.2 | Counters, list and column headings, form labels, chips — DM Sans **700**, uppercase, `tracking-label`. **The floor.** |

**Small uppercase is weight 700, always.** This is the single thing that most made the built
site's "text style" read differently from the mockup: every eyebrow, chip, counter, button and
form label was rendering at 400. If you add a small uppercase element, it takes `font-bold`.

**`text-label` (11.2px) replaced `text-xs` (12px) as the floor** — the mockup sets its small
labels at 11.2–11.5px and the mockup is the spec (Phase 13). Nothing below `text-label`.

**Headings carry their own family.** `globals.css` must not set a family or weight on
`h1–h4`. It used to apply `font-display font-light`, which silently turned every small heading
that happened to be an `<h2>`/`<h3>` — "Otras categorías", the `/contacto` info headings, the
philosophy captions, the form title — into Cormorant display type.

- Visual hierarchy comes from size, weight and contrast — never from a heading tag chosen for its default size.
- **Uppercase text is always tracked — but which way depends on size.** *Small* uppercase (`text-xs` / `text-sm` labels, eyebrows, button text, CTAs) is letter-*spaced*: `tracking-label` (0.2em) for inline labels / buttons / small CTAs, `tracking-eyebrow` (0.3em) for the eyebrow above a heading. *Display* uppercase — the `text-caps-*` scale, and anything uppercase at roughly `text-2xl` or larger — takes `tracking-caps` (−0.025em) instead: letters that big read as loose at zero, so they tighten. Uppercase with no tracking at all is a bug either way. **Never uppercase running text** — only labels, eyebrows, CTAs and headings.
- **Leading by role:** `leading-relaxed` on body and lead paragraphs; tight on display headings (`leading-[1.05]` on the hero `<h1>` is the one sanctioned arbitrary value). Never `leading-none` on anything that can wrap.

**Measure — line length 50–75 characters — applies to every multi-line text block, not
just `max-w-prose`.** Card copy, clinic info and form text get a `max-w-*` or a bounded
column so nothing runs to ~100ch on a wide monitor.

- `max-w-prose` is the long-form measure token. It clamps to **`36rem`** (~72ch at 18px, rendered and counted — see the comment in `tailwind.config.ts`). Don't raise it.

## 8. Color and contrast

Minimum 4.5:1 for body text, 3:1 for large text.

**`noir` is no longer the only ground.** Concept 03 gives every sheet its own colour, so a
token has to be measured against the sheet it lands on, not against the page default. Every
figure below was computed from the hex values, not estimated.

On `noir` (#0E0A0A):

| Pair | Ratio | |
|---|---|---|
| `cream` #F0E8DC | 16.20:1 | ✅ |
| `sand` #C9A27A | 8.38:1 | ✅ |
| `crimson-bright` #E0938A as text | 8.17:1 | ✅ (error / alert text + borders) |
| `muted` #847A6F | 4.68:1 | ✅ (just passes — don't darken it) |
| **`crimson` #6B1414 as text or border** | **1.63:1** | ❌ **fails at any size** |

On the sheet themes — `surface` #151010, `crimson` #6B1414, `crimson-light` #3D1A1A, `sand` #C9A27A:

| Pair | Ratio | |
|---|---|---|
| `cream` on `surface` | 15.52:1 | ✅ |
| `sand` on `surface` | 8.02:1 | ✅ |
| **`muted` on `surface`** | **4.49:1** | ❌ **fails** |
| `cream` on `crimson` | 9.96:1 | ✅ |
| `sand` on `crimson` | 5.15:1 | ✅ |
| `crimson-bright` on `crimson` | 5.02:1 | ✅ |
| `sand` on `crimson-light` | 6.56:1 | ✅ |
| `crimson-bright` on `crimson-light` | 6.40:1 | ✅ |
| **`muted` on `crimson-light`** | **3.67:1** | ❌ **fails** |
| `noir` on `sand` | 8.38:1 | ✅ (the footer sheet) |
| **`muted` on `sand`** | **1.79:1** | ❌ **fails badly** |

On the header — `ink` #221A08 and `paper` #FFEBD6:

| Pair | Ratio | |
|---|---|---|
| `paper` on `ink` | 14.85:1 | ✅ |
| `cream` on `ink` | 14.17:1 | ✅ |
| `crimson-bright` on `ink` | 7.14:1 | ✅ |
| `stone` on `ink` | 5.54:1 | ✅ (inactive breadcrumbs) |
| `ink` on `paper` | 14.85:1 | ✅ (the strip button) |

**`muted` is a `noir`-only token.** It fails on `surface`, on `crimson-light` and
catastrophically on `sand`. On any sheet that isn't `noir`, de-emphasized text is `sand` (or
`noir` on the `sand` footer) — never `muted`. A `text-muted` inside a non-noir sheet is a bug.

**A colour-only state change needs a delta measured between its two states**, not just
against the background. `sand` against `muted` is 1.79:1 — two warm tans that read as no
change at all. If colour is the only signal, prove the two states differ; otherwise add
weight, an icon or a text change.

**`crimson` is a background colour, never a text or border colour on `noir`.** A
`crimson-bright` token (#E0938A, ~8:1) was added for this: `ContactForm.tsx` validation
errors, the invalid-field border and the send-failure message now use it, as does the
signature-treatment ★ and the draft banner on the legal pages. If you see `text-crimson`
or `border-crimson` on a dark surface, it's a bug — use `crimson-bright` or `cream`.

Keep the colour table in `CLAUDE.md` in sync with `tailwind.config.ts`.

## 9. Images and media

- `next/image` for every image — no bare `<img>`.
- Every media container declares an **aspect ratio**; never a fixed height. An unconstrained ratio in a wide column produced an image taller than the viewport.
- `object-cover` on anything that fills a frame.
- **The images are real.** `public/images/**` holds the client's photographs as WebP. They arrived as rasters wrapped in SVG at 150–250 KB each and were converted (2,241 KB → 187 KB). An earlier version of this rule called them "~600-byte stubs" — that was wrong, and it is why a page was shipping 2.7 MB. Judge layout against these, and re-check weight whenever art is replaced: static export ships exactly what is committed.

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
