import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "HVAC Financing Options | Oxford County",
  description: `Flexible financing for furnace, AC, and heat pump installations in Oxford County. 0% interest options available. ${site.name} — TSSA certified.`,
};

export const revalidate = 3600;

export default function FinancingPage() {
  return (
    <>
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow-cool">Affordable Payments</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            HVAC Financing Options
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Get the HVAC system you need now. Flexible financing options including 0% interest promotional periods through approved lenders.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4">Financing Options Available</h2>
                <ul className="space-y-4">
                  {[
                    {
                      title: "0% Interest Financing",
                      desc: "Promotional 0% interest periods available for qualifying purchases on furnaces, ACs, and heat pumps. Terms vary — ask us for current offers.",
                    },
                    {
                      title: "Canada Greener Homes Loan",
                      desc: "Up to $40,000 at 0% interest for 10 years for heat pump and energy efficiency upgrades. Government-backed, no income requirements.",
                    },
                    {
                      title: "Monthly Payment Plans",
                      desc: "Spread your HVAC investment over 12, 24, or 60 months through our approved lending partners.",
                    },
                  ].map((opt) => (
                    <li key={opt.title} className="flex gap-4 border-b border-[var(--border)] pb-4 last:border-0 last:pb-0">
                      <svg className="w-5 h-5 text-[var(--cool)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h3 className="font-bold text-[var(--navy)] text-sm mb-1">{opt.title}</h3>
                        <p className="text-sm text-[var(--slate)] leading-relaxed">{opt.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card p-5 bg-[var(--cool)]/5 border-[var(--cool)]/20">
                <p className="font-bold text-[var(--navy)] mb-2">Also Eligible for Government Rebates</p>
                <p className="text-sm text-[var(--slate)] mb-3">
                  Heat pump installations can qualify for up to $40,000 in rebates on top of financing. Combine both to reduce your cost dramatically.
                </p>
                <Link href="/heat-pump-rebates" className="btn btn-cool text-sm py-2 px-4 w-full">
                  See Heat Pump Rebates →
                </Link>
              </div>
            </div>
            <QuoteForm formType="quote" variant="card" />
          </div>
        </div>
      </section>
    </>
  );
}
