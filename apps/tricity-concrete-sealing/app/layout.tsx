import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";

const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-body" });
const display = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], display: "swap", variable: "--font-display" });

const OG_IMAGE = "/images/gallery/stamped-driveway-sealed-brick-estate-home.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TriCity Concrete Sealing | Concrete Sealing London ON & SW Ontario",
    template: "%s | TriCity Concrete Sealing",
  },
  description: site.description,
  keywords: [
    "concrete sealing London Ontario",
    "driveway sealing London ON",
    "stamped concrete sealing Southwestern Ontario",
    "patio sealing London Ontario",
    "solvent based concrete sealer Ontario",
    "matte semi-gloss gloss concrete sealer",
    "exposed aggregate sealing Ontario",
    ...site.serviceAreas.map((c) => `concrete sealing ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "TriCity Concrete Sealing | Concrete Sealing London ON & SW Ontario",
    description: "High-quality solvent-based sealers in matte, semi-gloss or gloss. Driveways, patios, stamped and exposed aggregate. 5-year warranty.",
    url: site.url,
    images: [{ url: OG_IMAGE, width: 1600, height: 900, alt: "Stamped concrete driveway sealed in a gloss finish by TriCity Concrete Sealing in London, Ontario" }],
  },
  twitter: { card: "summary_large_image", title: "TriCity Concrete Sealing | SW Ontario", description: "Solvent-based concrete sealing in matte, semi-gloss or gloss. Free quote." },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = { themeColor: "#F6F4EF" };

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` },
      telephone: "+1-519-902-0000",
      email: site.email,
      areaServed: { "@type": "AdministrativeArea", name: "Southwestern Ontario" },
      contactPoint: { "@type": "ContactPoint", telephone: "+1-519-902-0000", email: site.email, contactType: "customer service", areaServed: "CA", availableLanguage: "English" },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
