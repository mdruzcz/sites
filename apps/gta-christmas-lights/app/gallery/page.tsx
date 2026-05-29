import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Project Gallery | GTA Christmas Lighting Past Installs",
  description:
    "Browse our gallery of past Christmas lighting projects across the Greater Toronto Area — Toronto, Mississauga, Oakville, Vaughan, Markham, and more.",
  openGraph: {
    title: "Project Gallery — GTA Christmas Lighting",
    description:
      "Past Christmas light installations across the Greater Toronto Area.",
    url: `${site.url}/gallery`,
  },
};

const galleryItems = [
  {
    src: "/images/hero.jpg",
    alt: "Stunning Christmas lights on a GTA home at twilight by GTA Christmas Lighting",
    caption: "GTA Residential",
  },
  {
    src: "/images/benefit-installers.png",
    alt: "Two GTA Christmas Lighting installers placing lights around a tree",
    caption: "Install in Progress",
  },
  {
    src: "/images/extra-installer.png",
    alt: "Professional Christmas light installer by GTA Christmas Lighting",
    caption: "Professional Installer",
  },
  {
    src: "/images/extra-services.png",
    alt: "Full-service Christmas light services by GTA Christmas Lighting",
    caption: "Full Services",
  },
  {
    src: "/images/extra-phoenix.png",
    alt: "Programmable LED Christmas lighting by GTA Christmas Lighting",
    caption: "LED Lighting",
  },
  {
    src: "/images/hero.jpg",
    alt: "Beautiful holiday lighting installation across the GTA by GTA Christmas Lighting",
    caption: "Holiday Display",
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
