import Link from 'next/link';
import type { Metadata } from 'next';
import { site, phoneHref } from '@/lib/site';
import { PageHeader } from '@/components/ui';

export const revalidate = 3600;

const url = `https://${site.domain}/privacy-policy`;

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy policy for ${site.name} — how we collect, use, and protect your information.`,
  alternates: { canonical: url },
};

const link = 'font-semibold text-ink underline underline-offset-4 decoration-line hover:decoration-ink';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" sub="Last updated: May 2026" crumbs={[{ label: 'Privacy Policy' }]} />

      <section className="section bg-white">
        <div className="wrap">
          <div className="prose-fl max-w-3xl">
            <p>
              {site.name} (&ldquo;{site.domain}&rdquo;) is committed to protecting your privacy. This policy outlines how we
              collect, use, and safeguard your personal information.
            </p>

            <h2>Information we collect</h2>
            <p>
              We collect information you provide directly — including your name, email, phone number, and property
              address when you request a quote or contact us.
            </p>

            <h2>How we use it</h2>
            <p>
              We use your information only to respond to your enquiry, schedule your free site visit, and provide the
              services you requested. We do not sell your information to third parties.
            </p>

            <h2>Contact</h2>
            <p>
              Questions? Call{' '}
              <a href={phoneHref} className={link}>{site.phone}</a> or use the{' '}
              <Link href="/contact" className={link}>contact form</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
