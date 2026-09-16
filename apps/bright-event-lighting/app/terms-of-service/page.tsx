import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of service for ${site.name}. Terms and conditions for using our website and services.`,
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto prose prose-invert prose-amber">
          <h1 className="text-3xl font-extrabold text-[var(--foreground)]">Terms of Service</h1>
          <p className="text-[var(--muted)]">Last updated: May 2026</p>

          <h2 className="text-[var(--foreground)]">Services</h2>
          <p className="text-[var(--muted)]">
            {site.name} provides professional event lighting services including setup,
            operation, and teardown. All packages include an on-site technician for the
            duration of the event.
          </p>

          <h2 className="text-[var(--foreground)]">Bookings & Deposits</h2>
          <p className="text-[var(--muted)]">
            A 25% non-refundable deposit is required to secure your date. The remaining
            balance is due 14 days before the event. Dates are not reserved until a signed
            agreement and deposit are received.
          </p>

          <h2 className="text-[var(--foreground)]">Cancellations</h2>
          <p className="text-[var(--muted)]">
            Cancellations made more than 60 days before the event will forfeit the deposit
            only. Cancellations within 60 days of the event are subject to the full balance.
            Date changes are accommodated when possible at no additional cost.
          </p>

          <h2 className="text-[var(--foreground)]">Liability</h2>
          <p className="text-[var(--muted)]">
            {site.name} carries full commercial liability insurance. We are not responsible
            for venue power failures, acts of nature, or circumstances beyond our control.
            In such cases, we will work with the venue and client to find the best possible
            solution.
          </p>

          <h2 className="text-[var(--foreground)]">Website Use</h2>
          <p className="text-[var(--muted)]">
            The content on this website is for informational purposes. While we strive for
            accuracy, pricing and availability are subject to change. A formal quote
            constitutes our binding offer.
          </p>

          <h2 className="text-[var(--foreground)]">Contact</h2>
          <p className="text-[var(--muted)]">
            Questions about these terms? Email us at {site.email} or call {site.phone}.
          </p>
        </div>
      </div>
    </section>
  );
}
