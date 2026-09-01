# TypeScript conventions

- `strict` mode stays on. Never disable `strict`, `noImplicitAny`, or `strictNullChecks`.
- No `any`. Use `unknown` + narrowing, generics, or a precise type. `// @ts-ignore` / `// @ts-expect-error` need a one-line reason comment.
- Prefer `type` aliases for props and data shapes; use `interface` only when declaration merging is actually needed.
- Derive, don't duplicate: `type Treatment = (typeof faciales)[number]` instead of re-declaring a shape that already exists in `data/`.
- Export the types that consumers need from the same module that owns the data (e.g. `data/faciales.ts` exports `Faciales` / `Treatment`).
- Use `as const` on literal data arrays so keys and string unions stay narrow.
- No non-null assertions (`!`) except for DOM refs that are guaranteed mounted; prefer optional chaining and early returns.
- Name things in English (identifiers, types, functions); user-facing strings are Spanish.
- Function components are typed by their props type, not `React.FC`.
- Keep `tsconfig` path aliases (`@/*`) — import with the alias, never long `../../..` chains.
