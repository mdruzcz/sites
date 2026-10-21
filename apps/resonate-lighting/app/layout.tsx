import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/jsonld";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

const defaultTitle = `${site.name} | Music-Reactive Pixel Lighting Kits`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "music reactive lighting",
    "pixel lighting kit",
    "commercial pixel lighting Canada",
    "mega tree kit",
    "mega tree installation",
    "roofline pixel lighting",
    "commercial holiday lighting installation",
    "BIA holiday lighting",
    "municipal holiday lighting",
    "WS2811 commercial lighting",
    "Raspberry Pi 5 light show controller",
    ...site.serviceAreas.map((c) => `pixel lighting installation ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    url: site.url,
    images: [
      {
        url: "/images/brand/og-resonate-lighting.png",
        width: 1200,
        height: 630,
        alt: "Resonate Lighting: music-reactive pixel lighting kits for commercial spaces, BIAs and municipalities in Canada",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: ["/images/brand/og-resonate-lighting.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${sora.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="min-h-screen flex flex-col bg-ink text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
