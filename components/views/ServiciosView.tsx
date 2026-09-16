import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { ServiceColumns } from "@/components/ServiceColumns";
import { TalkSheet } from "@/components/TalkSheet";
import { getDictionary, type Lang } from "@/lib/i18n";

export function ServiciosView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);

  return (
    <SheetStack>
      {/* The hub has no visible title — the three images are the page. The
          heading and lead are still in the DOM so the heading order stays
          valid and the page announces itself. */}
      <Sheet theme="noir" variant="window" bleed>
        <h1 className="sr-only">{t.servicios.title}</h1>
        <p className="sr-only">{t.servicios.lead}</p>
        <ServiceColumns lang={lang} />
      </Sheet>

      <TalkSheet lang={lang} />
    </SheetStack>
  );
}
