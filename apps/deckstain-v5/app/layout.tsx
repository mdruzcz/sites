import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { Jsonld, localBusiness } from "@/lib/schema";
import { SITE } from "@/lib/site";

const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-opensans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "DeckStain.ca — Deck & Fence Staining in Southwestern Ontario",
    template: "%s · DeckStain.ca",
  },
  description:
    "Professional deck & fence staining across Southwestern Ontario. READY Seal® oil-based stains that never peel. Send a photo, get a real quote in 2 business days. 4.9★ · 500+ decks.",
  keywords: ["deck staining ontario", "deck sealing london ontario", "fence staining ontario", "ready seal stain", "deck restoration", "deck refinishing"],
  openGraph: {
    type: "website", locale: "en_CA", url: SITE.url, siteName: SITE.legalName,
    title: "DeckStain.ca — Deck & Fence Staining in Southwestern Ontario",
    description: "READY Seal® oil-based stains that never peel. Send a photo, get a real quote in 2 business days.",
    images: [{ url: "/images/after-staining.jpg", width: 1200, height: 630, alt: "Freshly stained deck in Ontario by DeckStain.ca" }],
  },
  twitter: { card: "summary_large_image", title: "DeckStain.ca — Deck & Fence Staining in Southwestern Ontario", description: "READY Seal® oil-based stains that never peel. Free photo quotes in 2 business days.", images: ["/images/after-staining.jpg"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <head><Jsonld data={localBusiness()} /></head>
      <body className="min-h-screen flex flex-col pb-14 lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCta />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="3d709661-e87a-4717-80e6-b782d67a483a" strategy="afterInteractive" />
      </body>
    </html>
  );
}
