"use client";

import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import type { Cart } from "@/lib/cart";
import { submitShippingInquiry } from "@/lib/actions/inquiry";

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

export function CheckoutForm({ cart }: { cart: Cart }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("ON");
  const [postal, setPostal] = useState("");
  const [notes, setNotes] = useState("");
  const turnstileToken = useRef<string | null>(null);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function sendInquiry() {
    setError(null);
    startTransition(async () => {
      try {
        await submitShippingInquiry({
          name,
          email,
          phone,
          address,
          city,
          province,
          postal,
          notes: notes || null,
          discount_code: null,
          turnstile_token: turnstileToken.current
        });
        router.push("/checkout/success");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not send your request. Please try again.");
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* How it works */}
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-5">
        <h2 className="font-display text-xl text-[var(--color-brand-dark)]">
          How ordering works — no payment online
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Send us your order and delivery address below. We&rsquo;ll reply by email,{" "}
          <strong>usually within one business day</strong>, with your shipping cost and delivery
          timeline. Once you approve the quote, we arrange payment and ship your lights.
        </p>
      </section>

      {/* Contact */}
      <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-display text-xl">1 · Contact</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input label="Full name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="md:col-span-2" />
        </div>
      </section>

      {/* Delivery address */}
      <section className="rounded-xl border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-display text-xl">2 · Delivery address</h2>
        <p className="mt-1 text-xs text-slate-500">
          Shipping is quoted per order from London, ON — your full address lets us give you an
          accurate cost and timeline.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input
            label="Street address"
            name="address"
            autoComplete="street-address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="md:col-span-2"
          />
          <Input label="City / town" name="city" autoComplete="address-level2" required value={city} onChange={(e) => setCity(e.target.value)} />
          <label className="block">
            <span className="text-xs font-medium text-slate-600">Province</span>
            <select
              name="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
            >
              {PROVINCES.map(([code, provinceName]) => (
                <option key={code} value={code}>
                  {provinceName}
                </option>
              ))}
            </select>
          </label>
          <Input
            label="Postal code"
            name="postal_code"
            autoComplete="postal-code"
            inputMode="text"
            required
            value={postal}
            onChange={(e) => setPostal(e.target.value.toUpperCase())}
            placeholder="A1A 1A1"
            pattern="[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d"
          />
        </div>
        <label className="mt-3 block">
          <span className="text-xs font-medium text-slate-600">Notes (optional)</span>
          <textarea
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Delivery instructions, timing, questions…"
            className="mt-1 w-full rounded-md border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
          />
        </label>
      </section>

      {turnstileSiteKey && !turnstileSiteKey.startsWith("1x000") && (
        <Turnstile
          siteKey={turnstileSiteKey}
          onSuccess={(token) => {
            turnstileToken.current = token;
          }}
        />
      )}

      <button
        type="button"
        onClick={sendInquiry}
        disabled={pending || cart.items.length === 0}
        className="btn-primary w-full justify-center text-base disabled:opacity-50"
      >
        {pending ? "Sending your request…" : "Request shipping quote →"}
      </button>

      {error && <p className="rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

      <p className="text-center text-xs text-slate-400">
        No payment is taken online and requesting a quote doesn&rsquo;t commit you to anything. By
        sending your request you agree to our{" "}
        <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>
    </div>
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
