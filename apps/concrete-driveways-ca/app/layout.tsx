import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | London ON Concrete Contractor`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "concrete driveways",
    "concrete contractor London Ontario",
    "stamped concrete driveways",
    "exposed aggregate driveway",
    "concrete patios London",
    "driveway installation",
    "driveway repair",
    ...site.serviceAreas.map((c) => `concrete driveways ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: `${site.name} | London ON Concrete Contractor`,
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
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="76444089-333e-4953-a4f3-ed5c3e2580a4" strategy="afterInteractive" />
      </body>
    </html>
  );
}
