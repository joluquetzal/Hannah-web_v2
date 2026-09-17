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
      {/* Content height with the mockup's hero padding; `min-h-window` stays
          only as a floor, so a short viewport still gets a full-screen hero. */}
      <Sheet
        theme="noir"
        variant="window"
        align="start"
        className="pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(4rem,12vw,10rem)]"
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
            {/* The mockup's scrim: light through the middle so the photograph
                reads, solid at the foot so the meta block stays legible.
                Contrast for cream at the lead's position is measured, not
                assumed — see the Phase 13.6 log. */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_10_10/0.35)_0%,rgb(14_10_10/0.10)_40%,rgb(14_10_10/0.85)_100%)]" />
          </>
        }
      >
        <HeroReveal>
          <p
            data-reveal
            className="mb-[clamp(1.5rem,4vw,3rem)] text-eyebrow font-bold uppercase leading-normal tracking-eyebrow text-cream"
          >
            {t.site.tagline}
          </p>

          {/* F6: one flowing heading with the accent inline, balanced rather
              than broken into fixed lines. At 1440 this breaks
              "EL CUIDADO / de tu piel, COMO / UN RITUAL". */}
          <h1
            data-reveal
            className="max-w-[68rem] text-balance font-body text-caps-hero font-extrabold uppercase leading-[0.9] tracking-caps text-cream"
          >
            {titleStart}{" "}
            {/* Cormorant's caps are optically smaller than DM Sans at the same
                size, so the accent is nudged up to match. */}
            <span className="font-display text-[1.04em] font-normal italic normal-case leading-[0.8] tracking-normal text-crimson-bright">
              {titleAccent}
            </span>{" "}
            {titleEnd}
          </h1>

          <div className="mt-[clamp(2rem,5vw,4rem)] grid items-end gap-8 md:grid-cols-[1fr_auto] md:gap-12">
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
                  arrow
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
              className="text-arrow font-bold uppercase leading-[1.9] tracking-hero text-cream md:text-right"
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
