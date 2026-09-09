import { CategoryView } from "@/components/views/CategoryView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "especiales", "/servicios/especiales");

export default function EspecialesPageEn() {
  return <CategoryView lang="en" category="especiales" />;
}
