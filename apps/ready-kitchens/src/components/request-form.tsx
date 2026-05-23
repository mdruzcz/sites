"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUI } from "./ui-context";
import { submitOrder } from "@/lib/actions/quote";
import { formatCad, SITE } from "@/lib/utils";

export function RequestForm() {
  const router = useRouter();
  const { lines, setQty, remove, hydrated, clear, getKit } = useUI();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const items = lines.map((l) => {
    const kit = getKit(l.slug);
    return { line: l, kit };
  });
  const subtotal = items.reduce(
    (sum, { line, kit }) => sum + (kit?.price_cad ?? 0) * line.qty,
    0,
  );
  const totalPieces = items.reduce(
    (sum, { line, kit }) => sum + (kit?.pieces ?? 0) * line.qty,
    0,
  );

  if (!mounted || !hydrated) {
    return (
      <div className="rounded-lg border border-[var(--color-line)] bg-white p-8">
        <div className="shimmer h-8 w-1/2 rounded" />
        <div className="shimmer mt-4 h-4 w-3/4 rounded" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--color-line)] bg-white p-10 text-center">
        <h2 className="font-display text-2xl">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-md text-[var(--color-ink-soft)]">
          Add a kitchen kit to your cart, then come back here to submit your order.
        </p>
        <Link href="/kits" className="btn-primary mt-6">Shop kitchen kits</Link>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      postal_code: String(formData.get("postal_code") ?? ""),
      pickup_preference: String(formData.get("pickup_preference") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      turnstile_token: String(formData.get("cf-turnstile-response") ?? ""),
      lines: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
    };

    startTransition(async () => {
      try {
        await submitOrder(payload);
        clear();
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Something went wrong — please try again.";
        if (!msg.includes("NEXT_REDIRECT")) {
          setError(msg);
          router.refresh();
        }
      }
    });
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      {/* Form */}
      <form onSubmit={handleSubmit} className="rounded-lg border border-[var(--color-line)] bg-white p-6 md:p-8">
        <h2 className="font-display text-2xl">Your details</h2>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
          We&rsquo;ll reply within one business day with stock confirmation, final total, and pickup arrangements. No payment now.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Full name" name="name" required autoComplete="name" />
          <Field label="Email" name="email" type="email" required autoComplete="email" />
          <Field label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
          <Field label="Postal code (for delivery)" name="postal_code" autoComplete="postal-code" />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium" htmlFor="pickup_preference">Pickup or delivery</label>
          <select
            id="pickup_preference"
            name="pickup_preference"
            defaultValue="Pickup in Belmont"
            className="mt-1 w-full rounded border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
          >
            <option>Pickup in Belmont</option>
            <option>I&rsquo;d like a delivery quote</option>
            <option>Not sure yet — let&rsquo;s talk</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium" htmlFor="notes">Anything we should know?</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Layout sketch, install timing, mixing in extra cabinets, contractor info, etc."
            className="mt-1 w-full rounded border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>

        {error && (
          <p className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Submitting…" : `Submit Order Request — ${formatCad(subtotal)}`}
        </button>
        <p className="mt-3 text-center text-[11px] text-[var(--color-ink-soft)]">
          🔒 No payment now · We confirm stock &amp; pickup by email before charging
        </p>
      </form>

      {/* Summary */}
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border border-[var(--color-line)] bg-white p-6">
          <h2 className="font-display text-xl">Your order</h2>
          <ul className="mt-4 divide-y divide-[var(--color-line)]">
            {items.map(({ line, kit }) => (
              <li key={line.slug} className="py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--color-accent-dark)]">
                      {kit?.shape ?? "Kit"} · {kit?.pieces ?? "?"} pieces
                    </p>
                    <p className="text-sm font-semibold">{kit?.name ?? line.slug}</p>
                  </div>
                  <p className="font-display text-lg">{kit ? formatCad(kit.price_cad * line.qty) : "—"}</p>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="inline-flex items-center border border-[var(--color-line)] bg-white">
                    <button type="button" onClick={() => setQty(line.slug, line.qty - 1)} className="h-8 w-8 hover:bg-[var(--color-paper-warm)]" aria-label="Decrease">−</button>
                    <span className="w-8 text-center text-sm">{line.qty}</span>
                    <button type="button" onClick={() => setQty(line.slug, line.qty + 1)} className="h-8 w-8 hover:bg-[var(--color-paper-warm)]" aria-label="Increase">+</button>
                  </div>
                  <button type="button" onClick={() => remove(line.slug)} className="text-xs underline-offset-2 hover:underline">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-[var(--color-line)] pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Total cabinets</span>
              <span>{totalPieces}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--color-ink-soft)]">Shipping / pickup</span>
              <span>Confirmed by email</span>
            </div>
            <div className="flex items-baseline justify-between pt-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-ink-soft)]">Subtotal</span>
              <span className="font-display text-2xl">{formatCad(subtotal)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-5 text-sm">
          <p className="font-semibold">Pickup</p>
          <p className="mt-1 text-[var(--color-ink-soft)]">50432 Yorke Line, Belmont, ON</p>
          <p className="mt-1 text-[var(--color-ink-soft)]">{SITE.pickupHours}</p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>
        {label}{required && <span className="text-[var(--color-accent)]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-1 w-full rounded border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}
