import { Sheet } from "@/components/Sheet";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

/** Closing "¿Hablamos?" sheet, shared by /servicios, the category pages and /nosotros. */
export function TalkSheet({ lang }: { lang: Lang }) {
  const d = getDictionary(lang);
  const t = d.talk;

  return (
    <Sheet theme="crimson" className="py-[clamp(4rem,10vw,8rem)]">
      <p className="text-eyebrow font-bold uppercase tracking-eyebrow text-crimson-bright">
        {d.contacto.title}
      </p>

      <h2 className="mb-6 mt-4 max-w-[16ch] font-body text-caps-talk font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
        {t.title}
      </h2>

      <p className="max-w-prose text-lg leading-relaxed text-cream">{t.body}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink
          href={localizedPath("/contacto", lang)}
          variant="cream"
          arrow
        >
          {t.cta}
        </ButtonLink>
        <ButtonLink href={site.whatsapp} variant="ghost" external>
          {d.clinic.whatsapp}
        </ButtonLink>
      </div>
    </Sheet>
  );
}
