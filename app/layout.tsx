import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BusinessJsonLd } from "@/components/BusinessJsonLd";
import { SyncHtmlLang } from "@/components/SyncHtmlLang";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/lib/site";
import { getDictionary } from "@/lib/i18n";

// 400 italic is the mockup's accent face. Without it the accent inherits the
// heading's 800 and the browser synthesises a fake bold — measured 800 on the
// hero and /nosotros accents before this was loaded.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// 700/800 carry the Concept 03 heavy-caps scale (`text-caps-*`).
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Header chrome only: nav links, breadcrumbs, the announcement strip.
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-serif",
  display: "swap",
});

// Header buttons and the ES/EN switch only.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const es = getDictionary("es");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: es.meta.home.title,
    template: `%s · ${site.name}`,
  },
  description: es.meta.home.description,
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: site.name,
    title: es.meta.home.title,
    description: es.meta.home.description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${dmSans.variable} ${sourceSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-noir font-body text-sand antialiased">
        <SkipLink />
        <SyncHtmlLang />
        <Nav />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <BusinessJsonLd />
      </body>
    </html>
  );
}
