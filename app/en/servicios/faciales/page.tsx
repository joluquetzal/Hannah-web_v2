import { CategoryView } from "@/components/views/CategoryView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "faciales", "/servicios/faciales");

export default function FacialesPageEn() {
  return <CategoryView lang="en" category="faciales" />;
}
