import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { PredictiveSearch } from "@/components/predictive-search";
import { SITE_URL } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Holiday Lights Direct — Permanent LED lighting & installer gear, shipped from London, Ontario",
    template: "%s | Holiday Lights Direct"
  },
  description:
    "Aluminum-tracked permanent LED systems, C9 LED bulbs, mini-light strands, clips, wires and connectors — sold direct from London, Ontario. Free shipping on Canadian orders over $500. Pro installer and municipality pricing.",
  openGraph: {
    type: "website",
    siteName: "Holiday Lights Direct",
    url: SITE_URL,
    locale: "en_CA"
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <UIProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          {/* Overlays */}
          <MiniCartDrawer />
          <PredictiveSearch />
          <OfferPopup />
        </UIProvider>
      </body>
    </html>
  );
}
