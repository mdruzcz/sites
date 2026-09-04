import { TrackOrderForm } from "@/components/track-order-form";

export const metadata = { title: "Track your order" };

export default function TrackOrderPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-3xl tracking-tight">Track your order</h1>
      <p className="mt-2 text-sm text-slate-600">
        Enter your order number and the email you used at checkout. We&rsquo;ll show you the latest status
        and tracking info.
      </p>
      <TrackOrderForm />
      <div className="mt-10 rounded-lg bg-[var(--color-brand-soft)] p-4 text-sm text-[var(--color-brand-dark)]">
        Lost the email? <a href="mailto:info@holidaylightsupplies.ca" className="font-semibold underline">
          Email us
        </a>{" "}
        with your name + approximate order date and we&rsquo;ll find you in our system.
      </div>
    </div>
  );
}
