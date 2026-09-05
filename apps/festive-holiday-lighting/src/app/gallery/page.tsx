import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { site } from "@/lib/site";
import gallery from "@/content/xmas-gallery.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Christmas Lights Gallery | Festive Holiday Lighting Southern Ontario",
  description:
    "Browse our Christmas lights gallery — real holiday and permanent LED lighting installs across Hamilton, Burlington, Oakville & Southern Ontario. Rooflines, trees, commercial displays.",
  alternates: { canonical: "https://festiveholidaylighting.ca/gallery" },
};

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "@id": `${site.url}/gallery#gallery`,
  name: "Festive Holiday Lighting — Christmas Lights Gallery",
  description:
    "A gallery of holiday and permanent LED lighting installations by Festive Holiday Lighting across Southern Ontario.",
  url: `${site.url}/gallery`,
  image: gallery.map((g) => ({
    "@type": "ImageObject",
    contentUrl: `${site.url}${g.image}`,
    caption: g.alt,
  })),
};

const breadcrumbSchema = {
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
        id="gallery-image-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <Script
        id="gallery-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NavBar />

      <section className="pt-32 pb-16 lg:pt-36" style={{ background: "linear-gradient(135deg, #040408 0%, #0F0A14 50%, #1A0A0A 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link>
            <span>/</span>
            <span className="text-white/60">Gallery</span>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--gold-bright)" }}>
            Our Work
          </p>
          <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white mb-6">
            Christmas Lights <span className="text-gradient-gold">Gallery</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Real installs from across Southern Ontario — seasonal Christmas displays, permanent LED rooflines, tree wrapping, and commercial lighting programs. This is the magic we bring to homes and businesses every season.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: "var(--midnight)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-extrabold text-white mb-4">
              Our Christmas Light <span className="text-gradient-gold">Installs</span>
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              A closer look at the rooflines, trees, and displays we&apos;ve lit up across Hamilton, Burlington, Oakville and beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {gallery.map((g) => (
              <div
                key={g.image}
                className="group relative overflow-hidden rounded-2xl border"
                style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
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
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:scale-105 min-h-11"
              style={{
                background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))",
                boxShadow: "0 8px 32px rgba(178,34,34,0.4)",
              }}
            >
              Get a Free Quote for Your Home
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
