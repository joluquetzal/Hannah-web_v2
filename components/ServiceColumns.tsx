import Image from "next/image";
import Link from "next/link";
import { servicios } from "@/data/servicios";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

/**
 * The /servicios hub: three full-height images side by side (stacked rows on
 * mobile). The warm tint clears and the description slides up on hover — and
 * identically on keyboard focus, which is the whole point of pairing
 * `group-hover` with `group-focus-visible`. CSS only, no JS (animations rule).
 */
export function ServiceColumns({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);

  return (
    <div className="grid h-full w-full grid-rows-3 sm:grid-cols-3 sm:grid-rows-1">
      {servicios.map((category, index) => {
        const cat = t.categories[category.slug];
        return (
          <Link
            key={category.slug}
            href={localizedPath(category.href, lang)}
            className="group relative isolate flex items-end overflow-hidden outline-offset-[-4px]"
          >
            <Image
              src={category.cover}
              alt=""
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover saturate-50 brightness-[0.62] transition-[transform,filter] duration-700 group-hover:scale-105 group-hover:saturate-100 group-hover:brightness-100 group-focus-visible:scale-105 group-focus-visible:saturate-100 group-focus-visible:brightness-100 motion-reduce:transition-none [@media(hover:none)]:saturate-[0.8] [@media(hover:none)]:brightness-90"
            />
            {/* Warm tint, multiplied over the photo; clears on hover/focus. */}
            <span
              aria-hidden
              className="absolute inset-0 z-10 bg-gradient-to-b from-crimson/60 via-crimson/50 to-noir/75 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none [@media(hover:none)]:opacity-35"
            />
            {/* Bottom fade so the text keeps its contrast over any photo. */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-3/5 bg-gradient-to-t from-noir/90 to-transparent"
            />

            <span className="relative z-20 w-full p-5 md:p-7">
              <span className="block text-eyebrow font-bold uppercase tracking-eyebrow text-sand">
                {String(index + 1).padStart(2, "0")} · {cat.count}
              </span>
              <span className="mt-2 block font-body text-caps-col font-extrabold uppercase leading-none tracking-caps text-cream">
                {cat.title}
              </span>

              {/* 0fr → 1fr animates a height the browser can't otherwise
                  transition to. Always open where there is no hover. */}
              <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none [@media(hover:none)]:grid-rows-[1fr]">
                <span className="flex flex-col items-start gap-2 overflow-hidden">
                  <span className="mt-3 block max-w-[30ch] text-sm leading-relaxed text-cream">
                    {cat.lead}
                  </span>
                  <span className="inline-flex min-h-11 items-center text-label font-bold uppercase tracking-label text-cream">
                    {t.nav.servicesCardCta} <span aria-hidden>&nbsp;↗</span>
                  </span>
                </span>
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
