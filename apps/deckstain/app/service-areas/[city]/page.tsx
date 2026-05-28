import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCities, getCity, getServices } from "@/lib/content";
import CtaBand from "@/components/CtaBand";
import QuoteForm from "@/components/QuoteForm";

export const revalidate = 3600;

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export async function generateStaticParams() {
  const cities = getCities();
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const cityData = getCity(city);
  if (!cityData) return {};

  return {
    title: `Deck Staining in ${cityData.name}, ON | DeckStain.ca`,
    description: `Professional deck staining, sealing, and restoration in ${cityData.name}, Ontario. READY Seal® oil-based stains. Free photo quotes in 2 business days. Serving all of ${cityData.region}.`,
    openGraph: {
      title: `Deck Staining in ${cityData.name}, ON | DeckStain.ca`,
      description: `Professional deck staining in ${cityData.name}, Ontario. Free photo quotes in 2 days.`,
      images: ["/images/after-staining.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: `Deck Staining in ${cityData.name} | DeckStain.ca`,
      description: `Professional deck staining services in ${cityData.name}, Ontario.`,
    },
  };
}

export default async function ServiceAreaCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityData = getCity(city);
  if (!cityData) notFound();

  const services = getServices();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <Image
          src="/images/after-staining.jpg"
          alt={`Professional deck staining in ${cityData.name}, Ontario by DeckStain.ca`}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/service-areas" className="hover:text-white transition-colors">Service Areas</Link>
            <span>/</span>
            <span className="text-white">{cityData.name}</span>
          </nav>
          <p className="eyebrow text-[var(--accent)] mb-3">{cityData.region}</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">
            Deck Staining in {cityData.name}, Ontario
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            Professional deck staining, sealing, and restoration for {cityData.name} homeowners.
            Free photo quotes in 2 business days.
          </p>
        </div>
      </section>

      {/* ─── CONTENT + FORM ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <h2 className="h-display text-2xl md:text-3xl text-[var(--charcoal)] mb-6">
                Serving {cityData.name} &amp; {cityData.region}
              </h2>
              <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal">
                DeckStain.ca is proud to serve homeowners throughout {cityData.name} and the wider{" "}
                {cityData.region} area. {cityData.description}
              </p>
              <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal">
                We use READY Seal® premium oil-based stains — the same product trusted by
                professional deck contractors across Ontario. Unlike water-based stains that coat the
                surface and peel within a season, our oil-based formula penetrates deep into the wood
                for protection that lasts 2–3 years.
              </p>
              <p className="text-[var(--concrete)] mb-8 leading-relaxed normal-case font-normal">
                Our photo quote system makes it easy. Send us a few photos of your deck or fence and
                we&apos;ll have a detailed quote back to you within 2 business days. No in-person
                estimates needed.
              </p>

              {/* Project image */}
              <div className="relative rounded-2xl overflow-hidden aspect-video mb-8">
                <Image
                  src="/images/project-01.jpg"
                  alt={`Professionally stained deck project near ${cityData.name}, Ontario`}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>

              {/* Services in this city */}
              <h3 className="h-display text-2xl text-[var(--charcoal)] mb-5">
                Services in {cityData.name}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 hover:border-[var(--accent)] group transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
                    <span className="text-sm font-semibold text-[var(--charcoal)] group-hover:text-[var(--accent)] transition-colors">
                      {service.title}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Trust items */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "📷", title: "Photo Quotes", body: "No in-person visit required" },
                  { icon: "⚡", title: "2-Day Response", body: "Fast, detailed estimates" },
                  { icon: "✅", title: "100% Guaranteed", body: "Satisfaction on every job" },
                ].map((item) => (
                  <div key={item.title} className="text-center p-4 bg-[var(--surface)] rounded-xl border border-[var(--border)]">
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <h4 className="font-bold text-[var(--charcoal)] mb-1 text-sm">{item.title}</h4>
                    <p className="text-[var(--concrete)] text-xs normal-case font-normal">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar form */}
            <div>
              <div className="sticky top-28 bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
                <h2 className="h-display text-lg text-[var(--charcoal)] mb-1">
                  Get a Quote in {cityData.name}
                </h2>
                <p className="text-[var(--concrete)] text-sm mb-6 normal-case font-normal">
                  Response within 2 business days. No obligation.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
