import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/components/ui-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TrustStrip } from "@/components/trust-strip";
import { CartDrawer } from "@/components/cart-drawer";
import { SITE } from "@/lib/utils";
import { getAllKits } from "@/lib/kits";
import { toSnapshot } from "@/lib/kits-snapshot";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Pre-Built White Shaker Kitchen Packages | Belmont, ON`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDescription,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — Complete Kitchens, Assembled & Ready for Pickup`,
    description: SITE.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.shortDescription,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const kits = (await getAllKits()).map(toSnapshot);
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <UIProvider kits={kits}>
          <TrustStrip />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <a
            href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}
            aria-label={`Call ${SITE.name}`}
            className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg hover:bg-[var(--color-accent-dark)] transition-colors lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z" />
            </svg>
          </a>
        </UIProvider>
              <Script defer src="https://analytics.masterdecker.com/script.js" data-website-id="2454ee88-c0a6-43ac-a1ac-e38c611cebd3" strategy="afterInteractive" />
      </body>
    </html>
  );
}
