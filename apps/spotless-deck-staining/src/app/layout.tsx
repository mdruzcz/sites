import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://spotlessdeckstaining.ca"),
  title: {
    default: "Deck & Fence Staining in Kitchener-Waterloo | Spotless",
    template: "%s | Spotless Deck Staining",
  },
  description:
    "Professional deck and fence staining in Kitchener, Waterloo, Cambridge and Guelph. Premium penetrating stains, eco-friendly prep, fully insured. Free 24-hour quote.",
  keywords:
    "deck staining Kitchener, deck staining Waterloo, fence staining Cambridge, deck restoration Guelph, deck refinishing KW, deck sealer Ontario",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Spotless Deck Staining",
    title: "Spotless Deck Staining | Premium Deck & Fence Staining in Kitchener-Waterloo",
    description:
      "Premium deck and fence staining across Kitchener, Waterloo, Cambridge and Guelph. Two-coat penetrating stains, written warranty, free quote.",
    url: "https://spotlessdeckstaining.ca",
    images: [
      {
        url: "/images/hero-deck.jpg",
        width: 1200,
        height: 800,
        alt: "Freshly stained cedar deck by Spotless Deck Staining in Kitchener, Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spotless Deck Staining | Kitchener-Waterloo's Deck & Fence Pros",
    description:
      "Premium deck and fence staining across KW, Cambridge and Guelph. Eco-friendly stains, written warranty, free 24-hour quote.",
    images: ["/images/hero-deck.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
