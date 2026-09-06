import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallNowFab from "@/components/CallNowFab";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Concrete Driveways & Patios in Brantford`,
    template: `%s | ${site.name}`,
  },
  description:
    "Brantford's trusted concrete forming contractors. Expert driveway installation, stamped concrete, patios & broom finish. 32 MPa strength. Free quotes.",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: "/images/Concrete-Driveway-Installation-1.png",
        width: 1200,
        height: 630,
        alt: "Concrete driveway installation by Brantford Concrete Forming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="22227c8b-2de5-4c56-b09a-6f313eaf8c5d" strategy="afterInteractive" />
      </body>
    </html>
  );
}
