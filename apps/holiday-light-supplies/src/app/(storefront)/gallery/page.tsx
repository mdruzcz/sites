import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";
import gallery from "@/content/xmas-gallery.json";
import videos from "@/content/xmas-videos.json";
import { VideoLoop } from "@/components/VideoLoop";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lights Gallery — Commercial Installs Across Ontario",
  description:
    "See commercial-grade LED Christmas trees, lit garland, gold-ribbon displays and light archways installed in office lobbies and building entrances across Ontario by Holiday Light Supplies.",
  alternates: { canonical: SITE_URL + "/gallery" },
  openGraph: {
    title: "Christmas Lights Gallery | Holiday Light Supplies",
    description:
      "A gallery of commercial Christmas lighting and décor — LED trees, lit garland and gold-ribbon displays installed in Ontario lobbies and entrances.",
    url: SITE_URL + "/gallery",
    type: "website",
    images: [{ url: SITE_URL + gallery[0].image }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Lights Gallery | Holiday Light Supplies",
    description:
      "Commercial Christmas lighting and décor installed across Ontario — LED trees, lit garland and gold-ribbon displays."
  }
};

// A few motion clips to feature beneath the photo grid (portrait 9:16).
const featuredClips = videos.clips.slice(0, 3);

export default function GalleryPage() {
  const imageGalleryLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Holiday Light Supplies — Christmas Lights Gallery",
    description:
      "Commercial-grade LED Christmas trees, lit garland and gold-ribbon holiday displays installed in office lobbies and building entrances across Ontario.",
    url: SITE_URL + "/gallery",
    associatedMedia: gallery.map((g) => ({
      "@type": "ImageObject",
      contentUrl: SITE_URL + g.image,
      caption: g.alt,
      width: g.width,
      height: g.height
    }))
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Gallery", item: SITE_URL + "/gallery" }
    ]
  };

  const videoLd = featuredClips.length
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: "Commercial Christmas Light Installations in Motion — Holiday Light Supplies",
        description:
          "Warm-white LED Christmas trees and gold-ribbon holiday décor glowing in commercial building lobbies, installed across Ontario by Holiday Light Supplies.",
        thumbnailUrl: [SITE_URL + gallery[0].image],
        uploadDate: "2026-08-25",
        contentUrl: SITE_URL + featuredClips[0].src
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {videoLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoLd) }} />
      )}

      {/* Hero header — deep evergreen, matching the site */}
      <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#08180f]/95 via-[#0b2417]/85 to-[#0e2c1d]/60" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs uppercase tracking-[0.18em] text-white/55">
            <Link href="/" className="hover:text-[var(--color-gold)]">Home</Link>
            <span className="px-2 text-white/30">/</span>
            <span className="text-white/80">Gallery</span>
          </nav>
          <p className="eyebrow text-[var(--color-gold)]">Our Christmas light installs</p>
          <h1 className="font-display mt-5 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            The season, <span className="italic text-[var(--color-gold)]">lit up.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
            Commercial-grade LED Christmas trees, lit garland, gold-ribbon displays and glowing light
            archways — designed and installed in office lobbies, atriums and building entrances across
            Ontario with the same product we ship to your door.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/shop" className="btn-gold">Shop the catalog</Link>
            <Link
              href="/contact-us"
              className="text-base font-semibold text-white underline-offset-4 hover:text-[var(--color-gold)] hover:underline"
            >
              Ask about installation →
            </Link>
          </div>
        </div>
      </section>

      {/* Photo grid — masonry, 2 cols mobile / 3 desktop, preserving each image's aspect ratio */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="columns-2 gap-4 md:columns-3">
          {gallery.map((g) => (
            <div
              key={g.image}
              className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-night)] shadow-sm"
            >
              <Image
                src={g.image}
                alt={g.alt}
                width={g.width}
                height={g.height}
                placeholder="blur"
                blurDataURL={g.blurDataURL}
                sizes="(max-width:768px) 50vw, 33vw"
                className="h-auto w-full transition duration-500 ease-out hover:scale-[1.03]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* In motion — portrait showcase clips */}
      {featuredClips.length > 0 && (
        <section className="bg-warm">
          <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
            <div className="text-center">
              <p className="eyebrow text-[var(--color-accent)]">See them glow</p>
              <h2 className="font-display mt-3 text-4xl md:text-5xl">Our displays in motion.</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[var(--color-muted)]">
                Warm-white trees and gold-ribbon décor, after dark. Muted clips — tap the sound off and
                just watch them shine.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {featuredClips.map((clip) => (
                <div
                  key={clip.src}
                  className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-night)] shadow-sm"
                >
                  <VideoLoop
                    src={clip.src}
                    className="aspect-[9/16] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA band */}
      <section className="relative isolate overflow-hidden bg-[var(--color-night)] text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-deep)] via-[var(--color-night)] to-[var(--color-brand-deep)] opacity-95" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center">
          <p className="eyebrow text-[var(--color-gold)]">Bring this look to your space</p>
          <h2 className="font-display max-w-3xl text-4xl leading-tight md:text-5xl">
            The same lights, <span className="italic text-[var(--color-gold)]">shipped to your door.</span>
          </h2>
          <p className="max-w-xl text-lg text-white/80">
            Everything in this gallery is built from our commercial-grade catalog — in stock and ready to
            ship from our Ontario warehouse. Free shipping over $150.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/shop" className="btn-gold">Shop the catalog</Link>
            <Link href="/contact-us" className="btn-ghost-light">Talk to us first →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
