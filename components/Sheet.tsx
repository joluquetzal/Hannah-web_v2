import clsx from "clsx";

export type SheetTheme =
  | "noir"
  | "surface"
  | "crimson"
  | "crimson-light"
  | "sand";

/**
 * Ground + default text colour per theme. `muted` never appears here: it only
 * clears AA on noir (layout-responsive §8), so sheets use sand, cream or noir.
 */
const themeClass: Record<SheetTheme, string> = {
  noir: "bg-noir text-sand",
  surface: "bg-surface text-sand",
  crimson: "bg-crimson text-cream",
  "crimson-light": "bg-crimson-light text-cream",
  sand: "bg-sand text-noir",
};

/**
 * One full-bleed colour sheet in the scroll stack.
 *
 * Sheets are plain sections in normal flow. `SheetStack` turns on sticky
 * positioning after mount, so with JS off nothing is ever pinned or covered.
 */
export function Sheet({
  theme = "noir",
  variant = "content",
  static: isStatic = false,
  crumb,
  id,
  className,
  children,
}: {
  theme?: SheetTheme;
  /** `window` fills the space below the header; `content` sizes to its content. */
  variant?: "content" | "window";
  /** Never sticky, never covered — used by the contact form. */
  static?: boolean;
  /** Label this sheet contributes to the live breadcrumb while it is in view. */
  crumb?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-sheet
      data-crumb={crumb}
      data-static={isStatic ? "" : undefined}
      className={clsx(
        "relative isolate overflow-hidden py-16",
        // The first sheet has nothing above it to lift away from.
        "rounded-t-sheet shadow-sheet first:rounded-none first:shadow-none",
        themeClass[theme],
        variant === "window" && "flex min-h-window items-center",
        className,
      )}
    >
      {/* Darkens as the next sheet rises over this one. */}
      <div
        data-sheet-shade
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0"
      />
      <div data-sheet-inner className="relative z-10 w-full origin-top">
        <div className="mx-auto w-full max-w-shell px-gutter">{children}</div>
      </div>
    </section>
  );
}
