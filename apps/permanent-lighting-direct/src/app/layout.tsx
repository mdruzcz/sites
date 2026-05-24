import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { PredictiveSearch } from "@/components/predictive-search";
import { SITE_URL } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Permanent Lighting Direct — DIY LED kits for year-round outdoor lighting | Canada",
    template: "%s | Permanent Lighting Direct"
  },
  description:
    "Affordable DIY permanent LED lighting kits shipped across Canada. Soffit-mounted aluminum tracks, RGBW pucks, smart-app control. From $9/ft — thousands less than pro installs.",
  openGraph: {
    type: "website",
    siteName: "Permanent Lighting Direct",
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
