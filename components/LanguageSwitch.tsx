"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { getDictionary, localizedPath, stripLocale } from "@/lib/i18n";

/** ES / EN toggle. Links to the same page in the other language. */
export function LanguageSwitch({ className }: { className?: string }) {
  const { lang, rest } = stripLocale(usePathname() || "/");
  const t = getDictionary(lang).langSwitch;

  const item = (target: "es" | "en", label: string, title: string) => (
    <Link
      href={localizedPath(rest, target)}
      hrefLang={target}
      aria-current={lang === target ? "true" : undefined}
      title={title}
      className={clsx(
        "px-2 py-1.5 transition-colors",
        lang === target ? "text-cream" : "text-muted hover:text-sand",
      )}
    >
      {label}
    </Link>
  );

  return (
    <div
      aria-label={t.label}
      className={clsx(
        "flex items-center text-xs uppercase tracking-label",
        className,
      )}
    >
      {item("es", t.es, t.toEs)}
      <span aria-hidden className="text-muted">
        /
      </span>
      {item("en", t.en, t.toEn)}
    </div>
  );
}
