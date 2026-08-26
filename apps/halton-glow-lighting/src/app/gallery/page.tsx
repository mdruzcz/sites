import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { VideoLoop } from "@/components/VideoLoop";
import gallery from "@/content/xmas-gallery.json";
import videos from "@/content/xmas-videos.json";

export const revalidate = 3600;

const pageUrl = `${site.url}/gallery`;

export const metadata: Metadata = {
  title: "Christmas Lights Gallery | Burlington & Oakville Installs",
  description:
    "Browse Halton Glow Lighting's Christmas lights gallery — permanent LED rooflines, pixel light shows and holiday tree wrapping across Burlington, Oakville & Halton.",
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: site.name,
    title: "Christmas Lights Gallery | Halton Glow Lighting",
    description:
      "Real Christmas light and permanent LED installs across Burlington, Oakville and the Halton Region by Halton Glow Lighting.",
    url: pageUrl,
    images: [
      {
        url: gallery[0].image,
        width: gallery[0].width,
        height: gallery[0].height,
        alt: gallery[0].alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas Lights Gallery | Halton Glow Lighting",
    description:
      "Permanent LED rooflines, pixel light shows and holiday displays across Burlington & Oakville.",
    images: [gallery[0].image],
  },
};

const prettyCategory = (c: string) =>
  c
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

// A few short light-show clips to bring the gallery to life (skip the one on the homepage).
const motionClips = videos.clips.slice(1, 4);

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Halton Glow Lighting Christmas Lights Gallery",
  description:
    "Photo gallery of permanent outdoor LED lighting and Christmas light installations by Halton Glow Lighting in Burlington and Oakville, Ontario.",
  url: pageUrl,
  associatedMedia: gallery.map((g) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${g.image}`,
    caption: g.alt,
    width: g.width,
    height: g.height,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: site.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gallery",
      item: pageUrl,
    },
  ],
};

export default function GalleryPage() {
  return (
    <>
      <Script
        id="ld-imagegallery"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <NavBar />

        {/* Hero */}
        <section
          className="relative overflow-hidden pt-28 lg:pt-36 pb-14 lg:pb-20"
          style={{ backgroundColor: "var(--night-deep)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, rgba(245,194,107,0.12) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: "var(--gold-bright)" }}
            >
              Our Christmas Light Installs
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              Christmas Lights{" "}
              <span className="text-gradient-gold">Gallery</span>
            </h1>
            <p className="text-lg text-white/65 max-w-2xl mx-auto">
              Permanent LED rooflines, animated pixel light shows and holiday
              tree wrapping — a look at the year-round curb appeal Halton Glow
              Lighting creates across Burlington, Oakville and the Halton Region.
            </p>
          </div>
        </section>

        {/* Photo grid */}
        <section
          className="relative py-14 lg:py-20 overflow-hidden"
          style={{ backgroundColor: "var(--night)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="columns-2 md:columns-3 gap-4 lg:gap-6">
              {gallery.map((g) => (
                <figure
                  key={g.image}
                  className="mb-4 lg:mb-6 break-inside-avoid relative rounded-2xl overflow-hidden shadow-2xl group"
                >
                  <Image
                    src={g.image}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    placeholder="blur"
                    blurDataURL={g.blurDataURL}
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <figcaption className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: "rgba(245,194,107,0.2)",
                        color: "var(--gold-bright)",
                        border: "1px solid rgba(245,194,107,0.3)",
                      }}
                    >
                      {prettyCategory(g.category)}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Light shows in motion */}
        {motionClips.length > 0 && (
          <section
            className="relative py-16 lg:py-24 overflow-hidden"
            style={{ backgroundColor: "var(--night-deep)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p
                  className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
                  style={{ color: "var(--gold-bright)" }}
                >
                  Light Shows In Motion
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                  Programmable Pixel{" "}
                  <span className="text-gradient-gold">Displays</span>
                </h2>
                <p className="text-lg text-white/65">
                  Animated colour scenes you can schedule from your phone — the
                  same systems Halton Glow installs for homes and businesses.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {motionClips.map((c) => (
                  <div
                    key={c.src}
                    className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[rgba(245,194,107,0.15)]"
                  >
                    <VideoLoop
                      src={c.src}
                      className="aspect-[9/16] sm:aspect-[4/5] w-full object-cover bg-[var(--night)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          className="relative py-16 lg:py-20 text-center overflow-hidden"
          style={{ backgroundColor: "var(--night)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Want your home on this wall?
            </h2>
            <p className="text-lg text-white/65 mb-8">
              Book a free consultation and we&apos;ll design a permanent lighting
              system for your Burlington or Oakville home.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold text-[#0A0E1F] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] hover:from-[var(--gold)] hover:to-[var(--amber)] transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(245,194,107,0.4)] min-h-11"
            >
              Get Your Free Estimate
            </a>
          </div>
        </section>

        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
