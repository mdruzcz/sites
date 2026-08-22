import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { SITE_URL } from "@/lib/utils";

// Body: Inter, wired through the CSS variable. The old sheet asked for the
// literal family name "Inter", which never matches next/font's hashed family,
// so the site had been rendering in the system sans.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });

// Display: a technical grotesque that echoes the heavy logo wordmark.
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Permanent LED Soffit Track Lighting | Illumi Track Lights",
    template: "%s | Illumi Track Lights"
  },
  description:
    "Aluminum-tracked 24V RGBW LED soffit lighting kits built for Canadian homes. Smart-app control, weatherproof, 5-year warranty. Free shipping over $500 from London, Ontario.",
  openGraph: {
    type: "website",
    siteName: "Illumi Track Lights",
    url: SITE_URL,
    locale: "en_CA",
    title: "Permanent LED Soffit Track Lighting | Illumi Track Lights",
    description:
      "Aluminum-tracked 24V RGBW LED soffit lighting kits shipped across Canada from London, Ontario.",
    images: [{ url: "/images/photos/hero-home-twilight.webp", width: 2200, height: 1650, alt: "Home outlined in warm-white permanent LED track lighting at twilight" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Permanent LED Soffit Track Lighting | Illumi Track Lights",
    description: "Aluminum-tracked 24V RGBW LED soffit lighting kits shipped across Canada.",
    images: ["/images/photos/hero-home-twilight.webp"]
  },
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
          {/* Overlays — the predictive search palette was removed. */}
          <MiniCartDrawer />
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
