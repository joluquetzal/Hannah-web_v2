import type { Metadata } from "next";
import { ServiceCard } from "@/components/ServiceCard";
import { servicios } from "@/data/servicios";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Faciales, masajes y tratamientos especiales en HannaH, clínica de belleza y estética.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-40">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl italic text-cream sm:text-5xl">
          Servicios
        </h1>
        <p className="mt-4 leading-relaxed text-sand">
          Tres formas de cuidar tu piel y tu bienestar. Elige una categoría para
          conocer los tratamientos.
        </p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {servicios.map((category) => (
          <ServiceCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
