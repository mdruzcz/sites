import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Design Gallery | Award-Winning Christmas Lighting Across the GTA",
  description:
    "Browse our design gallery of professional Christmas light installations across Toronto, Vaughan, Markham, Oakville, and the rest of the GTA. Award-winning displays you can recreate at your home.",
  openGraph: {
    title: "Design Gallery — GTA Christmas Lights",
    description:
      "Award-winning Christmas light displays across the Greater Toronto Area.",
    url: `${site.url}/gallery`,
  },
};

const galleryItems = [
  { src: "/images/gallery-1.png", alt: "Award-winning Christmas lights on Wellesley Street Toronto by GTA Christmas Lights", caption: "Wellesley · Toronto" },
  { src: "/images/gallery-2.png", alt: "Glenwood Etobicoke Christmas light installation by GTA Christmas Lights", caption: "Glenwood · Etobicoke" },
  { src: "/images/gallery-3.jpg", alt: "St. Georges Road award-winning Christmas lighting in Toronto", caption: "St. Georges · Toronto" },
  { src: "/images/gallery-4.png", alt: "Chaplin Crescent Christmas lights Toronto by GTA Christmas Lights", caption: "Chaplin · Toronto" },
  { src: "/images/gallery-5.png", alt: "Neville Beaches Toronto Christmas lighting by GTA Christmas Lights", caption: "Neville · Beaches" },
  { src: "/images/gallery-6.jpg", alt: "Burton Road Toronto Christmas lights night-time by GTA Christmas Lights", caption: "Burton Rd · Toronto" },
  { src: "/images/gallery-7.png", alt: "Hoggs Hollow front door Christmas decorating by GTA Christmas Lights", caption: "Hoggs Hollow · Toronto" },
  { src: "/images/gallery-8.png", alt: "Mississauga Christmas light installation by GTA Christmas Lights", caption: "Mississauga" },
  { src: "/images/gallery-9.png", alt: "Vellore Park Vaughan Christmas lights by GTA Christmas Lights", caption: "Vellore Park · Vaughan" },
  { src: "/images/gallery-10.jpg", alt: "King City Christmas light installation by GTA Christmas Lights", caption: "King City" },
  { src: "/images/gallery-11.png", alt: "Spiral-wrapped Christmas tree by GTA Christmas Lights", caption: "Wrapped Tree" },
  { src: "/images/gallery-12.png", alt: "Award of Excellence trophy GTA Christmas Lights", caption: "Award of Excellence" },
  { src: "/images/gallery-13.jpg", alt: "Warm white LED Christmas lights on King City home", caption: "Warm White · King City" },
  { src: "/images/gallery-14.png", alt: "Western colours multi-color Christmas lighting by GTA Christmas Lights", caption: "Multi-color Display" },
  { src: "/images/gallery-15.jpg", alt: "Burton Road Toronto daytime Christmas decorations", caption: "Burton Rd · Daytime" },
  { src: "/images/gallery-16.jpg", alt: "Well-lit multi-color spruce tree Christmas lighting", caption: "Lit Spruce Tree" },
  { src: "/images/rooftop-warm.jpg", alt: "Rooftop warm Christmas lighting daytime Toronto", caption: "Roofline Warm-White" },
  { src: "/images/tree-railing.jpg", alt: "Front door and railing Christmas decorating Toronto", caption: "Front Door & Railing" },
  { src: "/images/pillars-green.jpg", alt: "Christmas greenery on pillars by GTA Christmas Lights", caption: "Pillar Greenery" },
  { src: "/images/white-trees.jpg", alt: "White lights on trees with roofline display", caption: "White Trees & Roofline" },
  { src: "/images/commercial-cne.jpg", alt: "Commercial CNE Christmas installation by GTA Christmas Lights", caption: "CNE · Commercial" },
  { src: "/images/ridley-school.jpg", alt: "Ridley school Christmas decorations by GTA Christmas Lights", caption: "Ridley · Institutional" },
  { src: "/images/locale-restaurant.jpg", alt: "Locale Restaurant King City Christmas decorations", caption: "Locale Restaurant" },
  { src: "/images/interior-1.png", alt: "Interior Christmas decorating service Toronto by GTA Christmas Lights", caption: "Interior · Toronto" },
  { src: "/images/interior-2.png", alt: "Holiday decorators interior service Toronto", caption: "Interior Styling" },
  { src: "/images/wreath-1.jpg", alt: "Custom Christmas wreath installation", caption: "Custom Wreath" },
  { src: "/images/wreath-2.jpg", alt: "Lit Christmas wreath with pinecones and gold bow", caption: "Wreath · Gold Ribbon" },
  { src: "/images/garland-1.jpg", alt: "Christmas garland on pillars installation", caption: "Pillar Garland" },
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
            Design Gallery
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Real Installs Across the GTA
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            A selection of recent Christmas lighting installations from Toronto,
            Vaughan, Mississauga, Oakville, Markham, and beyond. Every display
            is custom-designed for the home it&apos;s on.
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
            Get a free, custom design and quote for your home.
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
