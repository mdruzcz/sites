import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  metadataBase: new URL("https://deckheroes.ca"),
  title: {
    default: "Deck Heroes | Professional Deck Staining & Restoration in Ontario",
    template: "%s | Deck Heroes",
  },
  description:
    "Professional deck staining, sealing, refinishing, and fence staining services in London, Woodstock, St. Thomas, Strathroy, Brantford & Hamilton, Ontario. Free estimates. 5-star rated.",
  keywords:
    "deck staining Ontario, deck sealing, deck refinishing, fence staining, London Ontario, deck restoration, deck maintenance",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://deckheroes.ca",
    siteName: "Deck Heroes",
    title: "Deck Heroes | Professional Deck Staining & Restoration in Ontario",
    description:
      "Transform your outdoor living space with professional deck staining and restoration services across Southwestern Ontario.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics websiteId="3090aa31-fec8-42aa-bab7-ebb20ad92386" />
      </body>
    </html>
  );
}
