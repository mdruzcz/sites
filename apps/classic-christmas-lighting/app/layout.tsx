import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
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
  metadataBase: new URL("https://classicchristmaslighting.ca"),
  title: {
    default: "Classic Christmas Lighting | Professional Christmas Light Installation Kitchener-Waterloo",
    template: "%s | Classic Christmas Lighting",
  },
  description:
    "Professional Christmas light installation in Kitchener-Waterloo, Cambridge, Guelph, Hamilton & Southern Ontario. Family-owned, 15 years experience. Full installation, maintenance & takedown. Get a free quote.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Classic Christmas Lighting",
    images: [
      {
        url: "/images/Classic-Christmas-Lighting.webp",
        alt: "Professional Christmas light installation in Kitchener-Waterloo Ontario by Classic Christmas Lighting",
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
              name: "Classic Christmas Lighting",
              url: "https://classicchristmaslighting.ca",
              logo: "https://classicchristmaslighting.ca/images/cropped-classic-christmas-lighting-logo-1-2048x874.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-226-476-2038",
                contactType: "customer service",
                areaServed: "CA",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
