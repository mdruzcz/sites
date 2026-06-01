import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { PredictiveSearch } from "@/components/predictive-search";
import { SITE_URL } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-loaded",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ready Seal Direct Canada — Buy Ready Seal Wood Stain & Sealer Online",
    template: "%s | Ready Seal Direct"
  },
  description:
    "Buy Ready Seal oil-based wood stain & sealer in Canada — 9 colors, 1 & 5 gallon. Goof-proof one-coat application, UV protection, no laps or streaks. Free shipping on Ontario orders over $750. Contractor freight pricing available.",
  openGraph: {
    type: "website",
    siteName: "Ready Seal Direct",
    url: SITE_URL,
    locale: "en_CA"
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
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
