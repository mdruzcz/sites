import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Concrete Sealing Services in London, ON',
  description: 'Browse all concrete sealing and repair services from London Concrete Sealing — driveway sealing, stamped concrete, driveway installation, finishes & more.',
  openGraph: {
    title: 'Concrete Sealing Services | London Concrete Sealing',
    description: 'Professional concrete sealing for driveways, patios, stamped concrete, and more in London ON.',
    url: 'https://londonconcretesealing.ca/services',
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">Services</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Comprehensive concrete sealing, repair, and installation services for homeowners and businesses in London and Southwestern Ontario.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-10">
            {services.map((service, i) => (
              <div key={service.slug} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{service.name}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-0.5" style={{ color: 'var(--accent)' }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${service.slug}`}
                    className="accent-btn inline-block px-6 py-3 rounded-lg font-semibold min-h-[44px] flex items-center w-fit"
                  >
                    Learn More
                  </Link>
                </div>
                <div className={`bg-gray-100 rounded-2xl h-64 flex items-center justify-center ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="text-8xl">{service.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold mb-4">Transparent &amp; Competitive Pricing</h2>
          <p className="text-gray-300 mb-8">We provide clear pricing structures tailored to your project's specifics. Contact us for a detailed estimate — outstanding value and quality guaranteed.</p>
          <Link href="/contact" className="accent-btn inline-block px-8 py-4 rounded-lg font-bold text-lg">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
