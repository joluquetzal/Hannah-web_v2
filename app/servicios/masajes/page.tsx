import type { Metadata } from "next";
import { TreatmentRow } from "@/components/TreatmentRow";
import { masajes } from "@/data/masajes";

export const metadata: Metadata = {
  title: "Masajes",
  description:
    "Masajes en HannaH: relajante, piedras calientes, deportivo y modelador.",
};

export default function MasajesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-40">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl italic text-cream sm:text-5xl">
          Masajes
        </h1>
        <p className="mt-4 leading-relaxed text-sand">
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
  );
}
