import type { Metadata } from "next";
import { ServiceCard } from "@/components/ServiceCard";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { servicios } from "@/data/servicios";
import { backdrop } from "@/lib/backdrop";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Faciales, masajes y tratamientos especiales en HannaH, clínica de belleza y estética.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <ScrollBackdrop />

      <div className="px-gutter pb-section-b pt-top-clear">
        <header data-bg={backdrop.noir} className="max-w-prose">
          <h1 className="font-display text-display-md italic text-cream">
            Servicios
          </h1>
          <p className="mt-4 leading-relaxed text-sand">
            Tres formas de cuidar tu piel y tu bienestar. Elige una categoría para
            conocer los tratamientos.
          </p>
        </header>

        <section
          data-bg={backdrop.crimsonLight}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {servicios.map((category) => (
            <ServiceCard key={category.slug} category={category} />
          ))}
        </section>
      </div>
    </>
  );
}
