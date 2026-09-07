import { getDictionary, type Lang } from "@/lib/i18n";

/**
 * Shared prose layout for the legal pages. Copy is placeholder — see the
 * note rendered at the top and `.claude/rules/content-i18n.md`.
 */
export function LegalPageView({
  lang,
  doc,
}: {
  lang: Lang;
  doc: "privacy" | "terms";
}) {
  const legal = getDictionary(lang).legal;
  const page = doc === "privacy" ? legal.privacy : legal.terms;

  return (
    <div className="mx-auto max-w-shell px-gutter pb-section-b pt-top-clear">
      <div className="max-w-prose">
        <h1 className="font-display text-display-md italic text-cream">
          {page.title}
        </h1>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
          {legal.lastUpdatedLabel} {legal.lastUpdated}
        </p>

        <p className="mt-6 border-l-2 border-crimson-bright pl-4 text-sm text-crimson-bright">
          {legal.placeholderNote}
        </p>

        <p className="mt-8 text-lg leading-relaxed text-sand">{page.intro}</p>

        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-display-sm italic text-cream">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-lg leading-relaxed text-sand"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
