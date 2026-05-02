import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

const siteUrl = "https://www.mattdruzcz.ca";

export const metadata: Metadata = {
  title: "Matt Druzcz | Realtor in London, Aylmer & St. Thomas, Ontario",
  description:
    "Matt Druzcz is a trusted local realtor serving London, Aylmer, and St. Thomas, Ontario. Expert in residential, single-family, and investment properties. Honest advice, no middlemen, proven results.",
  keywords: [
    "realtor London Ontario",
    "homes for sale London ON",
    "Aylmer realtor",
    "St Thomas realtor",
    "buy home London Ontario",
    "sell home London Ontario",
    "Matt Druzcz realtor",
    "London ON real estate agent",
    "Elgin County realtor",
    "investment properties London Ontario",
  ],
  openGraph: {
    title: "Matt Druzcz | Your Local Realtor — London, Aylmer & St. Thomas",
    description:
      "Honest advice. No middlemen. Real results. Matt Druzcz helps you buy, sell, or invest in London, Aylmer & St. Thomas, Ontario.",
    type: "website",
    url: siteUrl,
    siteName: "Matt Druzcz Real Estate",
    locale: "en_CA",
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
    "Trusted local realtor specialising in residential and investment properties across London, Aylmer, and St. Thomas, Ontario.",
  areaServed: [
    { "@type": "City", name: "London", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
    { "@type": "City", name: "Aylmer", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
    { "@type": "City", name: "St. Thomas", containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" } },
  ],
  knowsAbout: ["Residential Real Estate", "Investment Properties", "Home Buying", "Home Selling", "Bungalows"],
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
        {children}
        {recaptchaSiteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
