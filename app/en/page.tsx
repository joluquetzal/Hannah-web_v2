import { HomeView } from "@/components/views/HomeView";
import { buildMetadata } from "@/lib/i18n/metadata";

export const metadata = buildMetadata("en", "home", "/");

export default function HomePageEn() {
  return <HomeView lang="en" />;
}
