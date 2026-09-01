# Animations — GSAP + ScrollTrigger

- All GSAP runs client-side only. The animated component has `"use client"` and sets up in `useEffect` / `useLayoutEffect`.
- Always use `gsap.context()` scoped to a ref, and return `ctx.revert()` from the effect cleanup. No stray tweens or ScrollTriggers left on unmount.
- Register plugins once: `gsap.registerPlugin(ScrollTrigger)` at module top of the client component (guarded so it doesn't run on the server).
- **Respect reduced motion.** Wrap every animation setup:
  ```ts
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) return; // render final state, no animation
  ```
  Or use `gsap.matchMedia()` with a `(prefers-reduced-motion: no-preference)` condition.
- Animate transform and opacity. Avoid animating `width`, `height`, `top`, `left`, box-shadow, or background-color per-frame where a transform/opacity equivalent exists.
- Section background color shifts via ScrollTrigger are the intended pattern — pin to section, use `scrub`, keep the color list in sync with the Tailwind tokens.
- Hover image → GIF swap is **CSS only** (`group-hover`), never JS. No GSAP for hover states.
- Set sensible ScrollTrigger `start` / `end`; call `ScrollTrigger.refresh()` after layout-affecting async (fonts, images) if jumps appear.
- Never animate layout on first paint in a way that causes CLS — set the initial state in the same tick, ideally via a `gsap.set` before paint.
