import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "London Deck Builder | Expert Deck Building Services in London, Ontario",
  description:
    "London's trusted deck builders. PT, Cedar, Composite & PVC decking with a 5-year workmanship warranty. Free quotes. Serving London, St. Thomas & Woodstock.",
  keywords: "deck builders London Ontario, composite deck builders, cedar deck, deck contractor, London deck builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        {children}
        {recaptchaSiteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
