import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://festiveholidaylighting.ca"),
  title: {
    default: "Festive Holiday Lighting | Classic Christmas Lights & Permanent LED, Southern Ontario",
    template: "%s | Festive Holiday Lighting",
  },
  description:
    "Classic Christmas light installation and permanent app-controlled LED roofline lighting for homes and businesses across Southern Ontario. Hamilton, Burlington, Oakville, Mississauga, Niagara. Free quote.",
  keywords:
    "holiday lighting installation Ontario, Christmas light installation Hamilton, permanent LED lighting Southern Ontario, professional Christmas lights, commercial holiday lighting Ontario",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Festive Holiday Lighting",
    title: "Festive Holiday Lighting | Professional Christmas & Permanent Lighting Southern Ontario",
    description:
      "Professional Christmas light installation and permanent LED systems for homes and businesses. Hamilton, Burlington, Oakville, Mississauga and across Southern Ontario.",
    url: "https://festiveholidaylighting.ca",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festive Holiday Lighting | Southern Ontario's Holiday Lighting Experts",
    description:
      "Seasonal Christmas lights + permanent LED systems. Homes & businesses. Free quote. (289) 426-5764.",
  },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: "https://festiveholidaylighting.ca" },
};

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
    <html lang="en-CA" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
        {children}
      </body>
    </html>
  );
}
