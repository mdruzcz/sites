import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@sites/ui/analytics";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallBtn from "@/components/FloatingCallBtn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const siteUrl = "https://www.mattdruzcz.ca";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Matt Druzcz | Realtor in London, Aylmer & St. Thomas, Ontario",
    template: "%s | Matt Druzcz — Realtor",
  },
  description:
    "Matt Druzcz is a trusted local realtor serving London, Aylmer, St. Thomas, and Woodstock, Ontario. Expert in residential, investment, and flip properties. Honest advice, no middlemen, proven results.",
  keywords: [
    "realtor London Ontario",
    "homes for sale London ON",
    "Aylmer realtor",
    "St Thomas realtor",
    "buy home London Ontario",
    "sell home London Ontario",
    "Matt Druzcz realtor",
    "London ON real estate agent",
    "investment properties London Ontario",
    "property flipping London Ontario",
    "Woodstock realtor",
  ],
  openGraph: {
    title: "Matt Druzcz | Your Local Realtor — London, Aylmer & St. Thomas",
    description:
      "Honest advice. No middlemen. Real results. Matt Druzcz helps you buy, sell, or invest in London, Aylmer, St. Thomas & Woodstock, Ontario.",
    type: "website",
    url: siteUrl,
    siteName: "Matt Druzcz Real Estate",
    locale: "en_CA",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Matt Druzcz — Realtor in London, Ontario" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matt Druzcz | Realtor in London, Aylmer & St. Thomas",
    description: "Honest advice. No middlemen. Real results.",
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Matt Druzcz",
  url: siteUrl,
  telephone: "+15198786735",
  email: "matt.druzcz@gmail.com",
  image: `${siteUrl}/headshot.jpg`,
  description:
    "Licensed realtor and investor specialising in residential, investment, and flip properties across London, Aylmer, St. Thomas, and Woodstock, Ontario.",
  areaServed: [
    { "@type": "City", name: "London", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
    { "@type": "City", name: "Aylmer", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
    { "@type": "City", name: "St. Thomas", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
    { "@type": "City", name: "Woodstock", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
    { "@type": "City", name: "Belmont", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
  ],
  knowsAbout: [
    "Residential Real Estate",
    "Investment Properties",
    "Property Flipping",
    "Long-Term Rentals",
    "Home Buying",
    "Home Selling",
    "Home Finance",
    "Home Renovation",
  ],
  sameAs: [
    "https://www.facebook.com/mattdruzcz",
    "https://www.linkedin.com/in/mattdruzcz",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <FloatingCallBtn />
        {recaptchaSiteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="lazyOnload"
          />
        )}
        <Analytics websiteId="20a80e2f-23f5-4e07-845c-76cb178b5cce" />
      </body>
    </html>
  );
}
