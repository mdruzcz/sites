import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms that apply to using ${site.domain} and to commercial holiday decorating programs from ${site.name}.`,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="wrap max-w-3xl">
        <Breadcrumbs items={[{ name: "Terms of Service" }]} />
        <h1 className="font-display text-4xl text-ink mt-6 mb-6">Terms of Service</h1>
        <div className="prose-dark">
          <p>Last updated: October 22, 2026. By using {site.domain} or booking a program with {site.name} you agree to these terms.</p>
          <h2>Quotes and agreements</h2>
          <p>Every program is custom quoted after a site visit or review of plans and photos. A quote is valid for 30 days unless stated otherwise. Work begins once a signed agreement and any deposit noted in the quote are received. Multi-year agreements lock pricing and priority scheduling for the stated term.</p>
          <h2>Leased decor and inventory</h2>
          <p>Leased trees, lights and decor remain our property. We supply, install, maintain, remove and store them. Customer-supplied product is not installed because we cannot warranty it. Damage caused by third parties, vandalism or events beyond normal use may be billed at replacement cost.</p>
          <h2>Access, power and safety</h2>
          <p>The customer provides safe access, working electrical circuits where agreed, and any building rules or permits required. Our crews are insured and WSIB-compliant and follow the property&rsquo;s access and safety rules. Certificates of insurance are available on request.</p>
          <h2>Maintenance and season</h2>
          <p>Maintenance is included for the season on every program. Report a fault by phone or email and we schedule a repair visit, weather permitting. Takedown runs in January unless your agreement states a different date.</p>
          <h2>Website</h2>
          <p>Content on this site is provided for information and may change without notice. Photos show our own work; please do not reuse them without permission. Questions about these terms: call {site.phone} or use the <Link href="/contact" className="text-[var(--accent-ink)] hover:underline">contact form</Link>.</p>
        </div>
      </div>
    </section>
  );
}
