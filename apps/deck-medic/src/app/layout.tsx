import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://deckmedic.ca"),
  title: {
    default: "Deck Medic | Deck Restoration & Staining Toronto",
    template: "%s | Deck Medic",
  },
  description:
    "Toronto's professional deck restoration and staining specialists. Expert sanding, wood repairs, and weather-shield finishes for cedar and pressure-treated decks. Free estimate.",
  keywords:
    "deck restoration Toronto, deck staining Toronto, deck refinishing Mississauga, deck staining Oakville, deck restoration Burlington, power washing deck Toronto, fence staining Ontario",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Deck Medic",
    title: "Deck Medic | Professional Deck Restoration & Staining in Toronto",
    description:
      "Expert deck restoration, staining, and wood preservation for Southern Ontario homeowners. Serving Toronto, Mississauga, Oakville & Burlington.",
    url: "https://deckmedic.ca",
    images: [
      {
        url: "/images/Deck-Medic-Banner.png",
        width: 1200,
        height: 630,
        alt: "Professional deck restoration and staining by Deck Medic in Toronto, ON",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deck Medic | Professional Deck Restoration & Staining",
    description:
      "Expert deck restoration, staining, and wood preservation for Southern Ontario homeowners.",
    images: ["/images/Deck-Medic-Banner.png"],
  },
  icons: {
    icon: [{ url: "/images/Deck-Medic-Logo-Updated-1-650x650.png", sizes: "32x32", type: "image/png" }],
    apple: "/images/Deck-Medic-Logo-Updated-1-650x650.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}        <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="56661b4f-edc7-4ff3-aa5d-05cdb7e08d3c" strategy="afterInteractive" />
      </body>
    </html>
  );
}
