import { LegalPageView } from "@/components/views/LegalPageView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "terminos", "/terminos");

export default function TerminosPage() {
  return <LegalPageView lang="es" doc="terms" />;
}
