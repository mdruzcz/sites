import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Warranty Information — 5-Year Parts Coverage',
  description: `${site.name} backs every permanent LED installation with a 5-year parts warranty and 1-year labour warranty. Learn what's covered and how to make a claim.`,
};

export default function WarrantyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Peace of Mind</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            Industry-Leading Warranty
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            We stand behind every installation with one of the strongest warranties in the permanent lighting industry.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#F5A623]/20 to-[#F5A623]/5 border border-[#F5A623]/30 rounded-2xl p-8 text-center">
            <div className="text-5xl font-black gradient-text mb-2">5 Years</div>
            <div className="text-white font-bold text-lg mb-2">Parts Warranty</div>
            <p className="text-slate-400 text-sm">All LED fixtures, track hardware, power supplies, and connectors are covered for 5 full years from installation date.</p>
          </div>
          <div className="bg-[#10101e] border border-white/8 rounded-2xl p-8 text-center">
            <div className="text-5xl font-black text-white mb-2">1 Year</div>
            <div className="text-white font-bold text-lg mb-2">Labour Warranty</div>
            <p className="text-slate-400 text-sm">Any defect arising from installation workmanship is covered for 1 year. We fix it at no cost to you.</p>
          </div>
        </div>

        <div className="bg-[#10101e] border border-white/8 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">What's Covered</h2>
          <ul className="space-y-3">
            {[
              'LED point failures due to manufacturing defects',
              'Track, channel, and mounting hardware defects',
              'Power supply and transformer failures',
              'Connector and wiring defects',
              'App connectivity issues caused by hardware',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-slate-300 text-sm">
                <span className="text-[#F5A623] mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#10101e] border border-white/8 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold text-white mb-4">How to Make a Warranty Claim</h2>
          <ol className="space-y-3">
            {[
              `Call us at ${site.phone} or email ${site.email}`,
              'Describe the issue and provide your installation date',
              'Our team will diagnose remotely or schedule a service visit',
              'Defective parts are replaced at no cost within the warranty period',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-slate-300 text-sm">
                <span className="w-7 h-7 rounded-full bg-[#F5A623]/20 flex items-center justify-center text-[#F5A623] font-bold text-sm shrink-0">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[52px] px-10 py-3.5 rounded-full font-bold text-lg bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
