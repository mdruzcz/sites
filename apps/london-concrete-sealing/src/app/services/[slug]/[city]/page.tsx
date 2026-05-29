import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services, serviceAreas, site, faqs } from '@/lib/content';
import ContactForm from '@/components/ContactForm';

export async function generateStaticParams() {
  const params: { slug: string; city: string }[] = [];
  for (const service of services) {
    for (const area of serviceAreas) {
      params.push({ slug: service.slug, city: area.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; city: string }> }): Promise<Metadata> {
  const { slug, city } = await params;
  const service = services.find((s) => s.slug === slug);
  const area = serviceAreas.find((a) => a.slug === city);
  if (!service || !area) return {};
  return {
    title: `${service.name} in ${area.name}, ${area.province}`,
    description: `Professional ${service.name.toLowerCase()} in ${area.name}, Ontario. ${service.shortDescription} Serving ${area.name} and surrounding areas — get a free quote!`,
    openGraph: {
      title: `${service.name} in ${area.name} | London Concrete Sealing`,
      description: `${service.shortDescription} Serving ${area.name}, ON.`,
      url: `https://londonconcretesealing.ca/services/${slug}/${city}`,
    },
  };
}

export default async function ServiceCityPage({ params }: { params: Promise<{ slug: string; city: string }> }) {
  const { slug, city } = await params;
  const service = services.find((s) => s.slug === slug);
  const area = serviceAreas.find((a) => a.slug === city);
  if (!service || !area) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${area.name}`,
    description: `Professional ${service.name.toLowerCase()} services in ${area.name}, ${area.province}.`,
    provider: {
      '@type': 'LocalBusiness',
      name: site.name,
      url: site.url,
    },
    areaServed: {
      '@type': 'City',
      name: area.name,
      containedInPlace: { '@type': 'Province', name: 'Ontario' },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${site.url}/services/${slug}` },
      { '@type': 'ListItem', position: 4, name: area.name, item: `${site.url}/services/${slug}/${city}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <Link href={`/services/${slug}`} className="hover:text-white">{service.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">{area.name}</span>
          </nav>
          <div className="text-5xl mb-4">{service.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {service.name} in {area.name}, {area.province}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Professional {service.name.toLowerCase()} for homeowners and businesses in {area.name}. {service.shortDescription}
          </p>
          <Link href="/contact" className="accent-btn inline-block mt-6 px-6 py-3 rounded-lg font-semibold min-h-[44px]">
            Get a Free Quote in {area.name}
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {service.name} Services in {area.name}
              </h2>
              <p className="text-gray-600 mb-4">
                London Concrete Sealing proudly serves {area.name}, {area.province} with professional {service.name.toLowerCase()} services. {area.description}
              </p>
              <p className="text-gray-600 mb-8">{service.description}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us for {service.name} in {area.name}?</h3>
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
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Our Process in {area.name}</h3>
                  <div className="space-y-4">
                    {service.process.map((step, i) => (
                      <div key={step.step} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full text-white font-bold flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }}>
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

              {/* FAQ */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">FAQs — {service.name} in {area.name}</h3>
                <div className="space-y-3">
                  {faqs.slice(0, 3).map((faq) => (
                    <details key={faq.question} className="bg-gray-50 rounded-xl overflow-hidden group">
                      <summary className="p-4 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center text-sm">
                        {faq.question}
                        <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4 text-gray-600 text-sm border-t border-gray-200">{faq.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-900 mb-3">Free Quote in {area.name}</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
