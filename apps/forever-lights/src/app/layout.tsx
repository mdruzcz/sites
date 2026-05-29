import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { site } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),
  title: {
    default: `${site.name} | Permanent Outdoor LED Lighting — London, Ontario`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/images/hero-home-2.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  description: site.description,
  url: `https://${site.domain}`,
  telephone: site.phone,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },
  openingHours: 'Mo-Fr 08:00-17:00',
  areaServed: ['London', 'St. Thomas', 'Woodstock', 'Brantford', 'Stratford', 'Ingersoll', 'Tillsonburg'].map(city => ({
    '@type': 'City',
    name: city,
  })),
  image: `https://${site.domain}/images/hero-home-2.jpg`,
  priceRange: '$$',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={inter.className}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
