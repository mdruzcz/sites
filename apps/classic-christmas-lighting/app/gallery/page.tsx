import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { VideoLoop } from "@/components/VideoLoop";
import gallery from "@/content/xmas-gallery.json";
import videos from "@/content/xmas-videos.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lights Gallery | Kitchener-Waterloo Installs",
  description:
    "Browse our Christmas lights gallery — real residential & commercial holiday light installations across Kitchener-Waterloo, Guelph, Cambridge & Southern Ontario by Classic Christmas Lighting.",
  alternates: {
    canonical: `${site.url}/gallery`,
  },
  openGraph: {
    title: "Christmas Lights Gallery — Classic Christmas Lighting",
    description:
      "Real holiday light installations across Kitchener-Waterloo and Southern Ontario — rooflines, tree wrapping, commercial displays, and more.",
    url: `${site.url}/gallery`,
    images: [
      {
        url: "/images/Classic-Christmas-Lighting.webp",
        alt: "Christmas lights gallery — professional holiday displays in Kitchener-Waterloo Ontario",
      },
    ],
  },
};

// Feature a few muted, looping clips beneath the photo grid for variety.
const galleryClips = videos.clips.filter((_, i) => i === 1 || i === 2 || i === 4);
const clipPoster = "/images/Classic-Christmas-Lighting.webp";

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Classic Christmas Lighting — Christmas Lights Gallery",
  description:
    "Professional residential and commercial Christmas light installations across Kitchener-Waterloo and Southern Ontario.",
  url: `${site.url}/gallery`,
  image: gallery.map((g) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${g.image}`,
    name: g.alt,
    description: g.alt,
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
      <section className="relative py-24 md:py-32 bg-[var(--dark-bg)] overflow-hidden">
        <Image
          src="/images/Classic-Christmas-Lighting.webp"
          alt="Christmas lights gallery — professional holiday displays in Kitchener-Waterloo Ontario"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-xs text-white/40 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/60">Gallery</span>
          </nav>
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Our Work
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1] max-w-3xl"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Christmas Lights Gallery
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
            Real holiday displays we&apos;ve designed and installed across Kitchener-Waterloo, Guelph, Cambridge, Hamilton, and Southern Ontario — from warm-white rooflines to dazzling commercial showpieces.
          </p>
        </div>
      </section>

      {/* Photo grid */}
      <section className="bg-[var(--dark-bg)] pb-20 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((g) => (
              <div
                key={g.image}
                className="relative aspect-square overflow-hidden rounded-lg group"
              >
                <Image
                  src={g.image}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  placeholder="blur"
                  blurDataURL={g.blurDataURL}
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video strip */}
      {galleryClips.length > 0 && (
        <section className="bg-[var(--dark-surface)] py-20 md:py-24 border-t border-[var(--border-dark)]">
          <div className="container mx-auto px-4">
            <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              In Motion
            </p>
            <h2
              className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              See Our Displays Come to Life
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {galleryClips.map((clip) => (
                <div
                  key={clip.src}
                  className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--border-dark)]"
                >
                  <VideoLoop
                    src={clip.src}
                    poster={clipPoster}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl font-bold text-[var(--foreground)] mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Want a Display Like These?
          </h2>
          <p className="text-[var(--muted)] mb-8 max-w-xl mx-auto">
            We design, install, maintain, and take down every light — completely hands-free for you. Book early; installation slots fill fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
              Get a Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost-dark min-h-[48px] px-8 flex items-center gap-2 justify-center">
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
