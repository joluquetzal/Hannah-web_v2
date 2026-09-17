# Images & assets

- Use `next/image` for every raster/vector-as-content image. No bare `<img>`.
- Always set `alt` — descriptive Spanish for meaningful images, `alt=""` for purely decorative ones.
- Provide `width` + `height` (or `fill` with a sized positioned parent) to prevent layout shift.
- **Every media container declares an aspect ratio, never a fixed height.** Put `aspect-[4/5]` / `aspect-[16/11]` on the `<figure>`/wrapper and let `next/image fill` (or a `<video>` with `absolute inset-0 h-full w-full`) fill it with `object-cover`. A fixed `px` height breaks at other viewport widths; an unconstrained ratio in a wide column once rendered an image taller than the viewport.
- Above-the-fold hero image: `priority`. Everything else lazy-loads by default — don't override.
- Treatment assets are **WebP** (still) + MP4 (clip) pairs: `img1.webp … imgN.webp`, `video1.mp4 … videoN.mp4` under `public/images/<category>/`. Keep that naming; reference paths from the `data/` entry (`img` / `video` fields), never string-built in JSX.
- **The treatment clip plays while its slide is on screen, not on hover** (`components/TreatmentMedia.tsx`). An IntersectionObserver at 0.55 starts it and pauses it on the way out, and the still image crossfades under it. This replaced the CSS `group-hover` swap for two measured reasons: six clips on a category page were downloading and buffering on load (**800 KB before the visitor scrolled**), and hover does not exist on touch. The clip is `preload="none"` with no `autoPlay`, so nothing is fetched until a slide is reached. Under `prefers-reduced-motion` it never loads or plays and the still image stays. Encode H.264, `-pix_fmt yuv420p`, `-movflags +faststart`, ~CRF 27; keep each clip well under ~500 KB. Do not commit source GIFs.
- Static assets live in `public/`. Import SVGs as `next/image` src paths, not as React components, unless a component genuinely needs to style paths.
- No hotlinking external images. Everything is local for the static export.
- Optimize before commit: photos as WebP (~0.82 quality), SVGs through SVGO, no megabyte PNGs. Static export sets `images.unoptimized: true`, so **whatever is committed is exactly what ships** — Next will not re-encode it.
