# Concept 03 — "Editorial Manifesto"

Approved visual direction for the HannaH redesign (2026-09-15).
The implementation plan is `docs/pipelines/concept-03-redesign.md`; run it with `/concept-03` in Claude Code.

## Open the prototype

`prototipo.html` is a single self-contained file (inline CSS + JS, Google Fonts only).
Open it in a browser — no build step.

- The bottom toolbar switches **Escritorio / Móvil** (a 390px phone frame) and jumps between pages.
- Routes are hash-based: `#/`, `#/servicios`, `#/servicios/faciales`, `#/servicios/faciales/facial-hannah`,
  `#/nosotros`, `#/contacto`, `#/contacto?servicio=masajes`, `#/aviso-de-privacidad`, `#/terminos`.
- All copy is Spanish and was taken from `lib/i18n/dictionaries/es.ts`, `lib/site.ts` and `data/*.ts`
  as of 2026-09-15. A few short headings are new and still need `en` translations (see the pipeline).

## What the prototype decides

| Area | Decision | Reference |
|---|---|---|
| Overall language | Full-bleed colour sheets, heavy uppercase display type broken by a Cormorant italic accent phrase | dominiquesire.com |
| Scroll | Every top-level section is a sticky sheet; the next sheet rises from below and covers it. The covered sheet dims and shrinks slightly. | awwwards reference video |
| Treatments | One treatment per window, alternating image side, theme cycle crimson → noir → sand → crimson-light | "services window" from the first Concept 03 draft |
| `/servicios` hub | Three full-height images side by side (stacked rows on mobile); dark warm tint that clears on hover, description + CTA slide up | flora (restaurant) site |
| Header | Always visible. Cream announcement strip → dark bar (logo, nav, WhatsApp outline button, Contáctanos filled button, ES / EN) → breadcrumb row | ronnsquare.com (colours, fonts, breadcrumbs) |
| Logo | `HANNAH` set in Anton | user request |
| Language switch | Keep the current `ES / EN` text toggle (not a dropdown) | user request |
| Breadcrumbs | `Inicio / Servicios / Faciales`, plus a live 4th crumb with the treatment currently in view | ronnsquare.com |

## Prototype-only — do not build

- The bottom toolbar, the phone frame and the "EN" toast.
- The generated gradient "macro" images and the grain overlay — they stand in for the client's photos
  (`public/images/**`, `hero.jpg`).
- The "Imagen · pasa el cursor" tag on treatment images, and the fake video progress bar on Facial HannaH.
- The drawn map — production keeps the real Google Maps embed from `lib/site.ts`.
- Hash routing and the JS text-fitting loop (`fit()`); production uses real routes and a type scale that is
  verified to fit (see the pipeline, Phase 6).

## Palette used

Brand tokens (unchanged): `noir #0E0A0A`, `crimson #6B1414`, `crimson-light #3D1A1A`, `crimson-bright #E0938A`,
`sand #C9A27A`, `cream #F0E8DC`, `muted #847A6F`.

New in the prototype: surface `#151010` (lifted noir for sheets) and the header palette
`#221A08` (dark bar), `#FFEBD6` (strip / filled button), `#9C917D` (inactive crumbs).
Measured contrast is in the pipeline, Phase 0 → D3.
