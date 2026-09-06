import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { PredictiveSearch } from "@/components/predictive-search";
import { SITE_URL } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-loaded",
  display: "swap"
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif-loaded",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Holiday Light Supplies — Commercial-grade LED Christmas lights & décor, shipped across Canada",
    template: "%s | Holiday Light Supplies"
  },
  description:
    "C9 strawberry bulbs, G20 globe lights, 5mm mini strands, snowfall tubes, LED trees, 3D displays, wreaths and pro installer gear — premium holiday lighting shipped fast across Ontario and Canada. Free shipping over $150.",
  openGraph: {
    type: "website",
    siteName: "Holiday Light Supplies",
    url: SITE_URL,
    locale: "en_CA"
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${lora.variable}`}>
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
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="44716b8c-e317-4311-ab02-280bc2d48a70" strategy="afterInteractive" />
      </body>
    </html>
  );
}
