import type { Metadata } from "next";
import { TreatmentRow } from "@/components/TreatmentRow";
import { especiales } from "@/data/especiales";

export const metadata: Metadata = {
  title: "Especiales",
  description:
    "Tratamientos especiales en HannaH: skin booster, hilos tensores, nanobotox y mesobotox.",
};

export default function EspecialesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-40">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl italic text-cream sm:text-5xl">
          Especiales
        </h1>
        <p className="mt-4 leading-relaxed text-sand">
          Cuatro tratamientos avanzados para hidratar en profundidad y tensar la
          piel del rostro.
        </p>
      </header>

      <div className="mt-16 space-y-20 md:space-y-28">
        {especiales.map((treatment, index) => (
          <TreatmentRow
            key={treatment.slug}
            treatment={treatment}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
