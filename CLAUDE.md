# HannaH — Claude Code Context

> ## ⚠️ Read `.claude/rules/` before any change
>
> The rule files in **`.claude/rules/`** are binding, not advisory — see
> `.claude/rules/README.md` for the index. Read the ones relevant to your change before
> touching code. Where a rule file and this document conflict, this document wins.
>
> For any change to markup, layout, spacing or typography, start with
> **`.claude/rules/layout-responsive.md`**. Two rules from it that get violated most often:
>
> - **Verify by rendering and measuring, not by reading the diff.** Two earlier passes "fixed" layout by reading source and moved none of the actual numbers.
> - **Never size a content section by viewport height.** Height comes from content plus padding.
>
> If a task requires breaking a rule, say so and get agreement — do not deviate silently.

## What this project is

HannaH is a beauty and aesthetics clinic based in Mexico. This is their **marketing/showcase website** — frontend only, no backend, no ecommerce. The goal is to present the clinic's services, tell their story, and let visitors get in touch. There is **no appointment/booking flow** — the site links to a plain contact form.

## Tech stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS v3
- **Animations**: GSAP + ScrollTrigger
- **Forms**: EmailJS (client-side email, no backend needed)
- **Deployment**: Vercel (static export)
- **Languages**: Spanish (`es`, default, unprefixed URLs) + English (`en`, under `/en`). Spanish is the source of truth. Every user-facing string is maintained in both — see `.claude/rules/content-i18n.md`.

## Commands

```bash
npm run dev       # start dev server (localhost:3000)
npm run build     # build for production
npm run start     # run production build locally
npm run lint      # lint
```

## Project structure

```
app/
  layout.tsx              # global layout: Nav + Footer (<html lang="es">)
  page.tsx                # / — Spanish, delegates to components/views/HomeView
  servicios/…             # Spanish service pages (thin wrappers over views/)
  nosotros/page.tsx
  contacto/page.tsx
  en/                     # English mirror: /en, /en/servicios/…, /en/contacto …
                          # same thin wrappers, lang="en"
components/
  Nav.tsx                 # fixed nav; contains LanguageSwitch (ES | EN)
  Footer.tsx
  LanguageSwitch.tsx      # swaps to the same page in the other language
  ServiceCard.tsx / TreatmentRow.tsx   # take a `lang` prop
  views/                  # HomeView, ServiciosView, CategoryView, NosotrosView,
                          # ContactoView — the real page bodies, param'd by lang
data/
  faciales.ts / masajes.ts / especiales.ts / servicios.ts
                          # translatable fields are Localized<T> = { es, en }
lib/
  i18n/                   # config (locales, localizedPath), dictionaries/{es,en}.ts,
                          # getDictionary, useLang/useI18n, buildMetadata
  site.ts                 # language-neutral NAP only
public/
  images/
    facials/              # img1.svg … img6.svg, video1.mp4 … video6.mp4
    massages/             # img1.svg … img4.svg, video1.mp4 … video4.mp4
    specials/             # img1.svg … img4.svg, video1.mp4 … video4.mp4
.claude/
  rules/                  # BINDING coding rules, split by topic — read before changing code
```

## Design system

All tokens are defined in `tailwind.config.ts` under `theme.extend`.

### Colors

| Token | Hex | Use |
|---|---|---|
| `noir` | `#0E0A0A` | Dark ground, backgrounds |
| `crimson` | `#6B1414` | Deep red accent (brand) — **background only**, fails as text/border on noir (1.63:1) |
| `crimson-light` | `#3D1A1A` | Mid-dark surface, borders |
| `crimson-bright` | `#E0938A` | Error / alert text and borders on dark (~8.2:1 on noir) |
| `sand` | `#C9A27A` | Warm gold — body text on dark |
| `cream` | `#F0E8DC` | Light headings on dark |
| `muted` | `#847A6F` | De-emphasized running text — footer fine print, helper paragraphs, input placeholders (4.68:1 on noir, min. that passes AA — don't darken) |
| `muted-strong` | `#A99C8D` | 12px uppercase micro-labels — eyebrows, field labels, treatment times, card CTAs (~7.34:1 on noir, AAA) |

### Typography

- **Display / headings**: `Cormorant Garamond` — light 300, italic. Treatment names, hero text, section titles.
- **Body / UI**: `DM Sans` — 400 regular, 500 medium. Descriptions, nav, buttons, labels.
- Both loaded via Google Fonts in `app/layout.tsx`.

### Motion principles

- GSAP ScrollTrigger for section background color shifts (same approach as the old site)
- Hover on treatment images: static image → muted looping `<video>` swap (CSS only, `group-hover`)
- Page transitions: subtle fade via Tailwind + Next.js view transitions
- Respect `prefers-reduced-motion` — wrap all GSAP in a check

## Pages

Every route below also exists in English under `/en` (e.g. `/en/servicios/faciales`),
rendered from the same `components/views/*` component with `lang="en"`.

`/aviso-de-privacidad` and `/terminos` (+ `/en/…`) are legal pages —
**placeholder copy** in `dictionaries.legal`, pending the client's legal review.

### `/` — Landing

Hero only. Brand statement, atmospheric image or video, CTA buttons ("Ver Servicios" → `/servicios`, "Contacto" → `/contacto`). No service listings here.

### `/servicios` — Hub

Three large editorial cards: Faciales, Masajes, Especiales. Each links to its own page. No treatment details here.

### `/servicios/faciales`

Six treatments rendered with `TreatmentRow`. Alternating layout (odd: image left, even: image right). Hover crossfades to a muted looping clip.

### `/servicios/masajes`

Four treatments, same layout.

### `/servicios/especiales`

Four treatments, same layout.

### `/nosotros`

About the clinic: who they are, their philosophy, the team. Content TBD — placeholder copy until client provides it.

### `/contacto`

Contact form: nombre, teléfono, correo electrónico (optional), mensaje. Submits via EmailJS. No date picker, no service selector — it is not a booking form. Also shows: address, phone, hours, WhatsApp link, map embed.

## Service data

### Faciales (`data/faciales.ts`)

```
1. FACIAL HIDRATANTE
   Pieles mixtas a secas. Mejora líneas de expresión, humectación, disminuye sensación acartonada.
   Incluye: limpieza, exfoliación, ozono, mascarilla de elastina, aparatología, ácido hialurónico, crema hidratante.

2. ANTI ACNÉ O PIEL GRASA
   Controla exceso de grasa, mejora brillo, escozor y apariencia de la piel.
   Incluye: limpieza, exfoliación, extracción, aparatología, alta frecuencia, mascarilla de arcilla o barro negro, hidratación.

3. HIDRODERMOABRASIÓN
   Remueve células muertas, exceso de grasa e impurezas mediante succión indolora. Hidrata y limpia simultáneamente.
   Incluye: limpieza, exfoliación, alta frecuencia, hidrodermoabrasión con solución de vitamina C, ácido acetil salicílico, ácido glicólico o ácido hialurónico, mascarilla hidropástica e hidratación.

4. FACIAL HANNAH ★ (signature)
   El más completo. Mejora apariencia, extracción si necesario, microdermoabrasión o hidrodermoabrasión.
   Incluye: limpieza, exfoliación, aparatología según tipo de piel, alta frecuencia, radiofrecuencia, mascarilla Gold, hidratación.
   Recomendación: 2 sesiones.

5. FACIAL REJUVENECEDOR
   Rejuvenece la piel, favorece producción de colágeno, mejora apariencia general.
   Incluye: limpieza, exfoliación, radiofrecuencia, bioestimulación, mascarilla según necesidad, máscara LED.
   Recomendación: 8 a 10 sesiones periódicas.

6. MICRODERMOABRASIÓN
   Piel más joven, suave y limpia. Elimina cicatrices y disminuye arrugas.
   Incluye: limpieza, exfoliación, alta frecuencia, microdermoabrasión con puntas de diamante, mascarilla hidropástica e hidratación.
```

### Masajes (`data/masajes.ts`)

```
1. MASAJE RELAJANTE — 50 min
   Favorece circulación, reduce estrés, mejora estado de ánimo.

2. MASAJE PIEDRAS CALIENTES — 60 min
   Masaje Zen. Mejora calidad del sueño, reduce dolores musculares.

3. MASAJE DEPORTIVO — 60 min
   Mejora dolor en contracturas, disminuye estrés, relaja músculos.

4. MASAJE MODELADOR — 10 sesiones
   Drenaje linfático, compresas de lodo del Mar Muerto, cavitación y radiofrecuencia.
```

### Especiales (`data/especiales.ts`)

```
1. SKIN BOOSTER
   Hidratación con ácido hialurónico.
   Incluye: 4 sesiones, 1 cada 15 días.

2. HILOS TENSORES
   Elimina arrugas y flacidez facial. Levanta cejas, redefine óvalo y contorno de mandíbula.
   Zonas: frente, perfilamiento mandibular, nasogeniano, patas de gallo, líneas marioneta, cuello.

3. NANOBOTOX
   Combinación de pequeñas dosis de toxina botulínica y ácido hialurónico.
   Incluye: una aplicación y un refuerzo.

4. MESOBOTOX
   Pequeñas dosis de toxina botulínica en tercio superior del rostro. Trata arrugas y líneas de expresión suaves.
   Incluye: una aplicación y un refuerzo.
```

## Coding conventions

- **`.claude/rules/` governs all coding work** — read the relevant topic file before touching code; `.claude/rules/layout-responsive.md` for anything involving markup, layout or typography. The bullets below are the summary; the rule files are the detail.
- **TypeScript** throughout — no plain `.js` files
- **Components**: functional, no class components
- **Tailwind only** for styling — no inline styles, no CSS modules (except for GSAP targets that need class names)
- **Images**: use `next/image` for all images
- **"use client"** directive only where actually needed (GSAP, form state, hover interactions). Server components by default.
- **Data**: service content lives in `data/` as typed TypeScript arrays, imported into page components. Never hardcoded in JSX.
- Treat every page as **independent** — no shared state between pages, no global store needed.

## Key decisions already made

- No backend, no API routes, no database
- No authentication
- No reservations/booking — a plain EmailJS contact form only (no calendar, no service selector)
- Static export (`output: 'export'` in next.config.ts)
- Each service category has its own route (`/servicios/faciales`, not anchor links)
- Landing page (`/`) contains NO service listings
- Images are provided by the client as SVG + video pairs per treatment (GIFs converted to H.264 MP4 at build-prep time; source GIFs not committed)
- Bilingual `es` (default, `/`) + `en` (`/en`) — no `[lang]` dynamic segment; the English tree is an explicit `app/en/` mirror of thin wrappers over shared `components/views/*`. Strings in `lib/i18n/dictionaries/{es,en}.ts` (`en` typed `satisfies Dictionary`) and `Localized<T>` fields in `data/`.
## Layout rework — wide-viewport pass (planned 2026-09-07)

Resolves the red-marked issues from the visual review of `/`, `/nosotros`,
`/servicios/masajes` and `/contacto` at 1920×1000.

**Read `.claude/rules/layout-responsive.md` first.** It holds the reasoning, the rules and
the reference measurements; this section holds only the phases, files and acceptance
numbers. Do not restate rules here.

### Where this starts from

An earlier pass already fixed 4 of the 11 marks — those are done, do not redo them:
the Masajes image overflow (`md:aspect-[3/2]`), the Inicio hero lead and the Masajes
description (both now 18px), and the Contacto gap above the form (`justify-start` in
`ContactForm.tsx` / `ClinicInfo.tsx`).

What remains is a single family of defects: **horizontal voids** (Inicio right side,
Masajes right of the text, Contacto right of "Visítanos") and **vertical voids** (Masajes
above/below the text, Nosotros, Contacto below the submit). All of it comes from the
missing max-width shell and from sizing sections by viewport height.

### Order matters

**The shell changes every downstream number.** Tuning row proportions or hero widths before
Phase 1 means tuning against column widths that are about to change — that is exactly how
the previous attempt chased its own tail. Do the phases in order.

### Phase 0 — Baseline

No code. Record the current numbers so movement is provable:
content band 1792px · Masajes gaps 197px above / 191px below · Masajes dead space right of
text 239px · Contacto input width 1013px · Nosotros page height 2948px, tallest section
700px · Inicio h1 at x=64 with 1253px empty to its right.

### Phase 1 — The shell

`tailwind.config.ts`: add `shell: "80rem"` to `theme.extend.maxWidth`, beside `prose`.
Then apply `mx-auto max-w-shell` to the outer page wrapper in
`app/servicios/masajes/page.tsx`, `app/servicios/faciales/page.tsx`,
`app/servicios/especiales/page.tsx`, `app/contacto/page.tsx`, and the `<article>` in
`app/nosotros/page.tsx`.

**Restart the dev server after the config change** — a new token silently does nothing
until you do. This cost a full cycle previously; if a class appears to have no effect,
restart before debugging.

Accept: content band 1792 → 1152px · Contacto input 1013 → ~639px · Masajes dead-right
239 → ≤30px.

### Phase 2 — Nosotros: height follows content

`app/nosotros/page.tsx`. Replace `min-h-[45vh]` / `min-h-[70vh]` / `min-h-[50vh]` on the
four sections with `py-20`. Drop `mx-auto` from those sections so they left-align inside
the shell (site-wide alignment decision). Keep `max-w-prose` as the measure and keep the
`data-bg` attributes — `ScrollBackdrop` triggers on them and works fine with shorter
sections; the colour changes simply arrive sooner.

Accept: page height 2948 → ~2020px · tallest section 700 → ≤400px · sections start at the
shell's left edge.

### Phase 3 — Inicio hero

Two changes, both required:

1. `components/HeroReveal.tsx` — give the wrapper `className="w-full"`. It currently renders a bare `<div>` that shrink-wraps as a flex item, which is why `mx-auto` on the hero content never centred anything and the hero sat pinned at x=64.
2. `app/page.tsx` — rebuild as two columns. Drop the full-bleed background `<Image>` (a blank placeholder at `opacity-40`, contributing nothing) and keep the gradient div. Wrap the content in
   `<div className="relative mx-auto grid w-full max-w-shell items-center gap-12 px-gutter md:grid-cols-[1.1fr_1fr] md:gap-16">`,
   put the existing eyebrow / h1 / paragraph / buttons in the first column, and add as the second column:
   `<figure data-reveal className="relative hidden aspect-[4/5] overflow-hidden border border-crimson-light md:block">`
   containing `<Image src="/images/hero.svg" alt="" fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />`.
   `hidden md:block` keeps mobile text-only.

Accept: h1 at x=384, aligned with every other page · figure ~518×648 at 1920 · figure
hidden at 390 · no horizontal overflow at 1920/1440/1024/768/390.

### Phase 4 — TreatmentRow proportions

`components/TreatmentRow.tsx`. With the shell live the columns are ~520/574 instead of
868/868, so re-proportion: figure `md:aspect-[16/11]` (replacing `md:aspect-[3/2]`) and the
grid `md:grid-cols-[1fr_1.1fr]`, giving the text slightly more room than the image. Keep
`items-center`.

Accept: empty band above the treatment text 197 → ≤80px, below 191 → ≤80px.

### Phase 5 — Typography

Add `text-lg` to the page intro `<p>` in `app/servicios/{masajes,faciales,especiales}/page.tsx`
and `app/contacto/page.tsx`, and to the remaining 16px paragraph in `app/nosotros/page.tsx`.
In `tailwind.config.ts`, cap `maxWidth.prose` at `50rem` instead of `56rem` so long-form
text stays within measure on large monitors.

Accept: no body paragraph renders at 16px · no line exceeds 75ch at 2560px wide.

### Phase 6 — Verify

Per `.claude/rules/layout-responsive.md` §Verification:

1. `npm run build`.
2. Load all four routes at 390 / 768 / 1024 / 1440 / 2560.
3. `document.documentElement.scrollWidth - window.innerWidth === 0` at every width.
4. Report the Phase 0 numbers against their new values. A phase whose numbers did not move
   was not implemented — say so rather than marking it done.

### Out of scope for this pass

- **Placeholder art.** `public/images/**` holds ~600-byte SVG stubs and 42-byte GIFs. They render exactly as coded; image regions will look empty until real photos arrive. That is a content gap, not a CSS bug — do not "fix" it in CSS and do not replace the files.
- **Accessibility debt** surfaced by the conventions but not by this review: touch targets are under-size (footer and `ClinicInfo` links 16px tall, submit 40px, CTAs 42px, mobile menu button 40×40). Still a separate pass. *(The `text-crimson`-on-`noir` error-colour issue is fixed — `crimson-bright` token added; see `.claude/rules/accessibility-seo.md`.)*
