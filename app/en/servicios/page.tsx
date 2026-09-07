import { ServiciosView } from "@/components/views/ServiciosView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "servicios", "/servicios");

export default function ServiciosPageEn() {
  return <ServiciosView lang="en" />;
}
