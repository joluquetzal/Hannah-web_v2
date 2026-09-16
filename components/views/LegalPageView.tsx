import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
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
    <SheetStack>
      <Sheet theme="noir" className="py-24">
        <div className="max-w-prose">
        <h1 className="break-words font-body text-caps-name font-extrabold uppercase leading-[0.95] tracking-caps text-cream">
          {page.title}
        </h1>
        <p className="mt-2 text-label font-bold uppercase tracking-label text-sand">
          {legal.lastUpdatedLabel} {legal.lastUpdated}
        </p>

        <p className="mt-6 border-l-2 border-crimson-bright pl-4 text-sm text-crimson-bright">
          {legal.placeholderNote}
        </p>

        <p className="mt-8 text-lg leading-relaxed text-sand">{page.intro}</p>

        <div className="mt-12 space-y-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl italic text-cream">
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
      </Sheet>
    </SheetStack>
  );
}
