import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us: Kit Sizing, Orders, Warranty",
  description: "Ask Illumi Track Lights to size a kit from your measurements, check on an order or start a warranty claim. Replies within one business day from London, Ontario.",
  alternates: { canonical: `${SITE_URL}/contact-us` }
};

export default function ContactPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Illumi Track Lights", url: `${SITE_URL}/contact-us` };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="install-technician" eyebrow="Contact" title="Send us the house. We'll size the kit or book the crew." intro="Measurements, a photo, your soffit colour and postal code are all we need to recommend a size and quote shipping." crumbs={[{ label: "Contact" }]} compact />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ContactForm />
          <aside className="space-y-4">
            <div className="card p-6">
              <p className="eyebrow text-[var(--color-accent-dark)]">Quick answers</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/resources/how-to-measure-your-roofline-for-permanent-lighting" className="link-underline">How to measure your roofline</Link></li>
                <li><Link href="/faq" className="link-underline">Frequently asked questions</Link></li>
                <li><Link href="/track-order" className="link-underline">Track an order</Link></li>
                <li><Link href="/warranty" className="link-underline">Warranty terms</Link></li>
              </ul>
            </div>
            <div className="card p-6">
              <p className="eyebrow text-[var(--color-accent-dark)]">Installers and municipalities</p>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">Want it installed? Our crew covers Southwestern Ontario.</p>
              <Link href="/installation" className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent-dark)] hover:underline">Installation areas →</Link>
              <p className="mt-4 text-sm text-[var(--color-text-soft)]">Volume pricing and priority fulfilment for crews and towns.</p>
              <Link href="/professional-installer" className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent-dark)] hover:underline">Installer program →</Link>
            </div>
            <div className="card p-6">
              <p className="eyebrow text-[var(--color-accent-dark)]">Where we are</p>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">London, Ontario. Orders ship Canada-wide within two business days. Support Monday to Friday.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
