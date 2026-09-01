import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Solicita tu reservación en HannaH. Dirección, teléfono, horarios y WhatsApp.",
};

export default function ContactoPage() {
  return <PagePlaceholder title="Contacto" phase="Fase 4" />;
}
