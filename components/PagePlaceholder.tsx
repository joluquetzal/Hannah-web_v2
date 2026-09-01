/**
 * Temporary scaffold for routes whose real content lands in a later phase.
 * TODO: remove this component once every route has its real page.
 */
export function PagePlaceholder({
  title,
  phase,
}: {
  title: string;
  phase: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-40">
      <h1 className="font-display text-4xl italic text-cream sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-sm text-muted">
        Contenido pendiente — {phase}.
      </p>
    </section>
  );
}
