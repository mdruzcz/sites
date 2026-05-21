import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact — Get a Free Ramp Quote",
  description: `Contact Ontario Ramp Solutions for a free wheelchair ramp consultation and quote. We reply within ${site.responseTime}. Serving London, Hamilton, Kitchener-Waterloo, Toronto, and all of Ontario.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: site.url },
    { name: "Contact", url: `${site.url}/contact` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbs)) }}
      />

      <section className="hero-gradient text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>Contact</span>
          </nav>
          <p className="eyebrow text-blue-200">Contact</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">
            Let&apos;s make your space accessible.
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed">
            Tell us about your entrance, your event, or your recovery timeline. We'll come back with the right solution and a written quote within {site.responseTime}.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Get in touch</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <PhoneIcon />,
                      label: "Phone",
                      value: site.phone,
                      href: site.phoneHref,
                    },
                    {
                      icon: <MailIcon />,
                      label: "Email",
                      value: site.email,
                      href: site.emailHref,
                    },
                  ].map((item) => (
                    <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-muted font-semibold">{item.label}</p>
                        <p className="text-gray-900 font-semibold group-hover:text-accent transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ))}

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      <ClockIcon />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted font-semibold">Hours</p>
                      <p className="text-gray-900 font-semibold text-sm">{site.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                    >
                      <PinIcon />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-widest text-muted font-semibold">Location</p>
                      <p className="text-gray-900 font-semibold text-sm">{site.addressLine}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 card-accented">
                <p className="text-[11px] uppercase tracking-widest text-accent font-bold mb-2">Response Time</p>
                <p className="text-gray-900 font-bold text-2xl mb-2">Within {site.responseTime}</p>
                <p className="text-muted-strong text-sm leading-relaxed">
                  We reply to every inquiry — whether it's an urgent post-surgery discharge or an event six months away.
                </p>
              </div>
            </div>

            {/* Quote form */}
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
