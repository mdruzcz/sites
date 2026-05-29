import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  metadataBase: new URL("https://hottubpads.ca"),
  alternates: { canonical: "/" },
  title: {
    default: "Hot Tub Pads | Expert Concrete Pad Installation in Ontario",
    template: "%s | Hot Tub Pads",
  },
  description:
    "Professional hot tub pad installation across Ontario. Durable, level concrete and gravel foundations for hot tubs, swim spas, and outdoor structures. Free quotes.",
  keywords:
    "hot tub pad installation Ontario, concrete hot tub pad, swim spa pad, gravel hot tub base, hot tub foundation London Ontario, hot tub pad Hamilton, hot tub pad Kitchener",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Hot Tub Pads",
    title: "Hot Tub Pads | Expert Concrete Pad Installation in Ontario",
    description:
      "Professional hot tub pad installation across Ontario. Durable, level concrete and gravel foundations for hot tubs and swim spas.",
    url: "https://hottubpads.ca",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1024,
        height: 683,
        alt: "Professional hot tub pad installation by Hot Tub Pads in Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Tub Pads | Expert Concrete Pad Installation in Ontario",
    description:
      "Professional hot tub pad installation across Ontario. Durable, level concrete and gravel foundations.",
    images: ["/images/hero-bg.jpg"],
  },
  icons: {
    icon: [{ url: "/images/favicon.png", sizes: "270x270", type: "image/png" }],
    apple: "/images/favicon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        {children}
        <Script
          src="https://analytics.masterdecker.com/script.js"
          data-website-id="3b5c2f72-435b-423f-85fb-8dfbb875da4e"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
