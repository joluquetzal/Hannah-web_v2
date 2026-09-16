# Mockup fidelity audit — 2026-09-16

Baseline for **Phase 13** (`docs/pipelines/concept-03-fidelity.md`), taken before any Phase 13 change.

- `report.md` — element-by-element diff, mockup → site. **Bold** = outside ±max(2px, 6%).
- `<page>-<width>-<n>.jpg` — side by side at four matching scroll positions: **mockup left, site right**.
- `menu-cmp.jpg` — mobile menu open (390), `mega-cmp.jpg` — Servicios mega menu open (1440).

How it was produced: `docs/design/concept-03/tools/compare.mjs` against a local static export
(`npm run build`, served on :4173). Google Fonts were unreachable in that environment, so both the mockup
and the site were given the same local copies of the font files — the fonts match; nothing else was changed.
Screenshots were converted from PNG to JPEG to keep the repo light; a fresh run writes PNGs to
`.mockup-compare/`.

Known tool noise, not defects:
- **logo** row — the mockup's logo is Anton text, the site's is the SVG wordmark (D2), so font, size and
  colour always differ. Compare only its position and height.
- `leading` shows `normal` for some elements on one side; those cells are skipped, not compared.
