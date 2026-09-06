import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ClinicInfo } from "@/components/ClinicInfo";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con HannaH. Escríbenos y te respondemos pronto. Dirección, teléfono, horarios y WhatsApp.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="px-gutter pb-section-b pt-top-clear">
      <header className="max-w-prose">
        <h1 className="font-display text-display-md italic text-cream">
          Contacto
        </h1>
        <p className="mt-4 leading-relaxed text-sand">
          Déjanos un mensaje con tus datos y te respondemos lo antes posible.
        </p>
      </header>

      <div className="mt-14 grid gap-14 md:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <ClinicInfo />
      </div>
    </div>
  );
}
