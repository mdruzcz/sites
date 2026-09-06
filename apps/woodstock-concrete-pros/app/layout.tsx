import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Professional Concrete Contractors in Woodstock, ON`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "concrete contractors Woodstock",
    "concrete driveways Woodstock",
    "stamped concrete patios Woodstock",
    "concrete repair Woodstock ON",
    "concrete walkways Woodstock",
    ...site.serviceAreas.map((c) => `concrete contractors ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
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

        {/* Floating Call Button — mobile only */}
        <a
          href={site.phoneHref}
          className="fab-call"
          aria-label={`Call ${site.name}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </a>
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="7ddfa5a8-9fbb-4d76-8e0f-78cded310c96" strategy="afterInteractive" />
      </body>
    </html>
  );
}
