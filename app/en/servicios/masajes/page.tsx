import { CategoryView } from "@/components/views/CategoryView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "masajes", "/servicios/masajes");

export default function MasajesPageEn() {
  return <CategoryView lang="en" category="masajes" />;
}
