import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { BRAND, SITE_URL } from "@/lib/utils";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const display = Outfit({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap", weight: ["500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Permanent Lighting Direct | DIY Permanent LED Roofline Lighting Kits, Canada",
    template: "%s | Permanent Lighting Direct"
  },
  description:
    "Professional-grade 12V RGBW permanent roofline lighting sold as complete DIY kits from $1,265. Aluminum soffit track, WiFi app control, 5-year warranty. Ships across Canada from London, Ontario.",
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    url: SITE_URL,
    locale: "en_CA",
    images: [{ url: "/images/photos/hero-multicolour-wide.webp", width: 1800, height: 1200, alt: "Home outlined in permanent LED roofline lights at night" }]
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, "max-image-preview": "large" }
};

export const viewport: Viewport = { themeColor: "#0b1220" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "OnlineStore"],
      "@id": `${SITE_URL}/#org`,
      name: BRAND.name,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description: "Canadian online store for DIY permanent LED roofline lighting kits and 12V components.",
      address: { "@type": "PostalAddress", addressLocality: "London", addressRegion: "ON", addressCountry: "CA" },
      areaServed: { "@type": "Country", name: "Canada" },
      currenciesAccepted: "CAD",
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "CA",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND.name,
      publisher: { "@id": `${SITE_URL}/#org` },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?q={search_term_string}` }, "query-input": "required name=search_term_string" }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${sans.variable} ${display.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <UIProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <MiniCartDrawer />
        </UIProvider>
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="19f0f503-8b87-401e-8dd9-916ae1bd08c0" strategy="afterInteractive" />
      </body>
    </html>
  );
}
