import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { VideoClip } from "@/components/VideoClip";
import { JsonLd } from "@/components/JsonLd";
import { productPhoto } from "@/lib/product-photos";
import type { PhotoKey } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

const CLIPS = [
  { src: "/videos/clip-lit-tree.mp4", poster: "/images/video/clip-lit-tree-poster.webp", label: "Fully-lit office tree with ribbon work" },
  { src: "/videos/clip-entrance.mp4", poster: "/images/video/clip-entrance-poster.webp", label: "Decorated tree at a building entrance" },
  { src: "/videos/clip-lobby.mp4", poster: "/images/video/clip-lobby-poster.webp", label: "Grand tree in a corporate marble lobby" }
];

const clipVideos = CLIPS.map((c) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: `Commercial Holiday Decor install — ${c.label}`,
  description: `${c.label}. A commercial Christmas decor installation by ${site.name} in Southwestern Ontario.`,
  thumbnailUrl: [`${site.url}${c.poster}`],
  uploadDate: "2026-01-05",
  contentUrl: `${site.url}${c.src}`,
  publisher: { "@type": "Organization", name: site.name, url: site.url }
}));

const TITLE = "Gallery — Commercial Christmas Decor & Displays";
const DESCRIPTION =
  "Commercial wreaths, mega trees, 3D LED displays and photo-op pieces installed on commercial and municipal properties across Southwestern Ontario.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/gallery` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.url}/gallery` }
};

const SCENES: { photo: PhotoKey; caption: string; span?: string }[] = [
  { photo: "tree-lighting-row", caption: "Mega trees lighting a commercial frontage", span: "md:col-span-2 md:row-span-2" },
  { photo: "hero-commercial-wreath", caption: "4′ commercial wreath, concourse entrance" },
  { photo: "wreath-building-front", caption: "Ornamented wreath on a stone facade" },
  { photo: "scene-santa-group", caption: "3D character display, lit outdoors" },
  { photo: "photo-op-gingerbread", caption: "Gingerbread photo-op display", span: "md:col-span-2" },
  { photo: "scene-santa-sleigh", caption: "3D Santa sleigh display" },
  { photo: "scene-penguins", caption: "Look-through photo-op piece" }
];

const DISPLAYS = [
  "display-snow-globe",
  "display-santa-sleigh",
  "display-santa-group",
  "display-penguins",
  "display-candy-cane",
  "display-skating-santa",
  "display-snowman",
  "display-gingerbread",
  "display-sphere",
  "display-santa-sleigh-2"
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        photo="wreath-building-front"
        photoAlt="Ornamented commercial wreath mounted on a stone building facade"
        eyebrow="Our work"
        title="Gallery"
        intro="Wreaths, trees, displays and full frontage packages on commercial and municipal properties."
        crumbs={[{ name: "Gallery", href: "/gallery" }]}
      />

      {clipVideos.map((v) => <JsonLd key={v.contentUrl as string} data={v} />)}

      {/* Video — real installs */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">On camera</p>
              <h2 className="font-display h2-fluid mt-6">Recent installs, on video.</h2>
              <p className="lead mt-5 text-[var(--color-text-soft)]">
                Real commercial trees and holiday decor we installed across Southwestern Ontario — tap to
                play. Corporate lobbies, office interiors and building entrances.
              </p>
            </div>
            <Link href="/quote" className="btn-secondary">Get a quote</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
            {CLIPS.map((c) => (
              <div key={c.src} className="reveal-sm">
                <VideoClip src={c.src} poster={c.poster} label={c.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installed scenes */}
      <section className="bg-[var(--color-ink-deep)]">
        <div className="shell section">
          <div className="reveal max-w-2xl">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">Installed</p>
            <h2 className="font-display h2-fluid mt-6 text-white">On the property.</h2>
          </div>
          <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4 md:gap-5">
            {SCENES.map((s) => (
              <figure key={s.photo} className={`reveal-sm group relative isolate overflow-hidden rounded-2xl ${s.span ?? ""}`}>
                <Photo
                  name={s.photo}
                  ratio="h-full w-full"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  scrim="soft"
                  className="h-full transition duration-500 group-hover:scale-[1.05]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 text-xs font-semibold text-white md:text-sm">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Display catalogue */}
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="reveal max-w-2xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">The pieces</p>
              <h2 className="font-display h2-fluid mt-6">Displays we build and install.</h2>
              <p className="lead mt-5 text-[var(--color-text-soft)]">
                A sample of the 2D, 3D and photo-op range. Anything here can be scaled, and anything that is
                not here can be fabricated.
              </p>
            </div>
            <Link href="/products/holiday-displays" className="btn-secondary">Browse displays</Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5 md:gap-6">
            {DISPLAYS.map((k) => {
              const p = productPhoto(k);
              if (!p) return null;
              return (
                <figure key={k} className="reveal-sm overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-4">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width: 768px) 45vw, 200px"
                    className="aspect-square w-full object-contain"
                  />
                </figure>
              );
            })}
          </div>

          <div className="reveal mt-16 rounded-3xl border border-[var(--color-border)] bg-[var(--color-gold-soft)] p-9 text-center md:p-12">
            <h2 className="font-display text-2xl">Want something that is not here?</h2>
            <p className="mx-auto mt-4 max-w-lg lead text-[var(--color-text-soft)]">
              Custom fabrication is a large part of what we do — illuminated logos, entrance archways and
              one-off centrepieces scaled to a specific property.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/products/custom-displays" className="btn-primary">Custom displays</Link>
              <Link href="/quote" className="btn-ember group">
                {site.quote.cta}
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
