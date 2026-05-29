import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@sites/ui/analytics";

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
  metadataBase: new URL("https://londondeckbuilder.ca"),
  title: {
    default: "London Deck Builder | Expert Deck Building Services in London, Ontario",
    template: "%s | London Deck Builder",
  },
  description:
    "London's trusted deck builders. PT, Cedar, Composite & PVC decking with a 5-year workmanship warranty. Free quotes. Serving London, St. Thomas, Woodstock & surrounding areas.",
  keywords:
    "deck builders London Ontario, composite deck builders, cedar deck, deck contractor, London deck builder, deck builder Woodstock, deck builder St Thomas",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "London Deck Builder",
    title: "London Deck Builder | Decks Built to Last",
    description:
      "Premium PT, Cedar, Composite & PVC decks across London, St. Thomas & Woodstock. 5-year workmanship warranty.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "London Deck Builder — premium deck contractor in London, Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "London Deck Builder | Decks Built to Last",
    description:
      "Premium PT, Cedar, Composite & PVC decks across London, St. Thomas & Woodstock.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
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
        <Analytics websiteId="9fd88687-4fc3-4591-9fbf-a31887fce3fc" />
      </body>
    </html>
  );
}
