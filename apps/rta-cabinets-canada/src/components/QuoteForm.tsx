"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import { useCart } from "@/lib/ui-context";

export default function QuoteForm() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      postal: formData.get("postal"),
      notes: formData.get("message"),
      company: formData.get("company"),
      items: items.map((i) => ({
        id: i.slug,
        name: i.name,
        price: i.price_cad,
        qty: i.qty,
        kind: i.kind,
      })),
      token,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }
      clear();
      router.push("/request/submitted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-5 gap-10">
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name *
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="w-full border border-border rounded-md px-3 py-2 min-h-[44px] bg-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full border border-border rounded-md px-3 py-2 min-h-[44px] bg-white"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className="w-full border border-border rounded-md px-3 py-2 min-h-[44px] bg-white"
              />
            </div>
            <div>
              <label htmlFor="postal" className="block text-sm font-medium mb-1">
                Postal Code
              </label>
              <input
                id="postal"
                name="postal"
                autoComplete="postal-code"
                className="w-full border border-border rounded-md px-3 py-2 min-h-[44px] bg-white"
              />
            </div>
          </div>
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your project, timeline, or any questions."
              className="w-full border border-border rounded-md px-3 py-2 bg-white"
            />
          </div>
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
              options={{ theme: "light" }}
              onSuccess={(t: string) => setToken(t)}
            />
          )}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting || items.length === 0}
            className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium disabled:opacity-50 min-h-[48px] w-full sm:w-auto"
          >
            {submitting ? "Processing..." : "Request Quote"}
          </button>
          <p className="text-xs text-ink-soft">
            We&apos;ll review your list and email a written quote within one business day.
          </p>
        </form>
      </div>

      <aside className="lg:col-span-2">
        <div className="bg-sand border border-border rounded-lg p-5 sticky top-20">
          <h2 className="font-semibold mb-4">
            Your Quote ({items.reduce((n, i) => n + i.qty, 0)} items)
          </h2>
          {items.length === 0 ? (
            <p className="text-sm text-ink-soft">Your quote cart is empty.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {items.map((i) => (
                <li key={i.slug} className="flex justify-between text-sm gap-2">
                  <span>
                    {i.qty}× {i.name}
                    {i.kind === "package" && (
                      <span className="text-xs text-accent"> (package)</span>
                    )}
                  </span>
                  <span className="whitespace-nowrap">
                    {i.price_cad !== null
                      ? `$${(i.price_cad * i.qty).toFixed(2)}`
                      : "Quote"}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-border pt-3 flex justify-between font-semibold">
            <span>
              Subtotal{items.some((i) => i.price_cad === null) ? " (from)" : ""}
            </span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-ink-soft mt-2">
            Taxes &amp; shipping confirmed in your written quote.
          </p>
        </div>
      </aside>
    </div>
  );
}
