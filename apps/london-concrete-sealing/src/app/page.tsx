import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { services, testimonials, faqs, site, serviceAreas } from '@/lib/content';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Professional Concrete Sealing & Repair in London, ON',
  description: 'London Ontario\'s trusted concrete sealing specialists. Driveways, patios, stamped concrete — we protect & preserve your concrete. Get a free quote today!',
  openGraph: {
    title: 'London Concrete Sealing | Professional Concrete Sealing & Repair',
    description: 'Over a decade of experience protecting driveways, patios, and stamped concrete in London ON. Free quotes available.',
    url: 'https://londonconcretesealing.ca',
  },
};

export default function HomePage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.province,
      addressCountry: site.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    areaServed: serviceAreas.map((a) => ({ '@type': 'City', name: a.name })),
    priceRange: '$$',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-gray-800/70" />
        <div className="relative container mx-auto max-w-6xl px-4 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>
              London, Ontario
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
              Professional Concrete Sealing &amp; Repair
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Preserve your concrete without replacement. Over a decade of experience protecting driveways, patios, and stamped concrete across Southwestern Ontario.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="accent-btn px-8 py-4 rounded-lg font-bold text-lg min-h-[44px] inline-flex items-center"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 px-8 py-4 rounded-lg font-bold text-lg min-h-[44px] inline-flex items-center transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="font-medium">10+ Years Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <span className="font-medium">Eco-Friendly Sealants</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="font-medium">Fast Turnaround</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="font-medium">Satisfaction Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="font-medium">Free Quotes</span>
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Premier Partner in Concrete Protection</h2>
              <p className="text-gray-600 mb-4">
                At London Concrete Sealing, we specialize in the sealing, repair, and maintenance of concrete surfaces. Founded by Alex, who entered the concrete maintenance industry in his mid-20s, our company is built on a passion for quality and customer satisfaction.
              </p>
              <p className="text-gray-600 mb-6">
                With over a decade of experience, our team uses the latest techniques and products to protect and beautify your concrete driveways, patios, and walkways — ensuring they remain in pristine condition for years to come.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Years Experience', value: '10+' },
                  { label: 'Projects Completed', value: '500+' },
                  { label: 'Satisfied Clients', value: '100%' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <p className="text-2xl font-bold mb-1" style={{ color: 'var(--accent)' }}>{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="accent-btn inline-block px-6 py-3 rounded-lg font-semibold min-h-[44px] flex items-center w-fit">
                Learn More About Us
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { icon: '🛡️', title: 'Protecting Concrete Integrity', body: 'Sealing extends the lifespan of your concrete by protecting against weather, oil, grease, and other contaminants.' },
                { icon: '💰', title: 'Increasing Property Value', body: 'Well-maintained concrete surfaces boost curb appeal. Sealing prevents future costly repairs.' },
                { icon: '✨', title: 'Enhancing Aesthetic Appeal', body: 'Sealing brings out the natural beauty of concrete and protects against fading from UV exposure.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-5 bg-white rounded-xl shadow-sm">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group p-6 border border-gray-200 rounded-xl hover:border-[var(--accent)] hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--accent)] transition-colors">{service.name}</h3>
                <p className="text-gray-600 text-sm">{service.shortDescription}</p>
                <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--accent)' }}>Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Our Advantage</p>
            <h2 className="text-3xl md:text-4xl font-bold">What Makes Us Different</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Rapid Service Delivery', body: 'Projects completed efficiently, typically within a few days depending on size and weather.' },
              { icon: '🔬', title: 'Advanced Technology', body: 'Top-of-the-line sealants and application methods for durable and attractive results.' },
              { icon: '🤝', title: 'Streamlined Process', body: 'From consultation to completion — hassle-free with minimal disruption to your daily life.' },
              { icon: '👷', title: 'Expert Team', body: 'Years of experience in concrete maintenance, guaranteeing top-notch service every time.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-gray-800 rounded-xl text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Happy Clients</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex text-yellow-400 mb-3">
                  {'★'.repeat(t.rating)}
                </div>
                <p className="text-gray-700 mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Service Areas</h2>
            <p className="text-gray-600 mt-2">We serve London and surrounding communities in Southwestern Ontario</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['London', 'St. Thomas', 'Woodstock', 'Stratford', 'Ingersoll', 'Tillsonburg', 'Strathroy', 'and surrounding areas'].map((area) => (
              <span key={area} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {area}
              </span>
            ))}
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            Outside these areas? <Link href="/contact" className="font-medium" style={{ color: 'var(--accent)' }}>Contact us</Link> to see how we can assist.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.slice(0, 5).map((faq) => (
              <details key={faq.question} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                <summary className="p-5 font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center min-h-[56px]">
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

      {/* CTA + Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Get Your Free Quote</h2>
            <p className="text-gray-600">Get in touch today and elevate your property with our concrete sealing expertise.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
