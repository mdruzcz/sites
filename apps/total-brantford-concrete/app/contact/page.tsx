import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/SectionHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us | Free Concrete Estimate in Brantford, ON",
  description: "Contact Total Brantford Concrete for a free on-site estimate. We serve Brantford, Paris, Cambridge, Hamilton, and Brant County. Call (833) 244-3124 or fill out our form.",
  openGraph: {
    title: "Contact Total Brantford Concrete | Free Estimate",
    description: "Get a free on-site concrete estimate. Call (833) 244-3124 or fill out our quick form — we respond within 1 business day.",
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Contact", url: `${site.url}/contact` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--charcoal)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl max-w-2xl">
            Get Your <span className="text-[var(--accent)]">Free Estimate</span> Today
          </h1>
          <p className="text-[var(--concrete-200)] text-lg mt-4 max-w-xl normal-case font-normal">
            No-obligation. We visit your property, assess the project, and provide a clear written quote — usually within 1 business day.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionHeader
                eyebrow="Reach Us Directly"
                title="We're Ready to Help"
              />
              <div className="space-y-6">
                <ContactItem
                  icon={<PhoneIcon />}
                  label="Phone"
                  value={site.phone}
                  href={site.phoneHref}
                />
                <ContactItem
                  icon={<MailIcon />}
                  label="Email"
                  value={site.email}
                  href={site.emailHref}
                />
                <ContactItem
                  icon={<ClockIcon />}
                  label="Hours"
                  value="Monday to Friday: 8:00 AM – 5:00 PM"
                />
                <ContactItem
                  icon={<MapIcon />}
                  label="Service Area"
                  value="Brantford, Paris, Cambridge, Hamilton, Caledonia & Brant County"
                />
              </div>

              <div className="mt-10 card p-6 bg-[var(--surface)]">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[var(--charcoal)] mb-3">What to Expect</h3>
                <ol className="space-y-3">
                  {[
                    "Submit your request or give us a call",
                    "We schedule a free on-site visit (usually within 48 hours)",
                    "We measure, assess, and discuss your design options",
                    "You receive a clear, written quote with no hidden fees",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--concrete)]">
                      <span className="w-6 h-6 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
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
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mb-0.5">{label}</p>
        {href ? (
          <a href={href} className="text-sm font-semibold text-[var(--charcoal)] hover:text-[var(--accent)] transition-colors">{value}</a>
        ) : (
          <p className="text-sm text-[var(--charcoal)]">{value}</p>
        )}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
}
function MailIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
}
function ClockIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
function MapIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
