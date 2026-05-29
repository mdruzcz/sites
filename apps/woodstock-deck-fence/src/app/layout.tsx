import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@sites/ui/analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://woodstockdeckandfence.ca"),
  title: {
    default: "Woodstock Deck & Fence | Custom Deck & Fence Builders in Woodstock, ON",
    template: "%s | Woodstock Deck & Fence",
  },
  description:
    "Woodstock's trusted deck and fence contractors. Custom PT, cedar & composite decks plus vinyl, wood & steel fencing. 5-year workmanship warranty. Free quotes in Oxford County.",
  keywords:
    "deck builder Woodstock Ontario, fence contractor Woodstock ON, composite deck Woodstock, vinyl fence installer Woodstock, deck and fence company Oxford County, fence builder Brantford Cambridge",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Woodstock Deck & Fence",
    title: "Woodstock Deck & Fence | Expert Deck & Fence Builders",
    description:
      "Custom decks & fences built for Ontario weather. PT, cedar, composite decks — vinyl, wood, steel fencing. 5-year warranty. Serving Woodstock, Brantford, Cambridge & Oxford County.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Woodstock Deck & Fence — expert deck and fence contractor in Woodstock, Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Woodstock Deck & Fence | Expert Deck & Fence Builders",
    description:
      "Custom decks & fences for Oxford County homeowners. 5-year workmanship warranty. Free quotes.",
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        {recaptchaSiteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="lazyOnload"
          />
        )}
        <Analytics websiteId="" />
      </body>
    </html>
  );
}
