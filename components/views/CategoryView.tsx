import { TreatmentRow } from "@/components/TreatmentRow";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { faciales } from "@/data/faciales";
import { masajes } from "@/data/masajes";
import { especiales } from "@/data/especiales";
import type { Treatment } from "@/data/types";
import { backdrop } from "@/lib/backdrop";
import { getDictionary, type Lang } from "@/lib/i18n";

export type CategorySlug = "faciales" | "masajes" | "especiales";

const treatmentsBySlug: Record<CategorySlug, readonly Treatment[]> = {
  faciales,
  masajes,
  especiales,
};

export function CategoryView({
  lang,
  category,
}: {
  lang: Lang;
  category: CategorySlug;
}) {
  const t = getDictionary(lang);
  const cat = t.categories[category];
  const treatments = treatmentsBySlug[category];

  return (
    <>
      <ScrollBackdrop />

      <div className="mx-auto max-w-shell px-gutter pb-section-b pt-top-clear">
        <header data-bg={backdrop.noir} className="max-w-prose">
          <h1 className="font-display text-display-md italic text-cream">
            {cat.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-sand">{cat.lead}</p>
        </header>

        <div className="mt-16 space-y-20 md:space-y-28">
          {treatments.map((treatment, index) => (
            <TreatmentRow
              key={treatment.slug}
              treatment={treatment}
              index={index}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </>
  );
}
