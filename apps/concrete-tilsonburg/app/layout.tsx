import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Concrete Tilsonburg | Tillsonburg ON Concrete Contractor",
    template: "%s | Concrete Tilsonburg",
  },
  description: site.description,
  keywords: [
    "concrete driveways Tillsonburg",
    "concrete contractor Tillsonburg Ontario",
    "stamped concrete Tillsonburg",
    "Oxford County concrete",
    "concrete patios Tillsonburg",
    "garage floor concrete Oxford County",
    "concrete repair Tillsonburg",
    "concrete resurfacing Southwestern Ontario",
    ...site.serviceAreas.map((c) => `concrete contractor ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "Concrete Tilsonburg | Tillsonburg ON Concrete Contractor",
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
      </body>
    </html>
  );
}
