import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Especiales",
  description:
    "Tratamientos especiales en HannaH: skin booster, hilos tensores, nanobotox y mesobotox.",
};

export default function EspecialesPage() {
  return <PagePlaceholder title="Especiales" phase="Fase 2" />;
}
