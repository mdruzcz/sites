import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServiceAreas, getServices } from "@/lib/content";
import { SectionHeader } from "@/components/SectionHeader";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Areas | Concrete Sealing in SW Ontario",
  description:
    "TriCity Concrete Sealing serves London, Woodstock, Brantford, St. Thomas, Stratford, Ingersoll, Tillsonburg and all surrounding communities in Southwestern Ontario.",
};

export const revalidate = 3600;

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  const services = getServices();

  return (
    <>
      <section className="bg-[var(--navy)] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow justify-center">Coverage</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Our Service Areas
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We proudly serve communities across Southwestern Ontario — from London to Brantford,
            Woodstock to Stratford, and everywhere in between.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Communities We Serve"
            title="Concrete Sealing Near You"
            description="Click a city to see services and learn more about what we offer in your area."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card group hover:border-[var(--accent)] hover:-translate-y-1 transition-all p-0 overflow-hidden"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src="/images/result_Concrete-Sealing-TriCity-Concrete-Sealing.jpg"
                    alt={`Concrete sealing services in ${city.name}, Ontario`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-900)]/70 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-white font-bold">{city.name}, ON</p>
                    <p className="text-white/70 text-xs">{city.region}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-[var(--concrete)] mb-2">Services available in {city.name}:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {services.slice(0, 3).map((s) => (
                      <span key={s.slug} className="text-xs bg-[var(--surface)] text-[var(--navy)] px-2 py-1 rounded-md font-medium">
                        {s.title}
                      </span>
                    ))}
                    <span className="text-xs bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-1 rounded-md font-medium">+more</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Not seeing your city? */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-xl text-[var(--navy)] mb-2">Don&apos;t see your city?</h2>
          <p className="text-[var(--concrete)] mb-6">
            We travel across all of Southwestern Ontario. Contact us to confirm coverage in your area — chances are we service it.
          </p>
          <a href={site.emailHref} className="btn btn-primary px-7 py-3">
            Ask About Your Area
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
