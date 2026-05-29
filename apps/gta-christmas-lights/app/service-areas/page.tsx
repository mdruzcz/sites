import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { getServiceAreas } from "@/lib/content";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "GTA Service Areas | Christmas Light Installation",
  description:
    "GTA Christmas Lights serves 20 cities across the Greater Toronto Area — Toronto, Vaughan, Markham, Richmond Hill, Mississauga, Oakville, Brampton, Aurora, and more. Find your area.",
  openGraph: {
    title: "GTA Service Areas — GTA Christmas Lights",
    description:
      "20 cities served across the Greater Toronto Area. Find your city.",
    url: `${site.url}/service-areas`,
  },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Service Areas", url: `${site.url}/service-areas` },
            ])
          ),
        }}
      />

      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Service Areas
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            20 Cities Across the GTA
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            From downtown Toronto to executive estates in Caledon — we
            design, install, and maintain Christmas lighting across the
            entire Greater Toronto Area.
          </p>
        </div>
      </section>

      <section className="bg-[var(--background)] py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/services/christmas-light-installation/${area.slug}`}
                className="card overflow-hidden group block hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={area.heroImage}
                    alt={`Christmas light installation in ${area.city}, Ontario by GTA Christmas Lights`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <h2
                      className="text-white font-bold text-xl flex items-center gap-2"
                      style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                    >
                      <MapPin className="h-5 w-5 text-[var(--accent-gold)]" />
                      {area.city}
                    </h2>
                    <ArrowRight className="h-5 w-5 text-white/80 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-3">
                    {area.intro}
                  </p>
                </div>
              </Link>
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
            Don&apos;t See Your City?
          </h2>
          <p className="text-white/85 mb-6">
            We may still serve your area. Get in touch — we&apos;ll let you
            know.
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
