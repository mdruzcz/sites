import type { Metadata } from 'next';
import Link from 'next/link';
import { faqs, site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'FAQ — Permanent Outdoor LED Lighting Questions',
  description: `Answers to common questions about ${site.name}'s permanent LED outdoor lighting — costs, installation, weatherproofing, app control, warranty, and more.`,
};

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-[#F5A623] text-sm font-semibold uppercase tracking-widest">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-2 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400">
            Everything you need to know about permanent outdoor LED lighting — answered.
          </p>
        </div>

        <div className="space-y-3 mb-14">
          {faqs.map((f, i) => (
            <details key={i} className="group bg-[#10101e] border border-white/8 rounded-2xl overflow-hidden hover:border-[#F5A623]/20 transition-colors">
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-white font-semibold hover:text-[#F5A623] transition-colors">
                {f.question}
                <svg className="w-5 h-5 shrink-0 transition-transform group-open:rotate-180 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="px-6 pb-5 text-slate-400 leading-relaxed text-sm border-t border-white/6 pt-4">{f.answer}</p>
            </details>
          ))}
        </div>

        <div className="rounded-3xl bg-[#10101e] border border-[#F5A623]/20 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Have a Question We Didn't Answer?</h2>
          <p className="text-slate-400 mb-5">Call us or send a message — we're happy to help.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${site.phone.replace(/\D/g, '')}`}
              className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623]/10 transition-colors"
            >
              {site.phone}
            </a>
            <Link
              href="/contact"
              className="min-h-[48px] inline-flex items-center justify-center px-6 py-3 rounded-full font-bold bg-[#F5A623] text-black hover:bg-[#FFD47A] transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
