import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import { VideoLoop } from "@/components/VideoLoop";
import xmasGallery from "@/src/content/xmas-gallery.json";
import videos from "@/src/content/xmas-videos.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Project Gallery | GTA Christmas Lighting Past Installs",
  description:
    "Browse our Christmas lights gallery — real roofline, tree, and commercial holiday light installs across the GTA: Toronto, Mississauga, Oakville, Vaughan, Markham, and more.",
  alternates: {
    canonical: `${site.url}/gallery`,
  },
  openGraph: {
    title: "Project Gallery — GTA Christmas Lighting",
    description:
      "Real Christmas light installations and holiday light shows across the Greater Toronto Area.",
    url: `${site.url}/gallery`,
  },
};

const categoryLabels: Record<string, string> = {
  "commercial-exterior": "Commercial",
  "residential-exterior": "Residential",
  "install-action": "Install Day",
  "light-show": "Light Show",
  other: "Holiday Display",
};

const galleryVideoClips = videos.clips.slice(0, 3);

const galleryItems = [
  {
    src: "/images/project-night-1.jpg",
    alt: "Christmas light installation on a GTA home at night by GTA Christmas Lighting",
    caption: "GTA Residential",
  },
  {
    src: "/images/project-night-2.jpg",
    alt: "Custom Christmas roofline lighting on a GTA home at night by GTA Christmas Lighting",
    caption: "Roofline Display",
  },
  {
    src: "/images/project-night-3.jpg",
    alt: "Warm-white Christmas lighting on a GTA home at night by GTA Christmas Lighting",
    caption: "Warm-White Classic",
  },
  {
    src: "/images/project-night-4.jpg",
    alt: "Multi-colour Christmas lighting on a GTA home at night by GTA Christmas Lighting",
    caption: "Multi-Colour Display",
  },
  {
    src: "/images/project-night-5.jpg",
    alt: "Christmas light display on a GTA property at night by GTA Christmas Lighting",
    caption: "Estate Display",
  },
  {
    src: "/images/service-christmas.png",
    alt: "Custom Christmas light installation on a GTA home by GTA Christmas Lighting",
    caption: "Custom Install",
  },
  {
    src: "/images/service-holiday.jpg",
    alt: "Holiday lighting installation on a GTA home by GTA Christmas Lighting",
    caption: "Holiday Lights",
  },
  {
    src: "/images/service-tree.jpg",
    alt: "Outdoor tree lighting installation by GTA Christmas Lighting",
    caption: "Tree Lighting",
  },
  {
    src: "/images/service-permanent.jpg",
    alt: "Permanent LED lighting installation on a GTA home by GTA Christmas Lighting",
    caption: "Permanent LED",
  },
  {
    src: "/images/service-custom.jpg",
    alt: "Custom Christmas lighting display by GTA Christmas Lighting",
    caption: "Custom Design",
  },
  {
    src: "/images/process-installers.png",
    alt: "GTA Christmas Lighting installers placing lights around a Christmas tree",
    caption: "Install Team",
  },
  {
    src: "/images/process-genie-lift.png",
    alt: "GTA Christmas Lighting installer using a genie lift on a tall home",
    caption: "Tall-Home Install",
  },
  {
    src: "/images/hero.jpg",
    alt: "Christmas light installation by GTA Christmas Lighting on a GTA home at twilight",
    caption: "Twilight Display",
  },
];

export default function GalleryPage() {
  return (
    <>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "GTA Christmas Lighting — Installs Gallery",
            description:
              "Real Christmas, holiday, and permanent light installations by GTA Christmas Lighting across the Greater Toronto Area.",
            url: `${site.url}/gallery`,
            image: xmasGallery.map((g) => ({
              "@type": "ImageObject",
              contentUrl: `${site.url}${g.image}`,
              caption: g.alt,
            })),
          }),
        }}
      />

      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Project Gallery
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Real Installs Across the GTA
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            A selection of past Christmas, holiday, and permanent lighting
            projects from Toronto, Mississauga, Oakville, Vaughan, Markham, and
            beyond. Every display is custom-designed for the property it&apos;s
            on.
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryItems.map((img) => (
              <div
                key={img.src}
                className="relative aspect-square overflow-hidden rounded-lg group bg-[var(--dark-surface)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-white font-medium">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURATED XMAS INSTALL GALLERY */}
      <section className="bg-[var(--dark-bg)] pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Recent Work
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              Our Christmas Light Installs
            </h2>
            <p className="text-white/70 leading-relaxed">
              Roofline displays, wrapped trees, and commercial holiday lighting —
              every project custom-designed and professionally installed across
              the Greater Toronto Area.
            </p>
          </div>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {xmasGallery.map((g) => (
              <div
                key={g.image}
                className="relative aspect-square overflow-hidden rounded-lg group bg-[var(--dark-surface)]"
              >
                <Image
                  src={g.image}
                  alt={g.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={g.blurDataURL}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-white font-medium">
                    {categoryLabels[g.category] ?? "Holiday Lighting"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SHOWS IN MOTION */}
      {galleryVideoClips.length > 0 && (
        <section className="bg-[var(--evergreen)] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-3">
                In Motion
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Light Shows in Motion
              </h2>
              <p className="text-white/70 leading-relaxed">
                Animated pixel light shows we&apos;ve designed and installed —
                colour-changing displays that bring the holidays to life.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryVideoClips.map((clip) => (
                <div
                  key={clip.src}
                  className="relative aspect-video overflow-hidden rounded-xl border border-[var(--border-dark)] bg-[var(--dark-surface)]"
                >
                  <VideoLoop
                    src={clip.src}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--accent)] py-14">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <h2
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Want a Display Like These?
          </h2>
          <p className="text-white/85 mb-6">
            Send us a photo of your home — get a custom quote the same day.
          </p>
          <Link
            href="/contact"
            className="btn bg-white text-[var(--accent)] hover:bg-white/90 px-10 font-bold"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
