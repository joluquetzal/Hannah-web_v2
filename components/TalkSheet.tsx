import { Sheet } from "@/components/Sheet";
import { ButtonLink } from "@/components/ButtonLink";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

/** Closing "¿Hablamos?" sheet, shared by /servicios, the category pages and /nosotros. */
export function TalkSheet({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).talk;

  return (
    <Sheet theme="crimson" className="py-24">
      <h2 className="max-w-[16ch] font-body text-caps-talk font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
        {t.title}
      </h2>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-cream">
        {t.body}
      </p>
      <div className="mt-8">
        <ButtonLink href={localizedPath("/contacto", lang)} variant="cream">
          {t.cta}
        </ButtonLink>
      </div>
    </Sheet>
  );
}
