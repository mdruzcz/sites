import type { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Permanent LED Outdoor Lighting — London, Ontario | Forever Lights',
  description: 'Forever Lights installs permanent LED track lighting on London Ontario homes. App-controlled, weatherproof, 5-year warranty. Never hang Christmas lights again. Free quote!',
  openGraph: {
    title: 'Permanent LED Outdoor Lighting — London, Ontario | Forever Lights',
    description: 'App-controlled permanent LED soffit lighting for London, Ontario homes. Weatherproof, invisible by day, stunning at night.',
    images: [{ url: '/images/hero-home-2.jpg', width: 1200, height: 630 }],
  },
};

export default function Home() {
  return <HomePage />;
}
