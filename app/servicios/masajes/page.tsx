import type { Metadata } from "next";
import { TreatmentRow } from "@/components/TreatmentRow";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { masajes } from "@/data/masajes";
import { backdrop } from "@/lib/backdrop";

export const metadata: Metadata = {
  title: "Masajes",
  description:
    "Masajes en HannaH: relajante, piedras calientes, deportivo y modelador.",
  alternates: { canonical: "/servicios/masajes" },
};

export default function MasajesPage() {
  return (
    <>
      <ScrollBackdrop />

      <div className="mx-auto max-w-shell px-gutter pb-section-b pt-top-clear">
        <header data-bg={backdrop.noir} className="max-w-prose">
          <h1 className="font-display text-display-md italic text-cream">
            Masajes
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-sand">
            Cuatro masajes para relajar el cuerpo, aliviar la tensión muscular y
            renovar la energía.
          </p>
        </header>

        <div className="mt-16 space-y-20 md:space-y-28">
          {masajes.map((treatment, index) => (
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
