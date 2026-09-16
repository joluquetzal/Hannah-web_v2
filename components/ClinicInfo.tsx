import { site } from "@/lib/site";
import { getDictionary, type Lang } from "@/lib/i18n";

export function ClinicInfo({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).clinic;

  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.2fr] md:gap-12">
      <div>
        <h2 className="font-display text-2xl italic text-cream">{t.visitUs}</h2>
        <address className="mt-3 not-italic leading-relaxed text-sand">
          {site.address.street}
          <br />
          {site.address.neighborhood}
          <br />
          {site.address.city}, {site.address.state} {site.address.postalCode}
        </address>
      </div>

      <dl className="space-y-5 text-sm">
        <div>
          <dt className="text-label font-bold uppercase tracking-label text-sand">
            {t.phone}
          </dt>
          <dd className="mt-1">
            <a href={site.phoneHref} className="inline-flex min-h-11 items-center text-sand transition-colors hover:text-cream">
              {site.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-label font-bold uppercase tracking-label text-sand">
            {t.hours}
          </dt>
          <dd className="mt-1 space-y-0.5 text-sand">
            {t.schedule.map((row) => (
              <p key={row.days}>
                {row.days}: {row.time}
              </p>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-label font-bold uppercase tracking-label text-sand">
            {t.whatsapp}
          </dt>
          <dd className="mt-1">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sand transition-colors hover:text-cream"
            >
              {t.whatsappCta}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-label font-bold uppercase tracking-label text-sand">
            {t.social}
          </dt>
          <dd className="mt-1 flex gap-4">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sand transition-colors hover:text-cream"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sand transition-colors hover:text-cream"
            >
              Facebook
            </a>
          </dd>
        </div>
      </dl>

      {site.mapEmbedUrl ? (
        <div>
          <iframe
            src={site.mapEmbedUrl}
            title={t.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full border border-crimson-light"
          />
          <a
            href={site.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-11 items-center text-label font-bold uppercase tracking-label text-sand transition-colors hover:text-cream"
          >
            {t.mapCta}
          </a>
        </div>
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-sand/30 text-sm text-sand">
          {t.mapPending}
        </div>
      )}
    </div>
  );
}
