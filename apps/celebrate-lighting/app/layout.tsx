import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { AiPreviewProvider } from "@/components/AiPreviewProvider";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Permanent Outdoor LED Lighting in Ontario | Celebrate Lighting",
    template: "%s | Celebrate Lighting",
  },
  description:
    "Permanent roofline LED lighting and seasonal C9 Christmas lights across Southwestern Ontario. Free on-site demo and free AI preview of your home. Woodstock, London, Kitchener-Waterloo, Guelph, Brantford.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    images: [{ url: "/images/gallery/rainbow-permanent-roofline-lights-two-storey-stone-and-siding-home.jpg", width: 1920, height: 1080, alt: "Permanent roofline LED lighting on a two-storey Ontario home by Celebrate Lighting" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} antialiased`}>
      <body className={inter.className}>
        <AiPreviewProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CallNowFab />
        </AiPreviewProvider>
        <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="d2920cb9-621b-4dbf-808e-05e4b70a3cd1" strategy="afterInteractive" />
      </body>
    </html>
  );
}
