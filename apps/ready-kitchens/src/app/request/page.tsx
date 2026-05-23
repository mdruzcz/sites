import type { Metadata } from "next";
import { RequestForm } from "@/components/request-form";

export const metadata: Metadata = {
  title: "Submit Your Order — Confirm Pickup, No Payment Yet",
  description: "Submit your Ready Kitchens order — we confirm stock and arrange pickup or delivery in Belmont, ON before any payment is taken.",
};

export default function RequestPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Submit your order</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Last step — tell us where to send it.</h1>
        <p className="mt-3 text-lg text-[var(--color-ink-soft)]">
          We don&rsquo;t take payment online. Submit your order and we&rsquo;ll confirm stock, walk you through pickup or delivery, and send a final total to approve before any charge.
        </p>
      </header>

      <div className="mt-8">
        <RequestForm />
      </div>
    </div>
  );
}
