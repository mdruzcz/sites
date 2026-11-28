"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import type { Cart } from "@/lib/cart";
import { CheckoutSummary } from "@/components/checkout-summary";
import { TrackColourConfirm, needsTrackColourCheck } from "@/components/track-colour-confirm";
import { BILLER_PHONE, estimateFreeOrderTotals } from "@/lib/store-brand";
import { PROVINCES, normalizePostal, postalMatchesProvince, provinceName } from "@/lib/orders/policy";
import { formatCad } from "@/lib/utils";

type Field = "email" | "phone" | "firstName" | "lastName" | "company" | "line1" | "line2" | "city" | "province" | "postal" | "note";

/**
 * Card checkout for a cart that ships free. Posts to /api/stripe/checkout, which
 * re-prices the cart, saves the pending order and sends the customer to
 * Stripe's payment page. Smaller carts use the request form (checkout-form.tsx).
 */
export function CardCheckoutForm({ cart }: { cart: Cart }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
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

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const captchaOn = !!turnstileSiteKey && !turnstileSiteKey.startsWith("1x000");
  const turnstile = useRef<TurnstileInstance | null>(null);
  const turnstileToken = useRef<string | null>(null);

  const postal = normalizePostal(f.postal);
  const mismatch = postal ? !postalMatchesProvince(postal, f.province) : false;
  // Shipping is free on every order that reaches this form, so the total only
  // depends on the province's GST/HST.
  const totals = useMemo(
    () => (mismatch ? null : estimateFreeOrderTotals(cart.subtotal_cad, f.province, postal)),
    [mismatch, cart.subtotal_cad, f.province, postal]
  );

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
          body: JSON.stringify({ ...f, trackColourConfirmed: colourOk, turnstileToken: turnstileToken.current })
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
      // A spam-check token works once, so get a fresh one for the next try.
      turnstileToken.current = null;
      turnstile.current?.reset();
      setTimeout(() => errorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <form onSubmit={submit} className="space-y-6">
        {/* Contact */}
        <section className="rounded-[14px] border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-display text-xl">1 · Contact</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">Your order confirmation and invoice go to this email.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Input label="Email" type="email" autoComplete="email" inputMode="email" required value={f.email} onChange={set("email")} />
            <Input label="Phone" type="tel" autoComplete="tel" inputMode="tel" required value={f.phone} onChange={set("phone")} />
          </div>
        </section>

        {/* Shipping */}
        <section className="rounded-[14px] border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-display text-xl">2 · Shipping address</h2>
          <p className="mt-1 text-xs text-[var(--color-muted)]">This order ships free from London, Ontario to any address in Canada.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Input label="First name" autoComplete="given-name" required value={f.firstName} onChange={set("firstName")} />
            <Input label="Last name" autoComplete="family-name" required value={f.lastName} onChange={set("lastName")} />
          </div>
          <Input label="Company (optional)" autoComplete="organization" className="mt-3" value={f.company} onChange={set("company")} />
          <Input label="Street address" autoComplete="address-line1" required className="mt-3" value={f.line1} onChange={set("line1")} />
          <Input label="Apartment, suite, etc. (optional)" autoComplete="address-line2" className="mt-3" value={f.line2} onChange={set("line2")} />
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <Input label="City" autoComplete="address-level2" required value={f.city} onChange={set("city")} />
            <label className="block">
              <span className="text-xs font-medium text-[var(--color-text-soft)]">Province</span>
              <select autoComplete="address-level1" value={f.province} onChange={set("province")} className="field mt-1">
                {PROVINCES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <Input
              label="Postal code"
              autoComplete="postal-code"
              required
              value={f.postal}
              onChange={set("postal")}
              placeholder="A1A 1A1"
              maxLength={7}
            />
          </div>

          <div aria-live="polite" className="mt-3 text-sm">
            {mismatch && postal && (
              <p className="rounded-[10px] bg-[var(--color-red-soft)] px-3 py-2 text-[var(--color-red)]">
                {postal} isn&rsquo;t a postal code in {provinceName(f.province)}. Please check the province.
              </p>
            )}
            {!mismatch && postal && (
              <p className="rounded-[10px] bg-[var(--color-green-soft)] px-3 py-2 font-medium text-[var(--color-green-dark)]">
                ✓ Free shipping to {postal}.
              </p>
            )}
          </div>

          <label className="mt-4 block">
            <span className="text-xs font-medium text-[var(--color-text-soft)]">Delivery notes (optional)</span>
            <textarea
              value={f.note}
              onChange={set("note")}
              rows={2}
              maxLength={1000}
              placeholder="Gate code, leave at side door, track colour questions…"
              className="field mt-1"
            />
          </label>
        </section>

        {/* Track colour */}
        <TrackColourConfirm
          lines={colourLines}
          checked={colourOk}
          onChange={setColourOk}
          heading="3 · Confirm your track colour"
          phone={BILLER_PHONE}
        />

        {/* Payment */}
        <section className="rounded-[14px] border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-display text-xl">{needsColour ? 4 : 3} · Payment</h2>
          <p className="mt-2 text-sm text-[var(--color-text-soft)]">
            You&rsquo;ll pay by credit or debit card on Stripe&rsquo;s secure page. We never see or store your card
            number.
          </p>
          <p className="mt-2 text-xs text-[var(--color-muted)]">
            Orders are invoiced by our billing company, Master Decker Inc. Your card statement shows MASTER DECKER and
            your invoice arrives by email as soon as payment goes through.
          </p>
          {/* The site advertises a first-order code; card checkout has no way to apply one. */}
          <p className="mt-3 rounded-[10px] bg-[var(--color-bg-tint)] px-3 py-2 text-xs text-[var(--color-text-soft)]">
            <span className="font-semibold text-[var(--color-text)]">Have a discount code?</span>{" "}
            Card checkout can&rsquo;t apply codes.{" "}
            <Link href="/checkout?request=1" className="font-semibold text-[var(--color-gold-text)] underline underline-offset-2">
              Send your order as a request
            </Link>{" "}
            and we&rsquo;ll apply the code before you pay.
          </p>
        </section>

        {captchaOn && (
          <Turnstile
            ref={turnstile}
            siteKey={turnstileSiteKey}
            onSuccess={(token) => {
              turnstileToken.current = token;
            }}
            onExpire={() => {
              turnstileToken.current = null;
            }}
          />
        )}

        <button type="submit" disabled={pending || mismatch} className="btn-primary min-h-[48px] w-full text-base disabled:opacity-50">
          {pending ? "Processing…" : totals ? `Continue to secure payment · ${formatCad(totals.total)}` : "Continue to secure payment"}
        </button>

        {error && (
          <p ref={errorRef} role="alert" className="rounded-[10px] bg-[var(--color-red-soft)] px-3 py-2 text-sm text-[var(--color-red)]">
            {error}
          </p>
        )}

        <p className="text-center text-xs text-[var(--color-muted)]">
          By placing your order you agree to our{" "}
          <Link href="/terms-of-service" className="underline">
            terms
          </Link>
          ,{" "}
          <Link href="/shipping-returns" className="underline">
            shipping &amp; returns policy
          </Link>{" "}
          and{" "}
          <Link href="/warranty" className="underline">
            5-year warranty
          </Link>
          .
        </p>

        {/* The request flow stays available for anyone who would rather not pay by card. */}
        <p className="rounded-[14px] border border-dashed border-[var(--color-border-strong)] px-5 py-4 text-sm text-[var(--color-text-soft)]">
          <span className="font-semibold text-[var(--color-text)]">Prefer to pay by e-transfer or invoice?</span>{" "}
          <Link href="/checkout?request=1" className="font-semibold text-[var(--color-gold-text)] underline underline-offset-2">
            Send it as an order request
          </Link>{" "}
          and we&rsquo;ll confirm your order by email before you pay.
        </p>
      </form>

      <CheckoutSummary cart={cart} totals={totals} />
    </div>
  );
}

function Input({
  label,
  type = "text",
  className = "",
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-medium text-[var(--color-text-soft)]">{label}</span>
      <input type={type} className="field mt-1" {...rest} />
    </label>
  );
}
