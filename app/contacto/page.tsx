import type { Metadata } from "next";
import { ReservationForm } from "@/components/ReservationForm";
import { ClinicInfo } from "@/components/ClinicInfo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicita tu reservación en HannaH. Dirección, teléfono, horarios y WhatsApp.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-40">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl italic text-cream sm:text-5xl">
          Contacto
        </h1>
        <p className="mt-4 leading-relaxed text-sand">
          Déjanos tus datos y la fecha que prefieres. Te contactamos para
          confirmar tu cita.
        </p>
      </header>

      <div className="mt-14 grid gap-14 md:grid-cols-[1.4fr_1fr]">
        <ReservationForm />
        <ClinicInfo />
      </div>
    </div>
  );
}
