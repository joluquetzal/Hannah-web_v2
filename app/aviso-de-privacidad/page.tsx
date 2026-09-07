import { LegalPageView } from "@/components/views/LegalPageView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata(
  "es",
  "avisoPrivacidad",
  "/aviso-de-privacidad",
);

export default function AvisoPrivacidadPage() {
  return <LegalPageView lang="es" doc="privacy" />;
}
