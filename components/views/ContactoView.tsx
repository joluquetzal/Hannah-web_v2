import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { ContactForm } from "@/components/ContactForm";
import { ClinicInfo } from "@/components/ClinicInfo";
import { site } from "@/lib/site";
import { getDictionary, type Lang } from "@/lib/i18n";

export function ContactoView({ lang }: { lang: Lang }) {
  const d = getDictionary(lang);
  const t = d.contacto;

  return (
    <SheetStack>
      {/* `static`: nothing is allowed to slide over a form being filled in. */}
      <Sheet theme="noir" static className="py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          {/* min-w-0: the caps-lg heading's min-content width would otherwise
                blow this track out and squeeze the form column. */}
          <div className="min-w-0 md:sticky md:top-[calc(var(--header-h)+2rem)] md:self-start">
            <p className="font-display text-2xl italic text-crimson-bright">
              {t.title}
            </p>
            <h1 className="mt-4 font-body text-caps-lg font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
              {t.heading}
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-sand">
              {t.lead}
            </p>

            <div className="mt-8 flex flex-col items-start gap-2">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center border-b border-sand/40 text-lg text-cream transition-colors hover:border-cream"
              >
                {d.clinic.whatsappCta} <span aria-hidden>&nbsp;↗</span>
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex min-h-14 items-center border-b border-sand/40 text-lg text-cream transition-colors hover:border-cream"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <div className="min-w-0 bg-crimson-light p-6 md:p-8">
            <h2 className="font-display text-2xl italic text-cream">
              {t.formTitle}
            </h2>
            <div className="mt-6">
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </Sheet>

      <Sheet theme="surface" className="py-24">
        <ClinicInfo lang={lang} />
      </Sheet>
    </SheetStack>
  );
}
