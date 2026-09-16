"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { Sheet } from "@/components/Sheet";
import { localizedPath } from "@/lib/i18n";
import { useI18n } from "@/lib/i18n/useLang";

export function NotFoundView() {
  const { lang, t } = useI18n();
  const nf = t.notFound;

  return (
    <Sheet theme="noir" className="py-28">
      <div className="max-w-prose">
      <p className="text-xs uppercase tracking-eyebrow text-sand">{nf.eyebrow}</p>
      <h1 className="mt-6 break-words font-body text-caps-md font-extrabold uppercase leading-[0.95] tracking-caps text-cream">
        {nf.title}
      </h1>
      <p className="mt-4 leading-relaxed text-sand">{nf.body}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href={localizedPath("/", lang)} variant="cream">
          {nf.home}
        </ButtonLink>
        <ButtonLink href={localizedPath("/servicios", lang)} variant="ghost">
          {nf.services}
        </ButtonLink>
      </div>
      </div>
    </Sheet>
  );
}
