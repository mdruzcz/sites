import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${site.name}.`,
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-black text-white mb-8">Terms of Service</h1>
        <p className="text-slate-400 mb-6">Last updated: May 2026</p>
        <div className="space-y-6 text-slate-300 leading-relaxed">
          <p>By using {site.domain} or engaging {site.name} for services, you agree to these terms.</p>
          <p>All quotes are valid for 30 days from the date of issue. Pricing is based on site measurements taken during a free site visit and may vary if site conditions change.</p>
          <p>Warranties are non-transferable and apply to the original installation address only. Warranty coverage does not include damage caused by third-party modifications, storm damage, or acts of God.</p>
          <p>Financing terms are subject to approval. Interest-only payments are available for qualified customers over a 6-month term.</p>
          <p>For questions, contact us at <a href={`mailto:${site.email}`} className="text-[#F5A623]">{site.email}</a>.</p>
        </div>
      </div>
    </div>
  );
}
