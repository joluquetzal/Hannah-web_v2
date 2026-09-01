import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Faciales, masajes y tratamientos especiales en HannaH, clínica de belleza y estética.",
};

export default function ServiciosPage() {
  return <PagePlaceholder title="Servicios" phase="Fase 2" />;
}
