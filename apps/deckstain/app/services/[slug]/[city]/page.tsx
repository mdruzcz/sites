import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices, getService, getCity } from "@/lib/content";
import { serviceSchema } from "@/lib/jsonld";
import CtaBand from "@/components/CtaBand";
import QuoteForm from "@/components/QuoteForm";

export const revalidate = 3600;

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

const SERVICE_CITY_PARAMS = [
  { slug: "deck-staining", city: "london-on" },
  { slug: "deck-staining", city: "woodstock-on" },
  { slug: "deck-staining", city: "kitchener-on" },
  { slug: "deck-staining", city: "cambridge-on" },
  { slug: "deck-staining", city: "brantford-on" },
];

export async function generateStaticParams() {
  return SERVICE_CITY_PARAMS;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}): Promise<Metadata> {
  const { slug, city } = await params;
  const service = getService(slug);
  const cityData = getCity(city);
  if (!service || !cityData) return {};

  return {
    title: `${service.title} in ${cityData.name}, ON | DeckStain.ca`,
    description: `Professional ${service.title.toLowerCase()} in ${cityData.name}, Ontario. READY Seal® oil-based stains. Free photo quotes in 2 business days. Serving ${cityData.name} and surrounding ${cityData.region}.`,
    openGraph: {
      title: `${service.title} in ${cityData.name}, ON | DeckStain.ca`,
      description: `Professional ${service.title.toLowerCase()} in ${cityData.name}, Ontario. Free photo quotes in 2 business days.`,
      images: [service.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} in ${cityData.name} | DeckStain.ca`,
      description: `Professional ${service.title.toLowerCase()} in ${cityData.name}, Ontario.`,
    },
  };
}

export default async function ServiceCityPage({
  params,
}: {
  params: Promise<{ slug: string; city: string }>;
}) {
  const { slug, city } = await params;
  const service = getService(slug);
  const cityData = getCity(city);

  if (!service || !cityData) notFound();

  const schema = serviceSchema(service, cityData);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <Image
          src={service.image}
          alt={`${service.title} in ${cityData.name}, Ontario by DeckStain.ca`}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-white/60 text-sm mb-4 flex-wrap">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <Link href={`/services/${slug}`} className="hover:text-white transition-colors">{service.title}</Link>
            <span>/</span>
            <span className="text-white">{cityData.name}</span>
          </nav>
          <p className="eyebrow text-[var(--accent)] mb-3">{cityData.region}</p>
          <h1 className="h-display text-3xl md:text-5xl text-white mb-4">
            {service.title} in {cityData.name}, ON
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            Professional {service.title.toLowerCase()} for {cityData.name} homeowners. READY Seal® oil-based stains. Free photo quotes in 2 days.
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
                Expert {service.title} Serving {cityData.name} &amp; {cityData.region}
              </h2>

              <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal">
                Homeowners throughout {cityData.name} trust DeckStain.ca for professional{" "}
                {service.title.toLowerCase()} that protects and beautifies their outdoor spaces. We
                bring the same quality workmanship and premium READY Seal® stains that have earned
                us a 100% satisfaction rating across {cityData.region}.
              </p>
              <p className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal">
                {cityData.description} Our oil-based stain formula penetrates deep into the wood
                grain for protection that won&apos;t peel or flake — even through Ontario&apos;s
                demanding freeze-thaw cycles.
              </p>
              <p className="text-[var(--concrete)] mb-8 leading-relaxed normal-case font-normal">
                Getting a quote in {cityData.name} is simple: fill out our form and send us a few
                photos of your deck. We&apos;ll review them and respond with a detailed quote within
                2 business days. No in-person visit needed.
              </p>

              {/* Before/After images */}
              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <Image
                    src="/images/deck-01.jpg"
                    alt={`Deck before staining in ${cityData.name}, Ontario`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Before
                  </div>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <Image
                    src="/images/after-staining.jpg"
                    alt={`Deck after professional staining in ${cityData.name}, Ontario`}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 bg-[var(--accent)]/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    After
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-[var(--surface)] rounded-2xl p-6 mb-8">
                <h3 className="h-display text-xl text-[var(--charcoal)] mb-4">
                  What&apos;s Included
                </h3>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-[var(--charcoal)] text-sm normal-case font-normal">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why choose */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: "📷", title: "Photo Quotes", body: "Send photos, get a quote in 2 business days" },
                  { icon: "🛡️", title: "READY Seal®", body: "Premium oil-based stains that last 2–3 years" },
                  { icon: "✅", title: "Guaranteed", body: "100% satisfaction on every project" },
                ].map((item) => (
                  <div key={item.title} className="text-center p-5 bg-white border border-[var(--border)] rounded-xl">
                    <span className="text-3xl mb-2 block">{item.icon}</span>
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
