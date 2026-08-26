import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { VideoLoop } from "@/components/VideoLoop";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import gallery from "@/content/xmas-gallery.json";
import videos from "@/content/xmas-videos.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lights Gallery — Ontario Light Show Installs",
  description:
    "Browse our Christmas lights gallery: music-synced pixel light shows, permanent holiday lighting, parade floats, and festive displays installed across Ontario.",
  alternates: { canonical: `${site.url}/gallery` },
  openGraph: {
    title: `Christmas Lights Gallery | ${site.name}`,
    description:
      "Photos and video from real music-synced Christmas light shows and holiday lighting installs across Ontario.",
    url: `${site.url}/gallery`,
    images: [
      {
        url: gallery[0]?.image ?? "/images/uploads/placeholder-blenheim-hero.svg",
        width: 1200,
        height: 1600,
        alt: "Christmas lights gallery by Ontario Light Shows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Christmas Lights Gallery | ${site.name}`,
    description:
      "Photos and video from real Christmas light shows and holiday lighting installs across Ontario.",
  },
};

const reel = videos.reel;
const clips = videos.clips ?? [];
const featuredClips = clips.slice(0, 3);

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `Christmas Lights Gallery | ${site.name}`,
  description:
    "Photos from music-synchronized Christmas light shows, permanent holiday lighting, and festive displays installed across Ontario.",
  url: `${site.url}/gallery`,
  image: gallery.map((g) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${g.image}`,
    caption: g.alt,
    width: g.width,
    height: g.height,
  })),
};

const videoObjectSchemas = featuredClips.map((c) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: `${site.name} — ${c.alt}`,
  description: c.alt,
  thumbnailUrl: reel ? `${site.url}${reel.poster}` : undefined,
  uploadDate: "2026-08-25",
  contentUrl: `${site.url}${c.src}`,
}));

const breadcrumbs = breadcrumbSchema([
  { name: "Home", url: site.url },
  { name: "Gallery", url: `${site.url}/gallery` },
]);

function humanize(category: string) {
  return category
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {videoObjectSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Gallery</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Christmas lights, <span className="gradient-text">in full colour</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            A look at real installs across Ontario — music-synced pixel shows, permanent holiday lighting, festive parade floats, and hand-detailed wreaths and garland. Every pixel weather-sealed and sequenced in studio.
          </p>
        </div>
      </section>

      {/* Video reel */}
      {reel && (
        <section className="py-16 sm:py-24 bg-midnight">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Watch the Reel"
              title="See the show in motion."
              description="A highlight reel of our music-synchronized addressable LED shows — mega trees, snowflake gables, and animated pixel facades."
            />
            <div className="relative rounded-2xl overflow-hidden card card-glow">
              <VideoLoop
                src={reel.src}
                poster={reel.poster}
                className="aspect-video w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Photo gallery */}
      <section className="py-16 sm:py-24 bg-midnight-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The Portfolio"
            title="Our Christmas Light Installs"
            description="Displays, details, and full-scale light shows photographed across Ontario."
          />
          <div className="columns-2 lg:columns-3 gap-4 sm:gap-6 [column-fill:_balance]">
            {gallery.map((g) => (
              <figure
                key={g.image}
                className="mb-4 sm:mb-6 break-inside-avoid group relative overflow-hidden rounded-xl card"
              >
                <Image
                  src={g.image}
                  alt={g.alt}
                  width={g.width}
                  height={g.height}
                  placeholder="blur"
                  blurDataURL={g.blurDataURL}
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <figcaption className="absolute bottom-3 left-3">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">
                    {humanize(g.category)}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Light shows in motion */}
      {featuredClips.length > 0 && (
        <section className="py-16 sm:py-24 bg-midnight">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="In Motion"
              title="Light shows in motion."
              description="Short clips from live installs — pixel mega trees, snowflake gables, and synchronized colour sweeps."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredClips.map((c) => (
                <div
                  key={c.src}
                  className="relative rounded-xl overflow-hidden card card-glow"
                >
                  <VideoLoop
                    src={c.src}
                    poster={reel ? reel.poster : undefined}
                    className="aspect-video w-full object-cover"
                  />
                  <span className="sr-only">{c.alt}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
