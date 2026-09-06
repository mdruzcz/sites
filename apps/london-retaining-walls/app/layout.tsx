import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallNowFab from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "London Retaining Walls | Professional Installation & Repair", template: "%s | London Retaining Walls" },
  description: "Professional retaining wall installation and repair in London, Ontario. Concrete, block and wood retaining walls. 8+ years experience. Ontario Building Code compliant. Free quotes.",
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
    <html lang="en" className={`${poppins.variable} ${roboto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="font-[family-name:var(--font-roboto)] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="0a0ce21b-74ac-4591-9872-c26015c09df8" strategy="afterInteractive" />
      </body>
    </html>
  );
}
