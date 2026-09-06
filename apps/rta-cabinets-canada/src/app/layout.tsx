import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { CartProvider } from "@/lib/ui-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "White Shaker RTA Kitchen Cabinets, Shipped Canada-Wide | RTA Cabinets Canada",
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: "White Shaker RTA Kitchen Cabinets, Shipped Canada-Wide",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "White Shaker RTA Kitchen Cabinets | RTA Cabinets Canada",
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.name,
    url: site.url,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    areaServed: { "@type": "Country", name: "Canada" },
    priceRange: "$$",
  };

  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <FloatingCall />
        </CartProvider>
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="040d3789-86d8-45b1-b874-d9e3683aa675" strategy="afterInteractive" />
      </body>
    </html>
  );
}
