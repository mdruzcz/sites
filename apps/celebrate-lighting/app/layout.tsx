import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://celebratelighting.ca"),
  title: {
    default: "Celebrate Lighting | Permanent Outdoor LED Lighting in Ontario",
    template: "%s | Celebrate Lighting",
  },
  description:
    "Celebrate Lighting installs permanent outdoor LED lighting for homes and businesses across Southwestern Ontario. Weatherproof, app-controlled, lifetime warranty. Serving London, Waterloo, Guelph, Brantford, and more.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    images: [{ url: "/images/hero-main.jpg", alt: "Celebrate Lighting — Permanent Outdoor LED Lighting in Ontario" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className="antialiased">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="d2920cb9-621b-4dbf-808e-05e4b70a3cd1" strategy="afterInteractive" />
      </body>
    </html>
  );
}
