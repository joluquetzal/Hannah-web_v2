import { TreatmentRow } from "@/components/TreatmentRow";
import { Sheet, type SheetTheme } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { faciales } from "@/data/faciales";
import { masajes } from "@/data/masajes";
import { especiales } from "@/data/especiales";
import type { Treatment } from "@/data/types";
import { getDictionary, type Lang } from "@/lib/i18n";

export type CategorySlug = "faciales" | "masajes" | "especiales";

const treatmentsBySlug: Record<CategorySlug, readonly Treatment[]> = {
  faciales,
  masajes,
  especiales,
};

/**
 * Alternating sheet grounds. Both are dark, so `TreatmentRow`'s cream/sand
 * palette stays above 4.5:1. The full crimson → surface → sand → crimson-light
 * cycle arrives in Phase 6, with a theme-aware `TreatmentWindow`.
 */
const treatmentThemes: SheetTheme[] = ["surface", "crimson-light"];

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
    <SheetStack>
      {/* A window-height intro keeps the next sheet below the fold at rest.
          A short first sheet would already be mid-cover — shrunk and dimmed —
          before the visitor has scrolled at all. */}
      <Sheet theme="noir" variant="window">
        <header className="max-w-prose">
          <h1 className="font-display text-display-md italic text-cream">
            {cat.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-sand">{cat.lead}</p>
        </header>
      </Sheet>

      {treatments.map((treatment, index) => (
        <Sheet
          key={treatment.slug}
          variant="window"
          theme={treatmentThemes[index % treatmentThemes.length]}
          crumb={treatment.nombre[lang]}
        >
          <TreatmentRow treatment={treatment} index={index} lang={lang} />
        </Sheet>
      ))}
    </SheetStack>
  );
}
