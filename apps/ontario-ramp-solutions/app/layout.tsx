import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Wheelchair Ramp Installation & Rental Ontario`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "wheelchair ramp installation Ontario",
    "wheelchair ramp rental Ontario",
    "temporary ramp rental",
    "event accessibility Ontario",
    "AODA ramp installation",
    "modular aluminum ramp",
    "wheelchair ramp London Ontario",
    "wheelchair ramp Hamilton",
    "wheelchair ramp Kitchener",
    "wheelchair ramp Toronto",
    "handrail installation Ontario",
    ...site.serviceAreas.map((c) => `wheelchair ramp ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: `${site.name} | Wheelchair Ramp Installation & Rental Ontario`,
    description: site.description,
    url: site.url,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Ontario Ramp Solutions — Professional wheelchair ramp installation and rental across Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="7f450354-3584-463b-bd65-210fc673f921" strategy="afterInteractive" />
      </body>
    </html>
  );
}
