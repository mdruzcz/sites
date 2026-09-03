import type { Metadata } from 'next';
import { gallery, site } from '@/lib/site';
import { PageHeader, CtaBand } from '@/components/ui';
import { GalleryGrid } from '@/components/GalleryGrid';

export const revalidate = 3600;

const url = `https://${site.domain}/gallery`;

export const metadata: Metadata = {
  title: 'Gallery — Permanent LED Lighting Projects',
  description: `Browse real permanent LED lighting installations by ${site.name} across London, Ontario and Southwestern Ontario. See the transformation!`,
  alternates: { canonical: url },
  openGraph: {
    title: `Gallery — Permanent LED Lighting Projects | ${site.name}`,
    description: 'Real rooflines, gables, porches and shops across Southwestern Ontario, lit by a single permanent track.',
    url,
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
};

export default function GalleryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${site.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHeader
        eyebrow="Our work"
        title="Real homes. Real evenings."
        sub="Every image is a real installation by our team across London, Ontario and Southwestern Ontario. Tap any photo to see it full size."
        crumbs={[{ label: 'Gallery' }]}
      />

      <section className="section bg-white">
        <div className="wrap">
          <GalleryGrid photos={gallery} />
        </div>
      </section>

      <CtaBand
        title="Could your home look like this?"
        text="Book a free site visit and see exactly what your home would look like with permanent LED lighting."
      />
    </>
  );
}
