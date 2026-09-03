/**
 * FinancingCallout — reusable "spread the cost" financing block.
 *
 * CONFIRMED by Matt (2026-08-28): 10% APR, 24-month term. The ~$46/mo-per-$1,000
 * factor is the standard amortized payment for 10% APR over 24 months
 * (r/(1-(1+r)^-24), r = 0.10/12 ≈ 0.04614/$).
 *
 * STILL TO CONFIRM before the copy names specifics beyond APR/term:
 *  - Lender name (and whether it can be named publicly)
 *  - Minimum / maximum financed amount, any admin or early-payout fees
 *  - Exact OAC disclaimer wording required by the lender
 */
import Link from 'next/link';
import { Icon } from './icons';
import { CheckList } from './ui';

const copy = {
  headline: 'Spread the cost over 24 months',
  sub: 'Get your permanent roofline lighting installed now and pay it off over a 24-month term at 10% APR, on approved credit.',
  bullets: [
    'Simple terms: a 24-month term at 10% APR (on approved credit).',
    'No large upfront hit. Keep your cash free and enjoy the lights right away.',
    'Roughly $46 a month for every $1,000 of project cost. Your exact payment comes with your estimate.',
    'Quick application with a fast decision, so your install date is never held up.',
  ],
  ctaLabel: 'Ask about financing',
  monthlyExampleNote:
    'Example only: financed over 24 months at 10% APR, about $46/month per $1,000 of project cost. A $5,000 install works out to roughly $231/month (on approved credit). We confirm your exact monthly payment with your written estimate. Financing is provided through a third-party lender and subject to approval.',
};

type Variant = 'band' | 'compact';

interface FinancingCalloutProps {
  variant?: Variant;
  ctaHref?: string;
  className?: string;
}

export function FinancingCallout({ variant = 'band', ctaHref = '/contact', className = '' }: FinancingCalloutProps) {
  if (variant === 'compact') {
    return (
      <div className={`card-soft p-6 ${className}`}>
        <div className="flex items-start gap-4">
          <span className="w-11 h-11 rounded-xl bg-white text-ink flex items-center justify-center shrink-0" aria-hidden="true">
            <Icon.card size={22} />
          </span>
          <div>
            <h3 className="text-lg font-bold text-ink mb-1">{copy.headline}</h3>
            <p className="text-muted text-[15px] leading-relaxed mb-4">{copy.sub}</p>
            <Link href={ctaHref} className="btn btn-dark btn-sm">{copy.ctaLabel}</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`bg-tint border-y border-line ${className}`}>
      <div className="wrap section-tight">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow">Ways to pay</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-ink mb-4">{copy.headline}</h2>
            <p className="text-ink-soft leading-relaxed mb-6">{copy.sub}</p>
            <Link href={ctaHref} className="btn btn-dark btn-lg">{copy.ctaLabel}</Link>
          </div>
          <CheckList items={copy.bullets} />
        </div>
        <p className="max-w-5xl mx-auto mt-8 text-xs text-muted leading-relaxed">{copy.monthlyExampleNote}</p>
      </div>
    </section>
  );
}
