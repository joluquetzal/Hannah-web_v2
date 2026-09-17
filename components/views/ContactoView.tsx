import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { ContactForm } from "@/components/ContactForm";
import { ClinicInfo } from "@/components/ClinicInfo";
import { site } from "@/lib/site";
import { getDictionary, type Lang } from "@/lib/i18n";

/** One of the two boxed quick links beside the form. */
function QuickLink({
  label,
  value,
  href,
  external = false,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "flex min-h-14 items-center justify-between gap-4 rounded border border-sand/30 px-4 transition-colors hover:border-sand";
  const inner = (
    <>
      <span className="min-w-0">
        <span className="block text-micro font-bold uppercase tracking-label text-sand">
          {label}
        </span>
        <span className="block truncate text-base font-bold tracking-num text-cream">
          {value}
        </span>
      </span>
      <span aria-hidden className="text-sand">
        &#8599;
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <a href={href} className={className}>
      {inner}
    </a>
  );
}

export function ContactoView({ lang }: { lang: Lang }) {
  const d = getDictionary(lang);
  const t = d.contacto;

  return (
    <SheetStack>
      {/* `static`: nothing is allowed to slide over a form being filled in. */}
      <Sheet
        theme="noir"
        static
        className="pb-[clamp(3rem,7vw,6rem)] pt-[clamp(2.5rem,7vw,5rem)]"
      >
        <div className="grid gap-[clamp(2rem,5vw,4rem)] wide:grid-cols-[0.9fr_1.1fr]">
          {/* container-type makes 100cqi this column, which caps the heading.
              At a flat 160px in a 501px column it spilled over the form (bug #3). */}
          <div className="[container-type:inline-size] min-w-0 wide:sticky wide:top-[calc(var(--header-h)+2rem)] wide:self-start">
            <p className="mb-2 font-display text-2xl italic text-crimson-bright">
              {t.title}
            </p>
            <h1 className="font-body text-[min(theme(fontSize.caps-contact),calc(100cqi/6.6))] font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
              {t.heading}
            </h1>
            <p className="mb-8 mt-6 max-w-prose text-lg leading-relaxed text-sand">
              {t.lead}
            </p>

            <div className="grid max-w-[26rem] gap-2">
              <QuickLink
                label={d.clinic.whatsapp}
                value={d.clinic.whatsappCta}
                href={site.whatsapp}
                external
              />
              <QuickLink
                label={d.clinic.phone}
                value={site.phone}
                href={site.phoneHref}
              />
            </div>
          </div>

          <div className="min-w-0 rounded-md bg-crimson-light p-[clamp(1.25rem,3.5vw,2.5rem)]">
            <h2 className="mb-6 font-body text-caps-form font-extrabold uppercase leading-none tracking-caps text-cream">
              {t.formTitle}
            </h2>
            <ContactForm lang={lang} />
          </div>
        </div>
      </Sheet>

      <Sheet theme="surface" className="py-[clamp(3rem,7vw,6rem)]">
        <ClinicInfo lang={lang} />
      </Sheet>
    </SheetStack>
  );
}
