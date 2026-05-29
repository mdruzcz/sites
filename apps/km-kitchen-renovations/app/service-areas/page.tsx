import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SITE, SERVICE_AREAS } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovation Service Areas | K&M Kitchen Renovations",
  description:
    "K&M Kitchen Renovations serves London, St. Thomas, Woodstock, Hamilton, Kitchener-Waterloo, and Stratford. Expert kitchen and bathroom renovation across Southwestern Ontario.",
  openGraph: {
    title: "Service Areas | K&M Kitchen Renovations",
    description: "Serving Southwestern Ontario with expert kitchen renovation. See if we serve your city.",
  },
};

const areaImages: Record<string, string> = {
  london: "/images/kitchen-2.jpg",
  "st-thomas": "/images/kitchen-3.jpg",
  woodstock: "/images/kitchen-4.jpg",
  hamilton: "/images/kitchen-5.jpg",
  "kitchener-waterloo": "/images/kitchen-1.jpg",
  stratford: "/images/kitchen-9.jpg",
};

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--navy)] py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="eyebrow justify-center">Where We Work</div>
          <h1 className="h-display text-white text-4xl lg:text-5xl mb-4">
            Kitchen Renovations Across{" "}
            <span className="text-[var(--gold)]">Southwestern Ontario</span>
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            K&M Kitchen Renovations brings expert craftsmanship to homeowners throughout the region. Select your city below to learn more about our local service.
          </p>
          <Link href="/contact" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS.map((a) => (
              <Link key={a.slug} href={`/service-areas/${a.slug}`} className="card group overflow-hidden hover:shadow-xl hover:border-[var(--gold)] transition-all duration-200">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={areaImages[a.slug] || "/images/kitchen-1.jpg"}
                    alt={`Kitchen renovation in ${a.city}, ${a.province}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-900)]/80 via-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-white font-bold text-lg">{a.city}</span>
                    <span className="text-white/70 text-sm ml-2">{a.province}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[var(--slate)] text-sm leading-relaxed mb-4">{a.description}</p>
                  <span className="text-[var(--gold)] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Kitchen Renovations in {a.city} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--gold)]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="h-display text-[var(--navy-900)] text-3xl lg:text-4xl mb-4">
            Don&apos;t See Your City?
          </h2>
          <p className="text-[var(--navy-800)] text-lg mb-8">
            We may still be able to serve your area. Give us a call or send us a message — we&apos;re always happy to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-navy">Get a Free Quote</Link>
            <a href={`tel:${SITE.phonePlain}`} className="btn bg-white text-[var(--navy)] hover:bg-[var(--stone)] shadow-sm">
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
