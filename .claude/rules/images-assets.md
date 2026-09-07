# Images & assets

- Use `next/image` for every raster/vector-as-content image. No bare `<img>`.
- Always set `alt` — descriptive Spanish for meaningful images, `alt=""` for purely decorative ones.
- Provide `width` + `height` (or `fill` with a sized positioned parent) to prevent layout shift.
- **Every media container declares an aspect ratio, never a fixed height.** Put `aspect-[4/5]` / `aspect-[16/11]` on the `<figure>`/wrapper and let `next/image fill` (or a `<video>` with `absolute inset-0 h-full w-full`) fill it with `object-cover`. A fixed `px` height breaks at other viewport widths; an unconstrained ratio in a wide column once rendered an image taller than the viewport.
- Above-the-fold hero image: `priority`. Everything else lazy-loads by default — don't override.
- Treatment assets are SVG (static) + MP4 (hover) pairs per the client's naming: `img1.svg … imgN.svg`, `video1.mp4 … videoN.mp4` under `public/images/<category>/`. Keep that naming; reference paths from the `data/` entry (`img` / `video` fields), not string-built in JSX.
- The hover clip is a `<video autoPlay muted loop playsInline>` layer crossfaded in with CSS `group-hover` — no JS drives the swap — and hidden under `prefers-reduced-motion` via `motion-reduce:hidden`. Encode H.264, `-pix_fmt yuv420p`, `-movflags +faststart`, ~CRF 27; keep each clip well under ~500 KB. Do not commit source GIFs.
- Static assets live in `public/`. Import SVGs as `next/image` src paths, not as React components, unless a component genuinely needs to style paths.
- No hotlinking external images. Everything is local for the static export.
- Optimize before commit: SVGs run through SVGO, no megabyte PNGs.
