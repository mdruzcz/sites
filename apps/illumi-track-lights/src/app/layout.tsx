import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { INSTALL_CITIES } from "@/lib/installation";
import { kits } from "@/lib/kits";
import { BRAND, POSTAL_ADDRESS, SITE_URL, formatCad } from "@/lib/utils";

const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const display = Source_Serif_4({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap", weight: ["400", "600", "700"] });

const fromPrice = formatCad(Math.min(...kits.map((k) => k.price)), 0);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Illumi Track Lights | Permanent LED Track Lighting Kits, Free Shipping",
    template: "%s | Illumi Track Lights"
  },
  description: `Permanent LED track lighting kits from ${fromPrice} and every 12V part sold separately. Free shipping on every order in Canada, or free pickup in Woodstock, Ontario.`,
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    url: SITE_URL,
    locale: "en_CA",
    images: [{ url: "/images/photos/hero-home-twilight.webp", width: 2200, height: 1650, alt: "Home outlined in warm white permanent LED track lighting at twilight" }]
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, "max-image-preview": "large" }
};

export const viewport: Viewport = { themeColor: "#232b63" };

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "OnlineStore"],
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      url: SITE_URL,
      email: BRAND.email,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.jpg` },
      description: "Permanent LED track lighting kits and 12V parts, shipped free across Canada from Woodstock, Ontario.",
      address: POSTAL_ADDRESS,
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
      address: POSTAL_ADDRESS,
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
        <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="edace73f-1d92-424c-a877-8c2c71212636" strategy="afterInteractive" />
      </body>
    </html>
  );
}
