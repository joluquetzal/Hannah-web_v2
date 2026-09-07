"use client";

import { useI18n } from "@/lib/i18n/useLang";

export function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-crimson focus:px-4 focus:py-2 focus:text-cream"
    >
      {t.nav.skipToContent}
    </a>
  );
}
