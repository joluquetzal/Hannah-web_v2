# Forms — EmailJS reservation form

- The `/contacto` form is a client component. Controlled inputs with a single typed state object or `react-hook-form`.
- **Never commit EmailJS keys.** `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `_TEMPLATE_ID`, `_PUBLIC_KEY` come from `.env.local` (and Vercel env vars). `.env.local` is gitignored; keep a `.env.example` with empty placeholders.
- Validate before send: required `nombre`, `telefono`, `servicio`; `fecha` not in the past; basic phone shape. Show inline Spanish error messages.
- Submit flow: disable the button while sending, show a pending state, then a success or error message. Never leave the user guessing.
- Guard against double submit (button disabled + in-flight ref).
- On success: reset the form and show a confirmation ("Gracias, te contactaremos pronto."). On failure: keep the entered values, show a retry message, and `console.error` the EmailJS error.
- Honeypot field (hidden input) for spam; if filled, silently no-op.
- `servicio` select options are derived from the `data/` arrays, not hardcoded.
- Accessible: every input has a `<label htmlFor>`, errors linked via `aria-describedby`, `aria-invalid` on invalid fields, submit status in an `aria-live` region.
- No PII logged beyond what EmailJS needs; no analytics on field contents.
