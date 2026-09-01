# HannaH — sitio web

Sitio de presentación (marketing) para HannaH, clínica de belleza y estética en México.
Frontend estático, sin backend.

## Stack

- Next.js 14 (App Router, `output: 'export'`)
- Tailwind CSS v3
- GSAP + ScrollTrigger (animaciones)
- EmailJS (formulario de reservación, sin backend)
- Deploy: Vercel

## Comandos

```bash
npm run dev      # servidor de desarrollo — localhost:3000
npm run build    # build de producción (genera /out)
npm run start    # sirve el build de producción
npm run lint     # lint
npm run format   # prettier
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa las claves de EmailJS.

## Estado

- [x] Fase 1 — Fundación: scaffold, layout global, Nav, Footer, tokens de diseño
- [ ] Fase 2 — Contenido y páginas de servicios
- [ ] Fase 3 — Landing y Nosotros + animaciones GSAP
- [ ] Fase 4 — Contacto (formulario EmailJS, mapa, SEO)
- [ ] Fase 5 — Pulido y rendimiento

Convenciones de código en `.claude/rules/`.
