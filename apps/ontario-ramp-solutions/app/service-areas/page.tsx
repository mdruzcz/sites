import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceAreas } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas — Wheelchair Ramps Across Ontario",
  description:
    "Ontario Ramp Solutions serves London, Hamilton, Kitchener-Waterloo, Toronto, Mississauga, Brampton, Burlington, Guelph, Cambridge, and all of Ontario with professional ramp installation and rental.",
  alternates: { canonical: `${site.url}/service-areas` },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>Service Areas</span>
          </nav>
          <p className="eyebrow text-blue-200">Where We Work</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Wheelchair ramp service across Ontario.
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Based in London, Ontario. Core service zones in London, Hamilton, Kitchener-Waterloo, and the GTA. We travel province-wide for events and larger commercial projects.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-7 group hover:-translate-y-0.5 transition-all card-accented"
              >
                <h2 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-accent transition-colors">
                  {city.name}, ON
                </h2>
                <p className="text-muted-strong text-sm leading-relaxed line-clamp-3 mb-4">
                  {city.description}
                </p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  View services in {city.name}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-16 card p-8 text-center bg-surface">
            <h2 className="font-bold text-xl text-gray-900 mb-3">Don't see your city?</h2>
            <p className="text-muted-strong mb-6 max-w-xl mx-auto">
              We serve all of Ontario. If your city isn't listed, call or email us — chances are we travel there regularly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={site.phoneHref} className="btn btn-primary">{site.phone}</a>
              <Link href="/contact" className="btn btn-ghost">Request a Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
