import { NosotrosView } from "@/components/views/NosotrosView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "nosotros", "/nosotros");

export default function NosotrosPageEn() {
  return <NosotrosView lang="en" />;
}
