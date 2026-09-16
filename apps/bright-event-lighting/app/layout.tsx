import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://brighteventlighting.ca"),
  title: {
    default: "Bright Event Lighting | Wedding & Event Lighting in London, ON",
    template: "%s | Bright Event Lighting",
  },
  description:
    "Professional wedding and event lighting in London, Ontario. DMX-controlled uplighting, string lights, cold sparks, and full production packages. Get a quote in 4 hours.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Bright Event Lighting",
    images: [{ url: "/images/og-default.jpg", alt: "Bright Event Lighting - Professional wedding lighting in London, ON" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
        <Script
          async
          src="https://analytics.masterdecker.com/script.js"
          data-website-id="f4331fce-774d-483a-ad59-cc25a5533736"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
