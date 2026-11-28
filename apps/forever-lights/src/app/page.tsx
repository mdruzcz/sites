import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Permanent Roofline Lighting in London, Ontario | Forever Lights',
  description:
    'Permanent LED roofline lighting installed on London, Ontario homes, or shipped across Canada as a DIY kit. App-controlled, rated to -40°C, 5-year parts warranty.',
  alternates: { canonical: 'https://foreverlights.ca/' },
  openGraph: {
    title: 'Permanent Roofline Lighting in London, Ontario | Forever Lights',
    description: 'Never hang Christmas lights again. App-controlled permanent LED lighting, installed once and enjoyed every holiday and every night.',
    url: 'https://foreverlights.ca/',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Permanent Roofline Lighting in London, Ontario | Forever Lights',
    description: 'Never hang Christmas lights again. App-controlled permanent LED lighting for London and Southwestern Ontario homes.',
  },
};

export default function Home() {
  return <HomePage />;
}
