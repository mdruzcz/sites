import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { SITE } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Us | Free Kitchen Renovation Quote | K&M Kitchen Renovations",
  description:
    "Get a free, no-obligation kitchen renovation quote from K&M Kitchen Renovations. We serve London, St. Thomas, Woodstock, and surrounding Ontario communities.",
  openGraph: {
    title: "Get a Free Kitchen Renovation Quote | K&M",
    description: "Contact K&M Kitchen Renovations for a free quote. 24-hour response. Serving Southwestern Ontario.",
    images: [{ url: "/images/kitchen-5.jpg" }],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/kitchen-5.jpg"
            alt="Beautiful white kitchen renovation – K&M Kitchen Renovations"
            fill className="object-cover" priority placeholder="blur" blurDataURL={blurDataURL(8, 5)}
          />
          <div className="absolute inset-0 bg-[var(--navy-900)]/85" />
        </div>
        <div className="relative container mx-auto px-4 max-w-3xl text-center">
          <div className="eyebrow justify-center">Free Quote</div>
          <h1 className="h-display text-white text-4xl lg:text-5xl mb-4">
            Get Your Free Kitchen Renovation Quote
          </h1>
          <p className="text-white/75 text-lg">
            Tell us about your project — we&apos;ll respond within 24 hours with an honest, itemized quote.
          </p>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <h2 className="font-bold text-[var(--navy)] text-2xl mb-2">Get In Touch</h2>
              <p className="text-[var(--slate)] mb-8 leading-relaxed">
                We&apos;d love to hear about your kitchen renovation project. Reach out through the form or contact us directly.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-[var(--navy)] text-sm mb-0.5">Phone</div>
                    <a href={`tel:${SITE.phonePlain}`} className="text-[var(--gold)] font-bold text-lg hover:text-[var(--gold-600)] transition-colors">{SITE.phone}</a>
                    <div className="text-[var(--slate-light)] text-xs mt-0.5">Mon–Fri, 8am–6pm</div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <div className="font-bold text-[var(--navy)] text-sm mb-0.5">Email</div>
                    <a href={`mailto:${SITE.email}`} className="text-[var(--slate)] hover:text-[var(--navy)] transition-colors text-sm">{SITE.email}</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--gold)]/15 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <div className="font-bold text-[var(--navy)] text-sm mb-0.5">Location</div>
                    <div className="text-[var(--slate)] text-sm">London, Ontario</div>
                    <div className="text-[var(--slate-light)] text-xs mt-0.5">Serving Southwestern Ontario</div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface)] rounded-xl p-5 border border-[var(--border)]">
                <h3 className="font-bold text-[var(--navy)] mb-3 text-sm">Service Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {["London", "St. Thomas", "Woodstock", "Hamilton", "Kitchener-Waterloo", "Stratford", "Strathroy"].map((city) => (
                    <span key={city} className="px-3 py-1 bg-white border border-[var(--border)] rounded-full text-xs font-medium text-[var(--slate)]">{city}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 card p-8">
              <h3 className="font-bold text-[var(--navy)] text-xl mb-2">Request Your Free Quote</h3>
              <p className="text-[var(--slate-light)] text-sm mb-6">We&apos;ll respond within 24 hours — usually the same day.</p>
              <QuoteForm source="contact-page" />
            </div>
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-16 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-center font-bold text-[var(--navy)] text-2xl mb-10">What Happens After You Contact Us</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { n: "1", title: "24-Hour Response", desc: "We get back to all inquiries within one business day — usually the same day." },
              { n: "2", title: "Free Site Visit or Photo Review", desc: "We'll visit your home or review photos you provide to give you an accurate quote." },
              { n: "3", title: "Detailed Quote in Hand", desc: "You receive a transparent, itemized quote with no hidden fees. Zero pressure to commit." },
            ].map((s) => (
              <div key={s.n} className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-[var(--gold)] text-[var(--navy-900)] font-extrabold text-xl flex items-center justify-center mx-auto mb-4 shadow-lg">{s.n}</div>
                <h3 className="font-bold text-[var(--navy)] mb-2">{s.title}</h3>
                <p className="text-[var(--slate)] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
