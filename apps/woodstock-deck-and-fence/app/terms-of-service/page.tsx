import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}.`,
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-cd">
        <h1 className="h-display text-3xl text-[var(--charcoal)] mb-6">Terms of Service</h1>
        <p className="text-[var(--concrete)] mb-4">Last updated: {new Date().getFullYear()}</p>
        <p>By using this website, you agree to these terms. The information on this site is provided for general informational purposes. Quotes obtained through this site are estimates only and subject to on-site assessment.</p>
        <p className="mt-4">Contact us at <a href={site.emailHref} className="text-[var(--accent)]">{site.email}</a> with any questions.</p>
      </div>
    </section>
  );
}
