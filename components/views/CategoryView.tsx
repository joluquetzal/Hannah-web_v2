import Link from "next/link";
import clsx from "clsx";
import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { TreatmentWindow } from "@/components/TreatmentWindow";
import { TalkSheet } from "@/components/TalkSheet";
import { faciales } from "@/data/faciales";
import { masajes } from "@/data/masajes";
import { especiales } from "@/data/especiales";
import { servicios } from "@/data/servicios";
import type { Treatment } from "@/data/types";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

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
  const others = servicios.filter((c) => c.slug !== category);

  return (
    <SheetStack>
      <Sheet theme="noir" variant="window" align="start" className="pt-16">
        <p className="text-xs uppercase tracking-eyebrow text-sand">
          {t.category.countLabel.replace(
            "{count}",
            String(treatments.length).padStart(2, "0"),
          )}
        </p>

        <h1 className="mt-6 font-body text-caps-lg font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
          {cat.title}
        </h1>

        <p className="mt-6 max-w-prose text-lg leading-relaxed text-sand">
          {cat.lead}
        </p>

        <nav aria-label={t.servicios.title} className="mt-8 flex flex-wrap gap-2">
          {servicios.map((c) => {
            const current = c.slug === category;
            return (
              <Link
                key={c.slug}
                href={localizedPath(c.href, lang)}
                aria-current={current ? "page" : undefined}
                className={clsx(
                  "inline-flex min-h-11 items-center rounded-full border px-4 text-xs uppercase tracking-label transition-colors",
                  current
                    ? "border-sand bg-sand text-noir"
                    : "border-sand/35 text-sand hover:border-sand hover:text-cream",
                )}
              >
                {c.titulo[lang]}
              </Link>
            );
          })}
        </nav>

        <p className="mt-10 text-xs uppercase tracking-label text-sand">
          {t.category.scrollCue}
        </p>
      </Sheet>

      {treatments.map((treatment, index) => (
        <TreatmentWindow
          key={treatment.slug}
          treatment={treatment}
          index={index}
          total={treatments.length}
          categorySlug={category}
          categoryTitle={cat.title}
          lang={lang}
        />
      ))}

      <Sheet theme="crimson-light" className="py-20">
        <h2 className="text-xs uppercase tracking-eyebrow text-crimson-bright">
          {t.category.others}
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link href={localizedPath(c.href, lang)} className="group block">
                <span className="block font-body text-caps-sm font-extrabold uppercase leading-none tracking-caps text-cream transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none">
                  {c.titulo[lang]}
                </span>
                <span className="mt-3 block max-w-prose text-sm leading-relaxed text-cream/90">
                  {c.descripcion[lang]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Sheet>

      <TalkSheet lang={lang} />
    </SheetStack>
  );
}
