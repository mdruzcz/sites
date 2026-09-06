import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Fredoka } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const display = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-display" });

const OG_IMAGE = "/images/xmas-gallery/estate-home-warm-white-roofline-christmas-lights-lit-trees-01.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Classic Christmas Lighting | Christmas Light Installation Kitchener-Waterloo",
    template: "%s | Classic Christmas Lighting",
  },
  description:
    "Professional Christmas light installation in Kitchener-Waterloo, Cambridge, Guelph, Hamilton, Woodstock and Stratford. Family-owned, 15 years, fully insured. Lights supplied, installed, maintained and taken down. Free quote.",
  keywords: "Christmas light installation Kitchener, Christmas light installers Waterloo, holiday lighting Cambridge, Christmas lights Guelph, commercial Christmas lighting Kitchener-Waterloo",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "Classic Christmas Lighting | Christmas Light Installation Kitchener-Waterloo",
    description: "Family-owned Christmas light installers serving Waterloo Region and Southern Ontario for 15 years. Free quotes.",
    url: site.url,
    images: [{ url: OG_IMAGE, width: 1600, height: 1200, alt: "Estate home with warm white roofline Christmas lights and lit trees installed by Classic Christmas Lighting in Kitchener-Waterloo" }],
  },
  twitter: { card: "summary_large_image", title: "Classic Christmas Lighting | Kitchener-Waterloo", description: "Professional Christmas light installation. Free quote: (226) 476-2038." },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = { themeColor: "#FFFFFF" };

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` },
      telephone: "+1-226-476-2038",
      email: site.email,
      areaServed: { "@type": "AdministrativeArea", name: "Waterloo Region and Southern Ontario" },
      sameAs: [site.facebookUrl],
      contactPoint: { "@type": "ContactPoint", telephone: "+1-226-476-2038", contactType: "customer service", areaServed: "CA", availableLanguage: "English" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "en-CA",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="0df19ea8-11d1-46a7-ab5e-d488dfdca9be" strategy="afterInteractive" />
      </body>
    </html>
  );
}
