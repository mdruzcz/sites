import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Forever Cabinets",
  description:
    "Get in touch about your cabinet order, ask a finish question, or request contractor / designer trade pricing. We reply same business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
        Contact
      </p>
      <h1 className="mt-2 font-display text-4xl text-[var(--color-navy)] sm:text-5xl">
        Get in touch
      </h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--color-ink-soft)]">
        Whether you&rsquo;ve got a question about a cabinet, need a freight quote to a specific postal code, or you&rsquo;re a contractor asking about trade pricing — we&rsquo;ll get back to you the same business day.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="border border-[var(--color-line)] bg-white p-6">
          <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
            Email
          </p>
          <a href={`mailto:${SITE.email}`} className="mt-2 block font-display text-xl text-[var(--color-navy)] hover:underline">
            {SITE.email}
          </a>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            Best for orders, freight quotes, contractor inquiries.
          </p>
        </div>
        <div className="border border-[var(--color-line)] bg-white p-6">
          <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
            Phone
          </p>
          <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="mt-2 block font-display text-xl text-[var(--color-navy)] hover:underline">
            {SITE.phone}
          </a>
          <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
            Mon–Fri, 9am–5pm Eastern.
          </p>
        </div>
      </div>

      <div className="mt-10 border border-[var(--color-line)] bg-[var(--color-sandstone-soft)] p-6">
        <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
          For an actual quote
        </p>
        <h2 className="mt-2 font-display text-2xl text-[var(--color-navy)]">
          Use the catalog
        </h2>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          The fastest way to get a confirmed price + freight quote is to add cabinets to your Request List and submit it through <a href="/request" className="underline">the quote form</a>. We&rsquo;ll have it in front of us within a minute and back to you within a business day.
        </p>
      </div>

      <h2 className="mt-16 font-display text-2xl text-[var(--color-navy)]">Contractors &amp; designers</h2>
      <p className="mt-3 text-[var(--color-ink-soft)]">
        Email us with your business name + recent project examples and we&rsquo;ll set up trade pricing on your next order. We work directly with kitchen designers, GCs, and home stagers across Canada.
      </p>
    </div>
  );
}
