import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-crimson-light bg-noir">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl italic text-cream">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="text-cream">Contacto</p>
          <ul className="mt-3 space-y-1 text-muted">
            <li>
              <a href={site.phoneHref} className="hover:text-sand">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="hover:text-sand">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sand"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-cream">Visítanos</p>
          <address className="mt-3 space-y-1 not-italic text-muted">
            <p>
              {site.address.street}, {site.address.neighborhood}
            </p>
            <p>
              {site.address.city}, {site.address.state}{" "}
              {site.address.postalCode}
            </p>
            <p>{site.hours}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-crimson-light">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <Link href="/contacto" className="hover:text-sand">
            Contáctanos
          </Link>
        </div>
      </div>
    </footer>
  );
}
