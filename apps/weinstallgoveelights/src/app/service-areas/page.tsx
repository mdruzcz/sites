import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import serviceAreas from "@/content/service-areas.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas — Govee Light Installation Across Ontario",
  description:
    "We install Govee permanent outdoor lights across 13+ regions in Ontario — from Windsor to Oshawa, London to Niagara Falls. Check if we serve your city.",
  openGraph: {
    title: "Service Areas — Govee Light Installation Across Ontario",
    description:
      "Govee permanent outdoor light installation across 13+ regions in Ontario.",
    url: "https://weinstallgoveelights.ca/service-areas",
  },
  twitter: {
    title: "Service Areas — Govee Light Installation Across Ontario",
    description: "Govee permanent outdoor light installation across Ontario.",
  },
};

const servicePageSlugs: Record<string, string> = {
  "london-ontario": "london-ontario",
  "woodstock-oxford-county": "woodstock-oxford-county",
  "kitchener-waterloo": "kitchener-waterloo",
  "hamilton-niagara": "hamilton-niagara",
  "windsor-essex": "windsor-essex",
  "stratford-ontario": "stratford-ontario",
};

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 via-transparent to-[#06B6D4]/5 pointer-events-none" />
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            We Serve{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
              All of Southwestern Ontario
            </span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            From Windsor in the west to Oshawa in the east — and every city in between.
            Professional Govee permanent outdoor lighting installation for homes and businesses.
          </p>
        </div>
      </section>

      {/* Region cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {serviceAreas.map((area) => (
            <div
              key={area.slug}
              className="bg-[#141430] border border-[#1E1E42] rounded-2xl p-6 hover:border-[#8B5CF6]/50 transition-colors"
            >
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                {area.region}
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {area.cities.map((city) => (
                  <span
                    key={city}
                    className="text-xs bg-[#0E0E24] border border-[#1E1E42] rounded-full px-3 py-1 text-gray-300"
                  >
                    {city}
                  </span>
                ))}
              </div>
              {servicePageSlugs[area.slug] && (
                <Link
                  href={`/services/permanent-govee-lighting/${area.slug}`}
                  className="text-[#A78BFA] hover:text-white text-sm font-medium transition-colors"
                >
                  View {area.region} page →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Can't find your city */}
        <div className="mt-12 bg-[#141430] border border-[#1E1E42] rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-3">Can't Find Your City?</h2>
          <p className="text-gray-400 mb-6 text-sm">
            We cover a large area and are always expanding. Reach out — we likely serve your area
            or can arrange a visit.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Image banner */}
      <section className="relative overflow-hidden h-72 md:h-96 mb-0">
        <Image
          src="/images/Forever-Lights-Example-2.jpg"
          alt="Govee permanent outdoor lighting installed on a home across Ontario - professional installation by We Install Govee Lights"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07071A] via-[#07071A]/60 to-transparent" />
      </section>
    </>
  );
}
