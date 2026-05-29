import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Services | Kitchen Renovations, Remodels & More | K&M",
  description:
    "K&M Kitchen Renovations offers kitchen renovations, kitchen remodels, bathroom remodels, cabinet installation, basement finishing, and more across Southwestern Ontario.",
  openGraph: {
    title: "Our Services | K&M Kitchen Renovations",
    description: "Full kitchen & bathroom renovation services in London, St. Thomas, Woodstock and surrounding areas.",
    images: [{ url: "/images/kitchen-3.jpg" }],
  },
};

const serviceImages: Record<string, string> = {
  "kitchen-renovations": "/images/kitchen-2.jpg",
  "kitchen-remodels": "/images/kitchen-3.jpg",
  "bathroom-remodels": "/images/kitchen-5.jpg",
  "white-shaker-cabinets": "/images/kitchen-1.jpg",
  "custom-kitchen-cabinets": "/images/kitchen-4.jpg",
  "basement-finishing": "/images/kitchen-9.jpg",
  "basement-kitchens": "/images/kitchen-2.jpg",
  "basement-bathrooms": "/images/kitchen-3.jpg",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/kitchen-3.jpg" alt="K&M Kitchen Renovations services" fill className="object-cover" priority placeholder="blur" blurDataURL={blurDataURL(8, 5)} />
          <div className="absolute inset-0 bg-[var(--navy-900)]/85" />
        </div>
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <div className="eyebrow justify-center">Our Services</div>
          <h1 className="h-display text-white text-5xl mb-4">
            Complete Kitchen &amp; Bathroom Renovation Services
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-8">
            From a full kitchen gut-and-rebuild to custom cabinet installation — we handle every aspect of your renovation.
          </p>
          <Link href="/contact" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group overflow-hidden hover:shadow-xl hover:border-[var(--gold)] transition-all duration-200">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={serviceImages[s.slug] || "/images/kitchen-1.jpg"}
                    alt={`${s.title} by K&M Kitchen Renovations`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL()}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-900)]/70 to-transparent" />
                  <div className="absolute top-4 left-4 text-3xl">{s.icon}</div>
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-[var(--navy)] text-xl mb-3 group-hover:text-[var(--gold)] transition-colors">{s.title}</h2>
                  <p className="text-[var(--slate)] text-sm leading-relaxed mb-4">{s.description}</p>
                  <span className="text-[var(--gold)] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[var(--gold)]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="h-display text-[var(--navy-900)] text-3xl mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-[var(--navy-800)] text-lg mb-8">No problem. Contact us and we&apos;ll help you figure out the best approach for your home and budget.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-navy">Get a Free Consult</Link>
          </div>
        </div>
      </section>
    </>
  );
}
