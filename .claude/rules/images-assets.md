# Images & assets

- Use `next/image` for every raster/vector-as-content image. No bare `<img>`.
- Always set `alt` — descriptive Spanish for meaningful images, `alt=""` for purely decorative ones.
- Provide `width` + `height` (or `fill` with a sized positioned parent) to prevent layout shift.
- **Every media container declares an aspect ratio, never a fixed height.** Put `aspect-[4/5]` / `aspect-[16/11]` on the `<figure>`/wrapper and let `next/image fill` fill it with `object-cover`. A fixed `px` height breaks at other viewport widths; an unconstrained ratio in a wide column once rendered an image taller than the viewport.
- Above-the-fold hero image: `priority`. Everything else lazy-loads by default — don't override.
- Treatment assets are **still WebP images only**: `img1.webp … imgN.webp` under `public/images/<category>/`. Keep that naming; reference the path from the `data/` entry's `img` field, never string-built in JSX.
- **No video anywhere on the site.** The treatment slides once crossfaded to a muted looping clip — first on hover, then on the slide in view. Both are removed (2026-09-17, owner's call) after the services pages still felt slow with them: 14 clips and ~800 KB of MP4 are gone, along with their decode cost and every line of code that drove them. The slides are still images. Do not reintroduce video without re-measuring on a real machine.
- Static assets live in `public/`. Import SVGs as `next/image` src paths, not as React components, unless a component genuinely needs to style paths.
- No hotlinking external images. Everything is local for the static export.
- Optimize before commit: photos as WebP (~0.82 quality), SVGs through SVGO, no megabyte PNGs. Static export sets `images.unoptimized: true`, so **whatever is committed is exactly what ships** — Next will not re-encode it.
