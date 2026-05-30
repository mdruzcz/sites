import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug, cities, site } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { TrustBar } from "@/components/TrustBar";
import { WhyChoose } from "@/components/WhyChoose";
import { Process } from "@/components/Process";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { CheckIcon, PhoneIcon } from "@/components/icons";

export const revalidate = 3600;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = `${site.url}/services/${service.slug}`;
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      type: "website",
      images: [{ url: service.image, width: 1200, height: 800, alt: service.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const url = `${site.url}/services/${service.slug}`;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${site.url}/#business`,
      name: site.name,
      telephone: site.phone,
      url: site.url,
    },
    areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
      { "@type": "ListItem", position: 3, name: service.name, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <NavBar />

        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-20 lg:pt-24">
          <div className="absolute inset-0">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(51,46,38,0.82) 0%, rgba(74,66,56,0.55) 45%, rgba(74,66,56,0.25) 100%)",
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#FAF8F3]/70">
              <Link href="/" className="hover:text-[#FAF8F3]">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/#services" className="hover:text-[#FAF8F3]">Services</Link>
              <span className="mx-2">/</span>
              <span className="text-[#FAF8F3]">{service.name}</span>
            </nav>

            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm"
                style={{
                  backgroundColor: "rgba(176,125,98,0.18)",
                  color: "#FAF8F3",
                  border: "1px solid rgba(250,248,243,0.35)",
                }}
              >
                Kitchener · Waterloo · Cambridge · Guelph
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] mb-6 text-[#FAF8F3]">
                {service.name}
              </h1>

              <p className="text-lg lg:text-xl text-[#FAF8F3]/85 mb-9 leading-relaxed max-w-xl">
                {service.blurb}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] transition-all hover:scale-105 min-h-11"
                >
                  Get a Free Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[#FAF8F3] border border-[#FAF8F3]/40 hover:bg-[#FAF8F3]/10 backdrop-blur-sm transition-all min-h-11"
                >
                  <PhoneIcon className="w-5 h-5" />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        {/* Body copy + what's included */}
        <section className="py-20 lg:py-28 bg-[var(--greige-soft)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
                  {service.shortName}
                </p>
                <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">
                  {service.name} in Kitchener-Waterloo
                </h2>
                <div className="space-y-5 text-lg text-[var(--driftwood)]/80 leading-relaxed">
                  {service.longDescription.split("\n\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="p-7 rounded-2xl border border-[var(--line)] bg-[var(--cream)] shadow-warm sticky top-28">
                  <h3 className="font-display text-xl font-bold mb-5 text-[var(--driftwood-dark)]">
                    What&apos;s included
                  </h3>
                  <ul className="space-y-3">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--driftwood)]/85">
                        <CheckIcon className="w-4 h-4 text-[var(--terracotta)] mt-0.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] transition min-h-11"
                  >
                    Get a free quote
                  </a>
                </div>
              </aside>
            </div>

            {/* Cross-links: available in these cities */}
            <div className="mt-16 p-8 rounded-2xl border border-[var(--line)] bg-[var(--cream)] shadow-warm">
              <h3 className="font-display text-xl font-bold mb-4 text-[var(--driftwood-dark)]">
                {service.name} across the region
              </h3>
              <p className="text-[var(--driftwood)]/75 mb-5">
                We provide {service.name.toLowerCase()} for homeowners throughout
                Waterloo Region and Wellington County, including:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {cities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/service-areas/${c.slug}`}
                    className="px-3.5 py-1.5 rounded-full text-sm bg-[var(--terracotta)]/10 border border-[var(--terracotta)]/25 text-[var(--driftwood-dark)] hover:bg-[var(--terracotta)]/20 transition"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cross-links: other services */}
            <div className="mt-10">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[var(--terracotta-deep)]">
                Other services
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {otherServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="px-4 py-2 rounded-full text-sm font-medium border border-[var(--line)] text-[var(--driftwood)]/85 hover:text-[var(--terracotta-deep)] hover:border-[var(--terracotta)]/40 transition"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WhyChoose />
        <Process />
        <Gallery />
        <Testimonials />
        <Contact />
        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
