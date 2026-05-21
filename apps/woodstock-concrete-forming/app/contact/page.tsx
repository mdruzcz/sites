import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Request a free concrete driveway or patio quote in Woodstock, Brantford, or Cambridge. ${site.name} responds within ${site.responseTime}.`,
  openGraph: {
    title: `Get a Free Quote | ${site.name}`,
    description: `Request a free concrete quote in Woodstock, Brantford, or Cambridge. We respond within ${site.responseTime}.`,
  },
};

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <>
      <section className="py-12 sm:py-16 bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow">Free Estimate</p>
            <h1 className="h-display text-4xl sm:text-5xl text-[var(--charcoal)] mb-4">
              Get a Free Quote
            </h1>
            <p className="text-lg text-[var(--concrete)] max-w-2xl mx-auto normal-case font-normal">
              Fill in the form and we&apos;ll be in touch within {site.responseTime}. Or call us directly for faster service.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              <QuoteForm variant="card" />
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="card p-6">
                <h2 className="font-bold uppercase tracking-wide text-sm text-[var(--charcoal)] mb-4">Contact Info</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <PhoneIcon />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mb-0.5">Phone</p>
                      <a href={site.phoneHref} className="text-[var(--charcoal)] font-semibold hover:text-[var(--accent)] transition-colors">
                        {site.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MailIcon />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mb-0.5">Email</p>
                      <a href={site.emailHref} className="text-[var(--charcoal)] font-semibold hover:text-[var(--accent)] transition-colors text-sm break-all">
                        {site.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ClockIcon />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mb-0.5">Hours</p>
                      <p className="text-[var(--charcoal)] text-sm normal-case">{site.hours}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <PinIcon />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--concrete)] mb-0.5">Service Area</p>
                      <p className="text-[var(--charcoal)] text-sm normal-case">Woodstock · Brantford · Cambridge · Oxford &amp; Brant County</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card p-6 bg-[var(--charcoal)] text-white">
                <h2 className="font-bold uppercase tracking-wide text-sm text-[var(--accent)] mb-3">Why Choose Us</h2>
                <ul className="space-y-2">
                  {site.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/80 normal-case">
                      <svg className="w-4 h-4 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function PhoneIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
}
function MailIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
}
function ClockIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
}
function PinIcon() {
  return <svg className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
