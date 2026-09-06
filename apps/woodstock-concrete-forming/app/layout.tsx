import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Concrete Driveways & Patios in Woodstock ON`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "concrete driveways Woodstock Ontario",
    "concrete patios Woodstock",
    "stamped concrete Woodstock",
    "broom finish concrete",
    "concrete contractor Woodstock ON",
    "concrete driveways Brantford",
    "concrete patios Cambridge Ontario",
    "coloured concrete driveways Oxford County",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: `${site.name} | Concrete Driveways & Patios in Woodstock ON`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="f6b2be06-60fb-4a0e-8ab4-424bd7506d0a" strategy="afterInteractive" />
      </body>
    </html>
  );
}
