import Link from 'next/link';
import Image from 'next/image';
import { site, services, serviceAreas, testimonials, faqs } from '@/lib/content';
import { Eyebrow, ServiceCard, TestimonialCard, CtaBand, Stars } from '@/components/ui';
import FaqAccordion from '@/components/FaqAccordion';
import ContactForm from '@/components/ContactForm';

export const revalidate = 3600;

const whySeal = [
  {
    title: 'Protect Concrete Integrity',
    points: [
      'Extends lifespan by guarding against weather, oil, grease, and contaminants',
      'Professional application ensures even coverage and deep penetration',
      'Sealed surfaces are easier to clean and maintain',
    ],
  },
  {
    title: 'Increase Property Value',
    points: [
      'Well-maintained concrete boosts curb appeal',
      'A cost-effective way to prevent future costly repairs',
      'A beautifully sealed driveway impresses visitors and buyers',
    ],
  },
  {
    title: 'Enhance Aesthetic Appeal',
    points: [
      'Attractive finishes elevate the look of your property',
      'Brings out natural beauty with colour or a glossy sheen',
      'Protects against fading and discolouration from UV',
    ],
  },
];

const whyChoose = [
  { title: 'Rapid Service Delivery', detail: 'Projects completed efficiently, typically within a few days depending on weather and size.', icon: '⚡' },
  { title: 'Advanced Sealing Technology', detail: 'We use top-of-the-line sealants and application methods for durable, attractive results.', icon: '🧪' },
  { title: 'Streamlined Process', detail: 'From consultation to completion, a hassle-free experience with minimal disruption.', icon: '🗓️' },
  { title: 'Expert Team', detail: 'Our professionals bring over a decade of experience in concrete maintenance.', icon: '👷' },
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src="/images/concrete-sealing-driveway.jpg"
            alt="Freshly sealed concrete driveway in London, Ontario"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep/95 via-deep/85 to-deep/55" />
        </div>

        <div className="container-x relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl text-white fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm font-medium">
              <Stars />
              <span className="text-slate-200">Trusted across Southwestern Ontario</span>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05]">
              Professional Concrete Sealing in London, Ontario
            </h1>
            <p className="mt-5 text-lg text-slate-200 max-w-xl">
              Preserve your concrete without replacement. Expert driveway, patio & stamped
              concrete sealing serving London, St. Thomas, Woodstock & surrounding areas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/contact-us" className="accent-btn px-8 py-4 rounded-xl font-semibold text-lg text-center">
                Get A Free Quote Today
              </Link>
              <a
                href={`tel:${site.phone}`}
                className="px-8 py-4 rounded-xl font-semibold text-lg text-center bg-white/10 border border-white/25 hover:bg-white/20 transition-colors"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-200">
              <span className="flex items-center gap-2"><Dot /> 10+ Years Experience</span>
              <span className="flex items-center gap-2"><Dot /> Eco-Friendly Sealants</span>
              <span className="flex items-center gap-2"><Dot /> Free, No-Obligation Quotes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/concrete-cleaning-sealing.jpg"
                alt="Concrete cleaning and sealing project in London, Ontario"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="hidden sm:flex absolute -bottom-6 -right-6 bg-accent text-white rounded-2xl px-7 py-5 shadow-lg flex-col">
              <span className="text-3xl font-extrabold">10+</span>
              <span className="text-sm font-medium text-white/90">Years of Experience</span>
            </div>
          </div>
          <div>
            <Eyebrow>About Us</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">
              Ontario's Trusted Concrete Protection Experts
            </h2>
            <p className="mt-5 text-slate-muted leading-relaxed">
              London Concrete Sealing provides professional concrete sealing for driveways, patios,
              and walkways. Serving homeowners across London, St. Thomas, and Woodstock, our team
              delivers expert driveway sealing, patio sealing, and stamped concrete sealing near you.
            </p>
            <p className="mt-4 text-slate-muted leading-relaxed">
              With over a decade of experience, we use the latest techniques and products to protect
              and beautify your concrete. Our commitment to quality and customer satisfaction ensures
              your concrete stays in pristine condition for years to come.
            </p>
            <Link
              href="/about-us"
              className="mt-7 inline-flex items-center gap-2 accent-btn px-6 py-3 rounded-lg font-semibold"
            >
              Read More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* WHY SEALING MATTERS */}
      <section className="py-20 bg-slate-50">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Why It Matters</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">
              Why Concrete Sealing Is Essential for London Homeowners
            </h2>
            <p className="mt-4 text-slate-muted">
              Sealing protects your driveways and patios from harsh Canadian winters and damaging
              freeze-thaw cycles.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {whySeal.map((block) => (
              <div key={block.title} className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm">
                <h3 className="text-lg font-bold text-ink mb-4">{block.title}</h3>
                <ul className="space-y-3">
                  {block.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">
              Complete Concrete Sealing & Restoration
            </h2>
            <p className="mt-4 text-slate-muted">
              From driveway sealing to decorative finishes, we protect and beautify every concrete
              surface around your home.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-deep dot-grid text-white">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 text-accent-light font-semibold text-sm uppercase tracking-wider">
              <span className="h-px w-6 bg-accent-light" /> Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold">
              Why Homeowners Choose London Concrete Sealing
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">What Our Customers Say</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Our Service Areas</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">
              Serving London & Southwestern Ontario
            </h2>
            <p className="mt-4 text-slate-muted leading-relaxed">
              Our concrete sealing experts are available near you across London, St. Thomas,
              Woodstock, and surrounding areas.
            </p>
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {serviceAreas.filter((a) => a.slug !== 'london-surrounding-areas').map((a) => (
                <Link
                  key={a.slug}
                  href={a.urlPath}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-ink hover:border-accent hover:text-accent transition-colors"
                >
                  <PinIcon /> {a.name}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-muted">
              Outside these areas?{' '}
              <Link href="/contact-us" className="text-accent font-semibold hover:underline">
                Contact us
              </Link>{' '}
              to see how we can help.
            </p>
          </div>
          <div className="relative h-[380px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <Image
              src="/images/woodstock-concrete-sealing.jpg"
              alt="Concrete sealing service area across Southwestern Ontario"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="container-x grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-muted leading-relaxed">
              Have a question about concrete sealing? Here are answers to what homeowners ask us
              most. Still curious?{' '}
              <Link href="/contact-us" className="text-accent font-semibold hover:underline">
                Get in touch.
              </Link>
            </p>
          </div>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>Get In Touch</Eyebrow>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-ink">Request Your Free Quote</h2>
            <p className="mt-4 text-slate-muted leading-relaxed">
              Get in touch today for a free quote and elevate your property with our concrete sealing
              and repair expertise. We'll get back to you within 24 hours.
            </p>
            <div className="mt-8 space-y-4">
              <a href={`tel:${site.phone}`} className="flex items-center gap-4 group">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-accent-soft text-accent"><PhoneIcon /></span>
                <span>
                  <span className="block text-sm text-slate-muted">Call Us</span>
                  <span className="block font-semibold text-ink group-hover:text-accent transition-colors">{site.phoneDisplay}</span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="flex items-center gap-4 group">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-accent-soft text-accent"><MailIcon /></span>
                <span>
                  <span className="block text-sm text-slate-muted">Email Us</span>
                  <span className="block font-semibold text-ink group-hover:text-accent transition-colors break-all">{site.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid place-items-center w-12 h-12 rounded-xl bg-accent-soft text-accent"><ClockIcon /></span>
                <span>
                  <span className="block text-sm text-slate-muted">Business Hours</span>
                  <span className="block font-semibold text-ink">Mon–Fri: 8:30 AM – 6:00 PM</span>
                </span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-9 bg-white">
            <ContactForm />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Dot() {
  return <span className="w-2 h-2 rounded-full bg-accent" />;
}
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
