import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Decks, Fences & Concrete | London Ontario`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    locale: "en_CA",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/images/logo.png", apple: "/images/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
