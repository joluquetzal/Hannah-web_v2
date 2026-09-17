# Phase 13 — Mockup fidelity pass

**Why this exists.** The owner reviewed the built site on 2026-09-16: the direction is right, but it
does not look like the mockup. Sizes, spacing, weights and several details drifted during phases 1–11,
a few pieces are missing, and there are two visible bugs. **The mockup is the spec.** Where this file and
an earlier phase disagree, this file wins; where this file and `.claude/rules/` disagree, the F-decisions
below say how (and the rule file gets updated in the same commit).

Run it with `/concept-03 13` (it runs the next unfinished step), or `/concept-03 13.4` for one step.

## Owner feedback (verbatim intent)

1. Many sizes don't match the mockup — across the whole site.
2. Missing buttons and missing animation (e.g. the scroll progress bar).
3. Bugs: the footer "HannaH" wordmark is cut off and is not the mockup size; on `/contacto` "¿HABLAMOS?"
   sits on top of everything.
4. Spacing, margins, paddings and sizes differ from the mockup.
5. `/nosotros` — the first section looks quite different from the mockup.
6. The mockup's text styling is preferred — match it.
7. On every category page, the first treatment should already be peeking in from below when the page opens.
8. In general: stick to the mockup.

## How to work this phase

- **Measure against the mockup, not against memory.** The tool below renders the mockup and the site side by
  side and diffs ~60 elements per page (font, size, weight, tracking, colour, position, size, sheet paddings).
  A step is done when its elements show no unexplained **bold** cells in the report.
- The baseline report from 2026-09-16 is in `docs/design/concept-03/audit/2026-09-16/` —
  `report.md` plus side-by-side screenshots as JPEG (mockup left, site right); its `README.md` lists the
known tool noise (e.g. the logo row always differs, because the site's logo is an SVG). Read the relevant section before
  starting a step.
- **How to read the mockup's CSS.** Sizes in `prototipo.html` are written in `cqi` (the phone/desktop frame's
  width). On the real site the frame *is* the viewport, so **`N cqi` = `N vw`**. Every value in the tables
  below has already been converted.
- The mockup's `fit()` script shrinks some headings until they fit their column. The site must reproduce the
  *rendered* result without that script — see F5.
- One commit per step: `concept-03: phase 13.N — <summary>`. Append the step's before/after numbers to the Log
  in `concept-03-redesign.md`. Stop for approval after 13.1 (it touches everything) and after 13.10.

### The comparison tool

`docs/design/concept-03/tools/compare.mjs` (needs F2):

```bash
npm run build && npx serve out -l 4173          # or: npm run dev (port 3000)
node docs/design/concept-03/tools/compare.mjs --site http://localhost:4173
node docs/design/concept-03/tools/compare.mjs --site http://localhost:4173 --pages faciales --widths 1440,390
```

Output goes to `.mockup-compare/` (add it to `.gitignore`): `report.md`, `report.json`, and
`<page>-<width>-<n>.png` side-by-side screenshots at four matching scroll positions. Tolerance is
±max(2px, 6%). Pages: `inicio, servicios, faciales, masajes, nosotros, contacto`.

---

## Decisions (answer before 13.1)

| ID | Question | Options | Answer |
|---|---|---|---|
| F1 | **`/nosotros` headline size.** The mockup *renders* it at **32px on every width**, inline, one line on desktop ("UN ESPACIO *para el cuidado,* SIN PRISA"). That size comes from the mockup's auto-fit script, not from its CSS (which asks for `clamp(2.8rem, 8.5vw, 8rem)`). The owner's note (#5) points at the rendered look. | ★ match the rendered mockup: `2rem`, inline, accent inline · use the CSS intent (large, like the other page titles) | ★ **Match the rendered mockup** — `2rem`, inline, accent inline. The owner reviewed the rendered look (note #5), so that is the spec. |
| F2 | **Playwright as a dev dependency** for the comparison tool (answers `layout-responsive.md` §14 "scope/target"). | ★ add `playwright` to `devDependencies` + `"compare:mockup"` script; tool stays in `docs/design/concept-03/tools/` · don't add it; use Claude Code's browser tool by hand | ★ **Add `playwright` to `devDependencies`** + `"compare:mockup"` script; tool stays in `docs/design/concept-03/tools/`. Also settles `layout-responsive.md` §14. |
| F3 | **Strip "Abrir en Google Maps" button.** Mockup: a 30px-tall dark box. Site: 44px (fills the strip). | ★ 30px visual box, 44px hit area via a transparent `::before` (keeps §10) · keep 44px visual | **Keep the 44px visual box** (owner chose against ★). The touch-target rule wins over the mockup here — this is a **deliberate, permanent divergence**: the strip-button row will always differ in the compare report, like the logo row. Do not "fix" it in a later step. |
| F4 | **Footer inside the stack.** In the mockup the footer is the last sheet: the sheet under it dims and shrinks while it rises. | ★ keep `<Footer>` in the layout; `SheetStack` publishes `--footer-h`, `<main>` gets `pb-[var(--footer-h)] -mb-[var(--footer-h)]` so the last sheet stays pinned while the footer scrolls over it, and the cover scrub includes the footer · render the footer inside every view | ★ **Keep `<Footer>` in the layout**; `SheetStack` publishes `--footer-h`, `<main>` gets `pb-[var(--footer-h)] -mb-[var(--footer-h)]`, and the cover scrub includes the footer. |
| F5 | **Headings that must shrink to fit** (treatment names, "¿HABLAMOS?" on `/contacto`, the footer wordmark). The mockup uses a JS loop. | ★ CSS only: `container-type: inline-size` on the column + `font-size: min(<scale>, calc(100cqi / <k>))`, with `<k>` picked from a closed set of utilities by the longest word's length (computed in TSX from the localized string) · a small client `useFitText` hook like the mockup | ★ **CSS only** — `container-type: inline-size` on the column + `font-size: min(<scale>, calc(100cqi / <k>))`, `<k>` from a closed set of utilities chosen by the longest word's length (computed in TSX from the localized string). Works with JS off. |
| F6 | **Hero `<h1>` wrapping.** Mockup: one inline heading, `text-wrap: balance` → "EL CUIDADO / *de tu piel,* COMO / UN RITUAL". Site: three forced block lines (added to avoid CLS). | ★ match the mockup; keep CLS < 0.05 with `next/font`'s fallback metrics and verify at 390/1440 · keep block lines | ★ **Match the mockup** — one inline heading, accent inline, `text-wrap: balance`. **CLS must be re-measured at 390 and 1440 and reported**: the current forced block lines are what took the landing page from 0.13 to 0.02 CLS. If `next/font`'s size-adjusted fallback does not hold it under 0.05, say so rather than keeping the change silently.
**Outcome (2026-09-17):** the fallback metrics did **not** hold it — reverting the block lines measured 0.09–0.15 CLS, because the reflow is a wrap-*count* change. Holding it required **DM Sans and Cormorant on `display: "block"`**, which the owner reviewed and **kept**. Worst case 0.0219. |
| F7 | **Contact submit width.** Mockup: auto (183px). Site: full width. | ★ auto, like the mockup · full width | ★ **Auto width**, like the mockup (183px at 1440). |
| F8 | **Hyphenation** of treatment names (site: "HIDRODERMO-ABRASIÓN"). Mockup: never hyphenates — the whole word shrinks (F5). | ★ remove `hyphens-auto`, shrink like the mockup · keep hyphens | ★ **Remove `hyphens-auto`; the whole word shrinks to fit** (owner: "like in the mockup — the whole word fits without the need of breaking"). **Depends on F5 landing first** — hyphens are currently the only thing stopping `HIDRODERMOABRASIÓN` overflowing its column. |

---

## Shared spec (from the mockup)

### Type

| Role | Family / weight | Size | Tracking | Other |
|---|---|---|---|---|
| Display caps (`text-caps-*`) | DM Sans 800, uppercase | see table below | `-0.025em` | line-height `0.9` |
| Accent inside caps | **Cormorant Garamond italic 400** (load the 400 italic face) | `1.04em` | `0` | line-height `0.8`, `normal-case`. **Set the weight explicitly** — today it inherits 800 from the heading and the browser fakes a bold (measured weight 800 on the hero and `/nosotros` accents). |
| Eyebrow | DM Sans **700**, uppercase | `0.72rem` (11.5px) | `0.3em` | colour per sheet (sand on noir/surface, crimson-bright on crimson/crimson-light) |
| Small label (counter, list heading, column heading, "Incluye", form labels, info headings) | DM Sans **700**, uppercase | `0.7rem` (11.2px) | `0.2em`–`0.24em` | **not** Cormorant — see the base-style bug below |
| Button text | DM Sans **700**, uppercase | `0.75rem` | `0.2em` | |
| Arrow link | DM Sans **700**, uppercase | `0.78rem` | `0.16em` | |
| Lead / body paragraph | DM Sans 400 | `1.125rem` | 0 | line-height `1.6`, `max-w-[36rem]` |
| Footer / info links | DM Sans **500** | `1rem` | 0 | |

**Bug to fix first:** `app/globals.css` sets `h1, h2, h3, h4 { @apply font-display font-light }`. Every small
heading that is an `<h2>`/`<h3>` but should look like a label is rendering in Cormorant 300 italic-ish:
"Otras categorías", the info headings on `/contacto` ("Visítanos"…), the philosophy captions and the
contact form title. Remove `font-display font-light` from that base rule (keep `text-cream` if wanted) and
give every heading its family explicitly.

**Label weight.** The mockup's small uppercase text is **700** everywhere (eyebrows, chips, counters, buttons,
list headings, form labels, footer headings). The site renders them at 400 — this is the single biggest
reason the "text style" feels different (owner note #6).

### Display sizes (rendered in the mockup, px)

| Element | 390 | 768 | 1024 | 1440 | 1920 | 2560 | CSS to use |
|---|---|---|---|---|---|---|---|
| Inicio `<h1>` | 41.6 | 70.7 | 94.2 | 132.5 | 136 | 136 | `clamp(2.6rem, 9.2vw, 8.5rem)` |
| Category `<h1>` (Faciales…) | 58.5 | 115.2 | 153.6 | **208** | 208 | 208 | `clamp(3.4rem, 15vw, 13rem)` — site is capped at 160 |
| "¿Hablamos?" talk sheet | 54.6 | 107.5 | 143.4 | **192** | 192 | 192 | `clamp(3.4rem, 14vw, 12rem)` — site 160 |
| "Otras categorías" links | 38.4 | 69.1 | 92.2 | **112** | 112 | 112 | `clamp(2.4rem, 9vw, 7rem)` — site 48.5 |
| Treatment name (fits) | 38.4 | 47.6 | 63.5 | 89.3 | 89.6 | 89.6 | `clamp(2.4rem, 6.2vw, 5.6rem)` |
| Treatment name, 13-char word (REJUVENECEDOR) | 38.4 | 47.6 | 63.5 | 79.3 | 77.6 | 77.6 | shrinks to fit (F5) |
| Treatment name, 18-char word (HIDRODERMOABRASIÓN, MICRODERMOABRASIÓN) | 30.4 | 47.6 | 47.5 | 57.3 | 55.6 | 55.6 | shrinks to fit (F5), **no hyphens** (F8) |
| Hub column title | 30.4 | 30.4 | 32.8 | 46.1 | 51.2 | 51.2 | `clamp(1.9rem, 3.2vw, 3.2rem)` ✅ already right |
| `/nosotros` big words (CONSTANCIA, PAUSA) | 48 | 88.3 | 117.8 | 165.6 | 176 | 176 | `clamp(3rem, 11.5vw, 11rem)` ✅ |
| `/nosotros` `<h1>` | 32 | 32 | 32 | 32 | 32 | 32 | F1 |
| `/nosotros` team statement | 30.4 | 35.3 | 47.1 | **64** | 64 | 64 | `clamp(1.9rem, 4.6vw, 4rem)` — site 48.5 |
| `/nosotros` team card title | 25.6 | 25.6 | 30.7 | **38.4** | 38.4 | 38.4 | `clamp(1.6rem, 3vw, 2.4rem)` — site 48.5 |
| `/contacto` `<h1>` "¿Hablamos?" | 51.2 | 84.5 | 60.6 | **76** | 76 | 76 | `clamp(3.2rem, 11vw, 9.5rem)` **capped to its column** (F5) — site 160 overflows the form (bug #3) |
| `/contacto` form title | 28.8 | 28.8 | 32.8 | 41.6 | 41.6 | 41.6 | `clamp(1.8rem, 3.2vw, 2.6rem)`, **DM Sans 800 caps** (site: Cormorant 24) |
| Footer "¿Hablamos?" | 35.2 | 46.1 | 61.4 | **72** | 72 | 72 | `clamp(2.2rem, 6vw, 4.5rem)` — site 48.5 |
| Footer wordmark "HannaH" | 120.6 | 239 | 318 | **445.6** | 594.8 | 794.4 | ≈ `30.9vw`, full-bleed, never clipped (F5 / step 13.9) |

Fold these into `tailwind.config.ts` as named tokens (extend or replace `caps-*`), e.g. `caps-hero`,
`caps-page`, `caps-talk`, `caps-link`, `caps-name`, `caps-statement`, `caps-card`, `caps-contact`,
`caps-form`, `caps-footer`, and update `layout-responsive.md` §7 in the same commit. The earlier
"fitted to the Arial fallback" reasoning in the config comments is superseded: `next/font` ships size-adjusted
fallbacks, and CLS is verified by measurement (F6).

### Spacing

| Token / place | Mockup value | Site today |
|---|---|---|
| Page gutter | `clamp(1.25rem, 0.5rem + 3vw, 4rem)` → 20px @390, 51px @1440 | `clamp(1.5rem, 1rem + 2.5vw, 4rem)` → 26px @390 |
| Shell | `max-w-[80rem]` | ✅ |
| Window sheet padding | top `2.5rem`, bottom `clamp(2.5rem, 6vw, 5rem)`; below 640px content aligns to the top | 64 / 64 |
| Tall sheet extra bottom | **30 % of the window below the header** | `30svh` (30 % of the whole viewport) |
| Category / hub intro sheet | top `clamp(3rem, 8vw, 7rem)`, bottom `clamp(2.5rem, 6vw, 5rem)`; **content height** | full window height (`variant="window"`) |
| Talk sheet | `clamp(4rem, 10vw, 8rem)` top and bottom | 96 / 96 |
| "Otras categorías" sheet | `clamp(3rem, 8vw, 6rem)` | 80 / 80 |
| Inicio hero | top `clamp(4rem, 12vw, 10rem)`, bottom `clamp(2.5rem, 6vw, 5rem)`; content height (1016px @1440 — taller than the window, so it gets the tall padding) | window height, 112 / 64 |
| `/nosotros` intro | top `clamp(3rem, 8vw, 7rem)`, bottom `clamp(2.5rem, 6vw, 5rem)` | 96 / 96 (+270 tall) |
| `/nosotros` manifesto | top `2rem`, bottom `clamp(3rem, 8vw, 6rem)` | 96 / 96 |
| `/nosotros` team | `clamp(4rem, 9vw, 7rem)` | 96 / 96 |
| `/contacto` form sheet | top `clamp(2.5rem, 7vw, 5rem)`, bottom `clamp(3rem, 7vw, 6rem)` | 96 / 96 |
| `/contacto` info sheet | `clamp(3rem, 7vw, 6rem)` | 96 / 96 |
| Footer | top `clamp(3rem, 7vw, 5rem)` | 80 |

### Shapes and components

- **Corners:** buttons, inputs, quick links `4px`; media frames, cards, form card, map `6px`; chips and meta
  chips fully round; sheets `18px` top. The site is square-cornered almost everywhere — match the mockup.
- **Media frames** have **no border** in the mockup.
- **Buttons** (`ButtonLink`): `min-h-12 px-[1.4rem] rounded`, label per the type table, `gap-2`, hover
  `-translate-y-0.5` (300ms, `motion-reduce:transform-none`). Variants: `cream` (cream/noir), `sand`
  (sand/noir), `noir` (noir/cream), `ghost` (1px cream/40 border, cream text). CTAs that end in **↗** in the
  mockup: *Ver servicios*, *Contáctanos* (talk sheet + footer), *Ver tratamientos*, *Agendar cita*,
  *Ver todos los servicios*.
- **Arrow link:** underline is a 1px line 8px above the bottom edge; on hover it shrinks away to the right
  (350ms). `min-h-11`.
- **Chips** (category nav): `min-h-11 px-4 rounded-full border border-sand/35`, label style, sand text;
  active = `bg-sand text-noir` **plus a 6px crimson dot** before the label.
- **Meta chips** (Recomendación / duración): `min-h-9 px-[0.9rem] rounded-full bg-white/8` (`bg-noir/10` on
  sand), `0.78rem`, weight 700, tracking `0.08em`, **not uppercase**; the "Recomendación:" part is weight 500
  at 75 % opacity. They are not interactive (the 44px rule doesn't apply).

---

## Steps

### 13.0 — Tooling
- Per F2: add `playwright` (devDependency) and `"compare:mockup": "node docs/design/concept-03/tools/compare.mjs"`;
  `npx playwright install chromium`; add `.mockup-compare/` to `.gitignore`.
- Run it once and confirm the numbers match the 2026-09-16 baseline report (same site, same mockup).

**Accept:** report generated for all six pages at 1440 and 390.

### 13.1 — Global type, tokens, buttons
**Files:** `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, `components/ButtonLink.tsx`,
`.claude/rules/layout-responsive.md` §6–§7, `.claude/rules/styling-tailwind.md`, `CLAUDE.md` (typography).
- Base-style bug (above); label weights to 700; Cormorant 400 italic loaded and set on every accent.
- Display-size tokens and spacing tokens from the tables; new gutter.
- Buttons, arrow link, chips, meta chips, corner radii.

**Accept:** in the report, every *eyebrow / label / button / chip* row shows no weight or font mismatch on
any page; hero and `/nosotros` accents measure weight 400.

### 13.2 — Header
**Files:** `components/Nav.tsx`, `NavDropdown.tsx`, `LanguageSwitch.tsx`, `Breadcrumbs.tsx`.
- **Scroll progress bar (missing):** 2px, full width, pinned to the header's bottom edge, `bg-crimson-bright`,
  `origin-left`, `scaleX` = page scroll progress, rAF-throttled, hidden under reduced motion. Add
  `data-progress` to it (the compare tool looks for it).
- Strip text: Source Serif **400**, `0.92rem`. Strip button per F3: Space Grotesk `0.8rem`, tracking `0.03em`
  (site uses `0.2em`), `px-[0.8rem]`, 30px visual.
- Header buttons (WhatsApp / Contáctanos): Space Grotesk **`0.9rem`**, tracking **`0.02em`** (site: 12px /
  0.2em), `min-h-12 px-4`.
- Nav: starts `clamp(1rem, 10vw, 12rem)` after the logo (x = 431px at 1440; site 356). Links Source Serif 600
  `0.98rem`, `px-[0.9rem]`, tracking `-0.005em`. Active underline: 1px, 9px above the bottom, **grows in**
  from 0 width (350ms); hover opacity .8.
- Logo: Anton-style wordmark, 32px tall (28px below 640px).
- Crumbs: `min-h-[46px]`; the live treatment crumb fades up in (400ms) when it changes.
- Mega menu: top row "Nuestros servicios" (Source Serif 600 `0.95rem`, stone) + "Ver todos ↗" arrow link;
  each card = caps title `1.6rem`, description `0.82rem`/1.45 (max 30ch) **and a "Ver tratamientos ↗" arrow
  link** (missing), `min-h-[150px] p-4`, justified top-to-bottom; panel fades in and drops 6px.
- Mobile menu: fills the **whole area below the header** (site stops at ~655px), rises from
  `translate-y-full` to 0 over 600ms (site fades); links Source Serif 600 `2.4rem`/1.1; category links
  Cormorant italic `1.4rem` crimson-bright; address + phone + the two buttons pinned to the bottom.

**Accept:** "progress bar" row present; header rows match at 1440 and 390; screenshot of the open mobile menu
matches `audit/2026-09-16/menu-cmp.jpg` (left); the open mega menu matches `mega-cmp.jpg` (left).

### 13.3 — Sheet motion and the footer
**Files:** `components/SheetStack.tsx`, `components/Sheet.tsx`, `app/layout.tsx`, `app/globals.css`, new `components/Reveal.tsx`.
- **Incoming sheet:** besides opacity `.55 → 1`, its inner content lifts from `translateY(70px)` to `0` while
  the sheet rises one window height (mockup: `lift = (1 − enter) × 70`).
- Covered sheet: unchanged (scale .94, y −40, shade .6) ✅.
- Tall-sheet padding: 30 % of `(100svh − header)`, not `30svh`.
- **Footer joins the stack (F4)** — the last content sheet stays pinned and dims while the footer rises.
- **Reveal on scroll (missing):** `Reveal` client wrapper — fade up 28px over 900ms when 15 % visible,
  once; off under reduced motion. Used on the `/nosotros` big words, team statement and team cards.

**Accept:** at 1440×900, scrolling the last 300px of `/servicios/faciales` shows the talk sheet dimming under
the footer; reduced motion → no transforms, content visible.

### 13.4 — Category pages (owner note #7)
**Files:** `components/views/CategoryView.tsx`, `components/TreatmentWindow.tsx`, dictionaries.
- **Intro sheet is content height** (not `variant="window"`), so **the first treatment peeks in on load**:
  mockup shows **167px** of it at 1440×900 and **223px** at 390×844 (site: 0).
- Intro order and style (mockup): **chips first** (mb `2rem`) → eyebrow (sand, mb `1.25rem`) → `<h1>` →
  a row with the lead on the left and the **scroll cue on the right** (flex, `justify-between`, `items-end`,
  mt `1.5rem`). Scroll cue: label style, `text-muted`, preceded by a 1px × 34px vertical line (sand → transparent)
  that draws down and away on a 1.8s loop (`@keyframes cue`); static under reduced motion.
- Treatment window layout:
  - **Text column wider than the image:** `md:grid-cols-[1.25fr_0.85fr]` (flipped: `[0.85fr_1.25fr]`), gap
    `clamp(1.75rem, 4vw, 4.5rem)`. At 1440: text 667px at x=131, image 453×567 at x=855.
  - **Order:** index 0, 2, 4… → **text left, image right**; odd → image left. The site has it reversed.
  - Image: `aspect-[4/3]` → `md:aspect-[4/5]`, `md:max-h-[calc(100svh-var(--header-h)-8rem)]`, `rounded-md`,
    no border. Keep the hover video crossfade; add a slow `scale-105` on hover (1.2s).
  - Counter: **"01"** DM Sans 900 `1rem` tracking `0.06em` + **"/ 06 · FACIALES"** label style (`0.72rem`,
    `0.24em`, 700) + a 56px 1px rule; mb `1.25rem`; accent colour per theme.
  - Signature badge: **pill** (1px accent border, `px-[0.8rem] py-[0.4rem]`, `0.7rem`, `0.2em`, 700, "★ Tratamiento
    insignia"), mb `1rem`.
  - Name: F5 fit, no hyphens (F8); description mt `1.25rem`, `1.125rem`/1.6, max 34rem, cream at 82 % on crimson /
    crimson-light, sand on surface, ink on sand.
  - Meta chips mt `1.25rem` (shared spec).
  - "Incluye"/"Zonas": mt `1.5rem`, heading mb `0.5rem`; list 2 columns from 640px, gap-x `1.5rem`; **each item**
    `py-[0.55rem] border-t` (line colour per theme), `0.95rem`/1.35 (site: `text-sm`, no rules, 20px rows —
    mockup rows are 39px).
  - CTA mt `1.75rem`: "Agendar cita ↗" (cream on crimson/crimson-light, sand on surface, noir on sand).
  - Below 640px the window content aligns to the top.
- "Otras categorías" sheet (crimson-light): eyebrow (crimson-bright, **label style, not Cormorant**); each
  category is a full-width row `flex justify-between items-center gap-4 border-t border-cream/18 py-4`: big
  caps name (`clamp(2.4rem, 9vw, 7rem)`) on the left, description (max 28ch, cream/75, `0.95rem`) on the right
  from 640px; hover slides the name 12px right (500ms). Then **"Ver todos los servicios ↗"** arrow link in
  crimson-bright, mt `1rem` (missing — re-add `nav.servicesViewAllLong` to both dictionaries).

**Accept (faciales + masajes + especiales, 1440 and 390):** peek ≥ 150px at 1440×900 and ≥ 200px at 390×844;
window-1 text at x=131, image at x=855 (1440); name sizes per the display table (±6 %); list items 39px tall;
no hyphen in any name.

### 13.5 — Servicios hub and the talk sheet
**Files:** `components/ServiceColumns.tsx`, `components/TalkSheet.tsx`, dictionaries.
- Hub columns: body padding `clamp(1.25rem, 2.4vw, 2.25rem)`; count mb `0.5rem`; revealed description is
  **`servicios.descripcion`** ("Limpieza profunda, hidratación…"), `0.98rem`/1.5, max 30ch, cream/90, mt `0.75rem`;
  then the "Ver tratamientos ↗" arrow link. Column text colour cream.
- Talk sheet (all pages that have it): **eyebrow "Contacto"** (crimson-bright, label style — missing), title
  mt `1rem` mb `1.5rem` at the talk size, lead, then **two buttons** gap `0.75rem`: "Contáctanos ↗" (cream) and
  **"WhatsApp"** (ghost, `site.whatsapp`, new tab) — missing. Padding per the spacing table.

**Accept:** talk rows (eyebrow, title 192px @1440, WhatsApp button) present and matching on
servicios/faciales/nosotros.

### 13.6 — Inicio
**Files:** `components/views/HomeView.tsx`.
- Hero sheet content-height with the hero paddings (see spacing), `min-h` of the window kept only as a floor.
- Eyebrow **sand**, label weight 700, `leading-normal`, mb `clamp(1.5rem, 4vw, 3rem)`.
- `<h1>` per F6: one flowing heading, accent inline (crimson-bright, Cormorant italic 400), `text-wrap: balance`,
  `max-w-[68rem]`. At 1440 it breaks "EL CUIDADO / *de tu piel,* COMO / UN RITUAL".
- Foot row mt `clamp(2rem, 5vw, 4rem)`: lead (cream) + buttons (mt `1.75rem`, "Ver servicios ↗" cream,
  "Contacto" ghost) on the left; meta block on the right, label weight 700, `0.78rem`, tracking `0.14em`,
  line-height 1.9, sand.
- Scrim: `linear-gradient(180deg, noir/35 0%, noir/10 40%, noir/85 100%)` over the photo (site is much darker:
  75 → 65 → 100 %). Re-check cream-on-photo contrast ≥ 4.5 at the lead's position after the change.
- The footer rises over the hero (F4).

**Accept:** inicio rows match at 1440/390; CLS < 0.05 at both widths.

### 13.7 — Nosotros (owner note #5)
**Files:** `components/views/NosotrosView.tsx`, dictionaries (only if keys are missing).
- **Intro:** eyebrow (sand) mb `1.25rem`; `<h1>` per F1 — one inline heading, caps + inline crimson-bright accent,
  `max-w-[62rem]`; **lead in cream** (site: sand), mt `2rem`. Content-height sheet, intro paddings. No forced
  line breaks.
- **Manifesto** (the section that differs most):
  - ground `linear-gradient(160deg, #8A4A3E 0%, crimson 45%, crimson-light 100%)` — add the first stop as a token;
    centred text.
  - Captions: `<h3>` **DM Sans 800, `0.85rem`, tracking `0.14em`, uppercase**, cream (site: Cormorant italic 24px),
    mb `0.4rem`; paragraph cream/85, `1rem`/1.6; block `max-w-[40rem] mx-auto mt-4`.
  - **Collage, not a strip of four thumbnails:** a centred stack (`max-w-[72rem]`, `grid place-items-center`,
    `py-[clamp(1rem,3vw,2rem)]`, `my-[clamp(1.5rem,4vw,3rem)]`):
    big word 1 (z-3) → **centre image** `w-[min(62%,34rem)] aspect-[16/10] rounded` pulled up and down by
    `-4vw` so both words overlap it (z-2) → big word 2 (z-3). Four floating swatches,
    `w-[clamp(56px,11vw,150px)] aspect-[3/2] rounded-[3px]`, absolutely placed: 1 left 6 % / top 18 %;
    2 right 5 % / top 38 %; 3 left 2 % / bottom 22 %; 4 right 10 % / bottom 6 % **above** the words (z-4).
    Add `data-collage-center` to the centre image. Big words use `Reveal`.
- **Team:** statement at the statement size, mt `1.25rem` mb `2.5rem`, max 22ch, accent sand; cards
  `rounded-md p-[clamp(1.25rem,3vw,2rem)] min-h-[clamp(260px,30vw,380px)] flex flex-col justify-between gap-6`
  with a Cormorant **“** (`3rem`, leading `0.6`) at the top, the title in the middle (card size), the text at the
  bottom (`0.95rem`/1.55). Cards use `Reveal`. Themes: crimson, sand, crimson-light.

**Accept:** `/nosotros` rows match at 1440/390 including "collage centre image"; side-by-side screenshots
`nosotros-1440-1.jpg` look alike.

### 13.8 — Contacto (bug #3)
**Files:** `components/views/ContactoView.tsx`, `ContactForm.tsx` (styles only), `ClinicInfo.tsx`.
- **Fix the overflow:** the `<h1>` is `160px` in a 501px column, so "¿HABLAMOS?" spills over the form. Apply F5
  to the left column (target 76px at ≥1440, 60.6 at 1024, 84.5 at 768 single-column, 51.2 at 390).
- Grid `md:grid-cols-[0.9fr_1.1fr]`, gap `clamp(2rem, 5vw, 4rem)`; left column sticky `top-[calc(var(--header-h)+2rem)]`.
- Eyebrow Cormorant italic `1.6rem` crimson-bright, mb `0.5rem`; lead sand, mt `1.5rem` mb `2rem`.
- **Quick links are boxes** (site: underlined text): `grid gap-2 max-w-[26rem]`; each `flex justify-between
  items-center min-h-14 px-4 rounded border border-sand/30`, a tiny label on top (`0.66rem`, `0.2em`, 700,
  uppercase — "WhatsApp" / "Teléfono") and the value below (`1rem`, 700, tracking `0.06em`, cream:
  "Escríbenos" / the phone number), "↗" on the right.
- Form card: `rounded-md p-[clamp(1.25rem,3.5vw,2.5rem)]`; title = form-title token, DM Sans 800 caps, mb `1.5rem`;
  fields mb `1.1rem`; labels label style **cream** (optional tag sand); inputs `rounded min-h-12` ✅;
  submit per F7 (`bg-sand text-noir`, auto width).
- Info sheet: grid `sm:grid-cols-2`, `md:grid-cols-[1fr_1fr_1.4fr]` with the map spanning two rows;
  headings **label style, sand** (site: Cormorant italic 24); schedule as a list — each row
  `flex justify-between border-t border-sand/20 py-2`, time in sand; social links as arrow links;
  map `rounded-md min-h-[280px]` with "Abrir en Google Maps ↗" arrow link over its bottom-left corner.

**Accept:** h1 fully inside its column at 390/768/1024/1440/1920/2560 (`scrollWidth ≤ clientWidth`); no element
of the left column overlaps the form card; contacto rows match.

### 13.9 — Footer (bug #3)
**Files:** `components/Footer.tsx`.
- Grid `sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]`, gap `2rem`:
  1. "¿Hablamos?" (footer size) + **lead `talk.body`** (missing; mt `0.75rem` mb `1rem`, max 30ch) +
     "Contáctanos ↗" (noir button).
  2. **Contacto:** phone, email, "WhatsApp ↗".
  3. **Visítanos:** street / neighbourhood / city on three lines, then `hoursSummary` (`0.9rem`, 80 % opacity, mt `0.75rem`).
  4. **HannaH** (missing column): Servicios, Nosotros, Contacto, "Instagram ↗", "Facebook ↗" (move the social
     links here from column 2).
  - Column headings: label style, 70 % opacity, mb `0.6rem`. Links weight 500, `min-h-11`, underline on hover.
- **Wordmark (bug):** today `22vw` inside the 1280px shell, italic — at wide screens it is wider than the shell
  and gets clipped. Mockup: **upright** Cormorant 500, **full-bleed** (outside the shell), edge to edge at every
  width (445.6px at 1440, 794px at 2560), line-height `0.72`, tracking `-0.03em`, centred, `translate-y-[8%]` so
  the bottom row overlaps its baseline. Build it so it **cannot** clip: an inline `<svg viewBox>` with the word as
  `<text>` (scales exactly with the width) or F5 with `container-type` on the footer. `aria-hidden`.
- Bottom row: `border-t border-noir/20 py-4 text-[0.8rem]`, sand background (so it sits over the wordmark's
  foot): "© 2026 HannaH — Belleza y Estética. Todos los derechos reservados." · "Aviso de Privacidad · Términos y
  Condiciones".

**Accept:** wordmark width = viewport width ±4 % at 390/768/1024/1440/1920/2560 and never clipped; footer rows
match; all links ≥ 44px.

### 13.10 — Verify and hand back
1. `npm run lint && npm run build`.
2. `npm run compare:mockup -- --site http://localhost:4173 --widths 390,768,1024,1440,1920,2560`. Every remaining bold cell is
   either fixed or listed in the Log with a reason (e.g. real photos vs. mockup gradients).
3. Re-run the Phase 11 checks (overflow, 44px targets, headings, CLS, contrast per sheet) — the new tokens
   change contrast in a few places (hero scrim, cream/82 %).
4. English pages: same checks on `/en/...` (longer words: BODY-CONTOURING MASSAGE, HYDRADERMABRASION must fit).
5. Commit the new report under `docs/design/concept-03/audit/<date>/` — `report.md` plus the side-by-side
   screenshots at 1440 and 390 only, converted to JPEG (≈75 % quality) the way the 2026-09-16 baseline was.
6. Set 13 to ⏸, then **Phase 11 back to ⏸ for sign-off**.

---

## Out of scope

- Real photography and client copy (Phase 12).
- The mockup's generated gradients, grain overlay, "Imagen · pasa el cursor" tag, fake video bar, phone frame and
  toolbar (still prototype-only).
