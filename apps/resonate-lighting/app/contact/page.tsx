import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Request a Quote — Commercial Pixel Lighting in Ontario",
  description: `Request a quote for a Resonate Lighting kit or installation. Starter, Business and Municipal packages for commercial spaces, BIAs and municipalities in Ontario. We reply within ${site.responseTime}.`,
  alternates: { canonical: `${site.url}/contact` },
};

const KIT_TO_PACKAGE: Record<string, string> = {
  starter: "Starter Package",
  business: "Business Package",
  municipal: "Municipal Package",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ kit?: string }> }) {
  const { kit } = await searchParams;
  const defaultPackage = kit ? KIT_TO_PACKAGE[kit] : undefined;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Request a Quote", url: `${site.url}/contact` }])} />
      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Contact</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Request a <span className="gradient-text">quote</span>.
          </h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Tell us about the frontage, tree or street. A few photos and rough dimensions are enough to start. We reply within {site.responseTime} with a package recommendation and pricing in Canadian dollars.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Get in touch</h2>
                <div className="space-y-4 text-sm">
                  <a href={site.phoneHref} className="flex items-center gap-4 group">
                    <IconBox><PhoneIcon /></IconBox>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Phone</p>
                      <p className="text-white font-semibold group-hover:text-resonant transition-colors">{site.phone}</p>
                    </div>
                  </a>
                  <a href={site.emailHref} className="flex items-center gap-4 group">
                    <IconBox><MailIcon /></IconBox>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Email</p>
                      <p className="text-white font-semibold group-hover:text-resonant transition-colors">{site.email}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <IconBox><ClockIcon /></IconBox>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Hours</p>
                      <p className="text-white font-semibold">{site.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <IconBox><PinIcon /></IconBox>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted">Location</p>
                      <p className="text-white font-semibold">{site.addressLine}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <p className="text-[11px] uppercase tracking-widest text-resonant font-bold mb-3">What helps us quote faster</p>
                <ul className="space-y-2 text-sm text-muted-strong">
                  <li>Photos of the frontage, roofline or site, ideally at night</li>
                  <li>Approximate roofline length or tree height</li>
                  <li>Number of buildings (BIA / municipal)</li>
                  <li>Your music source and target dates</li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <QuoteForm defaultPackage={defaultPackage} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-resonant/10 border border-resonant/30 flex items-center justify-center text-resonant shrink-0">
      {children}
    </div>
  );
}
function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
