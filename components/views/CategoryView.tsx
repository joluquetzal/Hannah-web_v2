import Link from "next/link";
import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { TreatmentWindow } from "@/components/TreatmentWindow";
import { TalkSheet } from "@/components/TalkSheet";
import { ArrowLink } from "@/components/ArrowLink";
import { Chip } from "@/components/Chip";
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
      {/* Content height, NOT a window sheet: that is what leaves the first
          treatment peeking in at the bottom on load (owner note #7). */}
      <Sheet
        theme="noir"
        className="pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(3rem,8vw,7rem)]"
      >
        <nav aria-label={t.servicios.title} className="mb-8 flex flex-wrap gap-2">
          {servicios.map((c) => (
            <Chip
              key={c.slug}
              href={localizedPath(c.href, lang)}
              active={c.slug === category}
            >
              {c.titulo[lang]}
            </Chip>
          ))}
        </nav>

        <p className="mb-5 text-eyebrow font-bold uppercase tracking-eyebrow text-sand">
          {t.category.countLabel.replace(
            "{count}",
            String(treatments.length).padStart(2, "0"),
          )}
        </p>

        <h1 className="font-body text-caps-page font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
          {cat.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <p className="max-w-prose text-lg leading-relaxed text-sand">
            {cat.lead}
          </p>
          <p className="flex items-center gap-3 text-label font-bold uppercase tracking-label text-muted">
            <span
              aria-hidden
              className="block h-[34px] w-px animate-cue bg-gradient-to-b from-sand to-transparent motion-reduce:animate-none"
            />
            {t.category.scrollCue}
          </p>
        </div>
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

      <Sheet
        theme="crimson-light"
        className="pb-[clamp(3rem,8vw,6rem)] pt-[clamp(3rem,8vw,6rem)]"
      >
        <h2 className="text-eyebrow font-bold uppercase tracking-eyebrow text-crimson-bright">
          {t.category.others}
        </h2>

        <ul className="mt-6">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={localizedPath(c.href, lang)}
                className="group flex items-center justify-between gap-4 border-t border-cream/[0.18] py-4"
              >
                <span className="min-w-0 font-body text-caps-link font-extrabold uppercase leading-none tracking-caps text-cream transition-transform duration-500 group-hover:translate-x-3 motion-reduce:transition-none">
                  {c.titulo[lang]}
                </span>
                <span className="hidden max-w-[28ch] text-list leading-relaxed text-cream/75 sm:block">
                  {c.descripcion[lang]}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <ArrowLink
          href={localizedPath("/servicios", lang)}
          className="mt-4 text-crimson-bright"
        >
          {t.nav.servicesViewAllLong}
        </ArrowLink>
      </Sheet>

      <TalkSheet lang={lang} />
    </SheetStack>
  );
}
