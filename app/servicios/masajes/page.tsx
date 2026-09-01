import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/PagePlaceholder";

export const metadata: Metadata = {
  title: "Masajes",
  description:
    "Masajes en HannaH: relajante, piedras calientes, deportivo y modelador.",
};

export default function MasajesPage() {
  return <PagePlaceholder title="Masajes" phase="Fase 2" />;
}
