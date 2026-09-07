import { ContactoView } from "@/components/views/ContactoView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "contacto", "/contacto");

export default function ContactoPageEn() {
  return <ContactoView lang="en" />;
}
