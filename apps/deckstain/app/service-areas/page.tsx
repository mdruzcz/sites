import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCities, getServiceAreas } from "@/lib/content";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck Staining Service Areas in Ontario | DeckStain.ca",
  description:
    "DeckStain.ca serves 40+ cities across Southwestern Ontario including London, Woodstock, Brantford, Kitchener, Cambridge, Guelph, and more.",
  openGraph: {
    title: "Service Areas | DeckStain.ca Ontario",
    description:
      "Deck staining, sealing, and restoration across 40+ cities in Southwestern Ontario.",
    images: ["/images/after-staining.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Areas | DeckStain.ca Ontario",
    description: "40+ cities served across Southwestern Ontario.",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export default function ServiceAreasPage() {
  const cities = getCities();
  const areas = getServiceAreas();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[45vh] min-h-[360px] flex items-center">
        <Image
          src="/images/after-staining.jpg"
          alt="DeckStain.ca serves deck staining customers across Southwestern Ontario"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <p className="eyebrow text-[var(--accent)] mb-3">Where We Work</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">Service Areas</h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            {areas.headline} — from Windsor to Niagara, from the GTA south to Lake Erie.
          </p>
        </div>
      </section>

      {/* ─── CITIES GRID ─── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeader
            eyebrow="40+ Cities"
            title="Serving Southwestern Ontario"
            description={areas.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/service-areas/${city.slug}`}
                className="card p-6 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="font-bold text-lg text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors">
                      {city.name}, ON
                    </h2>
                    <p className="text-[var(--concrete)] text-xs">{city.region}</p>
                  </div>
                  <svg className="w-5 h-5 text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="text-[var(--concrete)] text-sm leading-relaxed normal-case font-normal">
                  {city.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE AREA MAP DESCRIPTION ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container max-w-3xl text-center">
          <p className="eyebrow mb-4">Our Coverage</p>
          <h2 className="h-display text-3xl text-[var(--charcoal)] mb-6">
            40+ Cities and Growing
          </h2>
          <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal text-lg">
            We&apos;re based in the London area and travel across Southwestern Ontario. Whether
            you&apos;re in Oxford County, Waterloo Region, Brant County, or Elgin County — we come
            to you.
          </p>
          <p className="text-[var(--concrete)] leading-relaxed normal-case font-normal">
            Our photo quote system makes it easy to get an accurate estimate regardless of your
            location. No need for us to visit in person — just send photos, get your quote, and
            we&apos;ll schedule a time that works for you.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
