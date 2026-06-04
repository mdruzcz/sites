import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CtaBand } from '@/components/ui';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse our gallery of completed concrete sealing, driveway, patio, and stamped concrete projects across London, St. Thomas, Woodstock and Southwestern Ontario.',
  alternates: { canonical: '/gallery' },
};

const gallery = [
  { src: '/images/concrete-sealing-driveway.jpg', alt: 'Sealed concrete driveway by London Concrete Sealing in London, Ontario' },
  { src: '/images/concrete-cleaning-sealing.jpg', alt: 'Concrete cleaning and sealing project in London, Ontario' },
  { src: '/images/stamped-concrete.jpg', alt: 'Stamped concrete sealing project by London Concrete Sealing' },
  { src: '/images/concrete-sealing-coloured.jpg', alt: 'Coloured concrete sealing finish in London, Ontario' },
  { src: '/images/sealing-stamped-concrete.jpg', alt: 'Freshly sealed stamped concrete patio in Southwestern Ontario' },
  { src: '/images/exposed-aggregate-sealing.jpg', alt: 'Exposed aggregate concrete sealing in London, Ontario' },
  { src: '/images/ashlar-slate-stamped.webp', alt: 'Ashlar slate stamped concrete sealing in London, Ontario' },
  { src: '/images/broom-finishes.jpg', alt: 'Broom finish concrete driveway in London, Ontario' },
  { src: '/images/woodstock-concrete-sealing.jpg', alt: 'Concrete sealing project in Woodstock, Ontario' },
  { src: '/images/st-thomas-concrete-sealing.jpg', alt: 'Concrete sealing services in St. Thomas, Ontario' },
  { src: '/images/stamped-concrete-2.jpg', alt: 'Decorative stamped concrete by London Concrete Sealing' },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep dot-grid text-white">
        <div className="container-x py-16 sm:py-20">
          <nav className="text-sm text-slate-300 mb-5 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-light">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold max-w-3xl leading-[1.08]">Our Work</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl">
            A look at completed concrete sealing, driveway, and stamped concrete projects across
            Southwestern Ontario.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-x">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>*]:mb-5">
            {gallery.map((img, i) => (
              <div key={img.src} className="break-inside-avoid relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={i % 3 === 0 ? 800 : 450}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Like What You See?" sub="Let's add your project to our gallery. Get a free, no-obligation quote today." />
    </>
  );
}
