import Image from "next/image";
import clsx from "clsx";
import type { Treatment } from "@/data/types";
import { backdrop } from "@/lib/backdrop";
import { ButtonLink } from "@/components/ButtonLink";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

/**
 * Alternating image/text row. Even index: image left. Odd index: image right.
 * Hover crossfades the static image to a muted looping clip — CSS only, via
 * `group-hover`. The clip is hidden entirely under `prefers-reduced-motion`.
 */
export function TreatmentRow({
  treatment,
  index,
  lang,
}: {
  treatment: Treatment;
  index: number;
  lang: Lang;
}) {
  const imageRight = index % 2 === 1;
  const t = getDictionary(lang).treatment;
  const nombre = treatment.nombre[lang];

  return (
    <article
      data-bg={imageRight ? backdrop.crimsonLight : backdrop.noir}
      className={clsx(
        "grid items-center gap-8 md:gap-14",
        // Text always gets the wider column so the image frame stays the same
        // height on both alternations — `order` alone would swap the columns.
        imageRight ? "md:grid-cols-[1.1fr_1fr]" : "md:grid-cols-[1fr_1.1fr]",
      )}
    >
      <figure
        className={clsx(
          "group relative aspect-[4/5] overflow-hidden border border-crimson-light md:aspect-[16/11]",
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

      <div className={clsx(imageRight ? "md:order-1" : "md:order-2")}>
        <div className="flex items-baseline gap-3">
          <h2 className="font-display text-display-sm italic text-cream">
            {nombre}
          </h2>
          {treatment.destacado && (
            <span className="text-crimson-bright" aria-label={t.signature}>
              ★
            </span>
          )}
        </div>

        {treatment.duracion && (
          <p className="mt-2 text-xs uppercase tracking-label text-muted">
            {treatment.duracion[lang]}
          </p>
        )}

        <p className="mt-4 text-lg leading-relaxed text-sand">
          {treatment.descripcion[lang]}
        </p>

        {treatment.incluye && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-label text-muted">
              {t.includes}
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-sand">
              {treatment.incluye[lang].map((item) => (
                <li key={item} className="border-l border-crimson-light pl-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {treatment.zonas && (
          <div className="mt-6">
            <p className="text-xs uppercase tracking-label text-muted">
              {t.zones}
            </p>
            <p className="mt-3 text-sm text-sand">
              {treatment.zonas[lang].join(" · ")}
            </p>
          </div>
        )}

        {treatment.recomendacion && (
          <p className="mt-6 text-sm text-muted">
            {t.recommendation} {treatment.recomendacion[lang]}
          </p>
        )}

        <div className="mt-8">
          <ButtonLink href={localizedPath("/contacto", lang)} variant="ghost">
            {t.cta}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
