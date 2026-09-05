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
      <Image
        src="/images/hero.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-noir/50 via-noir/40 to-noir" />

      <HeroReveal>
        <div className="relative mx-auto w-full max-w-4xl px-6">
          <p
            data-reveal
            className="text-xs uppercase tracking-[0.3em] text-muted"
          >
            {site.tagline}
          </p>
          <h1
            data-reveal
            className="mt-6 font-display text-5xl italic leading-[1.05] text-cream sm:text-7xl"
          >
            El cuidado de tu piel, como un ritual
          </h1>
          <p
            data-reveal
            className="mt-6 max-w-xl leading-relaxed text-sand"
          >
            Faciales, masajes y tratamientos estéticos en un espacio pensado para
            detenerte, respirar y volver a ti.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/servicios">Ver servicios</ButtonLink>
            <ButtonLink href="/contacto" variant="ghost">
              Contacto
            </ButtonLink>
          </div>
        </div>
      </HeroReveal>
    </section>
  );
}
