import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { Breadcrumbs, breadcrumbLd } from "@/components/ui";
import { Icon } from "@/components/icons";
import { SHIP_FROM, SITE_EMAIL } from "@/lib/site";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Holiday Light Supplies",
  description: "Contact Holiday Light Supplies in London, Ontario for commercial Christmas lighting questions, quotes, tenders and warranty. We reply by email within one business day.",
  alternates: { canonical: `${SITE_URL}/contact-us` },
  openGraph: { title: "Contact Holiday Light Supplies", url: `${SITE_URL}/contact-us` }
};

export default function ContactPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact-us`,
    mainEntity: { "@type": "Organization", name: "Holiday Light Supplies", email: SITE_EMAIL, url: SITE_URL }
  };
  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ label: "Contact" }])) }} />
      <div className="shell py-8 md:py-12">
        <Breadcrumbs items={[{ label: "Contact" }]} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Contact</p>
            <h1 className="font-display h2-fluid mt-4">Talk to a person who knows the product.</h1>
            <p className="mt-4 text-[var(--color-muted)]">Questions about stock, specs, tenders, warranty or an order you already have. We reply by email within one business day.</p>
            <ul className="mt-8 space-y-4 text-[15px]">
              <li className="flex items-start gap-3">
                <Icon.mail size={20} className="mt-0.5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${SITE_EMAIL}`} className="text-[var(--color-brand)] hover:underline">{SITE_EMAIL}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon.truck size={20} className="mt-0.5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Warehouse</p>
                  <p className="text-[var(--color-muted)]">{SHIP_FROM}, Canada · pickup by arrangement</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon.quote size={20} className="mt-0.5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Pricing a project?</p>
                  <p className="text-[var(--color-muted)]">
                    Use the <Link href="/request-a-quote" className="font-semibold text-[var(--color-brand)] hover:underline">quote form</Link> so we get the details in one go.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon.invoice size={20} className="mt-0.5 text-[var(--color-brand)]" />
                <div>
                  <p className="font-semibold">Municipality, BIA or installer?</p>
                  <p className="text-[var(--color-muted)]">
                    Register on the <Link href="/municipalities" className="font-semibold text-[var(--color-brand)] hover:underline">public-sector</Link> or{" "}
                    <Link href="/professional-installer" className="font-semibold text-[var(--color-brand)] hover:underline">installer</Link> page.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
