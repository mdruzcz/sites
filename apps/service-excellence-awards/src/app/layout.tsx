import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const sans = Inter({
  variable: "--font-sans-stack",
  subsets: ["latin"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif-stack",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const SITE_NAME = "Service Excellence Awards Canada";
const SITE_DESCRIPTION =
  "Canada's recognition program for the best home renovation and service contractors. Discover award-winning concrete, deck, roofing, kitchen, and renovation specialists across Ontario.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://serviceexcellenceawards.ca";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "service excellence awards",
    "best contractor Ontario",
    "home renovation awards Canada",
    "concrete contractor awards",
    "deck builder awards",
    "kitchen renovation awards",
    "roofing awards Ontario",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${sans.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-stone-900">
        {children}
      </body>
    </html>
  );
}
