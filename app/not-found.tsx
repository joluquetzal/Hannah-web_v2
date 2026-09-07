import type { Metadata } from "next";
import { NotFoundView } from "@/components/NotFoundView";
import { getDictionary } from "@/lib/i18n";

export const metadata: Metadata = {
  title: getDictionary("es").meta.notFound.title,
};

export default function NotFound() {
  return <NotFoundView />;
}
