import { LegalPageView } from "@/components/views/LegalPageView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "terminos", "/terminos");

export default function TermsPage() {
  return <LegalPageView lang="en" doc="terms" />;
}
