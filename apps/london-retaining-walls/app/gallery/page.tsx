import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";
import galleryData from "@/content/gallery.json";

export const revalidate = 3600;

interface GalleryItem {
  image: string;
  alt: string;
  material: string;
  category: string;
  width: number;
  height: number;
  blurDataURL: string;
}

const gallery = galleryData as GalleryItem[];

export const metadata: Metadata = {
  title: "Retaining Wall Gallery | Our Work in London, ON",
  description:
    "Browse our retaining wall gallery — 48 completed concrete, block, timber, boulder and armour stone projects built across London and Southwestern Ontario.",
  alternates: { canonical: `${site.url}/gallery` },
  openGraph: {
    title: "Retaining Wall Gallery | London Retaining Walls",
    description:
      "See our completed retaining wall projects across London, Ontario — block, concrete, timber, boulder and natural stone walls built to last.",
    url: `${site.url}/gallery`,
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
    title: "Retaining Wall Gallery | London Retaining Walls",
    description:
      "See our completed retaining wall projects across London and Southwestern Ontario.",
  },
};

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "London Retaining Walls Project Gallery",
  description:
    "A gallery of completed retaining wall installations by London Retaining Walls across London and Southwestern Ontario, including block, concrete, timber, boulder and natural stone walls.",
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
              { name: "Home", href: "/" },
              { name: "Gallery", href: "/gallery" },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="Our Work"
        title="Retaining Wall Gallery"
        subtitle="A look at completed retaining wall projects across London and Southwestern Ontario — block, concrete, timber, boulder and natural stone walls built to last."
        image={gallery[0].image}
        imageAlt={gallery[0].alt}
        center
      />

      {/* Gallery grid */}
      <section className="section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--dark)] uppercase tracking-wide font-[family-name:var(--font-poppins)]">
              Our Retaining Wall Projects
            </h2>
            <p className="mt-3 text-gray-500">
              Every wall below was designed, engineered and built by our team.
              From backyard garden terraces to large commercial installations —
              all Ontario Building Code compliant.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map((g, i) => (
              <figure
                key={g.image}
                className="card border border-gray-100 group relative"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    width={g.width}
                    height={g.height}
                    placeholder="blur"
                    blurDataURL={g.blurDataURL}
                    loading={i < 6 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Caption on hover (desktop) */}
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                    <p className="text-white text-xs leading-snug">{g.alt}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>

          <p className="text-center mt-12 text-gray-500">
            Like what you see?{" "}
            <a
              href="/contact-us"
              className="text-[var(--accent)] font-semibold hover:underline"
            >
              Request your free quote
            </a>{" "}
            and we&rsquo;ll build the next one for you.
          </p>
        </div>
      </section>

      <CtaBand title="Ready to Build Your Retaining Wall?" />
    </>
  );
}
