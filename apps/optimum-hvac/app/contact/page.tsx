import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact | Free HVAC Quote in Oxford County",
  description: `Contact ${site.name} for a free HVAC estimate in Woodstock, Ingersoll, Tillsonburg, and Oxford County. Same-day service available. TSSA G2 certified.`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Get a Free Quote</h1>
          <p className="text-white/70 text-lg max-w-xl">
            No-obligation estimates for all HVAC services across Oxford County. We respond within {site.responseTime}.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <QuoteForm formType="quote" variant="card" />
            </div>
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="font-bold text-[var(--navy)] mb-4 text-lg">Contact Info</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-bold text-[var(--slate)] uppercase text-xs tracking-wider mb-1">Phone</p>
                    <a href={site.phoneHref} className="text-[var(--heat)] font-bold text-lg">{site.phone}</a>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--slate)] uppercase text-xs tracking-wider mb-1">Email</p>
                    <a href={`mailto:${site.email}`} className="text-[var(--navy)]">{site.email}</a>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--slate)] uppercase text-xs tracking-wider mb-1">Hours</p>
                    <p className="text-[var(--navy)]">{site.hours}</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--slate)] uppercase text-xs tracking-wider mb-1">Emergency</p>
                    <p className="text-[var(--navy)] font-semibold">{site.hoursEmergency}</p>
                  </div>
                </div>
              </div>
              <div className="card p-5 bg-red-50 border-red-200">
                <p className="font-bold text-red-700 text-sm mb-1">HVAC Emergency?</p>
                <p className="text-xs text-red-600 mb-3">No heat, gas smell, or AC failure in extreme heat?</p>
                <a href="/emergency" className="btn btn-navy w-full text-xs py-2">Emergency Service →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
