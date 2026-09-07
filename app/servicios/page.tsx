import { ServiciosView } from "@/components/views/ServiciosView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "servicios", "/servicios");

export default function ServiciosPage() {
  return <ServiciosView lang="es" />;
}
