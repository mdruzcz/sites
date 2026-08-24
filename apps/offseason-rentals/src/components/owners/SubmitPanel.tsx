"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPackage, packages } from "@/lib/content";
import { TierChooser } from "@/components/PackageCards";
import { Icon } from "@/components/Icon";
import type { Property } from "@/lib/types";

/**
 * Choose a tier and hand the listing over for review.
 *
 * The readiness list is shown before submission rather than after, so an owner
 * fixes a missing rate here instead of being bounced by the server.
 */
export function SubmitPanel({ property }: { property: Property }) {
  const router = useRouter();
  const params = useSearchParams();
  const [tier, setTier] = useState<string | null>(property.package_tier ?? params.get("tier"));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const checks: { label: string; ok: boolean }[] = [
    { label: "A name", ok: Boolean(property.name?.trim()) },
    { label: "The address", ok: Boolean(property.street_address?.trim()) },
    { label: "A short summary", ok: Boolean(property.summary?.trim()) },
    { label: "A description", ok: Boolean(property.description?.trim()) },
    { label: "A monthly rate", ok: Boolean(property.monthly_rate) },
    { label: "At least one photograph", ok: property.photos.length > 0 }
  ];
  const ready = checks.every((c) => c.ok);

  const chosen = tier ? getPackage(tier) : null;
  const overLimit = chosen ? property.photos.length - chosen.photoLimit : 0;

  async function submit() {
    if (!tier || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/owners/properties/${property.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not submit.");
        setBusy(false);
        return;
      }
      setDone(true);
      router.refresh();
    } catch {
      setError("Could not reach the server.");
      setBusy(false);
    }
  }

  if (done || property.package_status === "submitted" || property.package_status === "awaiting_payment") {
    return (
      <div className="card card-pad" style={{ borderColor: "var(--ok)", background: "var(--ok-soft)" }} role="status">
        <div className="flex items-start gap-3">
          <span className="grid place-items-center rounded-full shrink-0" style={{ width: 40, height: 40, background: "var(--ok)", color: "#fff" }}>
            <Icon name="check" size={20} strokeWidth={2.4} />
          </span>
          <div>
            <h2 className="text-[18px] font-bold">Submitted — thank you</h2>
            <p className="mt-1.5 text-[15px] text-[var(--ink-soft)]">
              We will review the listing and email your invoice for the{" "}
              {chosen?.name ?? property.package_tier} package
              {chosen ? ` (${chosen.priceLabel})` : ""}. It goes live for twelve months once that is
              settled. You can keep editing in the meantime.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (property.package_status === "active") {
    return (
      <div className="card card-pad" style={{ borderColor: "var(--ok)" }}>
        <h2 className="text-[18px] font-bold">This listing is live</h2>
        <p className="mt-1.5 text-[15px] text-[var(--muted)]">
          On the {chosen?.name ?? property.package_tier} package
          {property.package_expires_at
            ? ` until ${new Date(property.package_expires_at).toLocaleDateString("en-CA", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}`
            : ""}
          . Any edit you save appears on the site within the hour.
        </p>
      </div>
    );
  }

  return (
    <div className="card card-pad">
      <h2 className="text-[18px] font-bold">Choose a package and submit</h2>
      <p className="mt-1.5 mb-5 text-[14px] text-[var(--muted)]">
        We invoice you by email, check the listing over, and put it live for twelve months. Nothing
        is charged until you submit.
      </p>

      <div className="mb-5">
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-[var(--muted)] mb-2.5">
          Before you submit
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {checks.map((c) => (
            <li key={c.label} className="flex items-center gap-2.5 text-[14px]">
              <Icon
                name={c.ok ? "check" : "close"}
                size={17}
                strokeWidth={2.3}
                style={{ color: c.ok ? "var(--ok)" : "var(--muted)" }}
              />
              <span style={{ color: c.ok ? "var(--ink)" : "var(--muted)" }}>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <TierChooser value={tier} onSelect={setTier} />

      {overLimit > 0 ? (
        <p className="mt-3 rounded-[var(--r-sm)] px-3 py-2 text-[13px]" style={{ background: "var(--warn-soft)", color: "var(--warn)" }}>
          {chosen!.name} carries {chosen!.photoLimit} photographs and this listing has{" "}
          {property.photos.length}. Remove {overLimit}, or pick{" "}
          {packages.find((p) => p.photoLimit >= property.photos.length)?.name ?? "a larger package"}.
        </p>
      ) : null}

      {error ? (
        <p className="mt-3 rounded-[var(--r-sm)] px-3 py-2 text-[14px]" style={{ background: "var(--danger-soft)", color: "var(--danger)" }} role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        className="btn btn-primary w-full mt-5"
        onClick={submit}
        disabled={busy || !tier || !ready || overLimit > 0}
        aria-busy={busy}
      >
        {busy
          ? "Submitting…"
          : chosen
            ? `Submit for ${chosen.name} — ${chosen.priceLabel} for 12 months`
            : "Choose a package"}
      </button>

      {!ready ? (
        <p className="mt-3 text-center text-[13px] text-[var(--muted)]">
          Finish the items above and the button will unlock.
        </p>
      ) : null}
    </div>
  );
}
