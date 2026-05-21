import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact — Request a Quote",
  description: `Get in touch with ${site.name}. We respond within ${site.responseTime} on every inquiry. Light shows, RGB architectural, immersive displays, permanent holiday lighting.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-midnight-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Let's design your <span className="gradient-text">show</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Tell us about the venue, the building, or the event. We come back with a tailored proposal — and where it makes sense, a sample sequence — within {site.responseTime}.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-midnight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Get in touch</h2>
                <div className="space-y-4">
                  <a href={site.phoneHref} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/25 transition-colors">
                      <PhoneIcon />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Phone</p>
                      <p className="text-white font-semibold group-hover:text-accent transition-colors">{site.phone}</p>
                    </div>
                  </a>
                  <a href={site.emailHref} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent/25 transition-colors">
                      <MailIcon />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Email</p>
                      <p className="text-white font-semibold group-hover:text-accent transition-colors">{site.email}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                      <ClockIcon />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Hours</p>
                      <p className="text-white font-semibold text-sm">{site.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                      <PinIcon />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Location</p>
                      <p className="text-white font-semibold text-sm">{site.addressLine}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-3">Response Time</p>
                <p className="text-white font-bold text-2xl mb-2">Within {site.responseTime}</p>
                <p className="text-muted-strong text-sm leading-relaxed">
                  We reply to every inquiry — whether it's a custom event, a permanent install, or a question about what's possible.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
