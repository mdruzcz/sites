import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";

// Both wired through CSS variables — naming a font literally in globals.css
// never matches next/font's generated family.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const sora = Sora({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap" });

const TITLE = "Commercial Christmas Decor & Installation | Southwestern Ontario";
const DESCRIPTION =
  "Commercial-grade Christmas decor for Southwestern Ontario: 4′ wreaths, 14′ mega trees, large LED displays and custom fabrication — designed, installed, serviced and taken down by one insured contractor.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: `%s | ${site.name}` },
  description: DESCRIPTION,
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    url: site.url,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/photos/hero-commercial-wreath.webp",
        width: 800,
        height: 798,
        alt: "Large lit commercial Christmas wreath with a red bow"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/photos/hero-commercial-wreath.webp"]
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: DESCRIPTION,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/photos/hero-commercial-wreath.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country
    },
    areaServed: site.serviceAreas.map((c) => ({ "@type": "City", name: c })),
    priceRange: "$$$"
  };

  return (
    <html lang="en-CA" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
