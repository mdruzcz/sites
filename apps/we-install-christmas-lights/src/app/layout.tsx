import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Professional Christmas Light Installation | We Install Christmas Lights",
    template: "%s | We Install Christmas Lights",
  },
  description:
    "Get expert Christmas light installation and holiday decorating services for homes and businesses across South-Western Ontario. Transform your space with dazzling, safe, hassle-free festive displays.",
  keywords: [
    "Christmas light installation London Ontario",
    "holiday light installer",
    "commercial Christmas lighting",
    "residential Christmas decorators",
    "permanent holiday lights",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "Professional Christmas Light Installation | We Install Christmas Lights",
    description:
      "Easy, custom, holiday lighting in as little as 1 day. Award-winning installer serving London ON and South-Western Ontario.",
    url: site.url,
    images: [{ url: "/images/og-default.jpg", alt: "We Install Christmas Lights — Professional Christmas Light Installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Install Christmas Lights — Professional Christmas Light Installation",
    description:
      "Easy, custom, holiday lighting in as little as 1 day. Serving London ON and South-Western Ontario.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${montserrat.variable} ${sourceSans.variable} antialiased`}>
      <body>
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${site.url}/#business`,
              name: site.name,
              url: site.url,
              telephone: site.phone,
              email: site.email,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: site.address.street,
                addressLocality: site.address.city,
                addressRegion: site.address.region,
                postalCode: site.address.postalCode,
                addressCountry: site.address.country,
              },
              areaServed: [
                "London", "Strathroy", "Woodstock", "Waterloo", "St. Thomas", "Milton", "Oakville",
                "Mississauga", "Cambridge", "Guelph", "Georgetown", "Etobicoke", "Burlington",
                "Hamilton", "Ingersoll", "Kitchener", "Brampton", "Ancaster"
              ].map((n) => ({ "@type": "City", name: n })),
              sameAs: Object.values(site.social),
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: site.googleRating,
                reviewCount: site.reviewCount,
              },
            }),
          }}
        />
        <NavBar />
        <main>{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
