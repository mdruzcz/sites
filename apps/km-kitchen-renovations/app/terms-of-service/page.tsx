import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | K&M Kitchen Renovations",
  description: "Terms of service for K&M Kitchen Renovations.",
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="h-display text-[var(--navy)] text-4xl mb-3">Terms of Service</h1>
        <p className="text-[var(--slate-light)] text-sm mb-10">Last updated: {new Date().getFullYear()}</p>
        <div className="prose prose-slate max-w-none space-y-6 text-[var(--slate)] leading-relaxed">
          <p>By using this website or engaging K&M Kitchen Renovations for services, you agree to the following terms.</p>
          <h2 className="text-[var(--navy)] font-bold text-xl">Services</h2>
          <p>All renovation services are subject to a signed contract. Quotes are valid for 30 days from issue. Pricing may vary based on site conditions not visible in initial assessments.</p>
          <h2 className="text-[var(--navy)] font-bold text-xl">Payment</h2>
          <p>Payment terms are outlined in each project contract. We require a deposit before work begins. Financing arrangements are subject to separate financing agreements.</p>
          <h2 className="text-[var(--navy)] font-bold text-xl">Limitation of Liability</h2>
          <p>K&M Kitchen Renovations&apos; liability is limited to the value of the contracted project. We are not liable for indirect or consequential damages.</p>
          <h2 className="text-[var(--navy)] font-bold text-xl">Contact</h2>
          <p>Questions about these terms? Contact us at <a href={`mailto:${SITE.email}`} className="text-[var(--gold)] underline">{SITE.email}</a>.</p>
        </div>
      </div>
    </div>
  );
}
