import { LegalPageView } from "@/components/views/LegalPageView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata(
  "en",
  "avisoPrivacidad",
  "/aviso-de-privacidad",
);

export default function PrivacyNoticePage() {
  return <LegalPageView lang="en" doc="privacy" />;
}
