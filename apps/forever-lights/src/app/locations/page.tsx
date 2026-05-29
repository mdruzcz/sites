import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceAreas, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Service Areas — Southwestern Ontario | Forever Lights',
  description: 'Forever Lights serves London, St. Thomas, Woodstock, Brantford, Stratford, Ingersoll, Tillsonburg and more. Get permanent LED lighting for your home.',
};

export default function LocationsPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Coverage</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            Our Service Areas
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            {site.name} provides professional permanent LED lighting installation across {site.region}.
            Click your city to learn more.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {serviceAreas.map(a => (
            <Link
              key={a.slug}
              href={`/locations/${a.slug}`}
              className="bg-[#10101e] border border-white/8 rounded-2xl p-6 hover:border-[#F5A623]/40 hover:bg-[#16162a] transition-all group"
            >
              <h2 className="text-xl font-bold text-white group-hover:text-[#F5A623] transition-colors mb-2">
                {a.label}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{a.description}</p>
              <span className="text-[#F5A623] text-sm font-medium flex items-center gap-1">
                View permanent lighting in {a.city}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
