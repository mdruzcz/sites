import type { Metadata } from "next";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "24/7 Emergency HVAC Service | Oxford County",
  description: `Emergency furnace repair and HVAC service in Oxford County. No heat? Gas smell? ${site.name} responds fast — 24/7. Call ${site.phone}.`,
};

export default function EmergencyPage() {
  return (
    <>
      <section className="bg-red-900 text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚨</span>
            <p className="text-red-300 font-bold text-sm uppercase tracking-widest">24/7 Emergency Service</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            No Heat? HVAC Emergency?
          </h1>
          <p className="text-white/80 text-lg mb-6 max-w-xl">
            We respond fast across Oxford County. Call us now or fill out the emergency form and we&apos;ll call you back within 15 minutes.
          </p>
          <a href={site.phoneHref} className="btn btn-primary text-xl py-4 px-8">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {site.phone} Now
          </a>
        </div>
      </section>
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-6">Emergency Request Form</h2>
              <QuoteForm formType="emergency" variant="card" />
            </div>
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="font-bold text-[var(--navy)] mb-4">While You Wait</h2>
                <ul className="space-y-3 text-sm text-[var(--slate)]">
                  <li className="flex gap-3"><span className="font-bold text-[var(--navy)]">Gas smell?</span>Leave the home, don&apos;t use electrical switches, call Enbridge at 1-877-362-7434</li>
                  <li className="flex gap-3"><span className="font-bold text-[var(--navy)]">No heat?</span>Close interior doors to retain warmth, use space heaters cautiously</li>
                  <li className="flex gap-3"><span className="font-bold text-[var(--navy)]">No AC?</span>Draw blinds, stay hydrated, move to the coolest room</li>
                  <li className="flex gap-3"><span className="font-bold text-[var(--navy)]">Flooding?</span>Turn off the water main, call a plumber if water heater is involved</li>
                </ul>
              </div>
              <div className="card p-5 bg-[var(--heat)]/5 border-[var(--heat)]/20 text-center">
                <p className="text-xs font-bold text-[var(--slate)] uppercase tracking-wider mb-2">Fastest Response</p>
                <a href={site.phoneHref} className="text-2xl font-extrabold text-[var(--navy)] hover:text-[var(--heat)] transition-colors block">{site.phone}</a>
                <p className="text-xs text-[var(--slate)] mt-1">{site.hoursEmergency}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
