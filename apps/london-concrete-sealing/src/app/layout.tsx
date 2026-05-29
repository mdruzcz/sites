import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://londonconcretesealing.ca'),
  title: {
    default: 'London Concrete Sealing | Professional Concrete Sealing & Repair',
    template: '%s | London Concrete Sealing',
  },
  description: 'London Ontario\'s trusted concrete sealing specialists. Over a decade of experience protecting driveways, patios, and stamped concrete across London, St. Thomas, Woodstock & Stratford.',
  openGraph: {
    siteName: 'London Concrete Sealing',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={inter.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
