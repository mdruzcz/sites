"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import type { Cart } from "@/lib/cart";
import { estimateShipping } from "@/lib/shipping/estimate";
import { FREE_SHIPPING_THRESHOLD_DEFAULT, formatCad } from "@/lib/utils";

const PROVINCES = [
  ["AB", "Alberta"],
  ["BC", "British Columbia"],
  ["MB", "Manitoba"],
  ["NB", "New Brunswick"],
  ["NL", "Newfoundland and Labrador"],
  ["NS", "Nova Scotia"],
  ["NT", "Northwest Territories"],
  ["NU", "Nunavut"],
  ["ON", "Ontario"],
  ["PE", "Prince Edward Island"],
  ["QC", "Quebec"],
  ["SK", "Saskatchewan"],
  ["YT", "Yukon"]
] as const;

function readDiscountCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/(?:^|;\s*)rsd_discount=([^;]+)/);
  return m ? decodeURIComponent(m[1]) : undefined;
}

export function CheckoutForm({ cart }: { cart: Cart }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [postal, setPostal] = useState("");
  const [province, setProvince] = useState("ON");
  const [email, setEmail] = useState("");

  const cleanPostal = postal.replace(/\s+/g, "").toUpperCase();
  const shipEst = /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleanPostal)
    ? estimateShipping({
        items: cart.items.map((l) => ({ name: l.variant_name, quantity: l.quantity })),
        postal: cleanPostal,
        subtotalCad: cart.subtotal_cad,
        freeThresholdCad: FREE_SHIPPING_THRESHOLD_DEFAULT
      })
    : null;

  function startCheckout() {
    setError(null);
    startTransition(async () => {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, province, postal, discountCode: readDiscountCookie() ?? "SAVE15" })
      });
      const json = (await res.json()) as { url?: string; error?: string };
      if (json.url) window.location.href = json.url;
      else setError(json.error ?? "Could not start checkout");
    });
  }

  return (
    <div className="space-y-6">
      {/* Express payments */}
      <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <p className="eyebrow text-slate-500">Express checkout</p>
        <p className="mt-1 text-xs text-slate-500">
          Skip the form &mdash; use a saved card from Apple Pay, Google Pay or your browser.
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <ExpressButton label="Apple Pay" emoji="" />
          <ExpressButton label="Google Pay" emoji="G" />
          <ExpressButton label="Link" emoji="↗" />
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-400">
          OR fill in the form below to pay by credit / debit card
        </p>
      </section>

      {/* Contact */}
      <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">1 · Contact</h2>
          <Link href="/account" className="text-xs text-[var(--color-brand)] hover:underline">
            Already have an account? Sign in
          </Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input label="Email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
        <label className="mt-3 flex items-start gap-2 text-xs text-slate-600">
          <input type="checkbox" name="marketing_opt_in" defaultChecked />
          <span>Email me about new products and seasonal restocks (you can unsubscribe anytime)</span>
        </label>
      </section>

      {/* Shipping */}
      <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-display text-xl">2 · Shipping address</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input label="First name" name="first_name" autoComplete="given-name" required />
          <Input label="Last name" name="last_name" autoComplete="family-name" required />
        </div>
        <Input
          label="Company (optional)"
          name="company"
          autoComplete="organization"
          className="mt-3"
        />
        <Input
          label="Street address"
          name="line1"
          autoComplete="address-line1"
          required
          className="mt-3"
        />
        <Input
          label="Apartment, suite, etc. (optional)"
          name="line2"
          autoComplete="address-line2"
          className="mt-3"
        />
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Input label="City" name="city" autoComplete="address-level2" required />
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Province</span>
            <select
              name="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
            >
              {PROVINCES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Postal code"
            name="postal_code"
            autoComplete="postal-code"
            required
            value={postal}
            onChange={(e) => setPostal(e.target.value.toUpperCase())}
            placeholder="A1A 1A1"
            pattern="[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d"
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          🍁 Online ordering ships within Ontario from Belmont, ON (free over $750).
        </p>

        {province === "ON" && shipEst && (
          <div className="mt-3 flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-brand-soft)] px-4 py-3 text-sm">
            <span className="text-slate-700">
              Estimated shipping
              {shipEst.zoneLabel ? <span className="text-slate-500"> · {shipEst.zoneLabel}</span> : null}
              <span className="block text-xs text-slate-500">~{shipEst.totalKg.toFixed(1)} kg from Belmont, ON</span>
            </span>
            <span className="font-display text-lg font-semibold text-[var(--color-brand)]">
              {shipEst.free ? "FREE" : formatCad(shipEst.amountCad)}
            </span>
          </div>
        )}
        {province === "ON" && !shipEst && cart.subtotal_cad < FREE_SHIPPING_THRESHOLD_DEFAULT && (
          <p className="mt-3 text-xs text-slate-500">
            Enter your postal code above to see your shipping estimate. Add {formatCad(FREE_SHIPPING_THRESHOLD_DEFAULT - cart.subtotal_cad)} more to qualify for free shipping.
          </p>
        )}
      </section>

      {province !== "ON" ? (
        /* Out-of-province: online checkout disabled — request a freight/shipping quote instead */
        <section className="rounded-xl border-2 border-dashed border-[var(--color-brand)] bg-[var(--color-brand-soft)] p-6 text-center">
          <p className="text-2xl">📦</p>
          <h2 className="font-display mt-2 text-xl text-[var(--color-brand-dark)]">
            We currently ship online within Ontario only
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            We&rsquo;d still love to get Ready Seal to you. Send us your order details and delivery
            address and we&rsquo;ll reply with a shipping quote for your province, usually within one
            business day.
          </p>
          <Link
            href="/contact-us?subject=Shipping%20quote%20request%20(outside%20Ontario)"
            className="btn-primary mt-5 inline-flex justify-center"
          >
            Request a shipping quote →
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            Or call us at <a href="tel:+18772666415" className="underline">(877) 266-6415</a>.
          </p>
        </section>
      ) : (
        <>
          {/* Payment */}
          <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
            <h2 className="font-display text-xl">3 · Payment</h2>
            <p className="mt-2 text-sm text-slate-600">
              Click <strong>Complete order</strong> below to finish payment securely on Stripe. We never see or
              store your card details.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-md bg-[var(--color-brand-soft)] px-3 py-2 text-xs text-[var(--color-brand)]">
              <span>🔒</span>
              <span>256-bit SSL · Stripe-encrypted · PCI-DSS Level 1</span>
            </div>
          </section>

          <button
            type="button"
            onClick={startCheckout}
            disabled={pending || cart.items.length === 0}
            className="btn-primary w-full justify-center text-base disabled:opacity-50"
          >
            {pending ? "Redirecting to Stripe…" : "Complete order →"}
          </button>

          {error && (
            <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>
          )}
        </>
      )}

      <p className="text-center text-xs text-slate-400">
        By placing your order you agree to our{" "}
        <Link href="/terms-of-service" className="underline">terms of service</Link> and{" "}
        <Link href="/privacy" className="underline">privacy policy</Link>. Returns within 30 days.
      </p>
    </div>
  );
}

function ExpressButton({ label, emoji }: { label: string; emoji: string }) {
  return (
    <button
      type="button"
      disabled
      title="Express payments unlock once Stripe is configured in production."
      className="rounded-md border border-[var(--color-border)] bg-[var(--color-night)] py-3 text-sm font-semibold text-white opacity-90 disabled:cursor-not-allowed"
    >
      <span className="mr-1">{emoji}</span> {label}
    </button>
  );
}

function Input({
  label,
  name,
  type = "text",
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
        {...rest}
      />
    </label>
  );
}
