import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce HannaH: nuestra filosofía, el equipo y la forma en que cuidamos tu piel.",
};

export default function NosotrosPage() {
  return <PagePlaceholder title="Nosotros" phase="Fase 3" />;
}
