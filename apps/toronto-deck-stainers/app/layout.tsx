import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Toronto Deck Stainers | GTA Deck Staining & Restoration Experts",
    template: "%s | Toronto Deck Stainers",
  },
  description: site.description,
  keywords: [
    "deck staining Toronto",
    "deck staining GTA",
    "deck restoration Toronto",
    "deck sealing Toronto",
    "fence staining Toronto",
    "deck refinishing GTA",
    "power washing deck Toronto",
    "deck staining Richmond Hill",
    "deck staining Vaughan",
    "deck staining Markham",
    "Toronto deck stainers",
    ...site.serviceAreas.map((c) => `deck staining ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "Toronto Deck Stainers | GTA Deck Staining & Restoration Experts",
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
