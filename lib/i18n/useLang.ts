"use client";

import { usePathname } from "next/navigation";
import { getDictionary } from "./index";
import { stripLocale, type Lang } from "./config";
import type { Dictionary } from "./dictionaries/es";

/** Current locale, derived from the pathname (`/en/...` → `en`, else `es`). */
export function useLang(): Lang {
  return stripLocale(usePathname() || "/").lang;
}

/** Current locale plus its string table — for client components rendered in
 *  the shared layout (Nav, Footer) that can't take a `lang` prop. */
export function useI18n(): { lang: Lang; t: Dictionary } {
  const lang = useLang();
  return { lang, t: getDictionary(lang) };
}
