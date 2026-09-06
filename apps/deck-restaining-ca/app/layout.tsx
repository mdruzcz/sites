import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: {
    default: `${site.name} | Professional Deck & Fence Staining in Oakville & Burlington`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "deck restaining",
    "deck staining Oakville",
    "fence staining Burlington",
    "oil-based deck stain",
    "deck restoration Ontario",
    ...site.serviceAreas.map((c) => `deck staining ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    images: [
      {
        url: "/images/deck10.jpeg",
        width: 1200,
        height: 630,
        alt: `${site.name} — professional deck and fence staining in Oakville and Burlington`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/deck10.jpeg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema()),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {/* Floating Call Button — mobile */}
        <a
          href={site.phoneHref}
          className="fixed bottom-6 right-6 z-50 md:hidden w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--accent-dark)] transition-colors"
          aria-label="Call us"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="3ce81293-cbe5-4040-85a5-37b2545322e7" strategy="afterInteractive" />
      </body>
    </html>
  );
}
