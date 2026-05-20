import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact — Free Concrete Driveway Quote in London ON",
  description: `Get a free on-site concrete driveway quote in London, Ontario or across Southwestern Ontario. Call ${site.phone} or send a quote request online.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-charcoal text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow !text-[var(--accent)]">Free Quote</p>
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mb-4">
            Let&apos;s Pour Your Driveway.
          </h1>
          <p className="text-lg text-[var(--concrete-200)] max-w-3xl">
            Tell us about the project, send a couple of photos, and we&apos;ll come out for a free on-site quote within 48 hours.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="h-display text-3xl text-[var(--charcoal)] mb-6">
                Talk to a Real Person
              </h2>
              <div className="space-y-5">
                <ContactItem
                  icon={<PhoneIcon />}
                  label="Call"
                  value={site.phone}
                  href={site.phoneHref}
                />
                <ContactItem
                  icon={<EmailIcon />}
                  label="Email"
                  value={site.email}
                  href={site.emailHref}
                />
                <ContactItem
                  icon={<MapIcon />}
                  label="Service Area"
                  value={`London, ON and Southwestern Ontario`}
                />
                <ContactItem
                  icon={<ClockIcon />}
                  label="Hours"
                  value={site.hours}
                />
              </div>

              <div className="mt-10 p-6 bg-white rounded-xl border-l-4 border-[var(--accent)]">
                <h3 className="font-bold text-lg text-[var(--charcoal)] mb-2">What to Expect</h3>
                <ul className="space-y-2 text-[var(--concrete)] text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">1.</span>
                    Send the quote request below or call us directly.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">2.</span>
                    We confirm a 20-minute on-site visit within {site.responseTime}.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--accent)] font-bold">3.</span>
                    Written, itemized quote delivered within 48 hours of the visit.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-lg bg-[var(--accent)] flex items-center justify-center text-white shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--concrete)] font-semibold">{label}</p>
        <p className="text-[var(--charcoal)] font-semibold text-lg">{value}</p>
      </div>
    </div>
  );
  if (href) return <a href={href} className="block hover:opacity-80 transition-opacity">{content}</a>;
  return content;
}

function PhoneIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>;
}
function EmailIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>;
}
function MapIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>;
}
function ClockIcon() {
  return <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>;
}
