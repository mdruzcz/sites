import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { QuoteFab } from "@/components/QuoteFab";
import { AdsTracking } from "@/components/AdsTracking";
import { site } from "@/lib/site";
import { GOOGLE_ADS_ID } from "@/lib/gtm";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap", variable: "--font-display", weight: ["600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Commercial Holiday Decorators | Hotels, Lobbies, Plazas & Offices in Ontario",
    template: "%s | Commercial Holiday Decorators",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    images: [{ url: "/images/gallery/corporate-lobby-christmas-tree-gold-ribbon-01.jpg", width: 1054, height: 1400, alt: "Decorated lobby Christmas tree with gold ribbon by Commercial Holiday Decorators" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className={inter.className}>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <QuoteFab />
        <AdsTracking />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}',{allow_enhanced_conversions:true});`}
        </Script>
      </body>
    </html>
  );
}
