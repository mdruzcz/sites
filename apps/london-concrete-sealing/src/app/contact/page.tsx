import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/content';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Free Concrete Sealing Quote in London, ON',
  description: 'Get a free quote for concrete sealing, driveway sealing, or stamped concrete in London, Ontario. Contact London Concrete Sealing today — fast response guaranteed.',
  openGraph: {
    title: 'Contact London Concrete Sealing',
    description: 'Get a free concrete sealing quote in London, St. Thomas, Woodstock, or Stratford, ON.',
    url: 'https://londonconcretesealing.ca/contact',
  },
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact London Concrete Sealing',
    url: `${site.url}/contact`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: site.name,
      email: site.email,
      openingHours: 'Mo-Fr 08:00-17:00',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">Contact</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Get in touch for a free quote. We'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get a Free Quote</h2>
              <ContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Email</p>
                      <a href={`mailto:${site.email}`} className="text-gray-600 hover:text-[var(--accent)]">{site.email}</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Hours</p>
                      <p className="text-gray-600 text-sm">{site.hours.weekdays}</p>
                      <p className="text-gray-600 text-sm">{site.hours.weekends}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Service Area</p>
                      <p className="text-gray-600 text-sm">London · St. Thomas · Woodstock · Stratford · Ingersoll</p>
                      <p className="text-gray-500 text-xs mt-1">Outside these areas? Contact us to see how we can help.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-white p-6 rounded-xl">
                <h3 className="font-bold mb-3">Transparent &amp; Competitive Pricing</h3>
                <p className="text-gray-300 text-sm">
                  We provide clear pricing structures tailored to your project's specifics. Contact us for a detailed estimate — outstanding value and quality guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
