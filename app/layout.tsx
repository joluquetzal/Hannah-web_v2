import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { BusinessJsonLd } from "@/components/BusinessJsonLd";
import { SyncHtmlLang } from "@/components/SyncHtmlLang";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/lib/site";
import { getDictionary } from "@/lib/i18n";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
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
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
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
