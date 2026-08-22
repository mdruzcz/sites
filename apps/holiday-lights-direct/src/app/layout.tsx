import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { SITE_URL } from "@/lib/utils";

// Body: humanist geometric sans — wide apertures, reads cleanly at small sizes.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap"
});

// Display: warm high-contrast serif that pairs with the brass-gold accent.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Permanent LED Track Lighting for Homes | Holiday Lights Direct",
    template: "%s | Holiday Lights Direct"
  },
  description:
    "Aluminum-tracked permanent LED house lighting, C9 bulbs, clips, wire and connectors — sold direct from London, Ontario. Free Canadian shipping over $500. Installer and municipal pricing.",
  openGraph: {
    type: "website",
    siteName: "Holiday Lights Direct",
    url: SITE_URL,
    locale: "en_CA",
    title: "Permanent LED Track Lighting for Homes | Holiday Lights Direct",
    description:
      "Aluminum-tracked permanent LED house lighting shipped direct from London, Ontario. One system, every holiday, all year round.",
    images: [{ url: "/images/photos/hero-warm-white-home.webp", width: 2200, height: 1650, alt: "Home outlined in warm-white permanent LED track lighting at twilight" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Permanent LED Track Lighting for Homes | Holiday Lights Direct",
    description:
      "Aluminum-tracked permanent LED house lighting shipped direct from London, Ontario.",
    images: ["/images/photos/hero-warm-white-home.webp"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body>
        <UIProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          {/* Overlays — the predictive search palette was removed by request. */}
          <MiniCartDrawer />
          <OfferPopup />
        </UIProvider>
      </body>
    </html>
  );
}
