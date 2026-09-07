import { es } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/es";
import type { Lang } from "./config";

const dictionaries = { es, en } as const;

/** The full string table for a locale. Safe in server and client components. */
export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang] as Dictionary;
}

export type { Dictionary };
export * from "./config";
