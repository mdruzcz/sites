import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";
import { GalleryTabs } from "@/components/GalleryTabs";
import xmasGallery from "@/content/xmas-gallery.json";

export const revalidate = 3600;

/* Curated Christmas-lighting photo set — permanent roofline installs,
   commercial/municipal displays and lit park trees. Rendered as a static
   server-side grid beneath the existing project tabs. */
type XmasPhoto = {
  image: string;
  alt: string;
  category: string;
  width: number;
  height: number;
  blurDataURL: string;
};
const xmasPhotos = xmasGallery as XmasPhoto[];

export const metadata: Metadata = {
  title: "Christmas Lights Gallery",
  description:
    "Permanent LED and Christmas light installs across Southwestern Ontario — roofline systems in Brantford, London, Woodstock, plus commercial and municipal holiday displays.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Christmas Lights Gallery | Celebrate Lighting",
    description:
      "Roofline LED systems on real Ontario homes shown after dark, plus commercial, municipal and lit-tree Christmas light displays across Southwestern Ontario.",
    url: "https://celebratelighting.ca/gallery",
    images: [{ url: "/images/project-brantford.jpg", alt: "Gallery of permanent outdoor LED and Christmas lighting installs by Celebrate Lighting" }],
  },
};

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Celebrate Lighting Christmas Lights Gallery",
  description:
    "Photos of permanent LED and Christmas light installations by Celebrate Lighting across Southwestern Ontario — residential rooflines, commercial and municipal displays, and lit park trees.",
  url: `${site.url}/gallery`,
  image: xmasPhotos.map((g) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${g.image}`,
    caption: g.alt,
    width: g.width,
    height: g.height,
  })),
};

export default function GalleryPage() {
  const projects = getProjects();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Gallery", url: `${site.url}/gallery` },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }} />

      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>Gallery</span>
          </nav>

          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Our Work</p>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-4 text-balance">
              Real installs, shown after dark.
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Permanent roofline systems on homes across Southwestern Ontario, plus the seasonal work we do
              for commercial and municipal properties. Every one measured and colour-matched to the building.
            </p>
          </div>

          {/* showViewAll={false} — we're already on the full gallery. */}
          <GalleryTabs projects={projects} showViewAll={false} />

          {/* ============================================================
              CHRISTMAS LIGHT INSTALLS — curated seasonal photo set,
              static server-rendered grid in the same card style.
              ============================================================ */}
          <div className="mt-20 md:mt-28">
            <div className="hairline mb-16" />
            <div className="text-center mb-12">
              <p className="eyebrow-gold mb-3">Holiday Work</p>
              <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight mb-4 text-balance">
                Our Christmas Light Installs
              </h2>
              <p className="text-[var(--muted)] max-w-2xl mx-auto">
                Classic Christmas lighting we&apos;ve installed across Southwestern Ontario — homes traced
                in warm white, commercial and municipal displays, and lit trees glowing over the snow.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {xmasPhotos.map((g) => (
                <figure key={g.image} className="card overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={g.image}
                      alt={g.alt}
                      width={g.width}
                      height={g.height}
                      placeholder="blur"
                      blurDataURL={g.blurDataURL}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-[var(--muted)] mb-2 text-lg font-semibold text-[var(--foreground)]">
              Want to see it on your home?
            </p>
            <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto text-sm">
              We&apos;ll come out and mount a live sample on your house so you can see it lit up before you
              pay a cent.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact" className="btn btn-primary px-8">
                {site.demo.ctaLong}
              </Link>
              <a href={site.phoneHref} className="btn btn-outline px-8">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
