import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceBySlug } from "@/lib/content";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "HVAC Maintenance Plans | Oxford County — Starting at $149/yr",
  description: `Annual HVAC maintenance plans for Oxford County homeowners. Bronze ($149), Silver ($249), Gold ($399). Includes furnace & AC tune-ups, priority service, and parts discounts.`,
};

export const revalidate = 3600;

export default function MaintenancePlansPage() {
  const service = getServiceBySlug("maintenance-plans");
  const plans = service && "plans" in service ? service.plans as Array<{ name: string; price: number; period: string; features: string[] }> : [];

  return (
    <>
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow-cool">Protect Your Investment</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            HVAC Maintenance Plans
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Annual tune-ups, priority emergency service, and peace of mind — starting at $149/year for Oxford County homeowners.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan) => (
              <div key={plan.name} className={`card p-8 ${plan.name === "Gold" ? "border-[var(--heat)] border-2 relative" : ""}`}>
                {plan.name === "Gold" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--heat)] text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-2">{plan.name} Plan</h2>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold text-[var(--heat)]">${plan.price}</span>
                  <span className="text-[var(--slate)] text-sm">/{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--slate)]">
                      <svg className="w-4 h-4 text-[var(--cool)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`btn w-full ${plan.name === "Gold" ? "btn-primary" : "btn-outline"}`}>
                  Get {plan.name} Plan
                </Link>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">Why Regular HVAC Maintenance Matters</h2>
              <p className="text-[var(--slate)] leading-relaxed mb-4">
                Most HVAC breakdowns are preventable. A professional annual tune-up catches worn components, dirty coils, and efficiency losses before they become expensive failures — especially in the middle of a southwestern Ontario winter.
              </p>
              <p className="text-[var(--slate)] leading-relaxed">
                Manufacturers also require proof of annual maintenance to honour equipment warranties. Our service records protect your warranty coverage and extend the life of your system significantly.
              </p>
            </div>
            <QuoteForm defaultService="Maintenance Plans" formType="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
