import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { PredictiveSearch } from "@/components/predictive-search";
import { SITE_URL } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const display = Manrope({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Illumi Track Lights — Smart permanent LED soffit lighting shipped across Canada",
    template: "%s | Illumi Track Lights"
  },
  description:
    "Aluminum-tracked 24V RGBW LED soffit lighting kits — built for Canadian homes. Smart-app control, weatherproof, 5-year warranty. Free shipping over $500. Ships from London, Ontario.",
  openGraph: {
    type: "website",
    siteName: "Illumi Track Lights",
    url: SITE_URL,
    locale: "en_CA"
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true }
};

const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <UIProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <MiniCartDrawer />
          <PredictiveSearch />
          <OfferPopup />
        </UIProvider>
        {UMAMI_ID && (
          <Script
            src="https://analytics.masterdecker.com/script.js"
            data-website-id={UMAMI_ID}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  );
}
