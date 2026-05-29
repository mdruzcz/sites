import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceAreas, getArea, site } from '@/lib/site';
import { HomePage } from '@/components/HomePage';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return serviceAreas.map(a => ({ city: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = getArea(city);
  if (!area) return {};
  return {
    title: `Permanent LED Lighting in ${area.city}, Ontario | Forever Lights`,
    description: `Forever Lights installs permanent outdoor LED track lighting in ${area.city}, ON. App-controlled, weatherproof, 5-year warranty. Never hang Christmas lights again. Free quote!`,
    openGraph: {
      title: `Permanent LED Lighting in ${area.city}, Ontario | Forever Lights`,
      description: `Professional permanent LED soffit lighting for ${area.city}, Ontario homes. Weatherproof, invisible by day, stunning at night.`,
      images: [{ url: '/images/hero-home-2.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = getArea(city);
  if (!area) notFound();

  return (
    <HomePage
      city={area.city}
      cityLabel={area.label}
      citySlug={area.slug}
    />
  );
}
