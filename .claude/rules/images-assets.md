# Images & assets

- Use `next/image` for every raster/vector-as-content image. No bare `<img>`.
- Always set `alt` — descriptive Spanish for meaningful images, `alt=""` for purely decorative ones.
- Provide `width` + `height` (or `fill` with a sized positioned parent) to prevent layout shift.
- Above-the-fold hero image: `priority`. Everything else lazy-loads by default — don't override.
- Treatment assets are SVG (static) + GIF (hover) pairs per the client's naming: `img1.svg … imgN.svg`, `video1.gif … videoN.gif` under `public/images/<category>/`. Keep that naming; reference paths from the `data/` entry, not string-built in JSX.
- GIFs are heavy — only load the GIF on hover (CSS `group-hover` swap), never render both eagerly. Consider `loading="lazy"` semantics; if a GIF exceeds ~2 MB, flag it for conversion to `<video>` muted loop.
- Static assets live in `public/`. Import SVGs as `next/image` src paths, not as React components, unless a component genuinely needs to style paths.
- No hotlinking external images. Everything is local for the static export.
- Optimize before commit: SVGs run through SVGO, no megabyte PNGs.
