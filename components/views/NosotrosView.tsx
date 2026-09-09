import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { ButtonLink } from "@/components/ButtonLink";
import { backdrop } from "@/lib/backdrop";
import { getDictionary, localizedPath, type Lang } from "@/lib/i18n";

/* TODO: reemplazar todo el texto de esta página con el copy real del cliente. */
export function NosotrosView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).nosotros;

  return (
    <>
      <ScrollBackdrop />

      <article className="mx-auto max-w-shell px-gutter pb-section-b-lg pt-top-clear">
        <section
          data-bg={backdrop.noir}
          className="mx-auto flex min-h-[45vh] max-w-prose flex-col justify-center"
        >
          <p className="text-xs uppercase tracking-eyebrow text-muted">
            {t.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-display-md italic text-cream">
            {t.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-sand">{t.intro}</p>
        </section>

        <section
          data-bg={backdrop.crimsonLight}
          className="mx-auto flex min-h-[70vh] max-w-prose flex-col justify-center"
        >
          <h2 className="font-display text-display-sm italic text-cream">
            {t.philosophyTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-sand">
            {t.philosophy1}
          </p>
          <p className="mt-4 text-lg leading-relaxed text-sand">
            {t.philosophy2}
          </p>
        </section>

        <section
          data-bg={backdrop.noir}
          className="mx-auto flex min-h-[70vh] max-w-prose flex-col justify-center"
        >
          <h2 className="font-display text-display-sm italic text-cream">
            {t.teamTitle}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-sand">{t.team1}</p>
          <p className="mt-4 text-sm text-muted">{t.teamNote}</p>
        </section>

        <section className="mx-auto flex min-h-[50vh] max-w-prose flex-col justify-center border-t border-crimson-light pt-16">
          <h2 className="font-display text-display-sm italic text-cream">
            {t.talkTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-sand">{t.talkBody}</p>
          <div className="mt-8">
            <ButtonLink href={localizedPath("/contacto", lang)}>
              {t.talkCta}
            </ButtonLink>
          </div>
        </section>
      </article>
    </>
  );
}
