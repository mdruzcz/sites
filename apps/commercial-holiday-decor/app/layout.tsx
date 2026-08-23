import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { JsonLd } from "@/components/JsonLd";
import { businessGraph } from "@/lib/seo";
import { site } from "@/lib/site";

// Both wired through CSS variables — naming a font literally in globals.css
// never matches next/font's generated family.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans-loaded", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display-loaded", display: "swap" });

const TITLE = "Commercial Christmas Decor & Installation | Southwestern Ontario";
const DESCRIPTION =
  "Commercial-grade Christmas decor for Southwestern Ontario: 4′ wreaths, mega trees, large LED displays and custom fabrication — designed, installed, serviced and taken down by one insured contractor.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: `%s | ${site.name}` },
  description: DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: "Commercial holiday lighting & decor",
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: site.url },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/icon.svg" }]
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    url: site.url,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Commercial Holiday Decor — illuminated commercial Christmas displays across Southwestern Ontario"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1511" }
  ],
  colorScheme: "light"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <JsonLd data={businessGraph()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--color-green)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="min-h-[60vh]">{children}</main>
        <Footer />
        <CallNowFab />
      </body>
    </html>
  );
}
