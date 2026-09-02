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
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-40">
      <header className="max-w-2xl">
        <h1 className="font-display text-4xl italic text-cream sm:text-5xl">
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
