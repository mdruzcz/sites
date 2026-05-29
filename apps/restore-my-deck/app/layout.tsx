import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallNowFab from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "600", "700", "800", "900"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Restore My Deck | Professional Deck & Fence Restoration", template: "%s | Restore My Deck" },
  description: "Professional deck and fence restoration, staining, cleaning, and repair in Kitchener-Waterloo, Guelph, Hamilton and area. Free quotes. Most projects done in 2 days.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="font-[var(--font-inter)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
