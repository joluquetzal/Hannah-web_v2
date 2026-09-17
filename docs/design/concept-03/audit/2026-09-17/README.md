# Mockup fidelity audit — 2026-09-17

Taken at the end of **Phase 13** (`docs/pipelines/concept-03-fidelity.md`), against the
2026-09-16 baseline in the sibling folder.

**Flagged cells: 665 → 265 (−60%).**

| page | 2026-09-16 | 2026-09-17 | | page | 2026-09-16 | 2026-09-17 |
|---|---|---|---|---|---|---|
| inicio 1440 | 55 | **22** | | inicio 390 | 59 | **23** |
| servicios 1440 | 33 | **12** | | servicios 390 | 30 | **14** |
| faciales 1440 | 88 | **35** | | faciales 390 | 94 | **40** |
| masajes 1440 | 13 | **2** | | masajes 390 | 13 | **3** |
| nosotros 1440 | 67 | **23** | | nosotros 390 | 70 | **24** |
| contacto 1440 | 65 | **36** | | contacto 390 | 78 | **31** |

- `report.md` — element-by-element diff, mockup → site. **Bold** = outside ±max(2px, 6%).
- `<page>-<width>-<n>.jpg` — side by side at four scroll positions: **mockup left, site right**.

How it was produced: `npm run compare:mockup -- --site http://localhost:4173` against a local
static export.

## Known noise, not defects

Carried over from the 2026-09-16 baseline:

- **logo** — the mockup's is Anton text, ours is the SVG wordmark (D2). Compare position and
  height only.
- `leading` shows `normal` on one side for some elements; those cells are skipped.

New, and deliberate:

- **strip button / strip text** — **F3**: the owner kept the 44px touch target over the
  mockup's 30px box (and its 20px collapsed link at 390). These rows will always differ.
- **team card text** — the mockup and the site both carry *placeholder* copy pending the
  client (D12), but with different wording, so the tool cannot pair them. Resolves when the
  real copy lands (Phase 12).

## What the remaining 265 are

By property: `yInSheet` 65, height 50, colour 30, x 27, width 26, leading 20, size 13,
font 8, transform 8, weight 8, style 2, tracking 2.

Position and size still dominate, and a large share of that is **placeholder art**: every
treatment image, hub cover and collage swatch is a ~600-byte SVG stub, so any region sized by
a photograph differs from the mockup's generated gradients. That is a content gap (§9), not a
CSS defect, and is tracked in Phase 12.
