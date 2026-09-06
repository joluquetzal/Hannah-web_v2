import type { Metadata } from "next";
import { TreatmentRow } from "@/components/TreatmentRow";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { especiales } from "@/data/especiales";
import { backdrop } from "@/lib/backdrop";

export const metadata: Metadata = {
  title: "Especiales",
  description:
    "Tratamientos especiales en HannaH: skin booster, hilos tensores, nanobotox y mesobotox.",
  alternates: { canonical: "/servicios/especiales" },
};

export default function EspecialesPage() {
  return (
    <>
      <ScrollBackdrop />

      <div className="px-gutter pb-section-b pt-top-clear">
        <header data-bg={backdrop.noir} className="max-w-prose">
          <h1 className="font-display text-display-md italic text-cream">
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
    </>
  );
}
