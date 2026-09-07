import { NosotrosView } from "@/components/views/NosotrosView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "nosotros", "/nosotros");

export default function NosotrosPage() {
  return <NosotrosView lang="es" />;
}
