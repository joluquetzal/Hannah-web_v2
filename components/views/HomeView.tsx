import Image from "next/image";
import { HeroReveal } from "@/components/HeroReveal";
import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

export function HomeView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);
  const [titleStart, titleAccent, titleEnd] = t.home.titleParts;

  return (
    <SheetStack>
      <Sheet
        theme="noir"
        variant="window"
        align="start"
        className="pt-20 md:pt-28"
        backdrop={
          <>
            <Image
              src="/images/hero.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* The photo can be replaced at any time, so the scrim is sized for
                the worst case (a bright image): at 75% noir, cream still clears
                6.9:1 and the bottom fades to solid noir for the meta block. */}
            <div className="absolute inset-0 bg-gradient-to-b from-noir/75 via-noir/65 to-noir" />
          </>
        }
      >
        <HeroReveal>
          <p
            data-reveal
            className="text-eyebrow font-bold uppercase tracking-eyebrow text-cream"
          >
            {t.site.tagline}
          </p>

          {/* One part per line. The three parts are authored as three lines,
              and fixing the line count here means the fallback font and the
              real font produce the same box — letting it wrap freely cost
              0.13 CLS at 390px, where it reflowed from four lines to three. */}
          <h1
            data-reveal
            className="mt-6 font-body text-caps-hero font-extrabold uppercase leading-[0.9] tracking-caps text-cream"
          >
            <span className="block">{titleStart}</span>
            {/* Cormorant's caps are optically smaller than DM Sans at the same
                size, so the accent is nudged up to match. */}
            <span className="block font-display text-[1.04em] font-normal italic normal-case leading-[0.8] tracking-normal text-crimson-bright">
              {titleAccent}
            </span>
            <span className="block">{titleEnd}</span>
          </h1>

          <div className="mt-8 grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <p
                data-reveal
                className="max-w-prose text-lg leading-relaxed text-cream"
              >
                {t.home.lead}
              </p>
              <div data-reveal className="mt-7 flex flex-wrap gap-3">
                <ButtonLink
                  href={localizedPath("/servicios", lang)}
                  variant="cream"
                >
                  {t.home.ctaServices}
                </ButtonLink>
                <ButtonLink
                  href={localizedPath("/contacto", lang)}
                  variant="ghost"
                >
                  {t.home.ctaContact}
                </ButtonLink>
              </div>
            </div>

            <p
              data-reveal
              className="text-arrow font-bold uppercase leading-[1.9] tracking-hero text-sand md:text-right"
            >
              {site.address.street} · {site.address.neighborhood},{" "}
              {site.address.state}
              <br />
              {t.clinic.hoursShort}
            </p>
          </div>
        </HeroReveal>
      </Sheet>
    </SheetStack>
  );
}
