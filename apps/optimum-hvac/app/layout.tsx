import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Furnace, AC & Heat Pump Services in Oxford County ON`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "HVAC Woodstock Ontario",
    "furnace repair Woodstock ON",
    "air conditioner installation Oxford County",
    "heat pump installation Ontario",
    "TSSA certified HVAC contractor",
    "furnace repair Ingersoll",
    "AC repair Tillsonburg",
    "heat pump rebates Ontario",
    "emergency HVAC service Oxford County",
    "mini split installation southwestern Ontario",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: `${site.name} | Furnace, AC & Heat Pump Services in Oxford County ON`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="dd6d810d-3f48-4c9f-b794-d5ad33a4de0a" strategy="afterInteractive" />
      </body>
    </html>
  );
}
