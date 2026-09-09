import { ContactForm } from "@/components/ContactForm";
import { ClinicInfo } from "@/components/ClinicInfo";
import { getDictionary, type Lang } from "@/lib/i18n";

export function ContactoView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).contacto;

  return (
    <div className="mx-auto max-w-shell px-gutter pb-section-b pt-top-clear">
      <header className="max-w-prose">
        <h1 className="font-display text-display-md italic text-cream">
          {t.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-sand">{t.lead}</p>
      </header>

      <div className="mt-14 grid gap-14 md:grid-cols-[1.4fr_1fr]">
        <ContactForm lang={lang} />
        <ClinicInfo lang={lang} />
      </div>
    </div>
  );
}
