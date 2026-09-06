import type { Metadata } from "next";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { ButtonLink } from "@/components/ButtonLink";
import { backdrop } from "@/lib/backdrop";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce HannaH: nuestra filosofía, el equipo y la forma en que cuidamos tu piel.",
  alternates: { canonical: "/nosotros" },
};

/* TODO: reemplazar todo el texto de esta página con el copy real del cliente. */
export default function NosotrosPage() {
  return (
    <>
      <ScrollBackdrop />

      <article className="px-gutter pb-section-b-lg pt-top-clear">
        <section
          data-bg={backdrop.noir}
          className="mx-auto flex min-h-[70vh] max-w-prose flex-col justify-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted">
            Nosotros
          </p>
          <h1 className="mt-6 font-display text-display-md italic text-cream">
            Un espacio para el cuidado, sin prisa
          </h1>
          <p className="mt-6 leading-relaxed text-sand">
            HannaH es una clínica de belleza y estética en México. Combinamos
            aparatología, cosmética profesional y un trato cercano para cuidar la
            piel y el bienestar de cada persona que nos visita.
          </p>
        </section>

        <section
          data-bg={backdrop.crimsonLight}
          className="mx-auto flex min-h-[70vh] max-w-prose flex-col justify-center"
        >
          <h2 className="font-display text-display-sm italic text-cream">
            Filosofía
          </h2>
          <p className="mt-6 leading-relaxed text-sand">
            Creemos en los resultados que se construyen con constancia y en
            tratamientos diseñados para cada tipo de piel. Nada de fórmulas
            genéricas: primero escuchamos, después proponemos.
          </p>
          <p className="mt-4 leading-relaxed text-sand">
            Cada sesión es también una pausa. Un momento para bajar el ritmo y
            reconectar con una misma.
          </p>
        </section>

        <section
          data-bg={backdrop.noir}
          className="mx-auto flex min-h-[70vh] max-w-prose flex-col justify-center"
        >
          <h2 className="font-display text-display-sm italic text-cream">
            Equipo
          </h2>
          <p className="mt-6 leading-relaxed text-sand">
            Un equipo de especialistas en estética facial y corporal, en
            formación continua para ofrecer técnicas actuales y seguras.
          </p>
          <p className="mt-4 text-sm text-muted">
            (Perfiles del equipo pendientes de contenido del cliente.)
          </p>
        </section>

        <section className="mx-auto flex min-h-[50vh] max-w-prose flex-col justify-center border-t border-crimson-light pt-16">
          <h2 className="font-display text-display-sm italic text-cream">
            ¿Hablamos?
          </h2>
          <p className="mt-4 leading-relaxed text-sand">
            Cuéntanos qué necesitas y te respondemos pronto.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contacto">Contáctanos</ButtonLink>
          </div>
        </section>
      </article>
    </>
  );
}
