import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Get a Free Quote — Christmas Light Installation in London, ON",
  description:
    "Request a free Christmas light installation quote from Christmas Lights London. We serve London, ON and all of Southwestern Ontario. Fast response, no obligation.",
  openGraph: {
    title: "Get a Free Christmas Lights Quote | Christmas Lights London",
    description: "Request a free, no-obligation quote for professional Christmas light installation in London, Ontario. Fast response, custom-cut lights, full service.",
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "Contact", url: `${site.url}/contact` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--dark-bg)] py-16 md:py-20 border-b border-[var(--border-dark)]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            Free Quote
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Get Your Free Christmas Lights Quote
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Tell us about your property and we&apos;ll put together a customized quote.
            Fast response, no pressure, no obligation.
          </p>
        </div>
      </section>

      {/* Form + Contact Info */}
      <section className="bg-[var(--background)] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Form */}
            <div className="card p-8">
              <QuoteForm heading="Request a Free Quote" showPromise />
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2
                  className="font-bold text-[var(--foreground)] text-xl mb-5"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--muted)] mb-0.5">Phone</p>
                      <a
                        href={site.phoneHref}
                        className="text-[var(--foreground)] font-medium hover:text-[var(--accent)] transition-colors"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--muted)] mb-0.5">Email</p>
                      <a
                        href={site.emailHref}
                        className="text-[var(--foreground)] font-medium hover:text-[var(--accent)] transition-colors break-all"
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--muted)] mb-0.5">Address</p>
                      <p className="text-[var(--foreground)] font-medium">{site.addressLine}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-[var(--muted)] mb-0.5">Hours</p>
                      <p className="text-[var(--foreground)] font-medium">{site.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3
                  className="font-bold text-[var(--foreground)] text-lg mb-4"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  What Happens Next?
                </h3>
                <ol className="space-y-4">
                  {[
                    {
                      step: "1",
                      text: "We review your property on Google Maps to plan the perfect display.",
                    },
                    {
                      step: "2",
                      text: "We send you a free, customized quote within 1 business day.",
                    },
                    {
                      step: "3",
                      text: "You approve, we schedule installation — and handle everything from there.",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold">
                        {item.step}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card p-6">
                <h3
                  className="font-bold text-[var(--foreground)] text-lg mb-3"
                  style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                >
                  Service Areas
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  London · Kitchener · Hamilton · Mississauga · Brantford · Burlington · Guelph ·
                  Oakville · Cambridge · Waterloo · Sarnia · Woodstock · St. Thomas ·
                  Ancaster · And more
                </p>
                <p className="text-xs text-[var(--muted)]/70 mt-3">
                  Not sure if we cover your area? Give us a call — we likely do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
