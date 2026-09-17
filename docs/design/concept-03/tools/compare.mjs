#!/usr/bin/env node
/**
 * Mockup ↔ site comparison for the Concept 03 redesign.
 *
 * Renders docs/design/concept-03/prototipo.html and the running site side by
 * side, measures the same elements in both (found by their text, so no shared
 * class names are needed) and writes:
 *   <out>/report.md            one table per page × width, mismatches flagged
 *   <out>/report.json          raw numbers
 *   <out>/<page>-<w>-<n>.png   side-by-side screenshots (mockup left, site right)
 *
 * Usage (site must be running — `npm run dev` or a static server on out/):
 *   node docs/design/concept-03/tools/compare.mjs
 *   node docs/design/concept-03/tools/compare.mjs --site http://localhost:3000 --widths 1440,390 --pages servicios,faciales
 *   (--fonts-css <file> serves Google Fonts from a local CSS file when offline)
 *
 * Needs the `playwright` package and its Chromium (`npx playwright install chromium`).
 */
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => {
    if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
    return acc;
  }, []),
);
const PROTO = pathToFileURL(resolve(args.proto ?? "docs/design/concept-03/prototipo.html")).href;
const SITE = (args.site ?? "http://localhost:3000").replace(/\/$/, "");
const OUT = resolve(args.out ?? ".mockup-compare");
const WIDTHS = (args.widths ?? "1440,390").split(",").map(Number);
const HEIGHTS = { 1440: 900, 390: 844 };
const ONLY = args.pages ? args.pages.split(",") : null;
const TOL = { px: 2, pct: 0.06 }; // a size is a mismatch if it differs by more than max(2px, 6%)

// ---------------------------------------------------------------------------
// What to measure. `t` = text the element starts with (case/accents/arrows
// ignored), `exact` = whole text must match, `in` = CSS scope, `css` = selector
// used instead of text. Scopes differ between the two pages, so each side can
// override: { proto: {...}, site: {...} }.
// ---------------------------------------------------------------------------
const HEADER = [
  { name: "strip text", t: "Visítanos en Eugenia", in: "header, .site-hdr" },
  { name: "strip button", t: "Abrir en Google Maps", exact: true, in: "header, .site-hdr" },
  { name: "logo", proto: { css: ".logo" }, site: { css: "header a[aria-label] img" } },
  { name: "nav link", t: "Nosotros", exact: true, in: "header nav, .hdr-nav" },
  { name: "WhatsApp button", t: "WhatsApp", exact: true, in: "header, .site-hdr" },
  { name: "Contáctanos button", t: "Contáctanos", exact: true, in: "header, .site-hdr" },
  { name: "ES switch", t: "ES", exact: true, in: "header, .site-hdr" },
  { name: "crumb", t: "Inicio", exact: true, in: ".crumbs, header nav[aria-label] ol" },
  { name: "progress bar", proto: { css: ".hdr-progress" }, site: { css: "[data-progress], header [role=progressbar], .hdr-progress" } },
];
const TALK = [
  { name: "talk eyebrow", t: "Contacto", exact: true, proto: { in: ".talk" }, site: { in: "main section:last-of-type" } },
  { name: "talk title", t: "¿Hablamos?", exact: true, proto: { in: ".talk" }, site: { in: "main section:last-of-type" } },
  { name: "talk lead", t: "Cuéntanos qué necesitas", proto: { in: ".talk" }, site: { in: "main section:last-of-type" } },
  { name: "talk button", t: "Contáctanos", proto: { in: ".talk" }, site: { in: "main section:last-of-type" } },
  { name: "talk WhatsApp button", t: "WhatsApp", exact: true, proto: { in: ".talk" }, site: { in: "main section:last-of-type" } },
];
const FOOTER = [
  { name: "footer title", t: "¿Hablamos?", exact: true, in: "footer" },
  { name: "footer lead", t: "Cuéntanos qué necesitas", in: "footer" },
  { name: "footer button", t: "Contáctanos", in: "footer" },
  { name: "footer column heading", t: "Contacto", exact: true, in: "footer" },
  { name: "footer link", t: "+52 55 3956 0265", exact: true, in: "footer" },
  { name: "footer nav link", t: "Servicios", exact: true, in: "footer" },
  { name: "footer wordmark", proto: { css: ".wordmark" }, site: { css: "footer svg[aria-hidden] text, footer p[aria-hidden]" } },
  { name: "footer legal link", t: "Aviso de Privacidad", exact: true, in: "footer" },
];

const PAGES = {
  inicio: {
    proto: "#/", site: "/",
    roles: [
      ...HEADER.filter((r) => r.name !== "crumb"),
      { name: "hero eyebrow", t: "Clínica de belleza y estética", in: "main" },
      { name: "hero h1", css: "main h1" },
      { name: "hero h1 accent", t: "de tu piel,", in: "main h1" },
      { name: "hero lead", t: "Faciales, masajes y tratamientos", in: "main" },
      { name: "hero button", t: "Ver servicios", in: "main" },
      { name: "hero meta", t: "Eugenia 1309", in: "main" },
      ...FOOTER,
    ],
  },
  servicios: {
    proto: "#/servicios", site: "/servicios/",
    roles: [
      ...HEADER,
      { name: "column (first)", proto: { css: ".col" }, site: { css: "main a[href*='faciales']" } },
      { name: "column count", t: "01 · Seis faciales", in: "main" },
      { name: "column title", t: "Faciales", exact: true, in: "main" },
      ...TALK,
    ],
  },
  faciales: {
    proto: "#/servicios/faciales", site: "/servicios/faciales/",
    roles: [
      ...HEADER,
      { name: "intro chip (active)", t: "Faciales", exact: true, proto: { in: ".chips" }, site: { in: "main nav" } },
      { name: "intro eyebrow", t: "Servicios · 06", in: "main" },
      { name: "intro h1", css: "main h1" },
      { name: "intro lead", t: "Seis faciales para hidratar", in: "main" },
      { name: "intro scroll cue", t: "Desliza", in: "main" },
      { name: "window 1 counter", t: "01", exact: true, in: "main" },
      { name: "window 1 title", t: "Facial hidratante", exact: true, in: "main" },
      { name: "window 1 description", t: "Para pieles mixtas", in: "main" },
      { name: "window 1 list heading", t: "Incluye", exact: true, in: "main" },
      { name: "window 1 list item", t: "Limpieza", exact: true, in: "main" },
      { name: "window 1 button", t: "Agendar cita", in: "main" },
      { name: "window 1 image", proto: { css: "#facial-hidratante figure" }, site: { css: "#facial-hidratante figure" } },
      { name: "window 3 title (long word)", t: "Hidrodermoabrasión", exact: true, in: "main" },
      { name: "window 4 badge", t: "Tratamiento insignia", in: "main" },
      { name: "window 4 recommendation", t: "Recomendación:", in: "main" },
      { name: "others heading", t: "Otras categorías", exact: true, in: "main" },
      { name: "others link", t: "Masajes", exact: true, proto: { in: ".others" }, site: { in: "main ul" } },
      ...TALK,
    ],
  },
  masajes: {
    proto: "#/servicios/masajes", site: "/servicios/masajes/",
    roles: [
      { name: "intro h1", css: "main h1" },
      { name: "window 2 title", t: "Masaje piedras calientes", exact: true, in: "main" },
      { name: "window 1 duration chip", t: "50 min", exact: true, in: "main" },
    ],
  },
  nosotros: {
    proto: "#/nosotros", site: "/nosotros/",
    roles: [
      { name: "intro eyebrow", t: "Nosotros", exact: true, in: "main" },
      { name: "intro h1", css: "main h1" },
      { name: "intro h1 accent", t: "para el cuidado,", in: "main h1" },
      { name: "intro lead", t: "HannaH es una clínica", in: "main" },
      { name: "philosophy eyebrow", t: "Filosofía", exact: true, in: "main" },
      { name: "philosophy heading 1", t: "Nada de fórmulas genéricas", in: "main" },
      { name: "philosophy text 1", t: "Creemos en los resultados", in: "main" },
      { name: "big word 1", t: "Constancia", exact: true, in: "main" },
      { name: "collage centre image", proto: { css: ".collage .center" }, site: { css: "main [data-collage-center]" } },
      { name: "big word 2", t: "Pausa", exact: true, in: "main" },
      { name: "team statement", t: "Especialistas en", in: "main" },
      { name: "team card", proto: { css: ".tcard" }, site: { css: "main ul li" } },
      { name: "team card title", t: "Estética facial", exact: true, in: "main" },
      { name: "team card text", t: "Perfil del equipo pendiente", in: "main" },
      ...TALK,
    ],
  },
  contacto: {
    proto: "#/contacto", site: "/contacto/",
    roles: [
      { name: "eyebrow", t: "Contacto", exact: true, in: "main" },
      { name: "h1", css: "main h1" },
      { name: "lead", t: "Déjanos un mensaje con tus datos", in: "main" },
      { name: "quick link WhatsApp", proto: { css: ".quick a" }, site: { css: "main a[href*='wa.me']" } },
      { name: "form card", proto: { css: ".form-card" }, site: { css: "main form" } },
      { name: "form title", t: "Déjanos un mensaje", exact: true, in: "main" },
      { name: "field label", t: "Nombre", exact: true, in: "main form" },
      { name: "input", css: "main form input" },
      { name: "submit", t: "Enviar mensaje", exact: true, in: "main" },
      { name: "info heading", t: "Visítanos", exact: true, in: "main" },
      { name: "map", proto: { css: ".map" }, site: { css: "main iframe, main [data-map]" } },
      ...FOOTER,
    ],
  },
};

// ---------------------------------------------------------------------------
// In-page helpers (serialised into the page).
// ---------------------------------------------------------------------------
const MEASURE = ({ roles, isProto }) => {
  const norm = (s) =>
    (s || "")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[↗★“”"]/g, "").replace(/\s+/g, " ").trim().toLowerCase();
  const visible = (el) => el.getClientRects().length > 0;
  const scroller = isProto ? document.getElementById("app") : document.scrollingElement;
  const sheetOf = (el) => el.closest(isProto ? "[data-panel], .site-footer" : "[data-sheet], footer, header");
  const find = (r) => {
    const scope = r.in ? [...document.querySelectorAll(r.in)] : [document.body];
    if (r.css) {
      for (const s of scope) {
        const el = (s.matches?.(r.css) ? s : null) || s.querySelector(r.css) || document.querySelector(r.css);
        if (el) return el;
      }
      return null;
    }
    const want = norm(r.t);
    for (const s of scope) {
      const all = [s, ...s.querySelectorAll("*")].filter(visible);
      const hits = all.filter((el) => {
        const txt = norm(el.textContent);
        return r.exact ? txt === want : txt.startsWith(want);
      });
      // deepest match: no child also matches
      const deepest = hits.filter((el) => !hits.some((o) => o !== el && el.contains(o)));
      if (deepest.length) return deepest[0];
    }
    return null;
  };
  const px = (v) => Math.round(parseFloat(v) * 10) / 10;
  return roles.map((r) => {
    const el = find(r);
    if (!el) return { name: r.name, missing: true };
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const sheet = sheetOf(el);
    const srect = sheet ? sheet.getBoundingClientRect() : { top: 0, left: 0 };
    return {
      name: r.name,
      text: (el.textContent || "").trim().slice(0, 40),
      font: cs.fontFamily.split(",")[0].replace(/["']/g, "").replace(/^__|_[a-f0-9]{6}$/g, ""),
      size: px(cs.fontSize),
      weight: cs.fontWeight,
      style: cs.fontStyle,
      leading: cs.lineHeight === "normal" ? "normal" : px(cs.lineHeight),
      tracking: cs.letterSpacing === "normal" ? 0 : px(cs.letterSpacing),
      transform: cs.textTransform,
      color: cs.color,
      bg: cs.backgroundColor,
      x: Math.round(rect.left),
      yInSheet: Math.round(rect.top - srect.top),
      w: Math.round(rect.width),
      h: Math.round(rect.height),
      padding: cs.padding,
      radius: cs.borderRadius,
    };
  });
};

const SHEETS = ({ isProto }) => {
  const list = [...document.querySelectorAll(isProto ? "#view [data-panel], #view .site-footer" : "main [data-sheet], body > footer")];
  return list.map((s) => {
    const cs = getComputedStyle(s);
    return {
      h: Math.round(s.offsetHeight),
      padTop: parseFloat(cs.paddingTop),
      padBottom: parseFloat(cs.paddingBottom),
      bg: cs.backgroundColor === "rgba(0, 0, 0, 0)" ? cs.backgroundImage.slice(0, 30) : cs.backgroundColor,
      radius: cs.borderTopLeftRadius,
      heading: (s.querySelector("h1,h2,h3")?.textContent || "").trim().slice(0, 28),
    };
  });
};

// ---------------------------------------------------------------------------
// Optional: serve Google Fonts from a local CSS file (offline machines).
const FONTS_CSS = args["fonts-css"] ? await (await import("node:fs/promises")).readFile(args["fonts-css"], "utf8") : null;
async function newPage(browser, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  if (FONTS_CSS) await page.route("**/fonts.googleapis.com/**", (r) => r.fulfill({ status: 200, contentType: "text/css", body: FONTS_CSS }));
  return page;
}
async function openProto(browser, w, h, hash) {
  const page = await newPage(browser, w, h);
  await page.goto(PROTO + hash);
  await page.waitForTimeout(900);
  await page.evaluate(() => { const p = document.getElementById("proto"); if (p) p.style.display = "none"; });
  return page;
}
async function openSite(browser, w, h, path) {
  const page = await newPage(browser, w, h);
  await page.goto(SITE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  return page;
}
const scrollTo = (page, isProto, y) =>
  page.evaluate(({ isProto, y }) => {
    const s = isProto ? document.getElementById("app") : document.scrollingElement;
    s.scrollTop = y;
  }, { isProto, y });
const metrics = (page, isProto) =>
  page.evaluate(({ isProto }) => {
    const s = isProto ? document.getElementById("app") : document.scrollingElement;
    const header = document.querySelector(isProto ? ".site-hdr" : "header");
    return { viewport: s.clientHeight, total: s.scrollHeight, header: header?.offsetHeight ?? 0, overflow: s.scrollWidth - s.clientWidth };
  }, { isProto });

async function sideBySide(browser, a, b, file) {
  const page = await browser.newPage({ viewport: { width: 1600, height: 600 } });
  const toData = (buf) => `data:image/png;base64,${buf.toString("base64")}`;
  await page.setContent(`<body style="margin:0;display:flex;gap:12px;background:#222;font:14px sans-serif;color:#fff">
    <figure style="margin:0;flex:1"><figcaption style="padding:6px">MOCKUP</figcaption><img src="${toData(a)}" style="width:100%"></figure>
    <figure style="margin:0;flex:1"><figcaption style="padding:6px">SITE</figcaption><img src="${toData(b)}" style="width:100%"></figure></body>`);
  await page.waitForTimeout(100);
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
}

// next/font renames families (e.g. "__Source_Serif_4_1a2b3c", "sourceSerif").
const fontKey = (f) =>
  String(f).toLowerCase().replace(/_[a-f0-9]{6}$/, "").replace(/fallback$/, "").replace(/[^a-z]/g, "")
    .replace(/^cormorantgaramond$/, "cormorant");
const differs = (a, b, col) => {
  if (col === "font") return fontKey(a) !== fontKey(b);
  if (col === "leading" && (a === "normal" || b === "normal")) return false;
  if (typeof a === "number" && typeof b === "number") {
    return Math.abs(a - b) > Math.max(TOL.px, Math.abs(a) * TOL.pct);
  }
  return String(a) !== String(b);
};
const COLS = ["font", "size", "weight", "style", "leading", "tracking", "transform", "color", "x", "yInSheet", "w", "h"];

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const json = {};
  let md = `# Mockup ↔ site comparison\n\nMockup: \`${PROTO}\`  \nSite: \`${SITE}\`  \nTolerance: ±max(${TOL.px}px, ${TOL.pct * 100}%). **Bold** = mismatch. \`yInSheet\` = distance from the top of the element's sheet.\n\n`;

  for (const [key, page] of Object.entries(PAGES)) {
    if (ONLY && !ONLY.includes(key)) continue;
    for (const w of WIDTHS) {
      const h = HEIGHTS[w] ?? 900;
      const p = await openProto(browser, w, h, page.proto);
      const s = await openSite(browser, w, h, page.site);
      const prep = (isProto) => page.roles.map((r) => ({ ...r, ...(isProto ? r.proto : r.site), proto: undefined, site: undefined }));
      const [mp, ms] = await Promise.all([
        p.evaluate(MEASURE, { roles: prep(true), isProto: true }),
        s.evaluate(MEASURE, { roles: prep(false), isProto: false }),
      ]);
      const [sp, ss] = await Promise.all([p.evaluate(SHEETS, { isProto: true }), s.evaluate(SHEETS, { isProto: false })]);
      const [gp, gs] = await Promise.all([metrics(p, true), metrics(s, false)]);
      json[`${key}@${w}`] = { mockup: { global: gp, sheets: sp, roles: mp }, site: { global: gs, sheets: ss, roles: ms } };

      md += `## ${key} @ ${w}×${h}\n\n`;
      md += `Header ${gp.header} → ${gs.header}px · scroll area ${gp.viewport} → ${gs.viewport}px · page height ${gp.total} → ${gs.total}px · horizontal overflow ${gp.overflow} → ${gs.overflow}\n\n`;
      md += `| element | ${COLS.join(" | ")} |\n|---|${COLS.map(() => "---").join("|")}|\n`;
      mp.forEach((a, i) => {
        const b = ms[i];
        if (a.missing && b.missing) return;
        if (b.missing) { md += `| ${a.name} | **missing on site** ${COLS.slice(1).map(() => "").join(" | ")} |\n`; return; }
        if (a.missing) { md += `| ${a.name} | *(not in mockup)* ${COLS.slice(1).map(() => "").join(" | ")} |\n`; return; }
        const cells = COLS.map((c) => {
          const same = !differs(a[c], b[c], c);
          return same ? `${a[c]}` : `**${a[c]} → ${b[c]}**`;
        });
        md += `| ${a.name} | ${cells.join(" | ")} |\n`;
      });
      md += `\n**Sheets** (height / padding-top / padding-bottom / ground / radius)\n\n| # | mockup | site |\n|---|---|---|\n`;
      for (let i = 0; i < Math.max(sp.length, ss.length); i++) {
        const f = (x) => (x ? `${x.heading || "—"} · ${x.h} / ${x.padTop} / ${x.padBottom} · ${x.bg} · ${x.radius}` : "—");
        md += `| ${i + 1} | ${f(sp[i])} | ${f(ss[i])} |\n`;
      }

      // Screenshots at matching scroll positions.
      const steps = [0, 0.55, 1.25, 2.4];
      for (let n = 0; n < steps.length; n++) {
        await scrollTo(p, true, Math.round(steps[n] * gp.viewport));
        await scrollTo(s, false, Math.round(steps[n] * gs.viewport));
        await p.waitForTimeout(450); await s.waitForTimeout(450);
        const [a, b] = await Promise.all([p.screenshot(), s.screenshot()]);
        const file = `${key}-${w}-${n}.png`;
        await sideBySide(browser, a, b, join(OUT, file));
        md += n === 0 ? `\nScreens: ` : "";
        md += `[${n}](${file}) `;
      }
      md += `\n\n`;
      await p.close(); await s.close();
      console.log(`✓ ${key} @ ${w}`);
    }
  }
  await writeFile(join(OUT, "report.md"), md);
  await writeFile(join(OUT, "report.json"), JSON.stringify(json, null, 2));
  await browser.close();
  console.log(`Report: ${join(OUT, "report.md")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
