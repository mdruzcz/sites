import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingEmailButton from "@/components/FloatingEmailButton";
import AdsTracking from "@/components/AdsTracking";
import { GOOGLE_ADS_ID } from "@/lib/ads";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weinstallgoveelights.ca"),
  title: {
    default: "We Install Govee Lights | Permanent LED Lighting Ontario",
    template: "%s | We Install Govee Lights",
  },
  description:
    "Professional Govee permanent outdoor LED light installation across Southwestern Ontario. App-controlled, weatherproof, 5-year warranty. Get a free quote today.",
  openGraph: {
    siteName: "We Install Govee Lights",
    type: "website",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingEmailButton />
        <AdsTracking />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}',{allow_enhanced_conversions:true});`}
        </Script>
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="e7b77dbb-cf35-423c-b911-53f13bb5618a" strategy="afterInteractive" />
      </body>
    </html>
  );
}
