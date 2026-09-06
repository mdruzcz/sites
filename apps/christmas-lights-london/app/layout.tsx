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
  metadataBase: new URL("https://christmaslightslondon.ca"),
  title: {
    default: "Christmas Lights London | Professional Christmas Light Installation in London, ON",
    template: "%s | Christmas Lights London",
  },
  description:
    "Professional Christmas light installation in London, Ontario. Custom-cut LED lights, no ladders, 7-person team with aerial lifts. Full installation, maintenance & takedown. Get a free quote today.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Christmas Lights London",
    images: [
      {
        url: "/images/Christmaslights.jpg",
        alt: "Professional Christmas light installation in London Ontario by Christmas Lights London",
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
              name: "Christmas Lights London",
              url: "https://christmaslightslondon.ca",
              logo: "https://christmaslightslondon.ca/images/christmaslightslondon-logo-e1716917458876.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-519-471-1649",
                contactType: "customer service",
                areaServed: "CA",
                availableLanguage: "English",
              },
            }),
          }}
        />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="e5f8be90-0f58-484e-bc63-d32717cc9e8d" strategy="afterInteractive" />
      </body>
    </html>
  );
}
