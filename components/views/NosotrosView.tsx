import Image from "next/image";
import clsx from "clsx";
import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { TalkSheet } from "@/components/TalkSheet";
import { getDictionary, type Lang } from "@/lib/i18n";

/* TODO: client copy — the team card bodies and the collage images are
   placeholders until the clinic provides real text and photography. */

/** Decorative collage. Real photography replaces these (images-assets §9). */
const swatches = [
  "/images/facials/img2.svg",
  "/images/massages/img3.svg",
  "/images/specials/img1.svg",
  "/images/facials/img5.svg",
];

const cardSkins = [
  "bg-crimson text-cream",
  "bg-sand text-noir",
  "bg-crimson-light text-cream",
];

export function NosotrosView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).nosotros;
  const [titleStart, titleAccent, titleEnd] = t.titleParts;
  const [stmtStart, stmtAccent, stmtEnd] = t.teamStatementParts;

  return (
    <SheetStack>
      {/* Height comes from content plus padding — no viewport fractions
          anywhere on this page (closes D9's open item). */}
      <Sheet theme="noir" className="py-24">
        <p className="text-xs uppercase tracking-eyebrow text-sand">
          {t.eyebrow}
        </p>
        <h1 className="mt-6 font-body text-caps-lg font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
          <span className="block">{titleStart}</span>
          <span className="block font-display text-[1.04em] italic normal-case tracking-normal text-crimson-bright">
            {titleAccent}
          </span>
          <span className="block">{titleEnd}</span>
        </h1>
        <p className="mt-8 max-w-prose text-lg leading-relaxed text-sand">
          {t.intro}
        </p>
      </Sheet>

      <Sheet
        theme="crimson"
        className="bg-gradient-to-b from-crimson-light via-crimson to-crimson-light py-24 text-center"
      >
        <p className="text-xs uppercase tracking-eyebrow text-crimson-bright">
          {t.philosophyTitle}
        </p>

        <h2 className="mx-auto mt-10 max-w-prose font-display text-2xl italic text-cream">
          {t.philosophyHead1}
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-lg leading-relaxed text-cream">
          {t.philosophy1}
        </p>

        <p className="mt-14 break-words font-body text-caps-lg font-extrabold uppercase leading-none tracking-caps text-cream">
          {t.philosophyWords[0]}
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map((src) => (
            <div
              key={src}
              className="relative aspect-[3/2] overflow-hidden border border-cream/20"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 640px) 20vw, 45vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <p className="mt-10 break-words font-body text-caps-lg font-extrabold uppercase leading-none tracking-caps text-cream">
          {t.philosophyWords[1]}
        </p>

        <h2 className="mx-auto mt-14 max-w-prose font-display text-2xl italic text-cream">
          {t.philosophyHead2}
        </h2>
        <p className="mx-auto mt-4 max-w-prose text-lg leading-relaxed text-cream">
          {t.philosophy2}
        </p>
      </Sheet>

      <Sheet theme="surface" className="py-24">
        <p className="text-xs uppercase tracking-eyebrow text-sand">
          {t.teamTitle}
        </p>

        <h2 className="mt-6 max-w-[22ch] font-body text-caps-sm font-extrabold uppercase leading-[0.98] tracking-caps text-cream">
          {stmtStart}{" "}
          <span className="font-display text-[1.04em] italic normal-case tracking-normal text-sand">
            {stmtAccent}
          </span>{" "}
          {stmtEnd}
        </h2>

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {t.teamCards.map((card, i) => (
            <li
              key={card.title}
              className={clsx(
                "flex min-h-64 flex-col justify-between gap-6 p-6",
                cardSkins[i],
              )}
            >
              <h3 className="font-body text-caps-sm font-extrabold uppercase leading-none tracking-caps">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed">{card.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-sand">{t.teamNote}</p>
      </Sheet>

      <TalkSheet lang={lang} />
    </SheetStack>
  );
}
