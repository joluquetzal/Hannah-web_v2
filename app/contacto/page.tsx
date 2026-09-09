import { ContactoView } from "@/components/views/ContactoView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "contacto", "/contacto");

export default function ContactoPage() {
  return <ContactoView lang="es" />;
}
