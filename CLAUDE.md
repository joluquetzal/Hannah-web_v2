# HannaH — Claude Code Context

## What this project is

HannaH is a beauty and aesthetics clinic based in Mexico. This is their **marketing/showcase website** — frontend only, no backend, no ecommerce. The goal is to present the clinic's services, tell their story, and let visitors get in touch. There is **no appointment/booking flow** — the site links to a plain contact form.

## Tech stack

- **Framework**: Next.js 14 (App Router, static export)
- **Styling**: Tailwind CSS v3
- **Animations**: GSAP + ScrollTrigger
- **Forms**: EmailJS (client-side email, no backend needed)
- **Deployment**: Vercel (static export)
- **Language**: Spanish (all user-facing content is in Spanish)

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
  layout.tsx              # global layout: Nav + Footer
  page.tsx                # / landing page
  servicios/
    page.tsx              # /servicios — service hub (3 category cards)
    faciales/page.tsx     # /servicios/faciales
    masajes/page.tsx      # /servicios/masajes
    especiales/page.tsx   # /servicios/especiales
  nosotros/page.tsx       # /nosotros — about us
  contacto/page.tsx       # /contacto — contact form + clinic info
components/
  Nav.tsx                 # fixed nav, transparent → solid on scroll
  Footer.tsx
  ServiceCard.tsx         # card used on /servicios hub
  TreatmentRow.tsx        # alternating image/text row used on service pages
data/
  faciales.ts
  masajes.ts
  especiales.ts
public/
  images/
    faciales/             # img1.svg … img6.svg, video1.gif … video6.gif
    masajes/              # img1.svg … img4.svg, video1.gif … video4.gif
    especiales/           # img1.svg … img4.svg, video1.gif … video4.gif
```

## Design system

All tokens are defined in `tailwind.config.ts` under `theme.extend`.

### Colors

| Token | Hex | Use |
|---|---|---|
| `noir` | `#0E0A0A` | Dark ground, backgrounds |
| `crimson` | `#6B1414` | Deep red accent (brand) |
| `crimson-light` | `#3D1A1A` | Mid-dark surface |
| `sand` | `#C9A27A` | Warm gold — body text on dark |
| `cream` | `#F0E8DC` | Light headings on dark |
| `muted` | `#7A6E65` | Secondary text |

### Typography

- **Display / headings**: `Cormorant Garamond` — light 300, italic. Treatment names, hero text, section titles.
- **Body / UI**: `DM Sans` — 400 regular, 500 medium. Descriptions, nav, buttons, labels.
- Both loaded via Google Fonts in `app/layout.tsx`.

### Motion principles

- GSAP ScrollTrigger for section background color shifts (same approach as the old site)
- Hover on treatment images: static image → GIF swap (CSS only, `group-hover`)
- Page transitions: subtle fade via Tailwind + Next.js view transitions
- Respect `prefers-reduced-motion` — wrap all GSAP in a check

## Pages

### `/` — Landing

Hero only. Brand statement, atmospheric image or video, CTA buttons ("Ver Servicios" → `/servicios`, "Contacto" → `/contacto`). No service listings here.

### `/servicios` — Hub

Three large editorial cards: Faciales, Masajes, Especiales. Each links to its own page. No treatment details here.

### `/servicios/faciales`

Six treatments rendered with `TreatmentRow`. Alternating layout (odd: image left, even: image right). Hover reveals GIF.

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
- Images are provided by the client as SVG + GIF pairs per treatment
