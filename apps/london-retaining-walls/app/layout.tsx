import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";
import { site } from "@/lib/site";
import { organizationGraph, JsonLd } from "@/lib/jsonld";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", weight: ["500", "600", "700", "800", "900"], display: "swap" });
const source = Source_Sans_3({ subsets: ["latin"], variable: "--font-source", weight: ["400", "600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "London Retaining Walls | Retaining Wall Contractor London ON", template: "%s" },
  description: "Owner-led retaining wall contractor in London, Ontario. Block, concrete, timber and stone walls with proper drainage, permits handled. Free quotes.",
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_CA" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { themeColor: "#1a1d21", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${archivo.variable} ${source.variable}`}>
      <head>
        <JsonLd data={organizationGraph()} />
      </head>
      <body className="antialiased">
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyBar />
        <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id={site.umamiId} strategy="afterInteractive" />
      </body>
    </html>
  );
}
