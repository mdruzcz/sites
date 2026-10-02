import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui';
import { CartView } from '@/components/CartView';
import { cartCatalog } from '@/lib/shop';

export const metadata: Metadata = {
  title: 'Your Cart and Checkout',
  description: 'Review your Forever Lights DIY permanent lighting kit order, see shipping and GST/HST for your postal code, and pay securely by card.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/cart' },
};

export default function CartPage() {
  const { kits, colours } = cartCatalog();
  return (
    <section className="bg-soft border-b border-line">
      <div className="wrap pt-8 pb-16 md:pt-10 md:pb-24">
        <Breadcrumbs items={[{ href: '/kits', label: 'DIY Kits' }, { label: 'Cart' }]} />
        <h1 className="mt-6 text-4xl md:text-5xl font-bold text-ink">Your cart</h1>
        <p className="mt-3 text-ink-soft max-w-2xl">
          Check your kit and track colour, tell us where it is going, then pay securely on the next page.
        </p>
        <div className="mt-10">
          <CartView kits={kits} colours={colours} />
        </div>
      </div>
    </section>
  );
}
