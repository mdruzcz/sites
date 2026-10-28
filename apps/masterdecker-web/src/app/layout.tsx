import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { AdsTracking } from "@/components/ads-tracking";
import { GOOGLE_ADS_ID } from "@/lib/gtm";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Decks, Fences & Concrete | London Ontario`,
    // Page titles already include the brand, so don't append it again.
    template: "%s",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body>{children}
        <AdsTracking />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}',{allow_enhanced_conversions:true});`}
        </Script>
        <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="be3a15d8-7fc6-43b8-ae74-fd95e6e46864" strategy="afterInteractive" />
      </body>
    </html>
  );
}
