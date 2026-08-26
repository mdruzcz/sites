import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { VideoLoop } from "@/components/VideoLoop";
import { breadcrumbSchema } from "@/lib/jsonld";
import gallery from "@/src/content/xmas-gallery.json";
import videos from "@/src/content/xmas-videos.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lights Gallery — Our Installs in London, ON",
  description:
    "Browse our gallery of professional Christmas light installations across London and Southwestern Ontario — residential rooflines, commercial displays, wreaths, garland & more.",
  alternates: { canonical: `${site.url}/gallery` },
  openGraph: {
    title: "Christmas Lights Gallery | Christmas Lights London",
    description:
      "Photos of professional residential & commercial Christmas light installations across London, Ontario and Southwestern Ontario.",
    url: `${site.url}/gallery`,
    images: [{ url: gallery[0].image, alt: gallery[0].alt }],
  },
};

const clips = videos.clips.slice(0, 3);

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Christmas Lights London — Installation Gallery",
  description:
    "Professional Christmas light installations by Christmas Lights London across London, Ontario and Southwestern Ontario.",
  url: `${site.url}/gallery`,
  associatedMedia: gallery.map((g) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${g.image}`,
    caption: g.alt,
    width: g.width,
    height: g.height,
  })),
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Gallery", url: `${site.url}/gallery` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--dark-bg)] py-24 md:py-28 overflow-hidden">
        <Image
          src="/images/Christmaslights.jpg"
          alt="Professional Christmas light installations by Christmas Lights London in London, Ontario"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Our Work
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Christmas Lights Gallery
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            A closer look at the professional holiday lighting displays our team creates for homes and
            businesses across London and Southwestern Ontario.
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Our Christmas Light Installs
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Residential &amp; Commercial Displays We&apos;ve Created
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {gallery.map((g) => (
              <div
                key={g.image}
                className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-[var(--border)] group"
              >
                <Image
                  src={g.image}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  placeholder="blur"
                  blurDataURL={g.blurDataURL}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video strip */}
      {clips.length > 0 && (
        <section className="bg-[var(--dark-bg)] py-16 md:py-20">
          <div className="container mx-auto px-4">
            <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              In Motion
            </p>
            <h2
              className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              See Our Installs Come to Life
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {clips.map((c) => (
                <div
                  key={c.src}
                  className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-[var(--border-dark)] bg-[var(--dark-surface)]"
                >
                  <VideoLoop
                    src={c.src}
                    ariaLabel={c.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Want Your Home to Look Like This?
          </h2>
          <p className="text-[var(--muted)] text-lg mb-8 leading-relaxed">
            Contact us for a free, no-obligation quote. Our 7-person team will transform your London,
            Ontario property into a stunning holiday display — no ladders, no stress.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
              Get a Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="btn btn-ghost-dark min-h-[48px] px-8 flex items-center gap-2 justify-center"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
