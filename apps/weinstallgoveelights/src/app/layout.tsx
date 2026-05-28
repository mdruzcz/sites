import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingEmailButton from "@/components/FloatingEmailButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weinstallgoveelights.ca"),
  title: {
    default: "We Install Govee Lights | Permanent LED Lighting Ontario",
    template: "%s | We Install Govee Lights",
  },
  description:
    "Professional Govee permanent outdoor LED light installation across Southwestern Ontario. App-controlled, weatherproof, 5-year warranty. Get a free quote today.",
  openGraph: {
    siteName: "We Install Govee Lights",
    type: "website",
    locale: "en_CA",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingEmailButton />
      </body>
    </html>
  );
}
