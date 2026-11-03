"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import type { Cart } from "@/lib/cart";
import { CheckoutSummary } from "@/components/checkout-summary";
import {
  FLAT_RATE_CAD,
  FREE_RADIUS_KM,
  PROVINCES,
  SHOP,
  estimateTotals,
  normalizePostal,
  postalMatchesProvince,
  provinceName
} from "@/lib/orders/policy";
import { formatCad } from "@/lib/utils";

type Field = "email" | "phone" | "firstName" | "lastName" | "company" | "line1" | "line2" | "city" | "province" | "postal" | "note";

export function CheckoutForm({ cart }: { cart: Cart }) {
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
  const set = (k: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: k === "postal" ? e.target.value.toUpperCase() : e.target.value }));

  const postal = normalizePostal(f.postal);
  const mismatch = postal ? !postalMatchesProvince(postal, f.province) : false;
  const totals = useMemo(
    () => (postal && !mismatch ? estimateTotals(cart.subtotal_cad, postal, f.province) : null),
    [postal, mismatch, cart.subtotal_cad, f.province]
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(f)
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

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <form onSubmit={submit} className="space-y-6" noValidate={false}>
        {/* Contact */}
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-display text-xl">1 · Contact</h2>
          <p className="mt-1 text-xs text-slate-500">Your receipt, invoice and tracking go to this email.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <Input label="Email" type="email" autoComplete="email" inputMode="email" required value={f.email} onChange={set("email")} />
            <Input label="Phone" type="tel" autoComplete="tel" inputMode="tel" required value={f.phone} onChange={set("phone")} />
          </div>
        </section>

        {/* Shipping */}
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-display text-xl">2 · Shipping address</h2>
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
              <span className="text-xs font-medium text-slate-600">Province</span>
              <select
                autoComplete="address-level1"
                value={f.province}
                onChange={set("province")}
                className="mt-1 min-h-[44px] w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
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
              <p className="rounded-md bg-rose-50 px-3 py-2 text-rose-700">
                {postal} isn&rsquo;t a {provinceName(f.province)} postal code. Please check the province.
              </p>
            )}
            {totals?.shipping?.free && (
              <p className="rounded-md bg-emerald-50 px-3 py-2 font-medium text-emerald-800">
                ✓ Free shipping. You&rsquo;re about {totals.shipping.km} km from our {SHOP.town}, Ontario shop.
              </p>
            )}
            {totals?.shipping && !totals.shipping.free && (
              <p className="rounded-md bg-[var(--color-brand-soft)] px-3 py-2 text-[var(--color-brand-dark)]">
                Flat-rate shipping to {totals.shipping.postal}: <strong>{formatCad(FLAT_RATE_CAD)}</strong>. Free shipping applies within{" "}
                {FREE_RADIUS_KM} km of our {SHOP.town}, ON shop.
              </p>
            )}
            {!postal && (
              <p className="text-xs text-slate-500">
                Free shipping within {FREE_RADIUS_KM} km of our {SHOP.town}, Ontario shop. {formatCad(FLAT_RATE_CAD)} flat rate anywhere else in Canada.
              </p>
            )}
          </div>

          <label className="mt-4 block">
            <span className="text-xs font-medium text-slate-600">Delivery notes (optional)</span>
            <textarea
              value={f.note}
              onChange={set("note")}
              rows={2}
              maxLength={1000}
              placeholder="Gate code, leave at side door, track colour questions…"
              className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
            />
          </label>
        </section>

        {/* Payment */}
        <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
          <h2 className="font-display text-xl">3 · Payment</h2>
          <p className="mt-2 text-sm text-slate-600">
            You&rsquo;ll pay on Stripe&rsquo;s secure page by credit card, debit card, Apple Pay or Google Pay. We never see
            or store your card number.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Orders are invoiced by our billing company, Master Decker Inc. Your card statement shows MASTER DECKER and
            your invoice arrives by email as soon as payment goes through.
          </p>
        </section>

        <button
          type="submit"
          disabled={pending || mismatch}
          className="btn-primary min-h-[48px] w-full justify-center text-base disabled:opacity-50"
        >
          {pending ? "Processing…" : totals ? `Continue to secure payment · ${formatCad(totals.total)}` : "Continue to secure payment →"}
        </button>

        {error && (
          <p ref={errorRef} role="alert" className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {error}
          </p>
        )}

        <p className="text-center text-xs text-slate-400">
          By placing your order you agree to our{" "}
          <Link href="/shipping-returns" className="underline">
            shipping &amp; returns policy
          </Link>{" "}
          and{" "}
          <Link href="/warranty" className="underline">
            warranty
          </Link>
          . Returns within 30 days &middot; 5-year warranty on all LED products.
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
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        type={type}
        className="mt-1 min-h-[44px] w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
        {...rest}
      />
    </label>
  );
}
