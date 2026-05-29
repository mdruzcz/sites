import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServices, getService, getFaqs, getCities } from "@/lib/content";
import { serviceSchema } from "@/lib/jsonld";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import SectionHeader from "@/components/SectionHeader";
import QuoteForm from "@/components/QuoteForm";

export const revalidate = 3600;

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIRAAAQMEAgMAAAAAAAAAAAAAAQIDBAAFETESIUH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Apuk7bYtMpFnhJeXFiRG2UqAJWoISAVHySep50iqM1Eoz9x1a1pBIcbRvHBQeaKK0ZlHW//2Q==";

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Ontario | DeckStain.ca`,
    description: `Professional ${service.title.toLowerCase()} services across Ontario. ${service.shortDescription} Free photo quotes in 2 business days.`,
    openGraph: {
      title: `${service.title} in Ontario | DeckStain.ca`,
      description: `Professional ${service.title.toLowerCase()} services across Ontario. Free photo quotes in 2 business days.`,
      images: [service.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | DeckStain.ca Ontario`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faqs = getFaqs().slice(0, 4);
  const cities = getCities().slice(0, 5);
  const allServices = getServices();
  const relatedServices = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  const paragraphs = service.fullDescription.split("\n\n");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />

      {/* ─── HERO ─── */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <Image
          src={service.image}
          alt={`${service.title} service by DeckStain.ca in Ontario`}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          sizes="100vw"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container relative z-10">
          <Link href="/services" className="text-white/60 hover:text-white text-sm mb-4 inline-flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Services
          </Link>
          <p className="eyebrow text-[var(--accent)] mb-3">Professional Service</p>
          <h1 className="h-display text-4xl md:text-5xl text-white mb-4">{service.title}</h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed normal-case font-normal">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* ─── CONTENT + FORM ─── */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none mb-10">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-[var(--concrete)] mb-4 leading-relaxed normal-case font-normal">
                    {para}
                  </p>
                ))}
              </div>

              {/* Features */}
              <div className="bg-[var(--surface)] rounded-2xl p-6 md:p-8 mb-10">
                <h2 className="h-display text-xl text-[var(--charcoal)] mb-6">
                  What&apos;s Included
                </h2>
                <ul className="space-y-3">
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

              {/* Related project images */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <Image
                    src="/images/project-01.jpg"
                    alt="Completed deck staining project by DeckStain.ca in London Ontario"
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <Image
                    src="/images/after-staining.jpg"
                    alt="After professional deck staining service - READY Seal oil-based finish"
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Cities */}
              <div className="mb-10">
                <h2 className="h-display text-2xl text-[var(--charcoal)] mb-6">
                  {service.title} by City
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/services/${slug}/${city.slug}`}
                      className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-semibold text-[var(--charcoal)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-center"
                    >
                      {service.title} in {city.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <SectionHeader eyebrow="FAQ" title="Common Questions" centered={false} />
                <FaqAccordion faqs={faqs} />
              </div>
            </div>

            {/* Sidebar form */}
            <div>
              <div className="sticky top-28 bg-[var(--surface)] rounded-2xl p-6 border border-[var(--border)]">
                <h2 className="h-display text-xl text-[var(--charcoal)] mb-2">Get a Free Quote</h2>
                <p className="text-[var(--concrete)] text-sm mb-6 normal-case font-normal">
                  Send us your details — we respond within 2 business days.
                </p>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RELATED SERVICES ─── */}
      <section className="section bg-[var(--surface)]">
        <div className="container">
          <SectionHeader eyebrow="More Services" title="You Might Also Need" />
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group p-5">
                <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                  <Image
                    src={s.image}
                    alt={`${s.title} by DeckStain.ca Ontario`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="font-bold text-[var(--charcoal)] mb-1 group-hover:text-[var(--accent)] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--concrete)]">{s.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
