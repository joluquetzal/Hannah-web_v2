import { site } from "@/lib/site";

export function ClinicInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl italic text-cream">Visítanos</h2>
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
            Teléfono
          </dt>
          <dd className="mt-1">
            <a href={site.phoneHref} className="text-sand hover:text-cream">
              {site.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.2em] text-muted">
            Horario
          </dt>
          <dd className="mt-1 text-sand">{site.hours}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.2em] text-muted">
            WhatsApp
          </dt>
          <dd className="mt-1">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sand hover:text-cream"
            >
              Escríbenos
            </a>
          </dd>
        </div>
      </dl>

      {site.mapEmbedUrl ? (
        <iframe
          src={site.mapEmbedUrl}
          title="Ubicación de HannaH en el mapa"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-[4/3] w-full border border-crimson-light"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full items-center justify-center border border-dashed border-crimson-light text-sm text-muted">
          Mapa pendiente
        </div>
      )}
    </div>
  );
}
