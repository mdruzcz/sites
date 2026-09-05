import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Urbanist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { INSTALL_CITIES } from "@/lib/installation";
import { BRAND, SITE_URL } from "@/lib/utils";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const display = Urbanist({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Illumi Track Lights | Permanent LED Soffit Track Lighting Kits & Installation",
    template: "%s | Illumi Track Lights"
  },
  description:
    "Permanent LED soffit track lighting for Canadian homes: 12V RGBW pucks in colour-matched aluminum track, WiFi app control, complete DIY kits from $1,265 and professional installation across Southwestern Ontario.",
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    url: SITE_URL,
    locale: "en_CA",
    images: [{ url: "/images/photos/hero-home-twilight.webp", width: 2200, height: 1650, alt: "Home outlined in warm white permanent LED soffit track lighting at twilight" }]
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, "max-image-preview": "large" }
};

export const viewport: Viewport = { themeColor: "#1d2026" };

const UMAMI_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "OnlineStore"],
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.jpg` },
      description: "Permanent LED soffit track lighting kits, 12V parts and professional installation from London, Ontario.",
      address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "ON", addressCountry: "CA" },
      areaServed: { "@type": "Country", name: "Canada" },
      currenciesAccepted: "CAD",
      hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", applicableCountry: "CA", returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: 30, returnMethod: "https://schema.org/ReturnByMail", returnFees: "https://schema.org/ReturnShippingFees" }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND.name,
      url: SITE_URL,
      inLanguage: "en-CA",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?q={search_term_string}` }, "query-input": "required name=search_term_string" }
    },
    {
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": `${SITE_URL}/#installer`,
      name: `${BRAND.name} Installation`,
      url: `${SITE_URL}/installation`,
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "ON", addressCountry: "CA" },
      areaServed: INSTALL_CITIES.map((c) => ({ "@type": "City", name: `${c.city}, Ontario` })),
      priceRange: "$$"
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${sans.variable} ${display.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <UIProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <MiniCartDrawer />
        </UIProvider>
        {UMAMI_ID && <Script src="https://analytics.masterdecker.com/script.js" data-website-id={UMAMI_ID} strategy="afterInteractive" defer />}
      </body>
    </html>
  );
}
