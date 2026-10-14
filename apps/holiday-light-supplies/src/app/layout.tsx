import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UIProvider } from "@/components/ui-context";
import { OfferPopup } from "@/components/offer-popup";
import { MiniCartDrawer } from "@/components/mini-cart-drawer";
import { PredictiveSearch } from "@/components/predictive-search";
import { QuoteFab } from "@/components/quote-fab";
import { SITE_URL } from "@/lib/utils";
import { FOUNDED, SHIP_FROM, SITE_EMAIL, SITE_NAME } from "@/lib/site";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-loaded",
  display: "swap"
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif-loaded",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Commercial Christmas Lights & Décor Wholesale Canada | Holiday Light Supplies",
    template: "%s | Holiday Light Supplies"
  },
  description:
    "Commercial-grade Christmas lights, 3D LED displays, pole-mount décor, wreaths and garland for malls, BIAs, municipalities and installers. Shipped from Ontario across Canada.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_CA",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Commercial Christmas lighting by Holiday Light Supplies" }]
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "OnlineStore"],
        "@id": `${SITE_URL}/#org`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        image: `${SITE_URL}/images/og-default.jpg`,
        email: SITE_EMAIL,
        foundingDate: String(FOUNDED),
        description:
          "Commercial and wholesale Christmas lighting and décor supplier shipping from London, Ontario to malls, BIAs, municipalities, property managers and professional installers across Canada.",
        address: { "@type": "PostalAddress", addressLocality: SHIP_FROM.split(",")[0], addressRegion: "ON", addressCountry: "CA" },
        areaServed: { "@type": "Country", name: "Canada" },
        knowsAbout: ["commercial Christmas lights", "C9 LED bulbs", "3D LED light displays", "pole mount holiday decorations", "commercial wreaths and garland", "permanent LED roofline lighting"],
        contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE_EMAIL, availableLanguage: "English", areaServed: "CA" }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/shop?q={search_term_string}` },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en-CA" className={`${poppins.variable} ${lora.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <UIProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          {/* Overlays */}
          <MiniCartDrawer />
          <PredictiveSearch />
          <OfferPopup />
          <QuoteFab />
        </UIProvider>
        <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="44716b8c-e317-4311-ab02-280bc2d48a70" strategy="afterInteractive" />
      </body>
    </html>
  );
}
