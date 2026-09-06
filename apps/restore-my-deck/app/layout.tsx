import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Fraunces({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });

const OG_IMAGE = "/images/gallery/team-deck-planters-brick-home.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Restore My Deck | Deck & Fence Staining Kitchener-Waterloo", template: "%s | Restore My Deck" },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_CA",
    url: site.url,
    title: "Restore My Deck | Deck & Fence Staining Kitchener-Waterloo",
    description: "Eco-friendly cleaning, 80-grit sanding and brush-applied oil-based stain. Most decks done in two days. Free quotes across Kitchener-Waterloo and Southwestern Ontario.",
    images: [{ url: OG_IMAGE, width: 1600, height: 1200, alt: "Restored and stained deck behind a brick home in Kitchener by Restore My Deck" }],
  },
  twitter: { card: "summary_large_image", title: "Restore My Deck | Kitchener-Waterloo", description: "Brush-applied deck and fence staining. Free quotes." },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = { themeColor: "#FBF8F3" };

const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/images/logo.png` },
      telephone: "+1-226-476-2055",
      email: site.email,
      founder: { "@type": "Person", name: site.founder },
      areaServed: { "@type": "AdministrativeArea", name: "Kitchener-Waterloo and Southwestern Ontario" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "en-CA",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }} />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="f701654a-050f-4b72-9e88-9ed41244db3f" strategy="afterInteractive" />
      </body>
    </html>
  );
}
