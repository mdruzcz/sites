import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getServiceAreas } from "@/lib/content";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export async function generateStaticParams() {
  const services = getServices();
  return services.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} in Oxford County, ON`,
    description: `${service.shortDescription} Serving Woodstock, Ingersoll, Tillsonburg, and surrounding Oxford County communities. TSSA G2 certified. Free quotes.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const areas = getServiceAreas();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(service)) }}
      />
      {service.faqs && service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Services", url: `${site.url}/services` },
              { name: service.title, url: `${site.url}/services/${service.slug}` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow-cool">Optimum HVAC Service</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {service.title}
            </h1>
            <p className="text-white/70 text-lg mb-6">{service.shortDescription}</p>
            {"rebateHighlight" in service && service.rebateHighlight && (
              <div className="inline-flex items-center gap-2 bg-[var(--cool)]/20 border border-[var(--cool)]/30 rounded-full px-4 py-2 text-sm font-bold text-[var(--cool)]">
                💰 {service.rebateHighlight}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">
                  Expert {service.title} in Oxford County
                </h2>
                <p className="text-[var(--slate)] leading-relaxed">{service.fullDescription}</p>
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4">What&apos;s Included</h2>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[var(--slate)]">
                      <svg className="w-5 h-5 text-[var(--cool)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service+City links */}
              <div>
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4">
                  {service.title} Near You
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/services/${service.slug}/${area.slug}`}
                      className="text-sm px-3 py-2 border border-[var(--border)] rounded-lg text-[var(--slate)] hover:border-[var(--cool)] hover:text-[var(--navy)] transition-all text-center"
                    >
                      {service.title.split(" ")[0]} in {area.city}
                    </Link>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div>
                  <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq) => (
                      <div key={faq.question} className="card p-5 corner-accent">
                        <h3 className="font-bold text-[var(--navy)] mb-2">{faq.question}</h3>
                        <p className="text-[var(--slate)] text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar form */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <QuoteForm defaultService={service.title} formType="quote" />
              <div className="mt-4 p-4 bg-[var(--heat)]/5 rounded-xl border border-[var(--heat)]/20 text-center">
                <p className="text-xs font-bold text-[var(--slate)] uppercase tracking-wider mb-1">Emergency? Call now</p>
                <a href={site.phoneHref} className="text-lg font-extrabold text-[var(--navy)] hover:text-[var(--heat)] transition-colors">
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
