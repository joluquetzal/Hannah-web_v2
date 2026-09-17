import Image from "next/image";
import clsx from "clsx";
import { Sheet } from "@/components/Sheet";
import { SheetStack } from "@/components/SheetStack";
import { TalkSheet } from "@/components/TalkSheet";
import { Reveal } from "@/components/Reveal";
import { getDictionary, type Lang } from "@/lib/i18n";

/* TODO: client copy — the team card bodies and the collage images are
   placeholders until the clinic provides real text and photography. */

/** Decorative collage. Real photography replaces these (images-assets §9). */
const swatches = [
  { src: "/images/facials/img2.webp", at: "left-[6%] top-[18%]" },
  { src: "/images/massages/img3.webp", at: "right-[5%] top-[38%]" },
  { src: "/images/specials/img1.webp", at: "bottom-[22%] left-[2%]" },
  { src: "/images/facials/img5.webp", at: "bottom-[6%] right-[10%]" },
];

const cardSkins = [
  "bg-crimson text-cream",
  "bg-sand text-noir",
  "bg-crimson-light text-cream",
];

const bigWord =
  "break-words font-body text-caps-word font-extrabold uppercase leading-none tracking-caps text-cream";

export function NosotrosView({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).nosotros;
  const [titleStart, titleAccent, titleEnd] = t.titleParts;
  const [stmtStart, stmtAccent, stmtEnd] = t.teamStatementParts;

  return (
    <SheetStack>
      {/* Content height — no viewport fractions anywhere on this page. */}
      <Sheet
        theme="noir"
        className="pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(3rem,8vw,7rem)]"
      >
        <p className="mb-5 text-eyebrow font-bold uppercase tracking-eyebrow text-sand">
          {t.eyebrow}
        </p>
        {/* F1: the mockup's rendered size — one inline heading, accent inline,
            no forced line breaks. */}
        <h1 className="max-w-[62rem] font-body text-caps-about font-extrabold uppercase leading-[0.9] tracking-caps text-cream">
          {titleStart}{" "}
          <span className="font-display text-[1.04em] font-normal italic normal-case leading-[0.8] tracking-normal text-crimson-bright">
            {titleAccent}
          </span>{" "}
          {titleEnd}
        </h1>
        <p className="mt-8 max-w-prose text-lg leading-relaxed text-cream">
          {t.intro}
        </p>
      </Sheet>

      <Sheet
        theme="crimson"
        className="bg-[linear-gradient(160deg,theme(colors.clay)_0%,theme(colors.crimson.DEFAULT)_45%,theme(colors.crimson.light)_100%)] pb-[clamp(3rem,8vw,6rem)] pt-8 text-center"
      >
        <h2 className="text-eyebrow font-bold uppercase tracking-eyebrow text-crimson-bright">
          {t.philosophyTitle}
        </h2>

        <div className="mx-auto mt-4 max-w-[40rem]">
          <h3 className="mb-[0.4rem] font-body text-caption font-extrabold uppercase tracking-caption text-cream">
            {t.philosophyHead1}
          </h3>
          <p className="text-base leading-[1.6] text-cream/85">{t.philosophy1}</p>
        </div>

        {/* Collage: the two big words sit above a centre image pulled up and
            down so they overlap it, with four swatches floating over the lot. */}
        <div className="relative mx-auto my-[clamp(1.5rem,4vw,3rem)] grid max-w-[72rem] place-items-center py-[clamp(1rem,3vw,2rem)]">
          <Reveal className="relative z-[3]">
            <p className={bigWord}>{t.philosophyWords[0]}</p>
          </Reveal>

          <div
            data-collage-center
            className="relative z-[2] my-[-4vw] aspect-[16/10] w-[min(62%,34rem)] overflow-hidden rounded"
          >
            <Image
              src="/images/facials/img4.webp"
              alt=""
              fill
              sizes="(min-width: 56rem) 34rem, 62vw"
              className="object-cover"
            />
          </div>

          <Reveal className="relative z-[3]">
            <p className={bigWord}>{t.philosophyWords[1]}</p>
          </Reveal>

          {swatches.map((s) => (
            <div
              key={s.src}
              className={clsx(
                "absolute z-[4] aspect-[3/2] w-[clamp(56px,11vw,150px)] overflow-hidden rounded-[3px]",
                s.at,
              )}
            >
              <Image
                src={s.src}
                alt=""
                fill
                sizes="(min-width: 56rem) 150px, 11vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mx-auto mt-4 max-w-[40rem]">
          <h3 className="mb-[0.4rem] font-body text-caption font-extrabold uppercase tracking-caption text-cream">
            {t.philosophyHead2}
          </h3>
          <p className="text-base leading-[1.6] text-cream/85">{t.philosophy2}</p>
        </div>
      </Sheet>

      <Sheet theme="surface" className="py-[clamp(4rem,9vw,7rem)]">
        <h2 className="text-eyebrow font-bold uppercase tracking-eyebrow text-sand">
          {t.teamTitle}
        </h2>

        <p className="mb-10 mt-5 max-w-[22ch] font-body text-caps-statement font-extrabold uppercase leading-[0.98] tracking-caps text-cream">
          {stmtStart}{" "}
          <span className="font-display text-[1.04em] font-normal italic normal-case leading-[0.8] tracking-normal text-sand">
            {stmtAccent}
          </span>{" "}
          {stmtEnd}
        </p>

        <Reveal>
          <ul className="grid gap-3 sm:grid-cols-3">
            {t.teamCards.map((card, i) => (
              <li
                key={card.title}
                className={clsx(
                  "flex min-h-[clamp(260px,30vw,380px)] flex-col justify-between gap-6 rounded-md p-[clamp(1.25rem,3vw,2rem)]",
                  cardSkins[i],
                )}
              >
                <span aria-hidden className="font-display text-5xl leading-[0.6]">
                  &ldquo;
                </span>
                <h3 className="font-body text-caps-card font-extrabold uppercase leading-none tracking-caps">
                  {card.title}
                </h3>
                <p className="text-list leading-[1.55]">{card.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-8 text-sm text-sand">{t.teamNote}</p>
      </Sheet>

      <TalkSheet lang={lang} />
    </SheetStack>
  );
}
