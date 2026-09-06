import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { StickyBar } from "@/components/StickyBar";
import { site } from "@/lib/site";
import { Analytics } from "@sites/ui/analytics";

const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display", display: "swap" });

const OG_IMAGE = "/images/gallery/stamped-driveway-after-sealing.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "All-Seal Concrete Sealing | Woodstock & Southwestern Ontario",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ["concrete sealing Woodstock", "driveway sealing Ontario", "patio sealing", "stamped concrete sealing", "garage floor sealing", "pool deck sealing", ...site.serviceAreas.map((c) => `concrete sealing ${c}`)],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "All-Seal Concrete Sealing | Woodstock & Southwestern Ontario",
    description: "Driveways, patios, garage floors, pool decks and stamped concrete sealed in high gloss, semi-gloss or matte. Free inspections. Protect. Preserve. Seal.",
    url: site.url,
    images: [{ url: OG_IMAGE, width: 600, height: 400, alt: "Stamped concrete driveway after sealing by All-Seal Concrete Sealing" }],
  },
  twitter: { card: "summary_large_image", title: "All-Seal Concrete Sealing", description: "Protect. Preserve. Seal. Free quotes across Southwestern Ontario." },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = { themeColor: "#15181C" };

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo.svg` },
      telephone: "+1-519-266-6796",
      slogan: site.tagline,
      areaServed: { "@type": "AdministrativeArea", name: "Southwestern Ontario" },
      contactPoint: { "@type": "ContactPoint", telephone: "+1-519-266-6796", contactType: "customer service", areaServed: "CA", availableLanguage: "English" },
    },
    { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: "en-CA", publisher: { "@id": `${site.url}/#organization` } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
        <NavBar />
        <main className="flex-1 pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyBar />
        <Analytics websiteId="2c50f402-fe1d-4fe1-bbd9-6d45bed939be" />
      </body>
    </html>
  );
}
