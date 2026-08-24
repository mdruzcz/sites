import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { businessGraph } from "@/lib/seo";
import { site } from "@/lib/site";

// Wired through a CSS variable — naming a font literally in globals.css never
// matches next/font's hashed family name, and the page silently falls back to
// system sans. Figtree is the closest free stand-in for Airbnb's Cereal.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-loaded",
  display: "swap"
});

const TITLE = "Premium Port Stanley Living Without the Summer Price Tag";
const DESCRIPTION =
  "Rent fully furnished Port Stanley beachfront and village homes month-to-month through the off-season. One monthly price covers heat, hydro and high-speed Wi-Fi.";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: `%s | ${site.name}` },
  description: DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Vacation and mid-term rentals",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg" }]
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    url: site.url,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Off Season Rentals — furnished Port Stanley cottages available by the month from September to May"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  }
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={figtree.variable}>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body>
        <JsonLd data={businessGraph()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
