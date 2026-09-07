import { CategoryView } from "@/components/views/CategoryView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "especiales", "/servicios/especiales");

export default function EspecialesPage() {
  return <CategoryView lang="es" category="especiales" />;
}
