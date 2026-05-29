import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Award-Winning Christmas Light Installation Across the GTA`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    images: [
      {
        url: "/images/hero.jpg",
        alt: "Professional Christmas light installation on a GTA home by GTA Christmas Lighting",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              logo: `${site.url}/images/logo.png`,
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+1-289-475-0433",
                  contactType: "customer service",
                  areaServed: "CA",
                  availableLanguage: "English",
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+1-519-266-6734",
                  contactType: "customer service",
                  areaServed: "CA",
                  availableLanguage: "English",
                },
              ],
              sameAs: [site.facebookUrl, site.instagramUrl],
            }),
          }}
        />
      </body>
    </html>
  );
}
