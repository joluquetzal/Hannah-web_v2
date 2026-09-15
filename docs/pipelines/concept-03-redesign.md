# Pipeline — Concept 03 redesign

Implements the approved prototype `docs/design/concept-03/prototipo.html` in the real Next.js app.
Run it from Claude Code with **`/concept-03`** (next phase), `/concept-03 status`, or `/concept-03 <phase number>`.
The command's steps are in `docs/pipelines/concept-03-command.md` — copy that file to `.claude/commands/concept-03.md`
to enable the slash command, or just ask Claude Code to "continue the Concept 03 pipeline".

## How this pipeline works

1. **One phase per session.** Read this file, the prototype and the rule files the phase names, then do only that phase.
2. **Gate after every phase.** Stop, report the acceptance numbers, and wait for the owner's "OK" before the next phase.
   Never start a phase while an earlier one is not ✅.
3. **Branch** `feat/redesign`, one commit per phase (`concept-03: phase N — <summary>`), English messages.
4. **Rules still bind.** `.claude/rules/` and `CLAUDE.md` apply. The only exceptions are the ones approved in
   Phase 0 and written into the rule files in Phase 1. Anything else that would break a rule → stop and ask.
5. **Verify by rendering**, never by reading the diff (`layout-responsive.md` §12): `npm run build`, then the
   affected routes at 390 / 768 / 1024 / 1440 / 2560, `scrollWidth - innerWidth === 0`, and the phase's numbers.
   A phase whose numbers didn't move is not done — say so.
6. **Both languages, same commit** (`content-i18n.md`). New strings go into `es.ts` and `en.ts` together;
   flag any English you are unsure of instead of guessing.
7. **Update the status table and append to the log** at the bottom of this file at the end of every phase.

## Status

| # | Phase | Status | Commit |
|---|---|---|---|
| 0 | Decisions & rule exceptions (no code) | ✅ | — |
| 1 | Foundations — tokens, fonts, rule-file updates | ⏸ waiting for gate approval | — |
| 2 | Header — strip, bar, mega menu, mobile menu, breadcrumbs | ⬜ | — |
| 3 | Sheet system — sticky stacking + cover effect | ⬜ | — |
| 4 | Inicio | ⬜ | — |
| 5 | Servicios hub — three image columns | ⬜ | — |
| 6 | Category pages — one treatment per window | ⬜ | — |
| 7 | Nosotros | ⬜ | — |
| 8 | Contacto | ⬜ | — |
| 9 | Footer, legal pages, 404 | ⬜ | — |
| 10 | English, cleanup, docs | ⬜ | — |
| 11 | Full verification & sign-off | ⬜ | — |

Legend: ⬜ not started · 🟡 in progress · ⏸ waiting for gate approval · ✅ approved

---

## Phase 0 — Decisions & rule exceptions

**No code.** Present each item below to the owner, record the answer in the "Answer" column, then mark the
phase ✅. Recommendations are marked ★.

| ID | Question | Options | Answer |
|---|---|---|---|
| D0 | Unmerged worktree `.claude/worktrees/contrast-labels` touches `Nav`, `NavDropdown`, `ServiceCard`, `TreatmentRow`, `ContactForm`, `ClinicInfo`, `tailwind.config.ts` and two rule files — all files this pipeline rewrites. | ★ merge it into `main` first, then branch · drop it | **Dropped** (revised by the owner after review). It predates the redesign and rewrites components this pipeline replaces. Not merged; branch `fix/muted-strong-contrast` is left on the remote, unmerged, for reference only. |
| D1 | **Viewport-height exception** (`layout-responsive.md` §5). The prototype sizes the `/servicios` columns and each treatment window to the window height below the header. | ★ allow a single token `min-h-window` (= `100svh − header height`), used only by `ServiceColumns` and `TreatmentWindow`; always `min-h`, never `h`, so content can grow · keep content-height sections (loses the one-per-window effect) | ★ **Add `min-h-window`**, restricted to `ServiceColumns` + `TreatmentWindow`, always `min-h`. Written into §5 as a named exception in Phase 1. |
| D2 | **Typography.** Prototype: heavy uppercase display in **DM Sans 800** with **Cormorant Garamond italic** accent words; header in **Source Serif 4 600** (nav, crumbs, strip), **Space Grotesk 400** (header buttons, ES/EN), **Anton** (logo). Today: Cormorant 300 italic headings, DM Sans 400/500. | ★ adopt all of it, but ship the logo as an SVG wordmark drawn from Anton (no font download) · adopt all, Anton as a web font · keep Cormorant headings and only restyle the header | ★ **Adopt all; logo ships as `public/brand/hannah-wordmark.svg`** — Anton is not loaded as a web font. |
| D3 | **New colour tokens.** `surface #151010` (lifted noir), header `ink #221A08`, `paper #FFEBD6`, `stone #9C917D`. Measured: paper/ink 14.85 ✅ · stone/ink 5.54 ✅ · crimson-bright/ink 7.14 ✅ · cream/surface 15.52 ✅ · sand/surface 8.02 ✅ · **muted/surface 4.49 ❌** · cream/crimson 9.96 ✅ · crimson-bright/crimson 5.02 ✅ · sand/crimson 5.15 ✅ · crimson-bright/crimson-light 6.40 ✅ · noir/sand 8.38 ✅ · **muted/sand 1.79 ❌** | ★ add the four tokens; never use `muted` on `surface` or `sand` (use `sand`/`cream` on surface, `noir` on sand) · rename the tokens | ★ **Add the four tokens.** `muted` is banned on `surface` and on `sand`; both failures documented in §8. |
| D4 | **Treatment layout.** `TreatmentRow` (alternating rows in one column) → `TreatmentWindow` (one sticky sheet per treatment, alternating image side by index parity). | ★ replace · keep rows | ★ **Replace** with `TreatmentWindow`. |
| D5 | **Motion.** `ScrollBackdrop` (colour crossfade behind sections) → sticky sheets that carry their own colour; GSAP ScrollTrigger only scrubs the covered sheet (transform + opacity). | ★ replace and delete `ScrollBackdrop` + `lib/backdrop.ts` · keep both | ★ **Replace**; delete `ScrollBackdrop.tsx` + `lib/backdrop.ts` once no view imports them. |
| D6 | **Contact form service selector.** `CLAUDE.md` says "no service selector", but `ContactForm.tsx`, `es.ts` and the privacy notice already have one. Treatment CTAs in the prototype link to `/contacto?servicio=<slug>` and preselect it. | ★ keep the selector, add the preselect, fix `CLAUDE.md` · remove the selector | ★ **Keep the selector**, add the `?servicio=` preselect, and correct the stale "no service selector" line in `CLAUDE.md`. |
| D7 | **Header copy.** Strip: `{clinic.visitUs} en {address}` + button `{clinic.mapCta}`. Bar buttons: `{clinic.whatsapp}` (outline) + `{footer.contactCta}` (filled). All existing keys. | ★ as proposed · other wording | ★ **As proposed** — existing dictionary keys only, no new copy. |
| D8 | **Inicio hero.** Prototype = full-bleed atmospheric background, no side figure. Current code (wide-viewport pass, Phase 3) = two columns with `hero.jpg` in a figure. | ★ full-bleed `hero.jpg` behind a dark gradient · keep the two-column hero | ★ **Full-bleed `hero.jpg`** behind a dark gradient; the two-column hero and its figure are dropped. |
| D9 | **Wide-viewport pass** in `CLAUDE.md` is partly open (e.g. `/nosotros` still has `min-h-[45vh]/[70vh]/[50vh]`). | ★ mark it superseded by this pipeline (its measurements stay as acceptance checks here) · finish it first | ★ **Superseded** by this pipeline; its Phase 0 baselines stay as acceptance numbers here. |
| D10 | **Footer.** Prototype = last sheet in `sand` with a giant decorative "HannaH" wordmark. | ★ adopt · keep the current dark footer | ★ **Adopt** the `sand` footer sheet; every link padded to ≥44px. |
| D11 | **Breadcrumb JSON-LD** (`BreadcrumbList`) alongside the visual crumbs. | ★ add · skip | ★ **Add** `BreadcrumbList` JSON-LD per page. |
| D12 | Pages without client copy yet (`/nosotros` team cards) keep visible placeholder text + `TODO: client copy` markers. | ★ yes | ★ **Yes** — visible placeholder copy, `TODO: client copy` markers kept in both languages. |

**Exit:** every row answered; Status row 0 ✅.

### Decisions that change later phases

- **D0** is dropped, so there is **no prerequisite before Phase 1** — `feat/redesign` builds straight on `origin/main`, which has no `muted-strong` token. Two findings from that branch's review are still true of the code this pipeline inherits, and Phase 1's §8 rewrite should absorb them rather than re-discover them:
  - `muted` (#847A6F) is 4.68:1 on `noir` but **3.67:1 on `crimson-light`**, which is one of the D4 sheet themes. Measure every token against every sheet theme, not just `noir`.
  - A colour-only state change needs a delta measured **between its two states**: the contact form's counter warning used `sand` against `muted` (1.79:1), which reads as no change at all.
- **D2** removes Anton from the Phase 1 font list and adds `public/brand/hannah-wordmark.svg` as a Phase 2 asset.
- **D8** means Phase 4 deletes the hero `<figure>` added by the wide-viewport pass rather than restyling it.

### Branch note

This pipeline runs on **`feat/redesign`** (branched from `origin/main` at `3373717`), not
`redesign/concept-03` as originally written. `origin/main` already contains the bilingual
site, the legal pages and the closed type scale — PR #4 is merged.

---

## Phase 1 — Foundations

**Read:** `styling-tailwind.md`, `layout-responsive.md` §5–§8, `project-workflow.md` (fonts, deps), `app/layout.tsx`, `tailwind.config.ts`.

**Do**
- `tailwind.config.ts`
  - colours: `surface`, `ink`, `paper`, `stone` (per D3).
  - fontFamily: `logo` (only if D2 = web font), `hserif` (Source Serif 4), `grotesk` (Space Grotesk). `display` stays Cormorant for accents; heavy caps use `font-body` + `font-extrabold`.
  - fontSize: heavy-caps scale — `caps-xl` (Inicio / page `<h1>`), `caps-lg` (category / hub titles), `caps-md` (treatment names), `caps-sm` (cards). Fluid `clamp()` like the existing `display-*`; exact values are fixed in Phase 6 by rendering.
  - minHeight: `window: "calc(100svh - var(--header-h))"` (D1). Comment why.
  - spacing: `header-h` fallback isn't a token — `--header-h` is a CSS variable set in Phase 2; give `:root` a sane default in `globals.css`.
  - borderRadius `sheet: "18px"`, boxShadow `sheet: "0 -30px 60px -30px rgb(0 0 0 / .75)"`.
  - zIndex scale (documented): `menu 30`, `header 40`, `mega 45`.
- `app/layout.tsx` (`next/font/google`): DM Sans add 700 + 800; Cormorant keep 300 italic (the prototype's 400 italic is not needed); add Source Serif 4 600, Space Grotesk 400; Anton only if D2 says so (else add `public/brand/hannah-wordmark.svg`).
- Rule files, same commit: `layout-responsive.md` §5 (the `min-h-window` exception, where it may be used), §7 (heavy-caps scale + Cormorant accent role + header fonts), §8 (new contrast rows from D3); `styling-tailwind.md` (font families); `project-workflow.md` (font weights actually used); `CLAUDE.md` Design system tables.

**Accept**
- `npm run build` passes; pages look unchanged apart from the fonts now loaded (the new tokens aren't used yet).
- Network tab: only the declared font files/weights load.
- Contrast table in `layout-responsive.md` §8 contains every pair from D3.

---

## Phase 2 — Header

**Read:** prototype header (`.site-hdr`, `.mega`, `.menu`, `.crumbs`), `Nav.tsx`, `NavDropdown.tsx`, `LanguageSwitch.tsx`, `SkipLink.tsx`, `accessibility-seo.md`.

**Do**
- `Nav.tsx` → a `<header>` that is **`sticky top-0 z-header`** in normal flow (no longer `fixed` over content), three rows:
  1. **Strip** (`bg-paper text-ink`, Source Serif): `{visitUs} en {street}, {neighborhood}, {city}` + `{mapCta}` button (`bg-ink text-paper`, grotesk, uppercase + tracked). Below `sm`: short line as a link, no button.
  2. **Bar** (`bg-ink text-paper`): logo left · nav (Source Serif 600, no uppercase; active = 1px underline; Servicios keeps the chevron) · right: WhatsApp (outline) + Contáctanos (filled) from `md`, `LanguageSwitch`, burger below `md`.
  3. **Breadcrumbs** (new `Breadcrumbs.tsx`, client): `<nav aria-label={t.nav.breadcrumbLabel}><ol>`; hidden on `/` and `/en`. Previous crumbs `text-stone` links, `/` separators in `paper`, current item `aria-current="page"`. Labels from dictionaries / `data/`. Horizontal scroll inside the row on small screens (never page overflow).
  - Optional 2px progress bar at the bottom edge (`bg-crimson-bright`, `scaleX`, rAF-throttled).
- Publish the header height as `--header-h` on `<html>` (small client effect with `ResizeObserver`); default in `globals.css` to avoid a jump.
- `NavDropdown.tsx`: keep the disclosure behaviour exactly (hover, click, Enter/Space/ArrowDown, Esc restores focus, outside pointerdown, blur, route change). Restyle panel to `bg-ink`, cards keep category colours (`crimson`, `crimson-light`, `sand`).
- Mobile menu: panel below the header, `bg-ink`, rises from below (`translate-y` transition, `motion-reduce:transition-none`), big Source Serif links, italic category sub-links, address + phone, WhatsApp / Contáctanos buttons. Keep body scroll lock and close-on-route-change.
- `LanguageSwitch.tsx`: same `ES / EN` links, restyled (grotesk, `paper`, inactive at 45 % opacity, ≥44px targets).
- Remove `pt-top-clear` from every view (the header no longer overlaps content); keep the token only if something still needs it.
- New keys (es + en): `nav.breadcrumbLabel` ("Ruta de navegación" / "Breadcrumb").
- D11: `BreadcrumbList` JSON-LD per page.

**Accept**
- Heights at 1440: strip 44 · bar 70 · crumbs 46 (±2). At 390: strip 44 · bar 64 · crumbs 46.
- Every header control ≥ 44×44 (logo, nav links, both buttons, ES, EN, burger, crumb links).
- Keyboard: tab order strip → logo → nav → buttons → ES/EN; dropdown behaviour unchanged; mobile menu traps nothing it shouldn't.
- `scrollWidth − innerWidth = 0` on all routes at all five widths, including long crumbs at 390.

---

## Phase 3 — Sheet system

**Read:** prototype `.stack` / `.panel` CSS and `measure()` / `onScroll()`, `animations-gsap.md`, `layout-responsive.md` §13.

**Do**
- `components/Sheet.tsx` (server): `<section data-sheet>` with `theme` (`crimson | surface | crimson-light | sand | noir`), `variant` (`content` default, `window` → `min-h-window flex items-center`), `static` (never sticky — used by the contact form), `crumb` (label for the live breadcrumb). Rounded top + upward shadow except the first sheet. Inner wrapper `data-sheet-inner` inside the `max-w-shell px-gutter` shell.
- `components/SheetStack.tsx` (client):
  - **Progressive enhancement:** sheets are in normal flow by default. Only after mount does it add `data-stack="on"`, which turns on `position: sticky` — so with JS off nothing is ever covered.
  - Sticky offset per sheet: `top = header-h + min(0, windowHeight − sheetHeight)` (tall sheets scroll fully, then stick at their bottom). Recompute on `ResizeObserver`.
  - Sheets taller than the window get extra bottom padding (`30 %` of the window) so their last lines stay readable before the next sheet arrives.
  - Cover effect with lazily-imported GSAP ScrollTrigger (`scrub`): as sheet *n+1* rises, sheet *n*'s inner goes to `scale .94`, `y −40px`, and its shade overlay to `opacity .6`. Incoming inner fades from `.55` to `1`. Transform/opacity only, `gsap.context` + `revert()`.
  - Reduced motion: stacking stays (it is just scrolling), no GSAP at all.
  - Live breadcrumb: `IntersectionObserver` on `[data-crumb]` → reports the sheet whose top is above 45 % of the window.
- Delete `ScrollBackdrop.tsx` and `lib/backdrop.ts` once no view imports them (D5).

**Accept** (test page: `/servicios/faciales` at 1440×900 and 390×844)
- Each window sheet ≥ window height below the header.
- Covered sheet shade reaches 0.6 exactly when the next sheet's top meets the header's bottom.
- A tall sheet's CTA stays visible for ≥ 30 % of a window of scrolling.
- JS disabled: all content readable, nothing sticky. Reduced motion: no transforms.
- No CLS from the stack switching on (Lighthouse CLS < 0.05).

---

## Phase 4 — Inicio

**Read:** prototype `viewHome()`, `HomeView.tsx`, `HeroReveal.tsx`.

**Do**
- Hero sheet (`min-h-[100svh]` is already allowed on the landing hero, §5; subtract `--header-h`): per D8, `hero.jpg` full-bleed (`next/image fill priority`) under a noir gradient + optional grain.
- Eyebrow `site.tagline`; `<h1>` heavy caps with an italic accent: `home.titleParts` = `["El cuidado", "de tu piel,", "como un ritual"]` (+ `en`). Keep `home.title` as the plain string for metadata/aria if still used.
- Lead, buttons `Ver servicios` (filled cream) / `Contacto` (ghost), meta block bottom-right: street · neighbourhood, hours short form (new key `clinic.hoursShort`: "Lun–Vie 9:00–19:00 · Sáb 9:00–14:00" + `en`).
- Footer sheet (Phase 9) rises over the hero. No service listings on this page.
- Keep `HeroReveal` only if it still adds something; if kept, its wrapper stays `w-full` (§11).

**Accept**
- `<h1>` never overflows (390 → 2560); at 1440 it wraps to ≤ 3 lines; h1 left edge aligns with the shell.
- Buttons ≥ 48px tall. Lighthouse ≥ 95 (landing budget).

---

## Phase 5 — Servicios hub

**Read:** prototype `viewServicios()` + `.cols` / `.col-*` CSS, `ServiciosView.tsx`, `ServiceCard.tsx`, `data/servicios.ts`.

**Do**
- `components/ServiceColumns.tsx` (server) inside a `window` sheet: three links (grid rows on mobile, three columns from `sm`), each `next/image fill` of `category.cover` + tint layer + bottom fade + body: count (`categories.<slug>.count`, new: "Seis faciales" / "Cuatro masajes" / "Cuatro tratamientos" + `en`), title (heavy caps), then description + "Ver tratamientos ↗" revealed with `grid-rows-[0fr] → [1fr]` on `group-hover` **and** `group-focus-visible`.
- Tint: warm dark overlay (`mix-blend-multiply`) + image `saturate/brightness` filter; hover/focus → overlay `opacity-0`, filter off, image `scale-105`. CSS only (animations rule).
- `@media (hover: none)`: lighter tint, description always visible.
- `<h1 class="sr-only">{servicios.title}</h1>` + `sr-only` lead (the page has no visible title — headings order stays valid).
- Then the shared "¿Hablamos?" sheet (reuse `nosotros.talk*`, or move them to a shared `talk` group in both dictionaries) and the footer.
- Delete `ServiceCard.tsx` if unused.

**Accept**
- ≥ 640px: three equal columns filling the window below the header; < 640px: three rows.
- Hover and keyboard focus produce the same clear state; focus ring visible.
- Title and description fit at 390 and 640 (narrowest column) without overflow.

---

## Phase 6 — Category pages

**Read:** prototype `viewCategory()` + `treatmentPanel()`, `CategoryView.tsx`, `TreatmentRow.tsx`, `data/{faciales,masajes,especiales}.ts`, `images-assets.md`.

**Do**
- Intro sheet: category chips (`aria-current`), eyebrow `Servicios · 06 tratamientos` (new `category.countLabel`), `<h1>` heavy caps, lead, scroll cue (new `category.scrollCue`: "Desliza" / "Scroll").
- `components/TreatmentWindow.tsx` (replaces `TreatmentRow`), one `window` sheet per treatment, `crumb = nombre[lang]`:
  - theme cycle by index: `crimson → surface → sand → crimson-light`; image side flips by `index % 2` (class toggle, not duplicated markup).
  - counter `01 / 06 · Faciales`, ★ badge for `destacado` (`treatment.signature`), `<h2>` name in `caps-md`, description `text-lg`, chips for `recomendacion` / `duracion`, "Incluye" / "Zonas" list in two columns from `sm`, CTA `Agendar cita ↗` → `/contacto?servicio=<category>` (D6).
  - media: `<figure>` `aspect-[4/3]` → `md:aspect-[4/5]`, capped at the window height; `next/image` + hover `<video>` crossfade exactly as today (`motion-reduce:hidden`).
- **Title fit without JS:** pick the `caps-md` clamp so the longest names fit at every width — es `HIDRODERMOABRASIÓN`, `MASAJE PIEDRAS CALIENTES`, `MICRODERMOABRASIÓN`; en `HYDRADERMABRASION`, `BODY-CONTOURING MASSAGE`. Measure, don't guess. Only fall back to `hyphens-auto` if a size that fits reads too small.
- Closing sheets: "Otras categorías" (new `category.others`) with the other two categories as big links + description, then talk sheet, footer.
- Deep links `/servicios/faciales#facial-hannah` scroll to that window (sheet `id = slug`).

**Accept** (all three categories, es + en)
- 1440×900: each window ≥ 900 − header; text column and image side by side; no empty band > 80px above/below the text column beyond the window centring.
- 390×844: text then image; no title overflow for any of the 14 names in either language.
- Live crumb shows the treatment in view on scroll and clears on the intro sheet.
- Hover clip crossfade still works; hidden under reduced motion.

---

## Phase 7 — Nosotros

**Read:** prototype `viewNosotros()`, `NosotrosView.tsx`.

**Do**
- Intro sheet: eyebrow, `<h1>` with accent (`nosotros.titleParts` = `["Un espacio", "para el cuidado,", "sin prisa"]` + `en`), intro `text-lg`. Content height (no `min-h-[..vh]` — closes D9's open item).
- Manifesto sheet (crimson gradient): eyebrow "Filosofía"; caption 1 (new `nosotros.philosophyHead1` "Nada de fórmulas genéricas") + `philosophy1`; big word `nosotros.philosophyWords[0]` "Constancia"; centre image + 4 small swatches (decorative `alt=""` images — client photos pending); big word `philosophyWords[1]` "Pausa"; caption 2 (`philosophyHead2` "Un momento para ti") + `philosophy2`.
- Team sheet (`surface`): statement "Especialistas en estética facial *y* corporal" (new `nosotros.teamStatementParts`), three flat cards (`crimson`, `sand`, `crimson-light`): "Estética facial", "Estética corporal" (body = `teamNote`-style placeholder, `TODO: client copy`), "Formación continua" (body from `team1`).
- Talk sheet, footer.

**Accept**
- No section sized by viewport height. Big words never overflow (390 → 2560).
- Page height at 1440 recorded in the log (old baseline 2948px).

---

## Phase 8 — Contacto

**Read:** prototype `viewContacto()`, `ContactoView.tsx`, `ContactForm.tsx`, `ClinicInfo.tsx`, `forms-emailjs.md`.

**Do**
- Contact sheet is **`static`** — nothing ever covers the form.
- Left column (sticky from `md`): italic eyebrow "Contacto", `<h1>` "¿Hablamos?", lead `contacto.lead`, quick links WhatsApp ("Escríbenos") and phone, each ≥ 56px tall.
- Right column: form card `bg-crimson-light` with `<h2>` (new `contacto.formTitle`: "Déjanos un mensaje" + `en`). **Restyle only** — `ContactForm` logic, validation messages, EmailJS, spam guard stay as they are. Inputs `bg-noir`, `border-sand/35`, base 16px text; errors `crimson-bright`; submit ≥ 48px (`bg-sand text-noir`).
- `?servicio=<slug>` preselects the select (client, `useSearchParams` inside a `Suspense` boundary — static-export safe).
- Info sheet (`surface`): `ClinicInfo` restyled — address, phone, WhatsApp, hours list, social links (all ≥ 44px), real map embed.

**Accept**
- 1440: inputs 520–660px wide (old baseline 1013px). 390: no overflow, inputs full width.
- Tab order: quick links → form fields → submit. Error state readable (contrast from D3).
- `/contacto?servicio=masajes` opens with "Masajes" selected; plain `/contacto` shows the placeholder.

---

## Phase 9 — Footer, legal pages, 404

**Do**
- `Footer.tsx` as the last sheet (D10): `bg-sand text-noir` (never `muted` on sand), "¿Hablamos?" + Contáctanos, Contacto / Visítanos / HannaH columns, giant decorative wordmark (`aria-hidden`, must not cause overflow), bottom row © + legal links. **Every link ≥ 44px tall** (closes the footer item of the accessibility debt).
- `LegalPageView.tsx`: one tall sheet on `noir`, heavy-caps title, draft banner (`crimson-bright` border), Source/Cormorant section headings per Phase 1 scale.
- `NotFoundView.tsx`: intro-style sheet with both buttons.

**Accept**
- Footer links measured ≥ 44px at 390. Wordmark never widens the page.

---

## Phase 10 — English, cleanup, docs

**Do**
- `en.ts` has every new key; `npm run build` proves the shape. List any clinical/aesthetic English that needs native review.
- Remove unused files/exports: `ScrollBackdrop`, `lib/backdrop.ts`, `ServiceCard`, `TreatmentRow`, `HeroReveal` (if unused), stale tokens (`top-clear` if unused).
- `CLAUDE.md`: Pages (hub, categories, contacto), Design system, Motion principles, Key decisions (service selector), mark the wide-viewport pass superseded (D9). `README.md` if it describes the old design.

**Accept**
- `npm run lint` clean, `npm run build` passes, no unused imports.

---

## Phase 11 — Full verification & sign-off

1. `npm run build`; serve `out/`.
2. All routes, **es and en**, at 390 / 768 / 1024 / 1440 / 2560: overflow = 0; screenshot each.
3. Side-by-side with the prototype at 1440 and 390 (toolbar "Móvil") — list every visible difference and whether it is intended.
4. Target sizes ≥ 44px for all interactive elements (script it); contrast spot-checks for every D3 pair in context.
5. Reduced motion on; JavaScript off; keyboard-only pass through header, dropdown, mobile menu, hub columns, form.
6. Lighthouse on `/` ≥ 95 in all four categories; CLS < 0.05 on `/servicios/faciales`.
7. Report the old baselines against the new numbers (content band, Contacto input width, Nosotros height, Masajes empty bands).

**Exit:** owner signs off → merge `feat/redesign`.

---

## Log

Append one entry per phase: date, what changed, measured numbers, open questions.

### Phase 0 — 2026-09-15

- All thirteen decisions (D0–D12) answered by the owner; every one took the ★ recommendation.
  Answers recorded in the Phase 0 table.
- Branch: the pipeline runs on `feat/redesign` (from `origin/main` at `3373717`), not
  `redesign/concept-03`. Both pipeline files updated.
- Repo state checked: `origin/main` already carries the bilingual site, legal pages and closed
  type scale (PR #4 merged). Local `main` ref is stale at `03914a5` — ignore it, use `origin/main`.
- `worktree-contrast-labels` is the only unmerged work: one commit, `00fd921`
  (`muted-strong` #A99C8D token + 12px-label migration + rule docs). Per D0 it goes to `main`
  as its own PR before Phase 1 starts.
- `/concept-03` enabled by copying `docs/pipelines/concept-03-command.md` to
  `.claude/commands/concept-03.md`. Keep the two in sync when either changes.
- `.gitignore`: added `/.claude/worktrees/` and `/Claude outputs/`, both previously untracked noise.
- No code touched. No measurements — Phase 0 is a conversation.

**Revision, same day — D0 reversed.** The owner dropped the contrast-labels work instead of
merging it: it predates the redesign and edits components this pipeline replaces. It was
reviewed and fixed first (branch `fix/muted-strong-contrast`, commits `00fd921` + `ec48281`,
pushed but **not merged**) — kept on the remote for reference, nothing landed on `main`.
The two findings worth carrying forward are recorded under "Decisions that change later phases".

**Phase 1 is unblocked** and starts from `origin/main` as-is — no `muted-strong` token.

### Phase 1 — 2026-09-15

**Tokens** (`tailwind.config.ts`) — colours `surface` #151010, `ink` #221A08, `paper` #FFEBD6,
`stone` #9C917D · families `hserif` (Source Serif 4), `grotesk` (Space Grotesk) · sizes
`caps-xl/-lg/-md/-sm` · `minHeight.window` = `calc(100svh - var(--header-h))` ·
`borderRadius.sheet` 18px · `boxShadow.sheet` · zIndex `menu 30 / header 40 / mega 45`.
No `logo` family — D2 chose the SVG wordmark.

**Verified by compiling, not by reading the diff.** A probe file run through the real config
emitted every new token; the four new colours resolve to the right hex
(`ink` → `rgb(34 26 8)`, `paper` → `rgb(255 235 214)`, `surface` → `rgb(21 16 16)`,
`stone` → `rgb(156 145 125)`) and `min-h-window` → `calc(100svh - var(--header-h))`.
This is the §13 silent-failure check; an unused token emits nothing and would have looked fine.

**Fonts** — the built `@font-face` set is exactly eight faces and no extras:
Cormorant Garamond 300 normal + italic · DM Sans 400 / 500 / 700 / 800 · Source Serif 4 600 ·
Space Grotesk 400.

**Contrast** — all twelve D3 pairs recomputed from the hex values; every figure matches the
pipeline exactly (paper/ink 14.85 · stone/ink 5.54 · crimson-bright/ink 7.14 · cream/surface
15.52 · sand/surface 8.02 · **muted/surface 4.49 ❌** · cream/crimson 9.96 ·
crimson-bright/crimson 5.02 · sand/crimson 5.15 · crimson-bright/crimson-light 6.40 ·
noir/sand 8.38 · **muted/sand 1.79 ❌**). §8 now carries all of them plus the carried-forward
**muted/crimson-light 3.67 ❌**, split into three tables by ground.

**Wordmark** — `public/brand/hannah-wordmark.svg`, 581 bytes, generated from the real Anton
v27 outlines (downloaded, converted to a single path in a throwaway venv; no tooling added to
the project). 8 subpaths as expected for H·A+counter·N·N·A+counter·H, `fill="currentColor"`
so it inherits the header colour.

**Rule files updated in the same commit:** `layout-responsive.md` §5 (the `min-h-window`
exception and its limits), §7 (heavy-caps scale, Cormorant's new accent-only role, the
four-family table), §8 (three contrast tables + the colour-only-state-change rule);
`styling-tailwind.md` (families, z-scale, muted is noir-only); `project-workflow.md`
(the eight-face budget); `CLAUDE.md` colour and typography tables.

`npm run lint` and `npm run build` clean. `:root{--header-h:160px}` ships.

**Not verified by rendering, and why:** Phase 1 applies no new class to any page — the diff
under `app/` is fonts plus one CSS variable, and no component markup changed at all. There is
nothing whose position or size moved, so there are no numbers to measure yet. The
render-and-measure pass (§12, five widths, overflow = 0) starts in Phase 2 with the header.

**Open:**
- `caps-md` is provisional. Phase 6 must re-fit it by rendering the longest names — es `HIDRODERMOABRASIÓN`, `MASAJE PIEDRAS CALIENTES`, `MICRODERMOABRASIÓN`; en `HYDRADERMABRASION`, `BODY-CONTOURING MASSAGE`.
- `--header-h`'s 160px default is the predicted 1440 layout (44+70+46). Phase 2 must confirm the measured height and correct the default if it differs, or the first paint will jump.
