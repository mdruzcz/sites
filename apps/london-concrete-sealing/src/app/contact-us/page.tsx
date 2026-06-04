import type { Metadata } from 'next';
import Link from 'next/link';
import { site, serviceAreas } from '@/lib/content';
import { Eyebrow } from '@/components/ui';
import ContactForm from '@/components/ContactForm';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact London Concrete Sealing for a free, no-obligation quote on driveway, patio & stamped concrete sealing in London, Ontario and surrounding areas. Call (519) 914-1911.',
  alternates: { canonical: '/contact-us' },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-deep dot-grid text-white">
        <div className="container-x py-16 sm:py-20">
          <nav className="text-sm text-slate-300 mb-5 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-accent-light">Home</Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-extrabold max-w-3xl leading-[1.08]">Get In Touch</h1>
          <p className="mt-5 text-lg text-slate-300 max-w-2xl">
            Have any questions? Get in touch today for a free quote and elevate your property with our
            concrete sealing and repair expertise.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Eyebrow>Contact Details</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold text-ink">We'd Love to Hear From You</h2>
            <p className="mt-4 text-slate-muted leading-relaxed">
              Reach out by phone, email, or the form and we'll get back to you within 24 hours with a
              free, no-obligation quote.
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
                  <span className="block font-semibold text-ink">{site.hours.weekdays}</span>
                  <span className="block text-sm text-slate-muted">{site.hours.weekends}</span>
                </span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="font-semibold text-ink mb-3">Service Areas</h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.filter((a) => a.slug !== 'london-surrounding-areas').map((a) => (
                  <Link key={a.slug} href={a.urlPath} className="rounded-full border border-slate-200 px-4 py-1.5 text-sm text-slate-muted hover:border-accent hover:text-accent transition-colors">
                    {a.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-9 bg-white">
            <h2 className="text-xl font-bold text-ink mb-1">Request a Free Quote</h2>
            <p className="text-sm text-slate-muted mb-6">Fields marked * are required.</p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
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
