"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { Cart } from "@/lib/cart";
import { submitShippingInquiry } from "@/lib/actions/inquiry";
import { Icon } from "@/components/icons";
import { SITE_EMAIL, WELCOME_CODE } from "@/lib/site";

const Turnstile = dynamic(() => import("@marsidev/react-turnstile").then((m) => m.Turnstile), { ssr: false });

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
  const [token, setToken] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const captchaOn = !!siteKey && !siteKey.startsWith("1x000");

  useEffect(() => {
    if (!captchaOn || !showCaptcha || token) {
      setCaptchaFailed(false);
      return;
    }
    const id = setTimeout(() => setCaptchaFailed(true), 15000);
    return () => clearTimeout(id);
  }, [captchaOn, showCaptcha, token]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      try {
        const res = await submitShippingInquiry({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          organization: String(fd.get("organization") ?? "") || null,
          address: String(fd.get("address") ?? ""),
          city: String(fd.get("city") ?? ""),
          province: String(fd.get("province") ?? "ON"),
          postal: String(fd.get("postal_code") ?? "").toUpperCase(),
          notes: String(fd.get("notes") ?? "") || null,
          discount_code: String(fd.get("discount_code") ?? "") || null,
          turnstile_token: token || null
        });
        if (!res.ok) {
          setError(res.error);
          return;
        }
        router.push("/checkout/success");
      } catch {
        setError(`We couldn't reach the server. Please try again, or email ${SITE_EMAIL}.`);
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onFocus={() => setShowCaptcha(true)} className="space-y-6">
      <section className="rounded-2xl border border-[var(--color-brand)]/15 bg-[var(--color-brand-soft)] p-5">
        <h2 className="font-display text-xl text-[var(--color-brand-dark)]">How this works</h2>
        <p className="mt-2 text-sm text-[var(--color-text-soft)]">
          Send us your list and delivery address. We reply by email, <strong>usually within one business day</strong>, with pricing (including any volume, installer or public-sector pricing), shipping and a timeline. Approve the quote and we arrange payment and ship. Nothing is charged now.
        </p>
      </section>

      <section className="card p-5 md:p-6">
        <h2 className="font-display text-xl">1 · Contact</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Full name *" name="name" autoComplete="name" required />
          <Field label="Organization / property (optional)" name="organization" autoComplete="organization" placeholder="e.g. Main Street BIA" />
          <Field label="Email *" name="email" type="email" autoComplete="email" inputMode="email" required />
          <Field label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
      </section>

      <section className="card p-5 md:p-6">
        <h2 className="font-display text-xl">2 · Delivery address</h2>
        <p className="mt-1 text-xs text-[var(--color-muted)]">Shipping is quoted per order from London, Ontario; a full address gives you an accurate cost and timeline.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Street address *" name="address" autoComplete="street-address" required wrapClass="md:col-span-2" />
          <Field label="City / town *" name="city" autoComplete="address-level2" required />
          <label className="block">
            <span className="label">Province</span>
            <select name="province" defaultValue="ON" className="input">
              {PROVINCES.map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>
          </label>
          <Field label="Postal code *" name="postal_code" autoComplete="postal-code" required placeholder="A1A 1A1" pattern="[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d" inputClass="uppercase" />
          <Field label={`Discount code (e.g. ${WELCOME_CODE})`} name="discount_code" autoComplete="off" inputClass="uppercase" />
        </div>
        <label className="mt-4 block">
          <span className="label">Notes (optional)</span>
          <textarea name="notes" rows={3} placeholder="Install date, loading dock details, questions, PO number…" className="input" />
        </label>
      </section>

      {captchaOn && showCaptcha && (
        <div>
          <Turnstile siteKey={siteKey} onSuccess={setToken} onExpire={() => setToken("")} options={{ appearance: "interaction-only" }} />
          {captchaFailed && !token && (
            <p className="mt-2 text-xs text-[var(--color-muted)]">
              Spam check is slow to load. You can still submit — if it fails, email <a href={`mailto:${SITE_EMAIL}`} className="underline">{SITE_EMAIL}</a>.
            </p>
          )}
        </div>
      )}

      <button type="submit" disabled={pending || cart.items.length === 0} className="btn-accent w-full text-base disabled:opacity-50">
        {pending ? "Sending your request…" : "Send my quote request"} {!pending && <Icon.arrow size={18} />}
      </button>

      {error && <p className="rounded-xl bg-[var(--color-berry-soft)] px-4 py-3 text-sm text-[var(--color-berry-dark)]">{error}</p>}

      <p className="text-center text-xs text-[var(--color-muted)]">
        No payment is taken online and requesting a quote doesn&rsquo;t commit you to anything. By sending you agree to our{" "}
        <Link href="/privacy" className="underline">privacy policy</Link>.
      </p>
    </form>
  );
}

function Field({ label, name, type = "text", wrapClass = "", inputClass = "", ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; wrapClass?: string; inputClass?: string }) {
  return (
    <label className={`block ${wrapClass}`}>
      <span className="label">{label}</span>
      <input name={name} type={type} className={`input ${inputClass}`} {...rest} />
    </label>
  );
}
