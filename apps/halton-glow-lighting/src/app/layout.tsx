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
  metadataBase: new URL("https://haltonglowlighting.ca"),
  title: {
    default: "Halton Glow Lighting | Permanent Outdoor LED Lighting in Burlington & Oakville",
    template: "%s | Halton Glow Lighting",
  },
  description:
    "Burlington and Oakville's permanent outdoor LED lighting experts. App-controlled, weatherproof, year-round lighting with lifetime warranty. Free consultation.",
  keywords:
    "permanent outdoor lighting Burlington, permanent christmas lights Oakville, LED lighting installer Halton, Trimlight, Jellyfish Lighting alternative, year-round outdoor lights Ontario",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Halton Glow Lighting",
    title: "Halton Glow Lighting | Permanent Outdoor LED Lighting in Burlington & Oakville",
    description:
      "Custom-designed permanent LED lighting that dazzles year-round. Control colors, patterns and schedules from your phone. Serving Burlington & Oakville.",
    url: "https://haltonglowlighting.ca",
    images: [
      {
        url: "/images/uploads/blue-led-house-app.jpg",
        width: 1600,
        height: 1200,
        alt: "Two-story Burlington home with permanent blue LED outdoor lighting and the Halton Glow control app on a phone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Halton Glow Lighting | Permanent Outdoor LED Lighting",
    description:
      "App-controlled permanent LED lighting for Burlington and Oakville homes. Weatherproof, year-round, lifetime warranty.",
    images: ["/images/uploads/blue-led-house-app.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-270.png", sizes: "270x270", type: "image/png" },
    ],
    apple: "/images/favicon-270.png",
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
