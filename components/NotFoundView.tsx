"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { localizedPath } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

export function NotFoundView() {
  const { lang, t } = useI18n();
  const nf = t.notFound;

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-gutter py-top-clear text-center">
      <p className="text-xs uppercase tracking-eyebrow text-sand">{nf.eyebrow}</p>
      <h1 className="mt-6 font-display text-display-md italic text-cream">
        {nf.title}
      </h1>
      <p className="mt-4 leading-relaxed text-sand">{nf.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink href={localizedPath("/", lang)}>{nf.home}</ButtonLink>
        <ButtonLink href={localizedPath("/servicios", lang)} variant="ghost">
          {nf.services}
        </ButtonLink>
      </div>
    </section>
  );
}
