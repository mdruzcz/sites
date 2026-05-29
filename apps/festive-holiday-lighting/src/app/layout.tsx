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
  metadataBase: new URL("https://festiveholidaylighting.ca"),
  title: {
    default: "Festive Holiday Lighting | Professional Christmas & Permanent Lighting Southern Ontario",
    template: "%s | Festive Holiday Lighting",
  },
  description:
    "Southern Ontario's professional holiday lighting company. Seasonal Christmas light installation, year-round permanent LED systems, and commercial lighting. Hamilton, Burlington, Oakville & beyond. Free quote.",
  keywords:
    "holiday lighting installation Ontario, Christmas light installation Hamilton, permanent LED lighting Southern Ontario, professional Christmas lights, commercial holiday lighting Ontario",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Festive Holiday Lighting",
    title: "Festive Holiday Lighting | Professional Christmas & Permanent Lighting Southern Ontario",
    description:
      "Professional Christmas light installation and permanent LED systems for homes and businesses. Hamilton, Burlington, Oakville, Mississauga and across Southern Ontario.",
    url: "https://festiveholidaylighting.ca",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festive Holiday Lighting | Southern Ontario's Holiday Lighting Experts",
    description:
      "Seasonal Christmas lights + permanent LED systems. Homes & businesses. Free quote. (289) 426-5764.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
