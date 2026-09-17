import clsx from "clsx";
import { Sheet, type SheetTheme } from "@/components/Sheet";
import { ButtonLink } from "@/components/ButtonLink";
import { MetaChip } from "@/components/Chip";
import { TreatmentMedia } from "@/components/TreatmentMedia";
import type { Treatment } from "@/data/types";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

/**
 * Theme cycle for the treatment sheets. Each entry carries the text colours
 * that ground needs — `sand` is a light sheet, so everything on it flips to
 * noir/crimson. Every pair here is measured in layout-responsive §8.
 */
const cycle = [
  {
    theme: "crimson",
    heading: "text-cream",
    body: "text-cream/[0.82]",
    accent: "text-crimson-bright",
    rule: "border-cream/25",
  },
  {
    theme: "surface",
    heading: "text-cream",
    body: "text-sand",
    accent: "text-sand",
    rule: "border-sand/25",
  },
  {
    theme: "sand",
    heading: "text-noir",
    body: "text-noir",
    accent: "text-crimson",
    rule: "border-noir/25",
  },
  {
    theme: "crimson-light",
    heading: "text-cream",
    body: "text-cream/[0.82]",
    accent: "text-crimson-bright",
    rule: "border-cream/25",
  },
] as const satisfies readonly { theme: SheetTheme; [k: string]: string }[];

/**
 * F5 fit classes. The name shrinks to fit its column rather than hyphenating
 * (F8), so the size is chosen by the LONGEST WORD — a name may wrap between
 * words but never inside one. Closed set, because Tailwind cannot build a
 * class name from runtime data.
 */
const fitClass: Record<number, string> = {
  9: "text-name-9",
  10: "text-name-10",
  11: "text-name-11",
  12: "text-name-12",
  13: "text-name-13",
  14: "text-name-14",
  15: "text-name-15",
  16: "text-name-16",
  17: "text-name-17",
  18: "text-name-18",
  19: "text-name-19",
  20: "text-name-20",
  21: "text-name-21",
  22: "text-name-22",
  23: "text-name-23",
  24: "text-name-24",
};

function fitFor(name: string) {
  const longest = name
    .split(/[\s-]+/)
    .reduce((max, word) => Math.max(max, word.length), 0);
  // Up to 8 characters the plain scale always fits, so no cap is needed.
  if (longest <= 8) return "text-caps-name";
  return fitClass[Math.min(24, longest)] ?? "text-name-24";
}

const pad = (n: number) => String(n).padStart(2, "0");

export function TreatmentWindow({
  treatment,
  index,
  total,
  categorySlug,
  categoryTitle,
  lang,
}: {
  treatment: Treatment;
  index: number;
  total: number;
  categorySlug: string;
  categoryTitle: string;
  lang: Lang;
}) {
  const t = getDictionary(lang).treatment;
  const skin = cycle[index % cycle.length];
  const nombre = treatment.nombre[lang];
  // Even index: text left, image right. Odd: image left.
  const imageLeft = index % 2 === 1;
  const onSand = skin.theme === "sand";

  const list = treatment.incluye
    ? { heading: t.includes, items: treatment.incluye[lang] }
    : treatment.zonas
      ? { heading: t.zones, items: treatment.zonas[lang] }
      : null;

  return (
    <Sheet
      id={treatment.slug}
      theme={skin.theme}
      variant="window"
      align="start"
      crumb={nombre}
      className="scroll-mt-[var(--header-h)] wide:items-center"
    >
      <div
        className={clsx(
          "grid items-center gap-[clamp(1.75rem,4vw,4.5rem)]",
          imageLeft
            ? "wide:grid-cols-[0.85fr_1.25fr]"
            : "wide:grid-cols-[1.25fr_0.85fr]",
        )}
      >
        {/* `@container` makes 100cqi this column's width, which is what the
            name's fit size divides. `min-w-0` lets the grid track shrink. */}
        <div
          className={clsx(
            "[container-type:inline-size] min-w-0",
            imageLeft ? "wide:order-2" : "wide:order-1",
          )}
        >
          <p
            className={clsx(
              "mb-5 flex items-center gap-3 text-eyebrow font-bold uppercase tracking-counter",
              skin.accent,
            )}
          >
            <b className="text-base font-black tracking-num">
              {pad(index + 1)}
            </b>
            <span>
              / {pad(total)} · {categoryTitle}
            </span>
            <span aria-hidden className={clsx("h-px w-14 border-t", skin.rule)} />
          </p>

          {treatment.destacado && (
            <p
              className={clsx(
                "mb-4 inline-flex items-center gap-2 rounded-full border px-[0.8rem] py-[0.4rem] text-label font-bold uppercase tracking-label",
                skin.rule,
                skin.accent,
              )}
            >
              <span aria-hidden>★</span> {t.signature}
            </p>
          )}

          <h2
            className={clsx(
              "font-body font-extrabold uppercase leading-[0.95] tracking-caps",
              fitFor(nombre),
              skin.heading,
            )}
          >
            {nombre}
          </h2>

          <p className={clsx("mt-5 max-w-[34rem] text-lg leading-[1.6]", skin.body)}>
            {treatment.descripcion[lang]}
          </p>

          {(treatment.recomendacion || treatment.duracion) && (
            <div className="mt-5 flex flex-wrap gap-2">
              {treatment.recomendacion && (
                <MetaChip
                  label={t.recommendation}
                  value={treatment.recomendacion[lang]}
                  onSand={onSand}
                />
              )}
              {treatment.duracion && (
                <MetaChip value={treatment.duracion[lang]} onSand={onSand} />
              )}
            </div>
          )}

          {list && (
            <div className="mt-6">
              <p
                className={clsx(
                  "mb-2 text-label font-bold uppercase tracking-counter",
                  skin.accent,
                )}
              >
                {list.heading}
              </p>
              <ul
                className={clsx(
                  "grid gap-x-6 text-list leading-[1.35] sm:grid-cols-2",
                  skin.body,
                )}
              >
                {list.items.map((item) => (
                  <li key={item} className={clsx("border-t py-[0.55rem]", skin.rule)}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7">
            <ButtonLink
              href={`${localizedPath("/contacto", lang)}?servicio=${categorySlug}`}
              variant={onSand ? "noir" : "cream"}
              arrow
            >
              {t.cta}
            </ButtonLink>
          </div>
        </div>

        <figure
          className={clsx(
            "relative aspect-[4/3] overflow-hidden rounded-md wide:aspect-[4/5] wide:max-h-[calc(100svh-var(--header-h)-8rem)]",
            imageLeft ? "wide:order-1" : "wide:order-2",
          )}
        >
          <TreatmentMedia img={treatment.img} video={treatment.video} alt={nombre} />
        </figure>
      </div>
    </Sheet>
  );
}
