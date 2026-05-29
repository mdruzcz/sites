import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovation Financing | 60-Day Plans | K&M Kitchen Renovations",
  description:
    "Flexible kitchen renovation financing in Ontario. K&M offers 60-day payment plans at competitive rates so you can start your dream kitchen now. Free quotes.",
  openGraph: {
    title: "Kitchen Renovation Financing | K&M Kitchen Renovations",
    description: "60-day financing at competitive rates. Start your kitchen renovation now, pay over time.",
    images: [{ url: "/images/kitchen-4.jpg" }],
  },
};

export default function FinancingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/kitchen-4.jpg" alt="Beautiful custom kitchen financed by K&M Kitchen Renovations" fill className="object-cover" priority placeholder="blur" blurDataURL={blurDataURL(8, 5)} />
          <div className="absolute inset-0 bg-[var(--navy-900)]/85" />
        </div>
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <div className="eyebrow justify-center">Kitchen Financing</div>
          <h1 className="h-display text-white text-5xl lg:text-6xl mb-6">
            Your Dream Kitchen,{" "}
            <span className="text-[var(--gold)]">Within Reach</span>
          </h1>
          <p className="text-white/75 text-xl max-w-2xl mx-auto mb-8">
            Flexible financing options so you can start your renovation now and spread the cost comfortably over time.
          </p>
          <Link href="/contact" className="btn btn-primary text-base px-10">Get a Free Quote</Link>
        </div>
      </section>

      {/* Financing details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="eyebrow">Our Financing Program</div>
              <h2 className="h-display text-[var(--navy)] text-4xl mb-6">
                60-Day Financing at Competitive Rates
              </h2>
              <p className="text-[var(--slate)] text-lg mb-6 leading-relaxed">
                We understand that a kitchen renovation is a significant investment. Our 60-day financing program lets you start your renovation now and make payments at bank-competitive APRs — without the wait.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: "Flexible Payment Plans",
                    desc: "Complete your kitchen renovation now and pay over 60 days at rates comparable to your bank.",
                    icon: "📅",
                  },
                  {
                    title: "Quick & Easy Application",
                    desc: "Our financing application is straightforward and fast — no lengthy paperwork or long waits.",
                    icon: "⚡",
                  },
                  {
                    title: "Completely Transparent",
                    desc: "All terms and conditions are clearly communicated upfront. No hidden fees, no fine print surprises.",
                    icon: "✅",
                  },
                  {
                    title: "No Impact on Your Timeline",
                    desc: "Financing approval doesn't delay your project. We get started on schedule.",
                    icon: "🚀",
                  },
                ].map((f) => (
                  <div key={f.title} className="flex gap-4 p-4 rounded-xl border border-[var(--border)] hover:border-[var(--gold)] transition-colors">
                    <div className="text-2xl flex-shrink-0">{f.icon}</div>
                    <div>
                      <div className="font-bold text-[var(--navy)] text-sm mb-1">{f.title}</div>
                      <div className="text-[var(--slate)] text-sm leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-primary">Ask About Financing</Link>
            </div>
            <div className="space-y-6">
              {/* Cost tiers */}
              <div className="card p-6">
                <h3 className="font-bold text-[var(--navy)] text-lg mb-4">Typical Kitchen Renovation Costs</h3>
                <div className="space-y-3">
                  {[
                    { label: "Basic Kitchen Refresh", range: "$8,000 – $15,000", sub: "New cabinets, basic hardware" },
                    { label: "Mid-Range Full Renovation", range: "$15,000 – $35,000", sub: "Cabinets, countertops, flooring" },
                    { label: "Premium Custom Kitchen", range: "$35,000 – $80,000+", sub: "Custom cabinetry, premium finishes" },
                  ].map((t) => (
                    <div key={t.label} className="flex justify-between items-start py-3 border-b border-[var(--border)] last:border-0">
                      <div>
                        <div className="font-semibold text-[var(--navy)] text-sm">{t.label}</div>
                        <div className="text-[var(--slate-light)] text-xs">{t.sub}</div>
                      </div>
                      <div className="text-[var(--gold)] font-bold text-sm ml-4 flex-shrink-0">{t.range}</div>
                    </div>
                  ))}
                </div>
                <p className="text-[var(--slate-light)] text-xs mt-4">
                  All prices are approximate. Get a free, itemized quote specific to your project.
                </p>
              </div>

              <div className="bg-[var(--navy)] rounded-xl p-6 text-white text-center">
                <div className="text-3xl mb-3">💳</div>
                <h3 className="font-bold text-xl mb-2">Ready to Discuss Financing?</h3>
                <p className="text-white/70 text-sm mb-4">Contact us for a free quote and we&apos;ll walk you through all available financing options.</p>
                <a href={`tel:${SITE.phonePlain}`} className="btn btn-primary w-full justify-center">{SITE.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why finance */}
      <section className="py-20 bg-[var(--surface)]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="h-display text-[var(--navy)] text-4xl mb-4">Why Consider Financing?</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🚀", title: "Start Right Away", desc: "You don't need to wait until you've saved the full cost. Begin your kitchen renovation now and enjoy it sooner." },
              { icon: "✨", title: "Achieve Higher Quality", desc: "Financing may let you afford premium materials or extra features that would otherwise be out of reach." },
              { icon: "💰", title: "Financial Flexibility", desc: "Spread the cost over 60 days to keep your household budget comfortable and predictable." },
            ].map((r) => (
              <div key={r.title} className="card p-6 text-center">
                <div className="text-4xl mb-4">{r.icon}</div>
                <h3 className="font-bold text-[var(--navy)] text-lg mb-3">{r.title}</h3>
                <p className="text-[var(--slate)] text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
