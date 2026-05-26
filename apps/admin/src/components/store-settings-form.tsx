"use client";

import { useState, useTransition } from "react";
import { updateStore } from "@/lib/actions/store";

export function StoreSettingsForm({ store }: { store: Record<string, unknown> }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState<"idle" | "ok" | "err">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSaved("idle");
    startTransition(async () => {
      try {
        await updateStore(store.id as string, {
          name: String(form.get("name") || ""),
          domain: String(form.get("domain") || ""),
          slug: String(form.get("slug") || ""),
          support_email: String(form.get("support_email") || ""),
          ship_from_postal_code: String(form.get("ship_from_postal_code") || "") || null,
          currency: String(form.get("currency") || "CAD"),
          status: String(form.get("status") || "active"),
          free_shipping_threshold_cad: Number(form.get("free_shipping_threshold_cad") || 0)
        });
        setSaved("ok");
      } catch {
        setSaved("err");
      }
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-2"
    >
      <Field label="Store name">
        <input name="name" defaultValue={(store.name as string) ?? ""} className={input} required />
      </Field>
      <Field label="Status">
        <select name="status" defaultValue={(store.status as string) ?? "active"} className={input}>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </Field>
      <Field label="Production domain">
        <input name="domain" defaultValue={(store.domain as string) ?? ""} className={input} required />
      </Field>
      <Field label="Slug (internal)">
        <input name="slug" defaultValue={(store.slug as string) ?? ""} className={input} required />
      </Field>
      <Field label="Support email">
        <input
          name="support_email"
          type="email"
          defaultValue={(store.support_email as string) ?? ""}
          className={input}
          required
        />
      </Field>
      <Field label="Currency">
        <select name="currency" defaultValue={(store.currency as string) ?? "CAD"} className={input}>
          <option value="CAD">CAD</option>
          <option value="USD">USD</option>
        </select>
      </Field>
      <Field label="Free-shipping threshold (CAD)">
        <input
          name="free_shipping_threshold_cad"
          type="number"
          step="0.01"
          defaultValue={Number(store.free_shipping_threshold_cad ?? 500)}
          className={input}
        />
      </Field>
      <Field label="Ship-from postal code">
        <input
          name="ship_from_postal_code"
          defaultValue={(store.ship_from_postal_code as string) ?? ""}
          className={input}
          placeholder="L7L 0E2"
        />
      </Field>
      <div className="md:col-span-2 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
        <p className="font-semibold uppercase tracking-wide text-slate-500">Integrations (next phase)</p>
        <ul className="mt-1 space-y-1">
          <li>· Stripe account ID, webhook secret — stored in Supabase Vault, referenced by{" "}
            <code className="font-mono">stripe_account_id</code></li>
          <li>· Canada Post customer / contract — referenced by{" "}
            <code className="font-mono">canada_post_customer_no</code></li>
          <li>· Revalidation secret — used by the storefront&rsquo;s{" "}
            <code className="font-mono">/api/revalidate</code> route</li>
        </ul>
      </div>
      <div className="md:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save store"}
        </button>
        {saved === "ok" && <span className="text-sm text-emerald-700">Saved</span>}
        {saved === "err" && <span className="text-sm text-rose-700">Error saving</span>}
      </div>
    </form>
  );
}

const input = "w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
