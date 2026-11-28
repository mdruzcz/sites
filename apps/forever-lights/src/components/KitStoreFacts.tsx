// The "this is a real online store" facts for the kit pages and the homepage.
// The wording and its sources live in lib/kit-store.
import Link from 'next/link';
import { FREE_RADIUS_KM, FLAT_RATE_CAD, SHOP_TOWN, RETURNS } from '@/lib/kit-store';
import { site } from '@/lib/site-config';
import { Icon } from './icons';

const FACTS = [
  {
    icon: Icon.truck,
    title: 'Ships across Canada',
    text: `Free within ${FREE_RADIUS_KM} km of our ${SHOP_TOWN}, Ontario shop. $${FLAT_RATE_CAD} flat rate to any other Canadian address.`,
  },
  {
    icon: Icon.lock,
    title: 'Secure card checkout',
    text: 'Pay on Stripe by credit card, debit, Apple Pay or Google Pay. GST/HST is added for your province.',
  },
  {
    icon: Icon.box,
    title: 'Packed in 1 to 2 business days',
    text: 'Your invoice is emailed when you pay and tracking when the kit ships.',
  },
  {
    icon: Icon.undo,
    title: RETURNS.title,
    text: RETURNS.short,
  },
  {
    icon: Icon.shield,
    title: '5-year parts warranty',
    text: 'The same parts warranty as the systems our own crew installs.',
    href: '/warranty',
    linkLabel: 'Warranty terms',
  },
  {
    icon: Icon.headset,
    title: 'Phone support while you install',
    text: `Call ${site.phone} and talk to the people who install these for a living.`,
  },
];

export function KitStoreFacts({ className = '', columns = 'three' }: { className?: string; columns?: 'two' | 'three' }) {
  return (
    <ul className={`grid gap-x-6 gap-y-5 sm:grid-cols-2 ${columns === 'three' ? 'lg:grid-cols-3' : ''} ${className}`}>
      {FACTS.map(f => (
        <li key={f.title} className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-line text-ink"><f.icon size={20} /></span>
          <div className="min-w-0">
            <p className="text-[15px] font-bold leading-snug text-ink">{f.title}</p>
            <p className="mt-0.5 text-sm leading-relaxed text-muted">
              {f.text}
              {f.href && (
                <>
                  {' '}
                  <Link href={f.href} className="font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink">{f.linkLabel}</Link>
                </>
              )}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
