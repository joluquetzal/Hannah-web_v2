import Image from "next/image";
import { HeroReveal } from "@/components/HeroReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

export function HomeView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noir/50 via-noir/40 to-noir" />

      <HeroReveal>
        <div className="relative mx-auto grid w-full max-w-shell items-center gap-12 px-gutter md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <p
              data-reveal
              className="text-xs uppercase tracking-eyebrow text-muted-strong"
            >
              {t.site.tagline}
            </p>
            <h1
              data-reveal
              className="mt-6 font-display text-display-lg italic leading-[1.05] text-cream"
            >
              {t.home.title}
            </h1>
            <p
              data-reveal
              className="mt-6 max-w-xl text-lg leading-relaxed text-sand"
            >
              {t.home.lead}
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href={localizedPath("/servicios", lang)}>
                {t.home.ctaServices}
              </ButtonLink>
              <ButtonLink href={localizedPath("/contacto", lang)} variant="ghost">
                {t.home.ctaContact}
              </ButtonLink>
            </div>
          </div>

          <figure
            data-reveal
            className="relative hidden aspect-[4/5] overflow-hidden border border-crimson-light md:block"
          >
            <Image
              src="/images/hero.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </figure>
        </div>
      </HeroReveal>
    </section>
  );
}
