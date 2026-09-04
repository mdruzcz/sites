import Link from 'next/link';
import type { Metadata } from 'next';
import { site, phoneHref } from '@/lib/site';
import { PageHeader } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/terms-of-service`;

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of service for ${site.name}.`,
  alternates: { canonical: url },
};

const link = 'font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink';

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of Service" sub="Last updated: May 2026" crumbs={[{ label: 'Terms of Service' }]} />

      <section className="section bg-white">
        <div className="wrap">
          <div className="prose-fl max-w-3xl">
            <p>By using {site.domain} or engaging {site.name} for services, you agree to these terms.</p>

            <h2>Quotes and pricing</h2>
            <p>
              All quotes are valid for 30 days from the date of issue. Pricing is based on site measurements taken
              during a free site visit and may vary if site conditions change.
            </p>

            <h2>Warranty</h2>
            <p>
              Warranties are non-transferable and apply to the original installation address only. Warranty coverage
              does not include damage caused by third-party modifications, storm damage, or acts of God.
            </p>

            <h2>Financing</h2>
            <p>
              Financing is subject to approval. Approved customers may spread the cost over a 24-month term at 10% APR
              (on approved credit).
            </p>

            <h2>Contact</h2>
            <p>
              For questions, call <a href={phoneHref} className={link}>{site.phone}</a> or use the <Link href="/contact" className={link}>contact form</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
