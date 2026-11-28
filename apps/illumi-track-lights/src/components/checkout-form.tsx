"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import type { Cart } from "@/lib/cart";
import { CheckoutSummary } from "@/components/checkout-summary";
import { TrackColourConfirm, needsTrackColourCheck } from "@/components/track-colour-confirm";
import { BILLER_PHONE } from "@/lib/store-brand";
import {
  PROVINCES,
  SHOP,
  estimateTotals,
  normalizePostal,
  postalMatchesProvince,
  provinceName,
  type FulfilmentMethod
} from "@/lib/orders/policy";
import { formatCad } from "@/lib/utils";

type Field = "email" | "phone" | "firstName" | "lastName" | "company" | "line1" | "line2" | "city" | "province" | "postal" | "note";

export function CheckoutForm({ cart }: { cart: Cart }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [method, setMethod] = useState<FulfilmentMethod>("ship");
  const [f, setF] = useState<Record<Field, string>>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    company: "",
    line1: "",
    line2: "",
    city: "",
    province: "ON",
    postal: "",
    note: ""
  });
  const colourLines = useMemo(
    () => cart.items.map((l) => ({ productName: l.product_name, variantName: l.variant_name, quantity: l.quantity })),
    [cart.items]
  );
  const needsColour = needsTrackColourCheck(colourLines);
  const [colourOk, setColourOk] = useState(false);
  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: k === "postal" ? e.target.value.toUpperCase() : e.target.value }));

  const pickup = method === "pickup";
  const postal = normalizePostal(f.postal);
  const mismatch = !pickup && postal ? !postalMatchesProvince(postal, f.province) : false;
  const totals = useMemo(() => {
    if (pickup) return estimateTotals(cart.subtotal_cad, SHOP.postal, SHOP.province, "pickup");
    return postal && !mismatch ? estimateTotals(cart.subtotal_cad, postal, f.province, "ship") : null;
  }, [pickup, postal, mismatch, cart.subtotal_cad, f.province]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (needsColour && !colourOk) {
      setError("Please confirm your track colour before paying.");
      document.getElementById("track-colour")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...f, method, trackColourConfirmed: colourOk })
        });
        const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
        if (json.url) {
          window.location.href = json.url;
          return;
        }
        setError(json.error ?? "Could not start checkout. Please try again.");
      } catch {
        setError("Network problem. Please check your connection and try again.");
      }
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    });
  }

  const panel = "border border-[var(--color-border)] bg-white p-5";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <form onSubmit={submit} className="space-y-5">
        {/* Contact */}
        <section className={panel}>
          <h2 className="font-display text-xl">1. Who is ordering</h2>
          <p className="mt-1 text-sm text-[var(--color-muted)]">Your receipt and invoice go to this email, and so does the tracking number or the pickup notice.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Input label="First name" autoComplete="given-name" required value={f.firstName} onChange={set("firstName")} />
            <Input label="Last name" autoComplete="family-name" required value={f.lastName} onChange={set("lastName")} />
            <Input label="Email" type="email" autoComplete="email" inputMode="email" required value={f.email} onChange={set("email")} />
            <Input label="Phone" type="tel" autoComplete="tel" inputMode="tel" required value={f.phone} onChange={set("phone")} />
          </div>
        </section>

        {/* Delivery or pickup */}
        <section className={panel}>
          <h2 className="font-display text-xl">2. How you want it</h2>
          <div role="radiogroup" aria-label="Delivery method" className="mt-4 grid gap-3 md:grid-cols-2">
            <MethodCard
              checked={!pickup}
              onChange={() => setMethod("ship")}
              title="Ship it to me"
              price="Free"
              body="Anywhere in Canada. Leaves our shop within one to two business days."
            />
            <MethodCard
              checked={pickup}
              onChange={() => setMethod("pickup")}
              title="Pick it up in Woodstock"
              price="Free"
              body={`${SHOP.street}, Woodstock, Ontario. We email you when it is ready.`}
            />
          </div>

          {pickup ? (
            <div className="note mt-4">
              <p>
                <strong>Pickup at {SHOP.address}.</strong> Please wait for our &ldquo;ready for pickup&rdquo; email before you come by. It usually arrives within one to two business days, and it will include how to arrange a time. Bring the email or your order number.
              </p>
              <p className="mt-2">Pickup orders are charged Ontario HST (13%).</p>
            </div>
          ) : (
            <>
              <Input label="Company (optional)" autoComplete="organization" className="mt-4" value={f.company} onChange={set("company")} />
              <Input label="Street address" autoComplete="address-line1" required className="mt-3" value={f.line1} onChange={set("line1")} />
              <Input label="Apartment, suite, etc. (optional)" autoComplete="address-line2" className="mt-3" value={f.line2} onChange={set("line2")} />
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <Input label="City" autoComplete="address-level2" required value={f.city} onChange={set("city")} />
                <label className="block">
                  <span className="label">Province</span>
                  <select autoComplete="address-level1" value={f.province} onChange={set("province")} className="input">
                    {PROVINCES.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </label>
                <Input label="Postal code" autoComplete="postal-code" required value={f.postal} onChange={set("postal")} placeholder="A1A 1A1" maxLength={7} />
              </div>

              <div aria-live="polite" className="mt-3 text-sm">
                {mismatch && postal && (
                  <p className="border-l-[3px] border-[var(--color-red)] bg-[var(--color-red-soft)] px-3 py-2 text-[var(--color-red)]">
                    {postal} is not a {provinceName(f.province)} postal code. Please check the province.
                  </p>
                )}
                {totals?.shipping && (
                  <p className="border-l-[3px] border-[var(--color-green)] bg-[var(--color-green-soft)] px-3 py-2 font-semibold text-[var(--color-green)]">
                    Free shipping to {totals.shipping.postal}. Nothing is added for delivery.
                  </p>
                )}
              </div>
            </>
          )}

          <label className="mt-4 block">
            <span className="label">{pickup ? "Notes for us (optional)" : "Delivery notes (optional)"}</span>
            <textarea
              value={f.note}
              onChange={set("note")}
              rows={2}
              maxLength={1000}
              placeholder={pickup ? "Best days for pickup, questions about your order…" : "Gate code, leave at the side door, questions about track colour…"}
              className="input"
            />
          </label>
        </section>

        {/* Track colour */}
        <TrackColourConfirm lines={colourLines} checked={colourOk} onChange={setColourOk} heading="3. Confirm your track colour" phone={BILLER_PHONE} />

        {/* Payment */}
        <section className={panel}>
          <h2 className="font-display text-xl">{needsColour ? 4 : 3}. Payment</h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">
            You pay on Stripe&rsquo;s secure page by credit card, debit card, Apple Pay or Google Pay. We never see or store your card number.
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Orders are invoiced by our billing company, Master Decker Inc. Your card statement shows MASTER DECKER, and the invoice arrives by email as soon as the payment goes through.
          </p>
        </section>

        <button type="submit" disabled={pending || mismatch} className="btn-primary min-h-[52px] w-full disabled:opacity-50">
          {pending ? "Processing…" : totals ? `Continue to secure payment · ${formatCad(totals.total, 2)}` : "Continue to secure payment"}
        </button>

        {error && (
          <p ref={errorRef} role="alert" className="border-l-[3px] border-[var(--color-red)] bg-[var(--color-red-soft)] px-3 py-2 text-sm text-[var(--color-red)]">
            {error}
          </p>
        )}

        <p className="text-center text-xs text-[var(--color-muted)]">
          By placing your order you agree to our{" "}
          <Link href="/shipping-returns" className="underline">shipping, pickup and returns policy</Link> and{" "}
          <Link href="/warranty" className="underline">warranty</Link>. Returns within 30 days. 5-year warranty on LED products.
        </p>
      </form>

      <CheckoutSummary cart={cart} totals={totals} method={method} />
    </div>
  );
}

function MethodCard({ checked, onChange, title, price, body }: { checked: boolean; onChange: () => void; title: string; price: string; body: string }) {
  return (
    <label
      className={`flex min-h-[44px] cursor-pointer gap-3 border p-4 transition ${
        checked ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] outline outline-1 outline-[var(--color-accent)]" : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-accent)]"
      }`}
    >
      <input type="radio" name="fulfilment" checked={checked} onChange={onChange} className="mt-1 size-4 shrink-0 accent-[var(--color-accent)]" />
      <span className="flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-semibold text-[var(--color-ink)]">{title}</span>
          <span className="text-sm font-bold text-[var(--color-green)]">{price}</span>
        </span>
        <span className="mt-1 block text-sm leading-snug text-[var(--color-text-soft)]">{body}</span>
      </span>
    </label>
  );
}

function Input({ label, type = "text", className = "", ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="label">{label}</span>
      <input type={type} className="input" {...rest} />
    </label>
  );
}
