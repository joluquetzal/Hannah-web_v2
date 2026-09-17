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
| 1 | Foundations — tokens, fonts, rule-file updates | ✅ | `9b95c0b` |
| 2 | Header — strip, bar, mega menu, mobile menu, breadcrumbs | ✅ | `ab2ca97` |
| 3 | Sheet system — sticky stacking + cover effect | ✅ | `2541275` |
| 4 | Inicio | ✅ | `581edb8` |
| 5 | Servicios hub — three image columns | ✅ | see log |
| 6 | Category pages — one treatment per window | ✅ | see log |
| 7 | Nosotros | ✅ | see log |
| 8 | Contacto | ✅ | see log |
| 9 | Footer, legal pages, 404 | ✅ | see log |
| 10 | English, cleanup, docs | ✅ | see log |
| 11 | Full verification & sign-off | ⏸ ready for sign-off — Phase 13 complete | see log |
| 12 | Deferred work — backlog, never blocks another phase | ⬜ | — |
| 13 | Mockup fidelity pass → `docs/pipelines/concept-03-fidelity.md` | ⏸ all steps done — 13.1 and 13.10 await approval | see log |

Legend: ⬜ not started · 🟡 in progress · ⏸ waiting for gate approval · ✅ approved · ↩ reopened

**Order now:** Phase 13 (steps 13.0 → 13.10, own file) → Phase 11 re-run and sign-off. Phase 12 is a backlog of
client- and environment-blocked items; it never blocks 11 or 13.

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
  → **Closed in Phase 2.** Measured 159 (≥768) and 153 (mobile); `globals.css` now carries both.

### Phase 2 — 2026-09-15

`Nav.tsx` rebuilt as a **sticky** three-row `<header>` (no longer `fixed` over content):
paper strip → ink bar → breadcrumbs. New `Breadcrumbs.tsx` (client) with `BreadcrumbList`
JSON-LD (D11). `NavDropdown` restyled to `bg-ink` with category-coloured cards, behaviour
untouched. `LanguageSwitch` restyled to grotesk/paper. `pt-top-clear` removed from all six
views and the now-unused `top-clear` token deleted from the config and §6.

**Verification tooling.** Playwright + Chromium installed into the session scratchpad (not a
project dependency — `project-workflow.md` still governs `package.json`), driving the static
`out/` build over a local server. Every number below is measured in Chromium, not read off
the diff.

**Row heights** — targets 1440: 44 / 70 / 46 (±2); 390: 44 / 64 / 46 (±2):

| | strip | bar | crumbs | total | `--header-h` |
|---|---|---|---|---|---|
| 1440 | **44** ✅ | **70** ✅ | **45** ✅ | 159 | 159px |
| 390 | **44** ✅ | **64** ✅ | **45** ✅ | 153 | 153px |

First attempt missed two: strip measured 56 and crumbs 49, because `py-*` stacks on top of
`min-h-*` under `box-sizing: border-box`. Dropping the strip's vertical padding and taking
the crumb `<ol>` to `min-h-11` landed both on target.

**Touch targets** — 0 header controls below 44px tall or 24px wide, at 390 and at 1440.
Covers logo, both bar buttons, the strip's map button, every nav link, ES, EN, the burger
(44×44) and every crumb link.

**Overflow** — `scrollWidth − innerWidth = 0` on all 40 combinations (8 routes × 390/768/
1024/1440/2560), plus 0 at 390 with the mobile menu open.

**Keyboard** — tab order: skip link → strip map button → logo → Servicios → Nosotros →
Contacto → WhatsApp → Contáctanos → ES → EN. Dropdown behaviour preserved exactly:
ArrowDown opens and focuses the first item, Escape closes and restores focus to the trigger,
Enter reopens, and the panel carries `hidden` when closed. Mobile menu: `aria-expanded`
toggles, body scroll locks and releases, `aria-hidden` tracks state.

**Breadcrumbs** — absent on `/` and `/en`; `Inicio / Servicios / Faciales` and
`Home / Services / Facials` render from the dictionaries and `data/servicios.ts`;
JSON-LD emits absolute URLs per locale. The live treatment crumb is Phase 3's job.

**Decisions taken in this phase — please confirm:**

1. **New key `clinic.visitUsAt`** ("Visítanos en" / "Visit us at"). D7 specified
   `{clinic.visitUs} en {address}` using existing keys only, but that hardcodes the Spanish
   connector and renders "Visit us en Eugenia 1309" in English. One key, both languages.
2. **Rule amendment, `layout-responsive.md` §7.** The old rule — "uppercase text is always
   tracked", 0.2em / 0.3em — was written for 12px micro-labels and would put +0.2em on heavy
   display caps, which is visually wrong. §7 now splits by size: small uppercase spaces out,
   display uppercase (`text-caps-*` and anything uppercase ≳ `text-2xl`) takes a new
   `tracking-caps` token (−0.025em), matching the prototype's −.025em. Flagged rather than
   applied silently.
3. **Mega-card titles use `text-2xl`**, not `caps-sm`. `caps-sm` renders ~51px at 1440 —
   far too large for a dropdown card. `text-2xl` is the scale's own slot for "menu-card
   titles"; it just wears the Concept 03 treatment (DM Sans 800, uppercase, `tracking-caps`).
4. **Mobile menu rises 12px and fades** rather than sliding a full screen height. The
   prototype's full-height slide depends on its fixed device frame; reproducing it needs a
   `calc(100svh - var(--header-h))` clip, which is the viewport-height pattern D1 deliberately
   fenced off to two components. Same direction of motion, no rule breach.
5. **The optional 2px scroll progress bar was not built.** Listed as optional; it belongs
   with the scroll machinery in Phase 3 if wanted.

**Open:** the breadcrumb row's horizontal scroll never engaged — no trail is long enough at
390 (`Inicio / Aviso de Privacidad` fits). The container is in place; Phase 6's live
treatment crumb is what will actually exercise it.

### Phase 3 — 2026-09-15

`Sheet.tsx` (server) + `SheetStack.tsx` (client) + the live-breadcrumb channel.
`/servicios/faciales` is wired to the stack as the test page; `TreatmentRow` keeps its
current content and lost its `data-bg`.

**Measured on `/servicios/faciales` against the static build:**

| Criterion | Target | Measured |
|---|---|---|
| Window sheet ≥ space below header (1440×900) | ≥ 741 | **741** ✅ all six |
| Window sheet ≥ space below header (390×844) | ≥ 691 | **1168–1296** ✅ all six |
| Shade when next sheet's top meets header | 0.60 | **0.600** ✅ (scale 0.940, y −40.0) |
| Tall sheet's CTA stays visible | ≥ 207px of scroll | **1800px** ✅ |
| CLS from the stack switching on | < 0.05 | **0.0006** (1440) · **0** (390) ✅ |
| Horizontal overflow, 5 widths | 0 | **0** ✅ |

**Reduced motion** — stacking kept (`position: sticky` intact), every `[data-sheet-inner]`
transform is `none`, and **GSAP is never even fetched** (`"gsap" in window === false`).
**JavaScript off** — 7 sheets render, nothing is sticky, no `data-stack` attribute, all six
treatment headings readable, overflow 0. Progressive enhancement holds in both directions.

**Live breadcrumb** — `Inicio / Servicios / Faciales` at the top, gains a fourth
non-link crumb (`… / ANTI ACNÉ O PIEL GRASA`) on scroll, and clears on the way back.
Delivered by a `CustomEvent` on `window` rather than context or a store, keeping the
header and the page decoupled (`react-nextjs.md`: no global store, no context for content).
The live crumb takes `aria-current` from the route crumb while it is showing, so only one
element claims it, and it is deliberately **absent from the JSON-LD** — it names a position
on the page, not a route.

**One correction to the pipeline's formula.** Phase 3 specifies
`top = header-h + min(0, windowHeight − sheetHeight)`. That leaves a tall sheet's last
`header-h` pixels below the fold: with wh 900, header 159, sheet 800 it pins at 159 and the
sheet ends at 959. The implementation uses the space *below* the header,
`header + min(0, (windowHeight − header) − sheetHeight)`, which pins the sheet exactly at the
viewport bottom — verified by the negative tops at 390 (−324 to −452px).

**Deferred, condition not met.** D5 says to delete `ScrollBackdrop.tsx` and `lib/backdrop.ts`
"once no view imports them". `NosotrosView` and `ServiciosView` still do, so both files stay
until Phases 5 and 7 convert those views. `TreatmentRow` no longer imports `backdrop`.

**Scope note.** Converting `CategoryView` to sheets is strictly Phase 6's page, but Phase 3's
own acceptance criteria name `/servicios/faciales` as the test page, so the mechanism had to
be wired somewhere real. Only the *structure* changed: the treatment content is still
`TreatmentRow`, and the theme cycle is limited to `surface` / `crimson-light` — both dark, so
`TreatmentRow`'s cream/sand palette stays above 4.5:1. The `sand` theme in the Phase 6 cycle
would put `text-cream` on `#C9A27A` at 1.9:1, so it waits for the theme-aware
`TreatmentWindow`.

**Open:** the optional 2px scroll progress bar (deferred from Phase 2) is still not built —
it now has a natural home in `SheetStack`. Say the word and it's a small addition.

### Phase 4 — 2026-09-15

Inicio rebuilt as a single full-bleed hero sheet (D8): `hero.jpg` behind a scrim, eyebrow,
three-line heavy-caps `<h1>` with a Cormorant italic accent, lead, two CTAs, and a meta block.
New keys `home.titleParts` and `clinic.hoursShort` in both languages.

**Accept:**

| Criterion | Target | Measured |
|---|---|---|
| `<h1>` overflow, 390 → 2560 | none | **0** at all six widths |
| `<h1>` lines at 1440 | ≤ 3 | **3** (exactly, at every width) |
| `<h1>` left edge aligns with the shell | — | **132 / 384 / 704** at 1440 / 1920 / 2560, matching `/servicios/faciales` and `/contacto` |
| Buttons | ≥ 48px | **48px** at every width, both languages |

**The real work of this phase was CLS.** The landing page measured **0.448**, bimodal across
runs (0.44 / 0.038 alternating) — a race, not noise. Four distinct causes, each measured and
fixed:

1. **`--header-h` was wrong on `/` at first paint.** Breadcrumbs don't render on the landing
   page, so its header is 114px, not the 159px default — every window sheet resized once JS
   measured the real value. `globals.css` now composes `--header-h` from named rows
   (`--hdr-strip` + `--hdr-bar` + `--hdr-crumbs`) and `Nav` zeroes the crumb row on routes
   where `Breadcrumbs` renders nothing, **in the served HTML**, so the first paint is correct.
2. **`is-tall` thrashed.** `SheetStack` flagged the hero — the only sheet in its stack — as
   tall and added 30svh of padding, then removed it as fonts settled. A sheet with nothing
   rising over it needs no reading room: the last sheet is now skipped, and the threshold
   carries a 1.05 margin so a sheet sitting within a few pixels of the window can't flip.
3. **The `<h1>` rewrapped on font swap** — four lines in the Arial fallback, three in
   DM Sans 800. The three `titleParts` are now one block per line, and `caps-xl` was
   **re-fitted by measurement**: the binding line is es `COMO UN RITUAL`, which needs ≤38px at
   390 in the *fallback* (41.5px was being rendered). New clamp
   `clamp(2.34rem, 0.15rem + 9vw, 8.1rem)` keeps every authored line unwrapped in both fonts.
4. **The window sheet centred its content**, so the lead paragraph rewrapping moved the entire
   block, h1 included. `Sheet` gained `align="start"`; the hero is top-aligned with extra top
   padding, which is also what the prototype does (`.hero{min-height:0}` + padding).

| CLS | before | after |
|---|---|---|
| es `/` @390 | 0.448 (unstable) | **0.0245** |
| es `/` @768 | 0.12 | **0.0216** |
| es `/` @1440 | 0.038 | **0.0009** |
| en `/` @768 | 0.135 | **0.0275** |
| `/servicios/faciales` @1440 | 0.0006 | **0.0006** |

Worst case across every page and width is now 0.0275, inside the < 0.05 target and well
inside Google's 0.1 "good" threshold. Results are deterministic run to run — the race is gone.

**Lighthouse was not run.** `npm install lighthouse` crashed twice (`Exit handler never
called!`) on a machine with ~0.8 GB free; the package half-installed and its CLI could not
resolve. Rather than report a score I didn't measure: LCP is **428ms** (the hero image),
`load` 302ms, total transfer **1294 KB**, and there are no structural a11y faults (one `<h1>`,
no heading-level jumps, every `<img>` has `alt`, `<main>`/`<title>`/meta description present).
Phase 11 owns the real Lighthouse run.

**Flag for the performance budget:** `hero.jpg` is **606 KB of the 1294 KB** total and is the
LCP element. Static export forces `images.unoptimized: true`, so Next will not re-encode it —
it ships exactly as committed. A pre-compressed / WebP hero is the single highest-value
perf change available before Phase 11's ≥95 target.

**Other changes:** `ButtonLink` gained a `cream` variant (the filled CTA on a photographic
ground) and `min-h-12`; its `ghost` variant moved from sand to cream, because sand over the
worst-case scrim measures ~3.7:1 while cream clears 6.9:1. `CategoryView`'s intro sheet became
a window sheet — a 275px first sheet was already 63% through its cover animation at rest,
rendering the intro shrunk and dimmed before the visitor scrolled.

**Rule amendment, §5.** The landing hero is now a third permitted caller of `min-h-window`,
alongside `ServiceColumns` and `TreatmentWindow`. §5 already allowed the hero a full-viewport
height; with the header sticky and in flow, "full screen" means the space below it, which is
exactly what the token computes. Flagged, not silent.

**Open:** `/nosotros` h1 sits at 432px against everyone else's 132 — it still centres its own
prose column, which §4 forbids. That is Phase 7's job and is expected to close there.

### Phase 5 — 2026-09-15

`/servicios` is now three full-height images in one bleed window sheet, followed by the shared
talk sheet. New `ServiceColumns.tsx` and `TalkSheet.tsx`; `ServiceCard.tsx` deleted (unused).

**Accept:**

| Criterion | Measured |
|---|---|
| ≥ 640px: three equal columns filling the window | **640** 213×747 · **768** 256×741 · **1024** 341×741 · **1440** 480×741 · **2560** 853×741 — equal, and the sheet exactly fills the space below the header |
| < 640px: three rows | **390**: `grid-template-columns` resolves to 1, three 390×249 rows |
| Hover and focus produce the same state | reveal `0px → 109.5px` (390) / `132.25px` (640) and tint `1 → 0`, **identical** for `:hover` and `:focus-visible` |
| Focus ring visible | `outline: auto 2px`, with `outline-offset: -4px` so it reads inside the image |
| Title and description fit at 390 and 640 | no overflow on either, in the narrowest 213px column |
| Horizontal overflow / CLS | 0 at all six widths; CLS ≤ 0.003 |

Two structural additions to `Sheet`: `bleed` (skip the centred shell and the vertical padding,
so an image grid can run edge to edge and fill the sheet) and the `talk` dictionary group,
moved out of `nosotros` so `/servicios`, the category pages and `/nosotros` share one source.

`@media (hover: none)` is expressed as an arbitrary variant, `[@media(hover:none)]:`, since
Tailwind ships no `hover-none` and the project keeps `plugins: []`. On touch the tint lightens
and the description is always open — declared, but not exercised by these measurements, which
run in a hover-capable context.

**Deferred:** `ScrollBackdrop` + `lib/backdrop.ts` now have exactly one importer left,
`NosotrosView`. They go in Phase 7.

### Phase 6 — 2026-09-15

`TreatmentRow` replaced by `TreatmentWindow` (D4): one window sheet per treatment, theme
cycling crimson → surface → sand → crimson-light, image side flipping by index parity.
Intro sheet gains the count eyebrow, category chips and a scroll cue; closing sheets add
"Otras categorías" and the shared talk sheet.

**Accept** (all three categories, es + en, at 390 / 768 / 1024 / 1440 / 2560):

| Criterion | Measured |
|---|---|
| Title fit — all 14 names, both languages | **0 overflows** across 30 page loads |
| Each window ≥ space below header | **true** for every treatment sheet |
| 1440: text and image side by side | 2 columns, tops within 5px |
| 390: text then image | 1 column, copy at 908 / figure at 1474 |
| Live crumb | `Inicio/Servicios/Faciales` → `…/HIDRODERMOABRASIÓN` on scroll → clears at top |
| Deep link `#facial-hannah` | lands at **top 159**, exactly the header height |
| Hover clip crossfade | video opacity **0 → 1**; `display: none` under reduced motion |
| Horizontal overflow / CLS | 0 everywhere; CLS max **0.0021** |

**The title fit needed the hyphenation fallback, and the measurement says why.** The binding
name is es `HIDRODERMOABRASIÓN` — a single unbreakable 18-character word. Fitting it whole
would cap `caps-md` at **27px at 390 and 48px at 1440**, well below `caps-sm`. Phase 6 allows
hyphens exactly when a size that fits reads too small, so the `<h2>` takes `hyphens-auto`
with an explicit `lang` (the static export ships `lang="es"` on `<html>` for every route, so
the element has to carry its own) plus `break-words` as the no-dictionary safety net.

That was not sufficient on its own: English still overflowed at 390 because `overflow-wrap:
break-word` does not reduce an element's **min-content** width, so the `1fr` grid track grew
to 419px inside a 339px column and the sheet clipped the title. `min-w-0` on the copy column
lets the track shrink and the break take effect. Both languages are clean now.

**Deferred to Phase 9:** the footer is still the old dark one and is not part of any
`SheetStack`, so it does not yet rise over the last treatment sheet.

### Phase 7 — 2026-09-15

`/nosotros` rebuilt as four sheets: intro (noir), manifesto (crimson gradient, centred, with
the two big words and the collage), team (surface, three flat cards), talk. New keys
`titleParts`, `philosophyHead1/2`, `philosophyWords`, `teamStatementParts`, `teamCards` in
both languages.

**Accept:**

| Criterion | Measured |
|---|---|
| No section sized by viewport height | **none** — every sheet is `py-24`; the old `min-h-[45vh]/[70vh]/[50vh]` are gone |
| Big words never overflow, 390 → 2560 | **0 overflows**, one line each, both languages (46 → 160px) |
| Horizontal overflow | **0** at all five widths, both languages |
| CLS | ≤ 0.0015 |
| Page height at 1440 | **3892px** (es) · **4035px** (en) — baseline was 2948px |

**On the page height:** it went *up*, not down, and that is the right outcome. The 2948px
baseline was four short text blocks padded out by viewport fractions — D9's complaint was
450–700px of section height carrying 150–190px of text. The page now carries a manifesto
sheet with a collage, a three-card team sheet and the talk sheet, all sized by their content.
More page, because there is more on it.

**`caps-lg` was re-fitted, for the same reason `caps-xl` was in Phase 4.** en `CONSISTENCY`
— 11 characters — overflowed a 339px column at 390px, rendering at 51px where 46px is the
fallback-font limit. New clamp `clamp(2.85rem, 0.22rem + 10.85vw, 10rem)`. Since `caps-lg`
also sets the category and hub titles, those were re-checked after the change: no heading
passes the viewport and no page overflows, at 390 or 2560, in either language.

**D9 closed.** `/nosotros` no longer centres its own prose column: its `<h1>` sits at **132px
at 1440**, the same left edge as Inicio, the category pages and Contacto (it was 432px).

**D5 closed.** With `NosotrosView` converted, nothing imported the old colour-crossfade
backdrop any more, so `ScrollBackdrop.tsx` and `lib/backdrop.ts` are deleted.

**Placeholders, deliberately (D12):** two of the three team-card bodies and all four collage
images are placeholders, marked `TODO: client copy` in both dictionaries and in the view.
The collage reuses the existing ~600-byte SVG stubs, so that region will look empty until
real photography arrives — a content gap, not a CSS bug (§9).

### Phases 8–11 — 2026-09-16

**Phase 8 — Contacto.** A `static` sheet (nothing may slide over a form being filled in) with
a sticky left column and the form card on the right, then a `surface` info sheet.
`ContactForm`'s logic, validation, EmailJS call and spam guard are untouched — restyle only,
plus the `?servicio=` preselect.

| Criterion | Target | Measured |
|---|---|---|
| Input width at 1440 | 520–660px | **531px** (baseline 1013px) |
| Input width at 1920 | — | **518px** |
| Submit height | ≥ 48px | **48px** |
| `?servicio=masajes` | preselects Masajes | **"Masajes"**; plain `/contacto` is empty |
| Tab order | quick links → fields → submit | phone → nombre → telefono → servicio → email → mensaje → … |

The form column was initially **198px wide**. The `caps-lg` heading's min-content width blew
the left grid track out to 1032px — the same failure mode as the treatment titles in Phase 6.
`min-w-0` on both columns fixed it. Worth noting as a pattern: every heavy-caps heading placed
in a grid track needs `min-w-0` on that track.

**Phase 9 — Footer, legal, 404.** The footer is now the last sheet: `sand` ground, rounded top
and upward shadow, so it rises over the sticky sheet above it. All 8 footer links measure
**≥44px** at every width, and the giant decorative wordmark (`22vw`, `aria-hidden`) never
widens the page — `overflow` is 0 at 390 through 2560. Legal pages and the 404 are single
noir sheets with heavy-caps titles.

**Phase 10 — Cleanup and docs.** `ScrollBackdrop`, `lib/backdrop.ts`, `ServiceCard`,
`TreatmentRow` and the `top-clear` token are all gone; `nav.servicesViewAllLong` removed from
both dictionaries (0 references). No component in `components/` is unreferenced. `CLAUDE.md`
updated: structure, motion principles, all five page descriptions, the D6 service-selector
correction, and the wide-viewport pass marked **SUPERSEDED**.

**Phase 11 — Full verification.** 9 routes × 2 languages × 5 widths = **90 page loads**:

| Check | Failures |
|---|---|
| Horizontal overflow (`scrollWidth − innerWidth`) | **0 / 90** |
| Interactive targets under 44px (excluding links inline in a sentence) | **0 / 90** |
| Heading structure (exactly one `<h1>`, no skipped levels) | **0 / 90** |
| CLS > 0.05 | **0 / 90** |
| `muted` on a non-noir sheet | **0 / 90** |

The contrast sweep caught a real regression on the first run: **9 `text-muted` elements on the
contact form's `crimson-light` card**, where muted measures 3.67:1. All moved to `sand`
(6.56:1). Placeholders stayed on `muted` — the inputs are `bg-noir`, where it passes at 4.68:1.
The character-counter warning also moved to `crimson-bright`: `sand` against `muted` is 1.79:1,
which reads as no change at all.

**Progressive enhancement**, both directions:
- **JS disabled** — all five main routes render with a real `<h1>`, 800–2775 characters of text, nothing sticky, zero overflow.
- **Reduced motion** — GSAP is *never fetched* (`"gsap" in window === false`), every `[data-sheet-inner]` transform is `none`, the hover clip is `display: none`.

**Phase 0 baselines, at 1920×1000:**

| | baseline | now |
|---|---|---|
| Content band | 1792px | **1280px** |
| Contacto input width | 1013px | **518px** |
| `/nosotros` page height | 2948px | **4189px** |
| Masajes bands above / below the text | 197 / 191px | **206 / 206px** |

Two of these need reading rather than scoring. `/nosotros` is taller because it now carries a
manifesto, a collage, three team cards and a talk sheet instead of four short text blocks
padded out with viewport fractions. The Masajes bands are now *symmetric* — they are the
window-centring of a full-height treatment sheet (841px window, ~429px of content), not the
one-sided dead space beside a short image that the baseline measured.

### Owner review — 2026-09-16 (Phase 11 reopened)

The owner reviewed the built site against the prototype. Direction approved, fidelity not: sizes, spacing,
weights and text styling drifted from the mockup; the scroll progress bar, several buttons and the reveal
animations are missing; the footer wordmark is clipped and too small; the `/contacto` heading overlaps its
column; the `/nosotros` opening sheet doesn't look like the mockup; category pages should open with the first
treatment already peeking in from below. A measured audit (mockup vs. a local static export, same fonts) is in
`docs/design/concept-03/audit/2026-09-16/`. The fix is planned as **Phase 13** in
`docs/pipelines/concept-03-fidelity.md`. Phase 11 goes back to ⏸ only after 13.10.

---

## Phase 12 — Deferred work

Everything phases 1–11 could not finish, with the reason. Nothing here is a blocker for
review; several items are blocked on the client rather than on code.

### Blocked on the environment

- **Lighthouse has never been run.** `npm install lighthouse` crashed twice
  (`Exit handler never called!`) with ~0.8 GB free RAM; the package half-installed and its CLI
  could not resolve its own `package.json`. Phase 4's "≥95 on the landing page" and Phase 11's
  "≥95 in all four categories" are therefore **unverified**. Measured proxies on `/`: LCP
  428ms, load 302ms, 1294 KB transferred, CLS ≤ 0.0245, no structural a11y faults.
  → Run it on a machine with more headroom, or in CI.

### Blocked on client assets and copy

- **`hero.jpg` is 606 KB of the landing page's 1294 KB** and is the LCP element. Static export
  forces `images.unoptimized: true`, so Next ships it exactly as committed. Pre-compressing it
  (or shipping WebP/AVIF) is the single highest-value performance change available.
- **All treatment, category and collage images are ~600-byte SVG stubs.** The hub columns, the
  treatment windows and the `/nosotros` collage will look empty until real photography lands.
  A content gap, not a CSS bug (§9) — but judge the design only against representative photos.
- **Placeholder copy, marked `TODO: client copy` in both dictionaries:** two of the three
  `/nosotros` team-card bodies, and the whole of both legal pages (pending legal review).
- **English clinical terms in `data/*.ts`** are a best-effort translation and want a native or
  clinical review, per `content-i18n.md`.

### Deliberately not built

- **The 2px scroll progress bar** in the header. Listed as optional in Phase 2, deferred again
  in Phase 3; `SheetStack` is its natural home now.
- **The footer is not inside `SheetStack`.** It is styled as the last sheet and, being after
  the stack in flow, does visually rise over the final sticky sheet — but it does not
  participate in the GSAP cover scrub, so the sheet it covers neither dims nor shrinks.
  Putting it in the stack means every view rendering its own footer; that is a structural
  change worth deciding on deliberately.

### Unverified rather than unbuilt

- **Touch behaviour of the hub columns.** `@media (hover: none)` lightens the tint and pins the
  description open. The CSS is declared and shipped, but every measurement in this pipeline ran
  in a hover-capable context, so it has never been exercised on a real touch device.
- **The breadcrumb row's horizontal scroll.** The container and its hidden scrollbar are in
  place, but no trail is long enough at 390px to engage it, even with a live treatment crumb.
- **`ContactForm`'s privacy link is 16px tall.** It sits inline inside a sentence, which WCAG
  2.5.8 exempts, so the Phase 11 sweep excludes it by design. Worth a decision rather than a
  silent pass.

### Open decisions

- **`layout-responsive.md` §14 is still open** — whether to adopt an automated layout check.
  This pipeline effectively built one: a Playwright harness living in the session scratchpad
  that measures overflow, target sizes, heading order, CLS and contrast across 90 page loads.
  Promoting it to `scripts/layout-check.mjs` would answer §14's "scope" and "target" questions;
  it would add Playwright as the project's first dev dependency, which `project-workflow.md`
  says must be justified deliberately.

---

## Phase 13 — Mockup fidelity pass

**The plan, the decisions (F1–F8) and the step list live in `docs/pipelines/concept-03-fidelity.md`** — this
section only tracks it. Two items listed under Phase 12 → "Deliberately not built" (the scroll progress bar and
the footer outside `SheetStack`) are pulled into 13.2 and 13.3; strike them from Phase 12 when those steps land.

| Step | Scope | Status |
|---|---|---|
| F | Decisions F1–F8 answered | ✅ |
| 13.0 | Tooling — `compare:mockup`, `.mockup-compare/` | ✅ |
| 13.1 | Global type roles, tokens, buttons (gate: stop for approval) | ⏸ |
| 13.2 | Header — progress bar, button type, nav offset, mega card, mobile menu | ✅ |
| 13.3 | Sheet motion, tall-sheet padding, footer in the stack, `Reveal` | ✅ |
| 13.4 | Category pages — peek, intro order, treatment window | ✅ |
| 13.5 | Servicios hub and talk sheet | ✅ |
| 13.6 | Inicio | ✅ |
| 13.7 | Nosotros | ✅ |
| 13.8 | Contacto | ✅ |
| 13.9 | Footer | ✅ |
| 13.10 | Verify at six widths, new audit, hand back (gate) | ⏸ |

Each step logs its before/after numbers in the Log above (`### Phase 13.N — <date>`) and commits as
`concept-03: phase 13.N — <summary>`.

### Phase 13.0 — 2026-09-16

**F1–F8 answered**, recorded in `concept-03-fidelity.md`. Seven took the ★ recommendation;
**F3 did not** — the owner kept the strip map button's 44px visual box rather than the mockup's
30px one, choosing the touch-target rule over mockup fidelity. That row will therefore always
differ in the compare report: treat it as intended, like the logo row, and do not "fix" it later.

Two answers are coupled and must land in order: **F8** (remove hyphenation from treatment names)
depends on **F5** (CSS container-query shrink-to-fit), because hyphens are currently the only
thing keeping `HIDRODERMOABRASIÓN` inside its column. **F6** (inline hero heading) reverses the
forced block lines that took the landing page from 0.13 to 0.02 CLS, so 13.6 must re-measure CLS
at 390 and 1440 and report the number rather than assume.

**Tooling:** `playwright` added to `devDependencies` (the project's first — justified per F2, and
it settles `layout-responsive.md` §14's "scope/target" question), `npm run compare:mockup` script
added, `/.mockup-compare/` gitignored. Chromium was already in the local cache, so no download.
`npm install` also pruned 176 extraneous packages; `lint` and `build` both re-verified clean after.

**Baseline confirmed.** A fresh run over all six pages at 1440 and 390 reproduces the
2026-09-16 audit: **661 flagged cells against the baseline's 665** (−0.6 %), with every page
within ±2 cells. The tool measures what the baseline measured, so its numbers can be trusted as
the before/after yardstick for 13.1–13.10.

| Page | baseline | fresh | | Page | baseline | fresh |
|---|---|---|---|---|---|---|
| inicio 1440 | 55 | 55 | | inicio 390 | 59 | 59 |
| servicios 1440 | 33 | 33 | | servicios 390 | 30 | 28 |
| faciales 1440 | 88 | 87 | | faciales 390 | 94 | 95 |
| masajes 1440 | 13 | 13 | | masajes 390 | 13 | 12 |
| nosotros 1440 | 67 | 67 | | nosotros 390 | 70 | 70 |
| contacto 1440 | 65 | 63 | | contacto 390 | 78 | 79 |

**661 flagged cells is the number Phase 13 has to bring down.**

### Phase 13.1 — 2026-09-16

**Flagged cells: 665 → 483 (−182, −27 %).** Every page improved; `/servicios/faciales` at 390
fell the most, 94 → 59.

| page | before | after | | page | before | after |
|---|---|---|---|---|---|---|
| inicio 1440 | 55 | **43** | | inicio 390 | 59 | **38** |
| servicios 1440 | 33 | **22** | | servicios 390 | 30 | **19** |
| faciales 1440 | 88 | **67** | | faciales 390 | 94 | **59** |
| masajes 1440 | 13 | **9** | | masajes 390 | 13 | **5** |
| nosotros 1440 | 67 | **52** | | nosotros 390 | 70 | **48** |
| contacto 1440 | 65 | **60** | | contacto 390 | 78 | **61** |

**Accept: met.** Eyebrow / label / button / chip rows with a font or weight mismatch:
**0 across all twelve page-widths**. All four accent rows (hero es+en, `/nosotros` intro and
team statement) measure **Cormorant Garamond 400 italic** on both sides.

**What changed**

1. **The base-style bug.** `globals.css` applied `font-display font-light` to `h1–h4`, so every
   small heading that happened to be an `<h2>`/`<h3>` rendered as Cormorant display type. The rule
   now sets colour only; each heading states its own family.
2. **Cormorant 400 italic is loaded.** The accents previously inherited the heading's 800 and the
   browser synthesised a fake bold — measured 800 before, 400 now.
3. **Small uppercase is weight 700**, swept across 33 call sites (12 eyebrows, 21 labels) onto the
   new `text-eyebrow` (11.5px) and `text-label` (11.2px) roles. This is the change the owner's
   note #6 was pointing at.
4. **The `caps-*` scale is renamed by role, not size** — `caps-hero`, `caps-page`, `caps-talk`,
   `caps-link`, `caps-name`, `caps-col`, `caps-word`, `caps-about`, `caps-statement`, `caps-card`,
   `caps-contact`, `caps-form`, `caps-footer` — each set to the size the mockup *renders*. All 15
   call sites were remapped; a stale `text-caps-lg` would have emitted nothing silently.
5. **Gutter** to the mockup's `clamp(1.25rem, 0.5rem + 3vw, 4rem)` (20px @390 vs 26px before).
6. **`ButtonLink` rebuilt** — `min-h-12 rounded px-[1.4rem] gap-2`, hover `-translate-y-0.5`,
   variants cream / sand / noir / ghost, optional `arrow`. New `ArrowLink` and `Chip` / `MetaChip`
   components for 13.4–13.9 to consume.

**A mistake worth recording.** The blanket sweep also hit the header's Space Grotesk controls —
the strip button and the two bar buttons — pushing them to 11.2px/700 when the mockup has them at
14.4px/400. They are chrome, not content labels. Caught by the report, fixed with dedicated
`text-hbtn` / `text-hstrip` tokens before this step closed. A global find-and-replace across
33 sites needs the report run against it, not just a build.

**Deliberately left for their own steps** (all flagged, none regressions): the treatment counter's
900 weight (13.4), the philosophy captions and form title still in Cormorant (13.7 / 13.8), and
the `/contacto` quick links and info headings (13.8).

**Rules updated in the same commit:** `layout-responsive.md` §6 (gutter) and §7 (rewritten — role
table, "small uppercase is 700", `text-label` replaces `text-xs` as the floor, headings carry their
own family); `styling-tailwind.md` (closed scale, the 700 requirement).

**No regressions:** lint and build clean; 50 overflow checks across 5 routes × 2 languages ×
5 widths, **0 failures**.

### Phase 13.2 — 2026-09-17

**Flagged cells: 483 → 480.** A small net move, and that is the honest reading: the scroll
progress bar previously counted as a *single* "missing on site" cell, so building it replaced
one cell with a real row. The header itself is what moved.

**Header rows, across all 12 page-widths:**

| row | mismatched cells |
|---|---|
| nav link | **0** (was flagged on x — the nav now starts at the mockup's offset) |
| WhatsApp button | **0** |
| Contáctanos button | **0** |
| ES switch | **0** |
| crumb | **0** |
| progress bar | **0** (was MISSING) |
| logo | 48 — documented tool noise, the mockup's is Anton text and ours is the SVG wordmark |
| strip button | 6 — **F3**, the owner's 44px choice over the mockup's 30px box |
| strip text | 12 — at 390 the strip collapses to a link, which is 44px on the site and 20px in the mockup. Same F3 touch-target divergence. |

**Built:** the progress bar (2px, `origin-left` `scaleX`, rAF-throttled, hidden under reduced
motion — verified 0 at the top and 0.572 at halfway); the mega menu's per-card
"Ver tratamientos ↗"; the mobile menu now fills the area below the header exactly
(**689px measured against 689px available** at 390×844) and slides up from `translate-y-full`
instead of fading. Nav links, the strip and the crumb row all moved onto the mockup's sizes,
and the active nav underline now grows in from zero width.

**A bug I introduced and had to back out.** To animate the mega panel I replaced its `hidden`
attribute with `visibility`. That silently broke keyboard access: ArrowDown opened the panel
but focus never moved into it. `visibility` animates as a *step function* — at progress 0 it
is still `hidden`, and a hidden element refuses focus, so neither a style flush nor a
`requestAnimationFrame` could place it. Three attempts failed before I stopped guessing and
instrumented, which showed `open` flipping correctly while focus stayed on the trigger.

Resolved by restoring the `hidden` attribute — which is also what keeps the panel's links out
of the tab order — and getting the entrance from a CSS **animation**, which plays on un-hide,
rather than a transition, which cannot run on a hidden element. Re-verified: ArrowDown focuses
"Ver todos ↗", Escape restores focus to the trigger, Enter reopens, and at rest the panel is
`hidden` with **0 reachable links** and a tab order that skips it entirely.

The lesson is the same one 13.1 taught: a change that looks purely visual can move behaviour,
and only instrumenting the running page tells you which.

### Phase 13.3 — 2026-09-17

**Flagged cells: 480 → 465 (−200 from the 665 baseline).** `/servicios/faciales` at 390 is
down to 54 from 94.

**Measured:**

| Check | Result |
|---|---|
| Incoming sheet lift | `translateY(70px)` entering → **`0`** at the header — exactly the mockup's `(1 − enter) × 70` |
| Footer covers the last sheet | shade **0.315** with 300px of scroll left; `--footer-h` published at **689px**, matching the real footer |
| Tall-sheet room | now 30% of `(100svh − header)`, not 30% of the whole viewport |
| Reduced motion | GSAP never fetched · every `[data-sheet-inner]` / `[data-sheet-lift]` transform `none` · Reveal content at **opacity 1** |
| JS disabled | **0** unexpectedly invisible elements, 1550 chars of text, no overflow |

**`Sheet` now nests two wrappers.** The cover effect scales and lifts `[data-sheet-inner]`
while the entrance lifts `[data-sheet-lift]`. One element cannot carry two independently
scrubbed transforms — GSAP would have the two ScrollTriggers overwriting each other's `y`.
Nesting composes them instead, which is also how the mockup's single combined transform
(`lift − cover × 40`) behaves.

**Footer joins the stack (F4)** without moving out of the layout: `SheetStack` publishes
`--footer-h`, `<main>` reserves it with `pb-[var(--footer-h)]` and pulls it back with a
negative bottom margin, so the last content sheet stays pinned while the footer rises over it,
and the cover scrub treats the footer as the next sheet. The negative margin is written
`mb-[calc(var(--footer-h)*-1)]` — Tailwind's `-mb-[var(…)]` emits `-var(…)`, which is invalid
CSS and would have failed silently.

**One geometry note, not a defect.** The shade under the footer reaches **0.559**, not 0.6, at
maximum scroll. The footer is 689px tall in a 900px viewport, so its top can only ever reach
211px — it physically cannot travel up to the header's 159px. The mockup has the same geometry.
The accept criterion (the talk sheet dimming as the footer rises) is met.

**`Reveal` added** — fades up 28px over 900ms at 15% visibility, once, then disconnects. It
renders visible and only *becomes* hidden after the observer attaches, so JS-off and
reduced-motion both leave content on screen rather than stuck at opacity 0. Applied to the
`/nosotros` big words, team statement and team cards.

**Left deliberately:** the last sheet still gets no `is-tall` reading room even though the
footer now covers it. Re-enabling that risks the 0.44 CLS thrash fixed in Phase 4, and the
cover scrub does not depend on it.

### Phase 13.4 — 2026-09-17

**Flagged cells: 465 → 421 (−244 from the 665 baseline).** The category pages moved most:
faciales **88 → 41** at 1440 and **94 → 44** at 390; masajes is down to **2** and **4**.

**Accept — every target met:**

| Criterion | Target | Measured |
|---|---|---|
| First treatment peeking, 1440×900 | ≥ 150px | **164px** (mockup 167) |
| First treatment peeking, 390×844 | ≥ 200px | **243px** (mockup 223) |
| Window 1 text column, 1440 | x = 131 | **x = 131**, 667px wide |
| Window 1 image, 1440 | x = 855 | **x = 855**, **453×567** |
| "Incluye" list rows | 39px | **39px** |
| Treatment names | display table ±6% | 18ch → **57px** (57.3) · 13ch → **79px** (79.3) · short → **89px** (89.3) |
| Hyphenation | none | `hyphens: manual`, **no name overflows** in either language |

**Owner note #7 is closed.** The intro sheet is content height rather than a window sheet,
which is the whole reason the first treatment now shows at the bottom on load.

**F5 and F8 landed together, as planned.** The name size comes from a closed set of
container-query tokens, `min(clamp(2.4rem, 6.2vw, 5.6rem), calc(100cqi / k))`, with
`k = 0.647 × the longest word's length`. That constant is not a guess — it is solved from the
mockup's own rendered sizes, which give 0.647 from both the 18-character case (57.3px) and the
13-character case (79.3px) in a 667px column. The column carries `container-type: inline-size`,
so `100cqi` is the column, and the name shrinks with it at any width. Hyphenation is gone.

Two implementation notes worth keeping:

- **The longest *word*, not the longest name**, decides the size: a name wraps between words
  but never inside one. `BODY-CONTOURING MASSAGE` breaks at its hyphen, so its longest token is
  10 characters and it stays at full size — verified rendering at 89px with no overflow.
- **`@container` is not a stock Tailwind v3 class.** It needs the container-queries plugin,
  which this project does not carry, so the arbitrary property `[container-type:inline-size]`
  does the job with no new dependency. Had I used `@container` it would have emitted nothing
  and the fit would have silently failed open.

**Also built:** chips-first intro order with the animated scroll cue (a 1px rule that draws
down and retracts on a 1.8s loop, static under reduced motion); the counter's 900-weight
number; the signature pill; meta chips; the text column now wider than the image
(`1.25fr / 0.85fr`) with text on the left at even indices — the site previously had this
reversed; and "Otras categorías" as full-width rows with the restored
"Ver todos los servicios ↗" link (`nav.servicesViewAllLong` re-added to both dictionaries).

### Phase 13.5 — 2026-09-17

**Flagged cells: 421 → 392 (−273 from baseline).** `/servicios` **33 → 12** at 1440;
faciales down to 35 and 41.

**Accept met — every talk row matches, on every page that has one:**

| row | mismatches | size |
|---|---|---|
| talk eyebrow | **0** | 11.5px |
| talk title | **0** | **192px** (the spec's figure exactly) |
| talk lead | **0** | 18px |
| talk button | **0** | 12px |
| talk WhatsApp button | **0** | 12px |

Two of the six missing elements are now built: the talk sheet's **"Contacto" eyebrow** and its
**WhatsApp ghost button**. The sheet also takes the spacing table's
`clamp(4rem, 10vw, 8rem)` padding.

**Hub columns** now reveal `servicios.descripcion` — the category's own description — rather
than the page lead, at the mockup's `0.98rem/1.5` in cream/90, with the body padding on
`clamp(1.25rem, 2.4vw, 2.25rem)` and a proper "Ver tratamientos ↗" arrow link.

**Still missing after this step:** footer lead, footer nav column (13.9), the `/nosotros`
collage centre image and team card text (13.7).

### Phase 13.6 — 2026-09-17

**Flagged cells: 392 → 379 (−286 from baseline).** Inicio **55 → 32** at 1440 and **59 → 35**
at 390.

This step carried both of Phase 13's risky decisions, and both needed real work to hold.

**F6 — the inline balanced heading — broke CLS, and the fix was not the one F6 predicted.**
Reverting the forced block lines took the landing page to **0.09–0.15 CLS** across six widths,
far over the 0.05 budget. F6 assumed `next/font`'s size-adjusted fallback metrics would hold
it; they did not, because the reflow is a *wrap-count* change (2 ↔ 3 lines), which metric
adjustment cannot prevent — the fallback's per-glyph widths still differ.

What did hold it: moving **DM Sans and Cormorant Garamond to `display: "block"`**. Those two
compose the `<h1>`, so neither may swap under it. Worst case is now **0.0219**:

| | 390 | 640 | 768 | 1024 | 1440 | 2560 |
|---|---|---|---|---|---|---|
| es | 0.0004 | 0.0172 | 0.0190 | **0.0219** | 0.0069 | 0.0003 |
| en | 0.0162 | 0.0010 | 0.0021 | 0.0020 | 0.0010 | 0.0003 |

**The trade-off, stated plainly:** `block` replaces a flash of *fallback* text with a brief
flash of *invisible* text. `next/font` self-hosts and preloads these faces from the same
origin, so the block period is short in practice — but it is a real change to first paint, and
it affects all DM Sans body copy, not just the hero. Source Serif 4 and Space Grotesk stay on
`swap`: they set header chrome, where a swap shifts nothing. Recorded in
`project-workflow.md`. **Say if you would rather have the fallback flash and accept the CLS.**

**The mockup's scrim fails contrast over the real photograph.** Its
`noir/35 → noir/10 → noir/85` gradient leaves only ~0.29–0.40 alpha where the small text sits
at 390, and the mockup's **sand** eyebrow and meta block measured **3.39:1** and **3.83:1** —
under the 4.5:1 floor. The mockup composites those over a generated dark gradient; the client's
actual `hero.jpg` is brighter. §8 is binding and the mockup is not, so both moved to cream.
All six samples now pass:

| | eyebrow | lead | meta |
|---|---|---|---|
| 390 | **6.56:1** | 10.56:1 | **7.41:1** |
| 1440 | 11.21:1 | 8.13:1 | 13.47:1 |

Measured by sampling `hero.jpg` through a canvas at each element's position and compositing
the gradient's alpha at that height — not estimated.

**A regression from 13.2 that this step's wider sweep caught.** The header overflowed the
viewport by **17px at 768**. The mockup has exactly one desktop breakpoint, **56rem (896px)**,
where the nav, the header buttons and the two-column treatment layout all appear together;
13.2 had used Tailwind's `md` (768px), showing the desktop header 128px too early. Added a
`wide: "56rem"` screen and moved the header and `TreatmentWindow` onto it. **0 overflow
failures across 70 route × width combinations** afterwards.

That regression existed for two commits because 13.2's checks — and the compare tool — only
run 1440 and 390. Intermediate widths need sweeping too.

### Phase 13.7–13.10 — 2026-09-17

**Flagged cells: 379 → 265. Against the 2026-09-16 baseline: 665 → 265, −60%.**
New audit committed at `docs/design/concept-03/audit/2026-09-17/`.

| page | base | now | | page | base | now |
|---|---|---|---|---|---|---|
| inicio 1440 | 55 | **22** | | inicio 390 | 59 | **23** |
| servicios 1440 | 33 | **12** | | servicios 390 | 30 | **14** |
| faciales 1440 | 88 | **35** | | faciales 390 | 94 | **40** |
| masajes 1440 | 13 | **2** | | masajes 390 | 13 | **3** |
| nosotros 1440 | 67 | **23** | | nosotros 390 | 70 | **24** |
| contacto 1440 | 65 | **36** | | contacto 390 | 78 | **31** |

**Both remaining owner bugs are fixed, and measured:**

| Bug | Result |
|---|---|
| `/contacto` "¿HABLAMOS?" over the form | **fits at every width**, never overlaps the card. 51 / 84 / 61 / **76**px at 390 / 768 / 1024 / 1440 — the spec's 51.2 / 84.5 / 60.6 / 76 |
| Footer wordmark clipped and wrong size | **98% of the viewport at every width, never clipped**, effective size 121 / 239 / 318 / **448** / 597 / 796px against the spec's 120.6 / 239 / 318 / 445.6 / 594.8 / 794.4 |

The wordmark is now an inline `<svg><text>` with `textLength`. An SVG scales to its box by
construction, so unlike a `vw` font-size it *cannot* overflow the shell or clip — which is what
the old `22vw` italic version did. `textLength="980"` rather than 1000: at the full width the
trailing letter-space fell outside the viewBox and shaved the last glyph.

**Phase 11's checks, re-run at seven widths — 126 combinations, zero failures:**

| Check | Failures |
|---|---|
| Horizontal overflow | **0 / 126** |
| Interactive targets under 44px | **0 / 126** |
| Heading structure | **0 / 126** |
| CLS > 0.05 | **0 / 126** |
| `muted` on a non-noir sheet | **0 / 126** |

Reduced motion: GSAP never fetched, all transforms `none`, **0** invisible content elements.
JS disabled: **0** problems across 6 routes.

**Three defects this sweep caught that the 1440/390 comparison could not:**

1. **`/nosotros` skipped from `<h1>` to `<h3>`.** The section eyebrows were `<p>`, so the
   philosophy captions and card titles had no `<h2>` above them. Fixed by making the eyebrows
   `<h2>` and demoting the team statement to `<p>` — it is a statement, not a heading. §7's
   rule applies: change the class, not the tag.
2. **Category chips rendered 43.41px against a 44px floor.** Not a sizing mistake — the intro
   sheet is deliberately ~1.3% into its cover transform at rest, because *that scale is what
   creates the peek*. A 44px control inside it renders 43.4. The chip is now 46px so the
   **rendered** target clears 44.
3. **`/contacto` went two-column at `md` (768)** rather than the mockup's 56rem — the same
   breakpoint mistake fixed for the header in 13.6. At 768 the heading was 46px where the
   mockup renders 84.5.

**One correction to my own tooling.** The verification's contrast check flagged every category
page for `muted` on a sheet. It was wrong: `muted` is legal on `noir` (4.68:1) and banned only
on the other grounds, and the element was the scroll cue on a noir sheet. The check is now
theme-aware. A false positive in a check costs as much as a missed defect — it trains you to
ignore the output.

**Still "missing" in the report, both tool artifacts rather than defects:** the footer wordmark
(the tool looked for a `<p>`; it is now an `<svg><text>` — selector updated) and the team card
text (mockup and site both carry placeholder copy, but different wording, so the tool cannot
pair them — resolves with the real copy in Phase 12).

**Phase 11 is ready for sign-off.**

### Performance pass — 2026-09-17

Triggered by the owner: scrolling the treatment slides felt slow. Profiling said it was not
the animations — a full-page scroll cost 4ms of script, 0 layouts, and held 60fps. It was the
assets.

**Page weight, `/servicios/faciales`: 2,755 KB → 301 KB on load (−89%).**

| | before | after |
|---|---|---|
| SVG images | 1,022 KB | **1 KB** |
| Video | 800 KB | **0 KB on load** |
| JS | 525 KB | 530 KB |

**1. The "placeholder" images were not placeholders.** `CLAUDE.md`, `images-assets.md` and the
Phase 12 notes all said `public/images/**` held ~600-byte SVG stubs. It held **150–250 KB
files** — the client's real photographs, base64-encoded rasters at 559×396 wrapped in SVG.
Static export sets `images.unoptimized: true`, so `next/image` could not re-encode them; what
was committed was exactly what shipped. Converted to WebP at 0.82: **2,241 KB → 187 KB, 92%
smaller**, no visible difference. Rules and asset naming updated.

**2. Six clips downloaded on load.** The `<video>` had no `preload`, which defaults to `auto`,
so every treatment clip fully buffered before the visitor scrolled. Now `preload="none"` with
no `autoPlay`: **nothing is fetched until a slide is reached.**

**3. The clip now plays on the slide you are on, not on hover** (owner's request). This works
on touch, where hover does not exist.

**A regression the measurement caught, and the reason it happened.** The first implementation
used an IntersectionObserver on the figure itself. Frame pacing fell from a 16.7ms median to
**33.3ms — half the frame rate** — because a sticky sheet stays fully in the viewport after it
has been covered, so every visited clip kept playing: three at once by the third treatment,
and it would have been six by the end.

Fixed by reusing the signal that already exists for the live breadcrumb: `SheetStack` reports
the sheet whose top has risen above 45% of the window, and `TreatmentMedia` plays only when
that name matches its own. Exactly one clip plays, verified at treatments 2, 4 and 6 against the
crumb. Median frame time back to **16.7ms**.

Re-verified after the change: 126 checks, **0 failures** on overflow, targets, headings, CLS
and contrast. Reduced motion never loads or plays a clip and keeps the still at opacity 1.
JS off renders all six stills with no overflow.

### Video removed — 2026-09-17

The services pages still felt slow after the asset pass, so the owner called it: **take the
video out entirely.** Done — not disabled, removed.

- `TreatmentMedia.tsx` deleted; `TreatmentWindow` renders a plain `next/image`.
- The `video` field is gone from the `Treatment` type and from all **14** data entries.
- All **14 MP4 files** deleted from `public/images/**`.
- `images-assets.md`, `animations-gsap.md`, `layout-responsive.md` §9 and `CLAUDE.md` updated —
  each described the image → clip swap as a rule.

**`/servicios/faciales` weight, measured by resource timing:**

| | original | now |
|---|---|---|
| Images | 1,022 KB | **89 KB** |
| Video | 800 KB | **0 KB** |
| JS | 525 KB | 530 KB |
| Fonts | 136 KB | 136 KB |
| **Total** | **2,755 KB** | **973 KB** (−65%) |

**A correction to my own reporting.** I earlier claimed 301 KB on load after the lazy-video
change. That was wrong — an artifact of reading the running total before every response body
had resolved. The honest figures are the resource-timing ones above. Numbers from a listener
that races the page are not measurements.

Re-verified: 126 checks, **0 failures** across overflow, targets, headings, CLS and contrast.
With JS disabled all six treatment stills render and there is no overflow.

**What is left on that page is now JS: 530 KB**, the largest single item by far — React, the
Next runtime and GSAP. Reducing it is a separate decision, not an asset fix.
