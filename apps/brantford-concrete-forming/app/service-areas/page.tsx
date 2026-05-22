import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { getServiceAreas, getServices } from "@/lib/content";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas — Brantford, Paris, Burford & More",
  description:
    "Brantford Concrete Forming serves Brantford, Paris, Burford, St. George & Mount Pleasant, ON. Expert concrete driveways, patios, and stamped concrete in Brant County.",
  openGraph: {
    title: "Service Areas — Brantford Concrete Forming",
    description: "Concrete forming services across Brant County: Brantford, Paris, Burford, St. George & Mount Pleasant, ON.",
    images: [{ url: "/images/Concrete-Driveway-Installation-1.png", alt: "Concrete forming across Brant County" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function ServiceAreasPage() {
  const areas = getServiceAreas();
  const services = getServices();
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Service Areas", url: `${site.url}/service-areas` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Service Areas</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Service Areas</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Proudly serving Brantford and the surrounding communities of Brant County with expert concrete forming services.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {areas.cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-[#1a2332]">{city.name}, ON</h2>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[#E8751A] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{city.description}</p>
                <div className="flex flex-wrap gap-1">
                  {services.slice(0, 3).map((s) => (
                    <span key={s.slug} className="text-xs bg-[#f8fafc] border border-slate-200 rounded-full px-2 py-0.5 text-slate-600">
                      {s.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {/* Services by area grid */}
          <div className="bg-[#f8fafc] rounded-2xl p-8">
            <h2 className="text-2xl font-extrabold text-[#1a2332] mb-6 text-center">All Services in Your Area</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 pr-4 font-semibold text-slate-700">Service</th>
                    {areas.cities.map((c) => (
                      <th key={c.slug} className="text-center py-3 px-2 font-semibold text-slate-700 min-w-[80px]">{c.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.slug} className="border-b border-slate-100 hover:bg-white transition-colors">
                      <td className="py-3 pr-4 font-medium text-[#1a2332]">{s.title}</td>
                      {areas.cities.map((c) => (
                        <td key={c.slug} className="py-3 px-2 text-center">
                          <Link
                            href={`/services/${s.slug}/${c.slug}`}
                            className="text-[#E8751A] hover:underline text-xs font-medium"
                          >
                            ✓
                          </Link>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
