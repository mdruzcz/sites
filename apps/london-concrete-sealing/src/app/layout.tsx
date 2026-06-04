import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { site, services, serviceAreas } from '@/lib/content';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://londonconcretesealing.ca'),
  title: {
    default: 'Concrete Sealing London Ontario | Driveway & Patio Sealing Experts',
    template: '%s | London Concrete Sealing',
  },
  description:
    "London Ontario's trusted concrete sealing specialists. Over a decade protecting driveways, patios & stamped concrete across London, St. Thomas, Woodstock & surrounding areas. Free quote.",
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'London Concrete Sealing',
    locale: 'en_CA',
    type: 'website',
    images: ['/images/concrete-sealing-driveway.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/images/favicon.png',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://londonconcretesealing.ca/#business',
    name: site.name,
    image: 'https://londonconcretesealing.ca/images/concrete-sealing-driveway.jpg',
    logo: 'https://londonconcretesealing.ca/images/logo.png',
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    areaServed: serviceAreas.map((a) => ({ '@type': 'City', name: a.name })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    makesOffer: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.name },
    })),
  };

  return (
    <html lang="en-CA" className={poppins.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
