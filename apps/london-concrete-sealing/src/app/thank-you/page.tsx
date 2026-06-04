import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting London Concrete Sealing. We will get back to you within 24 hours.',
  alternates: { canonical: '/thank-you' },
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="bg-slate-50">
      <div className="container-x py-24 sm:py-32 text-center max-w-xl mx-auto">
        <div className="grid place-items-center w-20 h-20 rounded-full bg-accent text-white mx-auto shadow-lg">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-8 text-4xl font-extrabold text-ink">Thank You!</h1>
        <p className="mt-4 text-lg text-slate-muted">
          We've received your request and will get back to you within 24 hours. For urgent enquiries,
          feel free to call us directly.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a href={`tel:${site.phone}`} className="accent-btn px-7 py-3.5 rounded-xl font-semibold">
            Call {site.phoneDisplay}
          </a>
          <Link href="/" className="px-7 py-3.5 rounded-xl font-semibold border border-slate-300 text-ink hover:border-accent hover:text-accent transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
