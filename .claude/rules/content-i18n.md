# Content & language

## Bilingual — Spanish (default) + English

- **The site ships in two languages: Spanish (`es`, the default, unprefixed URLs) and English (`en`, under `/en`).** Spanish is the source of truth; English is a translation that tracks it.
- **Every user-facing string exists in both languages, updated together in the same commit.** Not optional, and it covers: UI labels, buttons, form fields, validation messages, `alt` text, `<title>` / `description`, JSON-LD, `aria-label`s, the 404 page.
- Where strings live:
  - UI chrome + page copy: `lib/i18n/dictionaries/es.ts` (defines the shape) and `en.ts` (`satisfies Dictionary`). A missing or misshaped key in `en.ts` **fails the build** — that is the enforcement; do not defeat it with `any`/`as`.
  - Per-treatment / per-category content: `data/*.ts` — each translatable field is `Localized<T>` = `{ es, en }`.
  - Language-neutral facts (NAP, URLs, phone, opening-hours spec): `lib/site.ts`. No prose there.
- Adding or changing any string: edit the `es` value **and** the matching `en` value in the same change. If you don't have the translation, ask — never ship a Spanish string in the English tree or an English placeholder in `es.ts`.
- New route: add the `es` page (bare path) **and** the `en` page under `app/en/`, both delegating to one `components/views/*` component that takes `lang`. Register it in `app/sitemap.ts` and give it `buildMetadata(lang, key, path)` for the localized title/description + hreflang alternates.
- Never hardcode a user-facing string in JSX — read it from `getDictionary(lang)` (or `useI18n()` in shared client components like `Nav`/`Footer`), or from a `Localized` field in `data/`.
- `<html lang>` is `es` in the static HTML for every route; `components/SyncHtmlLang` corrects it on `/en/*` after hydration, and each page's `hreflang` alternates cover crawlers. Known limitation of the static export — don't "fix" it by duplicating the root layout.

## Style

- Spanish is `es-MX`: correct punctuation and accents (`¿` `¡`, `á é í ó ú ñ`, `"" ''`). No unaccented shortcuts.
- English is `en-US`, natural and idiomatic — translate the intent, not word-for-word. Aesthetic / clinical terms in `data/` are a best effort; flag them for a native or clinical review rather than guessing silently.
- Brand and coined names stay as-is in both languages: `HannaH`, `FACIAL HANNAH`, `NANOBOTOX`, `MESOBOTOX`, `SKIN BOOSTER`. Match `data/` casing exactly.
- Tone in both languages: calm, precise, not salesy, no emoji in site copy.
- Code is English: identifiers, types, functions, comments, commit messages, file names.
- Placeholder copy (e.g. `/nosotros`) keeps its `// TODO: client copy` marker — in both languages — so it isn't shipped by accident.
- Currency, phone and dates for Mexico. WhatsApp link uses the international `https://wa.me/52...` format.
- One source of truth for NAP (name, address, phone) — `lib/site.ts` — reused in Footer, `/contacto`, and JSON-LD.
