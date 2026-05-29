import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { QuoteForm } from '@/components/QuoteForm';

export const metadata: Metadata = {
  title: 'Get a Free Quote — Permanent LED Lighting',
  description: `Request a free, no-obligation quote for permanent outdoor LED lighting from ${site.name}. We serve ${site.region}. Call ${site.phone} or fill out the form.`,
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">Free Quote</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              Let's Light Up Your Home
            </h1>
            <p className="text-slate-400 leading-relaxed mb-8">
              Fill out the form and we'll contact you within 24 hours to schedule a free site visit. No pressure, no obligation — just a conversation about what permanent lighting could look like on your home.
            </p>

            <div className="space-y-5">
              {[
                { icon: '📞', label: 'Phone', value: site.phone, href: `tel:${site.phone.replace(/\D/g, '')}` },
                { icon: '📧', label: 'Email', value: site.email, href: `mailto:${site.email}` },
                { icon: '🕐', label: 'Hours', value: site.hours, href: null },
                { icon: '📍', label: 'Service Area', value: site.region, href: null },
              ].map(c => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5A623]/15 flex items-center justify-center text-xl shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-white font-semibold hover:text-[#F5A623] transition-colors">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-white font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-[#10101e] border border-white/8 rounded-3xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Request Your Free Quote</h2>
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
