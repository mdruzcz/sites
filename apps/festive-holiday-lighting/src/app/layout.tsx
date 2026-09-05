import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Nunito({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://festiveholidaylighting.ca"),
  title: {
    default: "Festive Holiday Lighting | Classic Christmas Lights & Permanent LED, Southern Ontario",
    template: "%s | Festive Holiday Lighting",
  },
  description:
    "Classic Christmas light installation and permanent app-controlled LED roofline lighting for homes and businesses across Southern Ontario. Hamilton, Burlington, Oakville, Mississauga, Niagara. Free quote.",
  keywords: "Christmas light installation Hamilton, holiday lighting Southern Ontario, permanent LED lighting Burlington, commercial holiday lighting Ontario, Christmas light installers Oakville",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Festive Holiday Lighting",
    title: "Festive Holiday Lighting | Classic Christmas Lights & Permanent LED, Southern Ontario",
    description: "Classic Christmas lights installed each season, or permanent LED rooflines that stay up all year. Insured crews, free quotes, Hamilton to Niagara.",
    url: "https://festiveholidaylighting.ca",
    images: [{ url: "/images/xmas-gallery/upscale-brick-home-warm-white-roofline-christmas-lights-01.jpg", width: 1600, height: 1205, alt: "Brick home with warm white roofline Christmas lights installed by Festive Holiday Lighting" }],
  },
  twitter: { card: "summary_large_image", title: "Festive Holiday Lighting | Southern Ontario", description: "Classic Christmas lights + permanent LED systems. Free quote. (289) 426-5764." },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: "https://festiveholidaylighting.ca" },
};

export const viewport: Viewport = { themeColor: "#FFFDFA" };

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://festiveholidaylighting.ca/#organization",
      name: "Festive Holiday Lighting",
      url: "https://festiveholidaylighting.ca",
      logo: { "@type": "ImageObject", url: "https://festiveholidaylighting.ca/images/logo.png" },
      telephone: "+1-289-426-5764",
      founder: { "@type": "Person", name: "Cameron Blancher" },
      areaServed: { "@type": "AdministrativeArea", name: "Southern Ontario" },
      sameAs: ["https://facebook.com/festiveholidaylighting", "https://instagram.com/festiveholidaylighting"],
    },
    {
      "@type": "WebSite",
      "@id": "https://festiveholidaylighting.ca/#website",
      url: "https://festiveholidaylighting.ca",
      name: "Festive Holiday Lighting",
      inLanguage: "en-CA",
      publisher: { "@id": "https://festiveholidaylighting.ca/#organization" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${display.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
        {children}
      </body>
    </html>
  );
}
