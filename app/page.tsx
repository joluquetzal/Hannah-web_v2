import { HomeView } from "@/components/views/HomeView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("es", "home", "/");

export default function HomePage() {
  return <HomeView lang="es" />;
}
