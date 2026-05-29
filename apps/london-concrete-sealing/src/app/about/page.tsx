import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us — London Concrete Sealing | Over a Decade of Experience',
  description: 'Meet the team behind London Concrete Sealing. Founded by Alex, we\'ve been protecting concrete driveways, patios, and stamped surfaces in London ON since 2014.',
  openGraph: {
    title: 'About London Concrete Sealing',
    description: 'Founded by Alex, our team has over a decade of experience protecting concrete across Southwestern Ontario.',
    url: 'https://londonconcretesealing.ca/about',
  },
};

export default function AboutPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    email: site.email,
    foundingDate: site.founded,
    founder: { '@type': 'Person', name: site.founderName },
    description: site.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* Hero */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">About Us</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Dedication to excellence in concrete protection — serving London and Southwestern Ontario for over a decade.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>Our Story</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dedication to Excellence in Concrete Protection</h2>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">The Beginnings</h3>
                  <p>The journey of London Concrete Sealing starts with Alex, our visionary founder, who entered the concrete maintenance industry in his mid-20s. Beginning with a focus on concrete cleaning, Alex rapidly developed a profound respect and proficiency for the intricate art of sealing and repairing concrete surfaces.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Learning and Growth</h3>
                  <p>Alex's enthusiasm for concrete maintenance propelled him to collaborate with seasoned professionals in the field, where he refined his skills in concrete sealing. This pivotal period played a crucial role in deepening his understanding of the complex techniques required to protect and enhance the longevity of concrete.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">A Vision for Improvement</h3>
                  <p>Motivated by the potential to elevate concrete maintenance services, Alex was inspired to create a business that would set a new standard for quality and innovation in the industry. His goal was clear: to establish a company dedicated to delivering unparalleled concrete sealing and repair services.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">The Birth of London Concrete Sealing</h3>
                  <p>From this vision, London Concrete Sealing was founded. Alex's unwavering commitment to excellence and continuous innovation became the cornerstone of a company that prides itself on quality, reliability, and exceptional customer service.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team &amp; Expertise</h2>
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Decades of Combined Experience</h3>
                    <p>Together with his passionate team, Alex brings extensive experience to every project. Each member is carefully selected for their expertise, commitment, and shared enthusiasm for maintaining and enhancing concrete surfaces.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Collaboration for Excellence</h3>
                    <p>At London Concrete Sealing, we embrace the philosophy of continuous learning and improvement. We engage in active collaboration with leading experts in the concrete industry, sharing insights and techniques to ensure we consistently achieve the best results.</p>
                  </div>
                </div>
              </div>

              {/* Mission cards */}
              <div className="space-y-3">
                {[
                  { title: 'Commitment to Quality', body: 'We utilize the finest materials, apply the most effective techniques, and pay close attention to every detail.', icon: '🏆' },
                  { title: 'Customer Satisfaction', body: 'The cornerstone of our business — we recognize the importance of your concrete surfaces and are dedicated to preserving them.', icon: '🤝' },
                  { title: 'Eco-Friendly Practices', body: 'Committed to using environmentally friendly products and sustainable methods with minimal environmental impact.', icon: '🌿' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Concrete?</h2>
          <p className="text-gray-300 mb-8">Whether it's revitalizing an old driveway or sealing a new patio, our team is ready to bring our specialized expertise to your property.</p>
          <Link href="/contact" className="accent-btn inline-block px-8 py-4 rounded-lg font-bold text-lg min-h-[44px]">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
