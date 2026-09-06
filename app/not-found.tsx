import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-gutter py-top-clear text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-sand">Error 404</p>
      <h1 className="mt-6 font-display text-display-md italic text-cream">
        Esta página no existe
      </h1>
      <p className="mt-4 leading-relaxed text-sand">
        Puede que el enlace esté roto o que la página se haya movido.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/servicios" variant="ghost">
          Ver servicios
        </ButtonLink>
      </div>
    </section>
  );
}
