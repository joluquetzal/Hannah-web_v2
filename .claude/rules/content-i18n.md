# Content & language

- **All user-facing text is Spanish (Mexico).** UI labels, buttons, form fields, error messages, metadata, alt text.
- Code is English: identifiers, types, functions, comments, commit messages, file names.
- Use correct Spanish punctuation and accents: `¿` `¡`, `á é í ó ú ñ`, `"" ''`. No unaccented shortcuts.
- Treatment names keep the client's casing (e.g. `FACIAL HANNAH`, `NANOBOTOX`) — match `data/` exactly.
- Content lives in `data/` as typed arrays. Never hardcode treatment copy, prices, durations, or "incluye" lists in JSX.
- Placeholder copy (e.g. `/nosotros`) is clearly marked with a `// TODO: client copy` comment so it isn't shipped by accident.
- Keep tone consistent with a premium aesthetics clinic: calm, precise, not salesy, no emoji in site copy.
- Currency, phone, dates formatted for Mexico (`es-MX`). WhatsApp link uses the international `https://wa.me/52...` format.
- One source of truth for NAP (name, address, phone) — a single `data/site.ts` or constants file, reused in Footer, `/contacto`, and JSON-LD.
