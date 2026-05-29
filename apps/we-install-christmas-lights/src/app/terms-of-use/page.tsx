import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing use of weinstallchristmaslights.ca.",
  alternates: { canonical: `${site.url}/terms-of-use` },
};

export default function TermsOfUse() {
  return (
    <section className="section">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose">
        <h1 className="heading-display text-3xl">Terms of Use</h1>
        <p className="mt-2 text-sm text-[color:var(--ink-soft)]">Last updated: 2026-05-28</p>
        <p>
          By using weinstallchristmaslights.ca you agree to these terms. The content of this site is for general information only — it does not constitute a binding offer.
        </p>
        <h2 className="heading-display text-lg mt-6">Quotes and Bookings</h2>
        <p>
          Quotes are valid for 30 days from issue. Booking is confirmed only after a written deposit is received.
        </p>
        <h2 className="heading-display text-lg mt-6">Intellectual Property</h2>
        <p>
          Site content, photographs, and design are © We Install Christmas Lights. Do not reproduce without permission.
        </p>
        <h2 className="heading-display text-lg mt-6">Contact</h2>
        <p>
          Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
