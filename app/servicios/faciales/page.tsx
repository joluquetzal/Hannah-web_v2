import { CategoryView } from "@/components/views/CategoryView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "faciales", "/servicios/faciales");

export default function FacialesPage() {
  return <CategoryView lang="es" category="faciales" />;
}
