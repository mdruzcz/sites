import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { QuoteForm } from "@/components/QuoteForm";
import { Check } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Get a Free Photo Quote",
  description: "Request a free deck or fence staining quote in Southwestern Ontario. Fill out the form, send a few photos, and we'll reply within 2 business days. No site visit needed.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead eyebrow="Free photo quote" title="Let's get your deck looking incredible." intro={SITE.promise}
        image="/images/hero-contact.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />

      <section className="sec bg-white">
        <div className="wrap grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          <div className="card p-7 md:p-8 shadow-[var(--shadow-md)] order-2 lg:order-1">
            <h2 className="h text-2xl text-[var(--ink)] mb-0.5">Tell us about your project</h2>
            <p className="text-[var(--ink-3)] mb-5">We&apos;ll respond within {SITE.responseTime}.</p>
            <QuoteForm />
          </div>

          <aside className="space-y-4 order-1 lg:order-2">
            <div className="card p-6">
              <h3 className="h text-lg text-[var(--ink)] mb-3.5">Reach us directly</h3>
              <ul className="space-y-3.5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[var(--green-tint)] flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-[var(--green)]" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg></span>
                  <span><span className="block text-[var(--ink-3)] text-xs">Phone</span><a href={SITE.phoneHref} className="font-bold text-[var(--ink)] hover:text-[var(--green)] transition-colors" style={{ fontFamily: "var(--font-head)" }}>{SITE.phone}</a></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[var(--green-tint)] flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-[var(--green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                  <span><span className="block text-[var(--ink-3)] text-xs">Hours</span><span className="font-bold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>{SITE.hours}</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[var(--green-tint)] flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-[var(--green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.66 16.66L13.41 20.9a2 2 0 01-2.82 0l-4.25-4.24a8 8 0 1111.32 0z" /><circle cx="12" cy="11" r="3" /></svg></span>
                  <span><span className="block text-[var(--ink-3)] text-xs">Service area</span><span className="font-bold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>{SITE.region} — {SITE.stats.cities} cities</span></span>
                </li>
              </ul>
            </div>

            <div className="card p-6 bg-[var(--bg-alt)]">
              <h3 className="h text-lg text-[var(--ink)] mb-2.5">Photo tips for an accurate quote</h3>
              <ul className="space-y-2 text-sm muted">
                {["Full deck from a couple of angles", "Close-ups of any damaged boards", "Show railings and stairs", "Shoot in natural daylight", "Reply to our email with your photos"].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check className="w-4 h-4 mt-0.5" /> {t}</li>
                ))}
              </ul>
            </div>

            <div className="card p-6 flex items-center gap-3.5 border-[var(--green)]/30 bg-[var(--green-tint)]">
              <span className="w-10 h-10 rounded-full bg-[var(--green)] flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
              <div><p className="font-bold text-[var(--ink)] text-sm" style={{ fontFamily: "var(--font-head)" }}>2-day response guarantee</p><p className="text-xs muted mt-0.5">We reply to every quote request within 2 business days.</p></div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
