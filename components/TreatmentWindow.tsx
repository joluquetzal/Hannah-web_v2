import Image from "next/image";
import clsx from "clsx";
import { Sheet, type SheetTheme } from "@/components/Sheet";
import { ButtonLink } from "@/components/ButtonLink";
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
    body: "text-cream",
    accent: "text-crimson-bright",
    rule: "border-cream/25",
    frame: "border-cream/20",
  },
  {
    theme: "surface",
    heading: "text-cream",
    body: "text-sand",
    accent: "text-sand",
    rule: "border-sand/25",
    frame: "border-sand/20",
  },
  {
    theme: "sand",
    heading: "text-noir",
    body: "text-noir",
    accent: "text-crimson",
    rule: "border-noir/25",
    frame: "border-noir/20",
  },
  {
    theme: "crimson-light",
    heading: "text-cream",
    body: "text-cream",
    accent: "text-crimson-bright",
    rule: "border-cream/25",
    frame: "border-cream/20",
  },
] as const satisfies readonly { theme: SheetTheme; [k: string]: string }[];

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
  const imageRight = index % 2 === 1;

  const list = treatment.incluye
    ? { heading: t.includes, items: treatment.incluye[lang] }
    : treatment.zonas
      ? { heading: t.zones, items: treatment.zonas[lang] }
      : null;

  const chips = [
    treatment.recomendacion && `${t.recommendation} ${treatment.recomendacion[lang]}`,
    treatment.duracion?.[lang],
  ].filter(Boolean) as string[];

  return (
    <Sheet
      id={treatment.slug}
      theme={skin.theme}
      variant="window"
      crumb={nombre}
      className="scroll-mt-[var(--header-h)]"
    >
      <div
        className={clsx(
          "grid items-center gap-8 md:gap-14",
          imageRight ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[1fr_1.1fr]",
        )}
      >

        {/* min-w-0: a grid track refuses to shrink below its content's
            min-content width, and an unbreakable 18-character name makes that
            wider than the column. Without this the track expands and the title
            is clipped by the sheet rather than wrapping. */}
        <div className={clsx("min-w-0", imageRight ? "md:order-1" : "md:order-2")}>
          <p
            className={clsx(
              "flex items-center gap-3 text-eyebrow font-bold uppercase tracking-eyebrow",
              skin.accent,
            )}
          >
            <span className="text-base tracking-label">{pad(index + 1)}</span>
            <span>
              / {pad(total)} · {categoryTitle}
            </span>
            <span
              aria-hidden
              className={clsx("h-px w-14 border-t", skin.rule)}
            />
          </p>

          {treatment.destacado && (
            <p className={clsx("mt-4 text-label font-bold uppercase tracking-label", skin.accent)}>
              <span aria-hidden>★</span> {t.signature}
            </p>
          )}

          {/* `lang` drives the hyphenation dictionary, and the static export
              ships lang="es" on <html> for every route, so it has to be set
              here. Hyphens are the sanctioned fallback (Phase 6): the longest
              name, HIDRODERMOABRASIÓN, is one unbreakable 18-character word —
              fitting it whole would force caps-md down to 27px at 390 and 48px
              at 1440, far below the scale. `break-words` is the safety net for
              browsers with no dictionary for the language. */}
          <h2
            lang={lang}
            className={clsx(
              "mt-4 hyphens-auto break-words font-body text-caps-name font-extrabold uppercase leading-[0.95] tracking-caps",
              skin.heading,
            )}
          >
            {nombre}
          </h2>

          <p className={clsx("mt-5 max-w-prose text-lg leading-relaxed", skin.body)}>
            {treatment.descripcion[lang]}
          </p>

          {chips.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className={clsx(
                    "inline-flex min-h-11 items-center rounded-full border px-4 text-label font-bold uppercase tracking-label",
                    skin.rule,
                    skin.body,
                  )}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {list && (
            <div className={clsx("mt-6 border-t pt-5", skin.rule)}>
              <p className={clsx("text-eyebrow font-bold uppercase tracking-eyebrow", skin.accent)}>
                {list.heading}
              </p>
              <ul
                className={clsx(
                  "mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2",
                  skin.body,
                )}
              >
                {list.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7">
            <ButtonLink
              href={`${localizedPath("/contacto", lang)}?servicio=${categorySlug}`}
              variant={skin.theme === "sand" ? "noir" : "cream"}
            >
              {t.cta} <span aria-hidden>&nbsp;↗</span>
            </ButtonLink>
          </div>
        </div>
        <figure
          className={clsx(
            // Capped so a tall frame can't push the sheet past one window.
            "group relative aspect-[4/3] max-h-[60svh] overflow-hidden border md:aspect-[4/5]",
            skin.frame,
            imageRight ? "md:order-2" : "md:order-1",
          )}
        >
          <Image
            src={treatment.img}
            alt={nombre}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <video
            src={treatment.video}
            poster={treatment.img}
            aria-hidden
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
          />
        </figure>
      </div>
    </Sheet>
  );
}
