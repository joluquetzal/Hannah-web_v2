import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Faciales",
  description:
    "Tratamientos faciales en HannaH: hidratante, anti acné, hidrodermoabrasión, Facial HannaH, rejuvenecedor y microdermoabrasión.",
};

export default function FacialesPage() {
  return <PagePlaceholder title="Faciales" phase="Fase 2" />;
}
