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
        "inline-flex min-h-11 min-w-9 items-center justify-center text-paper transition-opacity",
        // The inactive locale stops short of full opacity on hover, so the
        // active one stays the brightest thing in the group.
        lang === target ? "opacity-100" : "opacity-45 hover:opacity-75",
      )}
    >
      {label}
    </Link>
  );

  return (
    <div
      aria-label={t.label}
      className={clsx("flex items-center font-grotesk text-sm", className)}
    >
      {item("es", t.es, t.toEs)}
      <span aria-hidden className="text-paper opacity-35">
        /
      </span>
      {item("en", t.en, t.toEn)}
    </div>
  );
}
