import { ServiceCard } from "@/components/ServiceCard";
import { ScrollBackdrop } from "@/components/ScrollBackdrop";
import { servicios } from "@/data/servicios";
import { backdrop } from "@/lib/backdrop";
import { getDictionary, type Lang } from "@/lib/i18n";

export function ServiciosView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang);

  return (
    <>
      <ScrollBackdrop />

      <div className="mx-auto max-w-shell px-gutter pb-section-b pt-top-clear">
        <header data-bg={backdrop.noir} className="max-w-prose">
          <h1 className="font-display text-display-md italic text-cream">
            {t.servicios.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-sand">
            {t.servicios.lead}
          </p>
        </header>

        <section
          data-bg={backdrop.crimsonLight}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {servicios.map((category) => (
            <ServiceCard key={category.slug} category={category} lang={lang} />
          ))}
        </section>
      </div>
    </>
  );
}
