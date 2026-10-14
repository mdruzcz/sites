"use client";

import { useState, useTransition } from "react";

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

export function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<OrderInfo | "not_found" | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    startTransition(async () => {
      const res = await fetch("/api/order/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_number: orderNumber.trim(), email: email.trim().toLowerCase() })
      });
      const json = (await res.json()) as { order?: OrderInfo };
      setResult(json.order ?? "not_found");
    });
  }

  return (
    <>
      <form onSubmit={submit} className="card mt-6 grid gap-4 p-6">
        <label className="block">
          <span className="label">Order number</span>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            required
            placeholder="HLS-10001"
            className="input"
          />
        </label>
        <label className="block">
          <span className="label">Email used at checkout</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="input"
          />
        </label>
        <button type="submit" disabled={pending} className="btn-primary mt-1 disabled:opacity-50">
          {pending ? "Looking up…" : "Track order"}
        </button>
      </form>

      {result === "not_found" && (
        <p className="mt-4 rounded-xl bg-[var(--color-berry-soft)] px-4 py-3 text-sm text-[var(--color-berry-dark)]">
          We couldn&rsquo;t find an order matching that number and email. Double-check both and try again.
        </p>
      )}

      {result && result !== "not_found" && (
        <div className="mt-4 rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <p className="eyebrow text-[var(--color-muted)]">{result.order_number}</p>
          <h2 className="font-display mt-1 text-2xl">
            Status: <span className="text-[var(--color-brand)]">{result.status}</span>
          </h2>
          <dl className="mt-4 grid gap-2 text-sm">
            <Row label="Placed" value={result.placed_at ? new Date(result.placed_at).toLocaleString() : "—"} />
            <Row label="Shipped" value={result.shipped_at ? new Date(result.shipped_at).toLocaleString() : "Not yet shipped"} />
            <Row label="Total" value={new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(result.total_cad)} />
            {result.tracking_number && (
              <Row
                label="Tracking"
                value={
                  <a
                    href={result.tracking_url ?? `https://www.canadapost-postescanada.ca/track-reperage/en#/details/${result.tracking_number}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[var(--color-brand)] hover:underline"
                  >
                    {result.tracking_number} ↗
                  </a>
                }
              />
            )}
          </dl>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[var(--color-muted)]">{label}</dt>
      <dd className="font-medium text-[var(--color-text)]">{value}</dd>
    </div>
  );
}
