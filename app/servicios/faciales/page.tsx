import type { Metadata } from "next";
import { TreatmentRow } from "@/components/TreatmentRow";
import { faciales } from "@/data/faciales";

export const metadata: Metadata = {
  title: "Faciales",
  description:
    "Tratamientos faciales en HannaH: hidratante, anti acné, hidrodermoabrasión, Facial HannaH, rejuvenecedor y microdermoabrasión.",
  alternates: { canonical: "/servicios/faciales" },
};

export default function FacialesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-40">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl italic text-cream sm:text-5xl">
          Faciales
        </h1>
        <p className="mt-4 leading-relaxed text-sand">
          Seis faciales para hidratar, equilibrar y rejuvenecer según tu tipo de
          piel.
        </p>
      </header>

      <div className="mt-16 space-y-20 md:space-y-28">
        {faciales.map((treatment, index) => (
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
