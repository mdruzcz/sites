import type { Metadata } from "next";
import Script from "next/script";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { SITE } from "@/lib/site";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "K&M Kitchen Renovations | Expert Kitchen & Bathroom Remodeling in London, ON",
    template: "%s | K&M Kitchen Renovations",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "K&M Kitchen Renovations – Beautiful Kitchens in Southwestern Ontario" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={openSans.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="891e1df2-7ae2-4754-bb8c-903e6516f747" strategy="afterInteractive" />
      </body>
    </html>
  );
}
