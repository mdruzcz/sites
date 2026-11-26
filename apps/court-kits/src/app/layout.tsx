import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd, organizationLd } from "@/lib/jsonld";
import { photos } from "@/lib/photos";
import { phoneHref, site } from "@/lib/site";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"], display: "swap", variable: "--font-lato" });

const og = photos[site.photos.og];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.homeTitle, template: `%s | ${site.name}` },
  description: site.metaDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    url: site.url,
    title: site.homeTitle,
    description: site.metaDescription,
    images: [{ url: og.src, width: og.width, height: og.height, alt: "Pickleball courts lit at night, seen from above" }],
  },
  twitter: { card: "summary_large_image", title: site.homeTitle, description: site.metaDescription, images: [og.src] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = { themeColor: site.theme.inkDeep };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = site.theme;
  const vars = {
    "--accent": t.accent,
    "--accent-ink": t.accentInk,
    "--accent-soft": t.accentSoft,
    "--cta-from": t.ctaFrom,
    "--cta-to": t.ctaTo,
    "--ink": t.ink,
    "--ink-deep": t.inkDeep,
    "--page": t.page,
  } as React.CSSProperties;

  return (
    <html lang="en-CA" className={lato.variable} style={vars}>
      {site.gtmId && <GoogleTagManager gtmId={site.gtmId} />}
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-bold">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {site.phone && phoneHref && (
          <a
            href={phoneHref}
            aria-label={`Call ${site.name} at ${site.phone}`}
            className="fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)] text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.58 3.6a1 1 0 0 1-.25 1L6.6 10.8Z" />
            </svg>
          </a>
        )}
        <JsonLd data={organizationLd()} />
        {site.umamiWebsiteId && <Script src="https://analytics.masterdecker.com/script.js" data-website-id={site.umamiWebsiteId} strategy="afterInteractive" />}
      </body>
    </html>
  );
}
