"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n/useLang";

/**
 * The root layout renders `<html lang="es">` statically (a static export can't
 * vary it per request). On `/en/*` this corrects `document.documentElement.lang`
 * after hydration. hreflang tags in each page's metadata cover crawlers.
 */
export function SyncHtmlLang() {
  const lang = useLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
