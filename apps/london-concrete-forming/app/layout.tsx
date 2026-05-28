import type { Metadata } from "next";
import { Inter, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CallNowFab from "@/components/CallNowFab";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mulish = Mulish({ subsets: ["latin"], display: "swap", variable: "--font-mulish" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Concrete Driveways & Patios London, ON | London Concrete Forming",
    template: "%s | London Concrete Forming",
  },
  description: "Expert concrete contractor in London, Ontario. Driveways, patios, retaining walls, stamped concrete & more. 20+ years experience. Call 519-914-1901 for a FREE quote!",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    images: [{ url: "https://londonconcreteforming.ca/wp-content/uploads/2025/02/drive.jpg", width: 1200, height: 630, alt: "Concrete driveway by London Concrete Forming" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mulish.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}