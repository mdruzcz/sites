import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { DemoPromiseBar } from "@/components/DemoPromiseBar";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://celebratelighting.ca"),
  title: {
    default: "Celebrate Lighting | Permanent Outdoor LED Lighting in Ontario",
    template: "%s | Celebrate Lighting",
  },
  description:
    "See permanent LED lighting lit up on your own home before you pay — free on-site demo. Weatherproof, app-controlled, lifetime warranty. Serving London, Waterloo, Guelph, Brantford and Southwestern Ontario.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    images: [{ url: "/images/hero-main.jpg", alt: "Celebrate Lighting — Permanent Outdoor LED Lighting in Ontario" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className={inter.className}>
        <DemoPromiseBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
