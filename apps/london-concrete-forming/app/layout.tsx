import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallNowFab from "@/components/CallNowFab";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mulish = Mulish({ subsets: ["latin"], display: "swap", variable: "--font-mulish" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Concrete Driveways & Patios London, ON | London Concrete Forming",
    template: "%s | London Concrete Forming",
  },
  description: "Expert concrete contractor in London, Ontario. Driveways, patios, retaining walls, stamped concrete & more. 20+ years experience. Call 519-914-1901 for a FREE quote!",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/drive.jpg", width: 1200, height: 630, alt: "Concrete driveway by London Concrete Forming" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mulish.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="155d7c87-b356-49a0-89ef-cc765d435058" strategy="afterInteractive" />
      </body>
    </html>
  );
}