import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallNowFab from "@/components/CallNowFab";
import { localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DeckStain.ca | Professional Deck Staining & Sealing in Ontario",
    template: "%s | DeckStain.ca",
  },
  description:
    "Ontario's expert deck staining, sealing, and restoration specialists. READY Seal® oil-based stains. Free photo quotes in 2 days. Serving London, Woodstock, Brantford & 40+ cities.",
  keywords: [
    "deck staining ontario",
    "deck sealing london on",
    "professional deck staining",
    "ready seal stain",
    "deck restoration ontario",
    "fence staining ontario",
    "deck cleaning woodstock",
    "deck refinishing brantford",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: "DeckStain.ca | Professional Deck Staining & Sealing in Ontario",
    description:
      "Ontario's expert deck staining, sealing, and restoration specialists. READY Seal® oil-based stains. Free photo quotes in 2 days.",
    images: [
      {
        url: "/images/after-staining.jpg",
        width: 1200,
        height: 630,
        alt: "Professional deck staining in Ontario by DeckStain.ca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeckStain.ca | Professional Deck Staining & Sealing in Ontario",
    description:
      "Ontario's expert deck staining, sealing, and restoration specialists. Free photo quotes in 2 business days.",
    images: ["/images/after-staining.jpg"],
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
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-[104px]">{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
