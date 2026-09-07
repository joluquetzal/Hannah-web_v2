import { site } from "@/lib/site";
import { getDictionary, type Lang } from "@/lib/i18n";

export function ClinicInfo({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).clinic;

  return (
    <div className="flex h-full flex-col justify-start space-y-8">
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

      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-xs uppercase tracking-[0.2em] text-muted">
            {t.phone}
          </dt>
          <dd className="mt-1">
            <a href={site.phoneHref} className="text-sand hover:text-cream">
              {site.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.2em] text-muted">
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
          <dt className="text-xs uppercase tracking-[0.2em] text-muted">
            {t.whatsapp}
          </dt>
          <dd className="mt-1">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand hover:text-cream"
            >
              {t.whatsappCta}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.2em] text-muted">
            {t.social}
          </dt>
          <dd className="mt-1 flex gap-4">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand hover:text-cream"
            >
              Instagram
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand hover:text-cream"
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
            className="mt-2 inline-block text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-sand"
          >
            {t.mapCta}
          </a>
        </div>
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-crimson-light text-sm text-muted">
          {t.mapPending}
        </div>
      )}
    </div>
  );
}
