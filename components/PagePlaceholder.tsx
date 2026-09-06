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
    <section className="px-gutter pb-section-b pt-top-clear">
      <h1 className="font-display text-display-md italic text-cream">
        {title}
      </h1>
      <p className="mt-4 text-sm text-muted">
        Contenido pendiente — {phase}.
      </p>
    </section>
  );
}
