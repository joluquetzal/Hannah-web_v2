import type { Metadata } from "next";
import Image from "next/image";
import { HeroReveal } from "@/components/HeroReveal";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-noir/50 via-noir/40 to-noir" />

      <HeroReveal>
        <div className="relative mx-auto grid w-full max-w-shell items-center gap-12 px-gutter md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <p
              data-reveal
              className="text-xs uppercase tracking-[0.3em] text-muted"
            >
              {site.tagline}
            </p>
            <h1
              data-reveal
              className="mt-6 font-display text-display-lg italic leading-[1.05] text-cream"
            >
              El cuidado de tu piel, como un ritual
            </h1>
            <p
              data-reveal
              className="mt-6 max-w-xl text-lg leading-relaxed text-sand"
            >
              Faciales, masajes y tratamientos estéticos en un espacio pensado
              para detenerte, respirar y volver a ti.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/servicios">Ver servicios</ButtonLink>
              <ButtonLink href="/contacto" variant="ghost">
                Contacto
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
