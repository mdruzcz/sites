import type { Metadata } from 'next';
import { Inter, Archivo } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingCTA } from '@/components/FloatingCTA';
import { site, serviceAreas, testimonials } from '@/lib/site';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const archivo = Archivo({ subsets: ['latin'], display: 'swap', variable: '--font-archivo', weight: ['500', '600', '700', '800'] });

const BASE = `https://${site.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: `${site.name} | Permanent Roofline Lighting — London, Ontario`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: 'en_CA',
    type: 'website',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'Forever Lights - Permanent Roofline Lighting' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE}/#business`,
    name: site.name,
    description: site.description,
    url: BASE,
    telephone: site.phone,
    email: site.email,
    logo: `${BASE}/images/brand/logo-stacked.png`,
    image: `${BASE}/images/og-default.jpg`,
    address: { '@type': 'PostalAddress', addressLocality: 'London', addressRegion: 'ON', addressCountry: 'CA' },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    ],
    areaServed: serviceAreas.map(a => ({ '@type': 'City', name: `${a.city}, Ontario` })),
    priceRange: '$$',
    slogan: site.tagline,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating, reviewCount: testimonials.length, bestRating: 5, worstRating: 1 },
    review: testimonials.map(t => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
      reviewBody: t.text,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    url: BASE,
    name: site.name,
    publisher: { '@id': `${BASE}/#business` },
    inLanguage: 'en-CA',
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] btn btn-dark btn-sm">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
