import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, site, faqs } from '@/lib/content';
import ContactForm from '@/components/ContactForm';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} in London, ON`,
    description: `Professional ${service.name.toLowerCase()} services in London, Ontario. ${service.shortDescription} Get a free quote today!`,
    openGraph: {
      title: `${service.name} | London Concrete Sealing`,
      description: service.shortDescription,
      url: `https://londonconcretesealing.ca/services/${slug}`,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: site.name,
      url: site.url,
    },
    areaServed: { '@type': 'City', name: 'London', containedInPlace: { '@type': 'Province', name: 'Ontario' } },
  };

  const serviceFaqs = faqs.slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">{service.name}</span>
          </nav>
          <div className="text-5xl mb-4">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">{service.shortDescription}</p>
          <Link href="/contact" className="accent-btn inline-block mt-6 px-6 py-3 rounded-lg font-semibold min-h-[44px]">
            Get a Free Quote
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Service</h2>
              <p className="text-gray-600 mb-8">{service.description}</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Benefits</h2>
              <ul className="space-y-3 mb-10">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mt-0.5 flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>✓</span>
                    <span className="text-gray-700">{b}</span>
                  </li>
                ))}
              </ul>

              {service.process && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>
                  <div className="space-y-4">
                    {service.process.map((step, i) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--accent)' }}>
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{step.step}</h4>
                          <p className="text-gray-600 text-sm">{step.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {'finishTypes' in service && service.finishTypes && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Finish Types</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(service.finishTypes as { name: string; description: string }[]).map((finish) => (
                      <div key={finish.name} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-bold text-gray-900 mb-1">{finish.name}</h4>
                        <p className="text-sm text-gray-600">{finish.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-4">Get a Free Quote</h3>
                <p className="text-sm text-gray-600 mb-4">Serving London, St. Thomas, Woodstock, Stratford &amp; surrounding areas.</p>
                <Link href="/contact" className="accent-btn block text-center py-3 rounded-lg font-semibold">
                  Contact Us Today
                </Link>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3">Other Services</h3>
                <ul className="space-y-2">
                  {services.filter((s) => s.slug !== service.slug).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="text-sm hover:text-[var(--accent)] text-gray-700 flex items-center gap-2">
                        <span>{s.icon}</span> {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Common Questions</h2>
          <div className="space-y-4">
            {serviceFaqs.map((faq) => (
              <details key={faq.question} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                <summary className="p-5 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Request a Free {service.name} Quote</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
