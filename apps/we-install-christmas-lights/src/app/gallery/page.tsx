import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { VideoLoop } from "@/components/VideoLoop";
import gallery from "@/content/xmas-gallery.json";
import videosData from "@/content/xmas-videos.json";

export const revalidate = 3600;

type GalleryItem = {
  image: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  blurDataURL: string;
};

type Clip = { src: string; alt: string; category: string };
type Videos = { reel: { src: string; poster: string } | null; clips: Clip[] };

const photos = gallery as GalleryItem[];
const videos = videosData as Videos;
const clips = videos.clips.slice(0, 3);

export const metadata: Metadata = {
  title: "Christmas Lights Gallery | We Install Christmas Lights",
  description:
    "Browse our Christmas lights gallery — residential and commercial holiday light installations across London Ontario and South-Western Ontario by We Install Christmas Lights.",
  alternates: { canonical: `${site.url}/gallery` },
  openGraph: {
    type: "website",
    title: "Christmas Lights Gallery | We Install Christmas Lights",
    description:
      "Real residential and commercial Christmas light installations across London Ontario and South-Western Ontario.",
    url: `${site.url}/gallery`,
    images: photos[0] ? [{ url: photos[0].image, alt: photos[0].alt }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Lights Gallery | We Install Christmas Lights",
    description:
      "Real residential and commercial Christmas light installations across South-Western Ontario.",
  },
};

const IMAGE_GALLERY_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "We Install Christmas Lights Gallery",
  description:
    "Photos of residential and commercial Christmas light installations across London Ontario and South-Western Ontario.",
  url: `${site.url}/gallery`,
  image: photos.map((p) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${p.image}`,
    caption: p.alt,
    width: p.width,
    height: p.height,
  })),
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    { "@type": "ListItem", position: 2, name: "Gallery", item: `${site.url}/gallery` },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <Script
        id="gallery-imagegallery-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(IMAGE_GALLERY_SCHEMA) }}
      />
      <Script
        id="gallery-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />

      {/* Page header */}
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="eyebrow">Our Work</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">Christmas Lights Gallery</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[color:var(--ink-soft)]">
            Real residential and commercial holiday light installations we&apos;ve designed and
            installed across London Ontario and South-Western Ontario.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact-us" className="btn btn-red">Get a Free Quote</Link>
            <Link href={site.phoneHref} className="btn btn-outline-green">Call {site.phone}</Link>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Photo Gallery</p>
            <h2 className="heading-display text-2xl sm:text-3xl mt-3">Our Christmas Light Installs</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {photos.map((g) => (
              <figure
                key={g.image}
                className="card overflow-hidden group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    placeholder="blur"
                    blurDataURL={g.blurDataURL}
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Video clips */}
      {clips.length > 0 && (
        <section className="section bg-[color:var(--bg-cream)] border-t border-[color:var(--border)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="eyebrow">In Motion</p>
              <h2 className="heading-display text-2xl sm:text-3xl mt-3">Our Displays After Dark</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {clips.map((c) => (
                <div key={c.src} className="card overflow-hidden">
                  <VideoLoop
                    src={c.src}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="bg-[color:var(--brand-red)] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white">
            Want a Display Like This on Your Property?
          </h2>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto">
            Free quote within 24 hours. 5★ rated. London Ontario family-owned. We handle everything —
            design, install, maintenance, takedown, and storage.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact-us" className="btn btn-outline-white">Get a Free Quote</Link>
            <Link href={site.phoneHref} className="btn btn-green">Call {site.phone}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
