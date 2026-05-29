import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About Us — Permanent LED Lighting Experts',
  description: `Learn about ${site.name} — the permanent outdoor LED lighting company serving London, Ontario and Southwestern Ontario. Local experts, 5-year warranty.`,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">About Us</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            We're Lighting Up Ontario — One Home at a Time
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Forever Lights was founded by a team of Southern Ontario locals who got tired of watching their neighbours (and themselves) risk their safety every December hanging lights. We decided there had to be a better way.
          </p>
        </div>

        {/* Image + Story */}
        <div className="grid md:grid-cols-2 gap-10 mb-20 items-center">
          <div className="rounded-3xl overflow-hidden">
            <Image
              src="/images/example-3.jpg"
              alt="Forever Lights permanent LED installation on Ontario home - our team's craftsmanship"
              width={700}
              height={500}
              quality={80}
              className="w-full h-80 object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              We grew up in Southwestern Ontario — London, Woodstock, Brantford, St. Thomas. We know these communities, we know the homes, and we understand what it means to take pride in your property.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              When permanent LED track lighting technology became available, we saw an opportunity: install it right, back it with a real warranty, and make sure every homeowner in our community could enjoy their home year-round.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Today we serve hundreds of homes across the region with professional installations, a 5-year parts warranty, and a simple promise: your lights work, or we fix them.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: '🏠', title: 'Local Experts', desc: 'We live and work in the communities we serve. We understand your home.' },
            { icon: '🔧', title: 'Professional Install', desc: 'Bucket lifts, trained installers, clean work — every single time.' },
            { icon: '⭐', title: 'Quality Products', desc: 'CSA-approved, IP68-rated, 50,000-hour LEDs. No shortcuts.' },
            { icon: '🤝', title: 'Transparent Process', desc: 'Track your project from quote to invoice through our customer portal.' },
          ].map(v => (
            <div key={v.title} className="bg-[#10101e] border border-white/8 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="text-white font-bold mb-2">{v.title}</h3>
              <p className="text-slate-400 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-[#10101e] to-[#16162a] border border-[#F5A623]/20 p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Ready to See What We Can Do for Your Home?
          </h2>
          <p className="text-slate-400 mb-6 max-w-lg mx-auto">
            Book a free site visit and get a detailed, no-obligation quote. We'll colour-match your soffit and show you exactly what your home will look like.
          </p>
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
