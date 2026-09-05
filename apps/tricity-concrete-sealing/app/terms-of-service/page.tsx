import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | TriCity Concrete Sealing",
  description: "Terms of service for TriCity Concrete Sealing.",
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="h-display text-3xl sm:text-4xl text-[var(--navy)] mb-8">Terms of Service</h1>
        <p className="text-[var(--concrete)] mb-4"><strong>Last updated:</strong> May 2026</p>

        <div className="space-y-6 text-[var(--concrete)] leading-relaxed">
          <p>
            By using this website or engaging {site.name} for services, you agree to the following terms.
          </p>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">Services</h2>
            <p>All services are subject to a written service agreement and quote prior to commencement. Prices are confirmed in writing and are valid for 30 days from the date of the quote.</p>
          </div>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">Warranty</h2>
            <p>Our workmanship warranty covers defects in sealer application and materials under normal use conditions. Full warranty terms are available on our <a href="/warranty" className="text-[var(--accent)] hover:underline">Warranty page</a>.</p>
          </div>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">Limitation of Liability</h2>
            <p>Our liability is limited to the value of the services rendered. We are not responsible for pre-existing concrete defects, structural issues, or damage caused by factors outside our control.</p>
          </div>

          <div>
            <h2 className="font-bold text-[var(--navy)] text-xl mb-3">Contact</h2>
            <p>Questions about these terms? Email <a href={site.emailHref} className="text-[var(--accent)] hover:underline">{site.email}</a>.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
