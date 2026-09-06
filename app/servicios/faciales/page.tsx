import type { Metadata } from "next";
import { TreatmentRow } from "@/components/TreatmentRow";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { faciales } from "@/data/faciales";
import { backdrop } from "@/lib/backdrop";

export const metadata: Metadata = {
  title: "Faciales",
  description:
    "Tratamientos faciales en HannaH: hidratante, anti acné, hidrodermoabrasión, Facial HannaH, rejuvenecedor y microdermoabrasión.",
  alternates: { canonical: "/servicios/faciales" },
};

export default function FacialesPage() {
  return (
    <>
      <ScrollBackdrop />

      <div className="px-gutter pb-section-b pt-top-clear">
        <header data-bg={backdrop.noir} className="max-w-prose">
          <h1 className="font-display text-display-md italic text-cream">
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
    </>
  );
}
