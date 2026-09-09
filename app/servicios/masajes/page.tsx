import { CategoryView } from "@/components/views/CategoryView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "masajes", "/servicios/masajes");

export default function MasajesPage() {
  return <CategoryView lang="es" category="masajes" />;
}
