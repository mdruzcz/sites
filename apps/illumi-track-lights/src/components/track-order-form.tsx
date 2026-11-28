"use client";

import { useState, useTransition } from "react";
import { BRAND } from "@/lib/utils";

interface OrderInfo {
  order_number: string;
  status: string;
  email: string;
  total_cad: number;
  shipping_carrier: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  placed_at: string | null;
  shipped_at: string | null;
}

const day = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

export function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<OrderInfo | "not_found" | "error" | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/order/lookup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_number: orderNumber.trim(), email: email.trim().toLowerCase() })
        });
        const json = (await res.json()) as { order?: OrderInfo };
        setResult(json.order ?? "not_found");
      } catch {
        setResult("error");
      }
    });
  }

  return (
    <>
      <form onSubmit={submit} className="grid gap-4 border border-[var(--color-border)] bg-white p-5 md:p-6">
        <div>
          <label className="label" htmlFor="to-number">Order number</label>
          <input
            id="to-number"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            autoComplete="off"
            autoCapitalize="characters"
            placeholder="As shown in your confirmation email"
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="to-email">Email used at checkout</label>
          <input
            id="to-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="input"
          />
        </div>
        <button type="submit" disabled={pending} aria-busy={pending} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {pending ? "Processing…" : "Look up order"}
        </button>
      </form>

      <div aria-live="polite">
        {result === "not_found" && (
          <p className="mt-4 border-l-[3px] border-[var(--color-red)] bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]">
            No order matches that number and email. Check both against your confirmation email and try again.
          </p>
        )}

        {result === "error" && (
          <p className="mt-4 border-l-[3px] border-[var(--color-red)] bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]">
            We could not reach the server. Check your connection and try again, or email <a href={`mailto:${BRAND.email}`} className="underline underline-offset-2">{BRAND.email}</a>.
          </p>
        )}

        {result && result !== "not_found" && result !== "error" && (
          <div className="mt-4 border border-[var(--color-border)] bg-white p-5 md:p-6">
            <p className="eyebrow text-[var(--color-gold-text)]">Order {result.order_number}</p>
            <h2 className="font-display mt-1 text-[1.5rem]">
              Status: <span className="capitalize">{result.status.replace(/_/g, " ")}</span>
            </h2>
            <dl className="mt-4 text-[0.95rem]">
              <Row label="Placed" value={result.placed_at ? day(result.placed_at) : "Not recorded"} />
              <Row label="Shipped" value={result.shipped_at ? day(result.shipped_at) : "Not yet"} />
              {result.shipping_carrier && <Row label="Carrier" value={result.shipping_carrier} />}
              <Row label="Total" value={new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(result.total_cad)} />
              {result.tracking_number && (
                <Row
                  label="Tracking"
                  value={
                    <a
                      href={result.tracking_url ?? `https://www.canadapost-postescanada.ca/track-reperage/en#/details/${result.tracking_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link inline-flex min-h-[44px] items-center font-mono"
                    >
                      {result.tracking_number}
                      <span className="sr-only"> (opens the carrier&rsquo;s tracking page)</span>
                    </a>
                  }
                />
              )}
            </dl>
          </div>
        )}
      </div>
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] py-2.5 first:border-t-0">
      <dt className="eyebrow text-[var(--color-text-soft)]">{label}</dt>
      <dd className="text-right font-medium text-[var(--color-text)]">{value}</dd>
    </div>
  );
}
