"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Turnstile } from "@marsidev/react-turnstile";
import type { Cart } from "@/lib/cart";
import { submitShippingInquiry } from "@/lib/actions/inquiry";
import { TrackColourConfirm, needsTrackColourCheck } from "@/components/track-colour-confirm";
import { BILLER_PHONE } from "@/lib/store-brand";

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

/**
 * The request form: sends the cart and delivery address to the shop, takes no
 * payment. Every cart under the free-shipping threshold uses it; a larger cart
 * normally pays by card (card-checkout-form.tsx) and reaches this form only
 * when the customer chooses it, or when card checkout isn't switched on.
 * `cardOption` adds a link back to card checkout.
 */
export function CheckoutForm({ cart, cardOption = false }: { cart: Cart; cardOption?: boolean }) {
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
  const [discount, setDiscount] = useState("");
  const turnstileToken = useRef<string | null>(null);
  const colourLines = useMemo(
    () => cart.items.map((l) => ({ productName: l.product_name, variantName: l.variant_name, quantity: l.quantity })),
    [cart.items]
  );
  const needsColour = needsTrackColourCheck(colourLines);
  const [colourOk, setColourOk] = useState(false);

  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const free = cart.subtotal_cad >= 500;

  function sendInquiry() {
    setError(null);
    if (needsColour && !colourOk) {
      setError("Please confirm your track colour before sending your request.");
      document.getElementById("track-colour")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    startTransition(async () => {
      try {
        const res = await submitShippingInquiry({
          name,
          email,
          phone,
          address,
          city,
          province,
          postal,
          notes: notes || null,
          discount_code: discount.trim() || null,
          turnstile_token: turnstileToken.current,
          track_colour_confirmed: colourOk
        });
        if (!res.ok) {
          setError(res.error);
          return;
        }
        router.push("/checkout/success");
      } catch {
        setError("We couldn't reach the server. Please check your connection and try again, or email service@masterdecker.com.");
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* How it works */}
      <section className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-brand-soft)] p-5">
        <h2 className="font-display text-xl text-[var(--color-brand-dark)]">
          {free ? "How an order request works: no payment today" : "How a shipping quote works: no payment today"}
        </h2>
        <p className="mt-2 text-sm text-[var(--color-text)]">
          Send us your order and delivery address below. We&rsquo;ll reply by email,{" "}
          <strong>usually within one business day</strong>,{" "}
          {free
            ? "to confirm your order and delivery timeline. Shipping is free on this order. Once you approve, we arrange payment and ship your lights."
            : "with your shipping cost and delivery timeline. Once you approve the quote, we arrange payment and ship your lights."}
        </p>
        {cardOption && (
          <p className="mt-3 text-sm text-[var(--color-text)]">
            Would you rather pay now?{" "}
            <Link href="/checkout" className="font-semibold text-[var(--color-gold-text)] underline underline-offset-2">
              Pay securely by card instead
            </Link>
            . Card checkout can&rsquo;t apply discount codes.
          </p>
        )}
      </section>

      {/* Contact */}
      <section className="rounded-[14px] border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-display text-xl">1 · Contact</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input label="Full name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="md:col-span-2" />
        </div>
      </section>

      {/* Delivery address */}
      <section className="rounded-[14px] border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-display text-xl">2 · Delivery address</h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          {free
            ? "Your order ships free from London, Ontario. Your full address lets us confirm the delivery timeline."
            : "Orders under $500 are quoted from London, Ontario. Your full address lets us give you an accurate cost and timeline."}
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
            <span className="text-xs font-medium text-[var(--color-text-soft)]">Province</span>
            <select
              name="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="mt-1 w-full rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
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
          <span className="text-xs font-medium text-[var(--color-text-soft)]">Notes (optional)</span>
          <textarea
            name="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Delivery instructions, timing, questions…"
            className="mt-1 w-full rounded-[10px] border border-[var(--color-border)] bg-white px-3 py-2 text-sm shadow-sm"
          />
        </label>
      </section>

      {/* Discount code */}
      <section className="rounded-[14px] border border-[var(--color-border)] bg-white p-5">
        <h2 className="font-display text-xl">3 · Discount code</h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">
          Have a code such as FIRST10? Enter it here and we apply it to your quote.
        </p>
        <div className="mt-4 max-w-xs">
          <Input
            label="Discount code (optional)"
            name="discount_code"
            autoComplete="off"
            autoCapitalize="characters"
            value={discount}
            onChange={(e) => setDiscount(e.target.value.toUpperCase())}
            placeholder="FIRST10"
          />
        </div>
      </section>

      {/* Track colour */}
      <TrackColourConfirm
        lines={colourLines}
        checked={colourOk}
        onChange={setColourOk}
        heading="4 · Confirm your track colour"
        phone={BILLER_PHONE}
      />

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
        {pending ? "Sending your request…" : free ? "Send order request →" : "Request shipping quote →"}
      </button>

      {error && (
        <p role="alert" className="rounded-[10px] bg-rose-50 px-3 py-2 text-sm text-[var(--color-red)]">
          {error}
        </p>
      )}

      <p className="text-center text-xs text-[var(--color-muted)]">
        No payment is taken with this request and sending it doesn&rsquo;t commit you to anything. By
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
      <span className="text-xs font-medium text-[var(--color-text-soft)]">{label}</span>
      <input
        name={name}
        type={type}
        className="field mt-1"
        {...rest}
      />
    </label>
  );
}
