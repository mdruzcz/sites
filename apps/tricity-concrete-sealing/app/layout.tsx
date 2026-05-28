import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { site } from "@/lib/site";
import { localBusinessSchema } from "@/lib/jsonld";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "TriCity Concrete Sealing | Professional Concrete Sealing SW Ontario",
    template: "%s | TriCity Concrete Sealing",
  },
  description: site.description,
  keywords: [
    "concrete sealing London Ontario",
    "driveway sealing London ON",
    "stamped concrete sealing Southwestern Ontario",
    "patio sealing London Ontario",
    "concrete sealer Woodstock",
    "concrete sealing Brantford",
    "walkway sealing St Thomas",
    "concrete sealing company near me",
    ...site.serviceAreas.map((c) => `concrete sealing ${c}`),
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "TriCity Concrete Sealing | Professional Concrete Sealing SW Ontario",
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
    <html lang="en" className={poppins.variable}>
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
