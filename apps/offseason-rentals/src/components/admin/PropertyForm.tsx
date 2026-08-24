"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { audiences, amenities as CATALOGUE } from "@/lib/content";
import { slugify } from "@/lib/format";
import { Icon } from "@/components/Icon";
import type { Property } from "@/lib/types";

type Draft = Partial<Property>;

function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="card card-pad">
      <h2 className="text-[17px] font-bold">{title}</h2>
      {hint ? <p className="mt-1 mb-4 text-[13px] text-[var(--muted)]">{hint}</p> : <div className="mb-4" />}
      {children}
    </section>
  );
}

function Field({
  label,
  id,
  children,
  span = 1
}: {
  label: string;
  id: string;
  children: ReactNode;
  span?: 1 | 2 | 3;
}) {
  const cls = span === 3 ? "sm:col-span-3" : span === 2 ? "sm:col-span-2" : "";
  return (
    <div className={cls}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  id,
  label,
  checked,
  onChange
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 rounded-[var(--r-sm)] border px-3 cursor-pointer"
      style={{ minHeight: 48, borderColor: checked ? "var(--ink)" : "var(--line)" }}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[var(--ink)]"
      />
      <span className="text-[14px] font-medium">{label}</span>
    </label>
  );
}

/** Newline-delimited textarea <-> string[] */
function linesToArray(v: string): string[] {
  return v.split("\n").map((s) => s.trim()).filter(Boolean);
}

export function PropertyForm({ property }: { property?: Property }) {
  const router = useRouter();
  const editing = Boolean(property?.id);

  const [d, setD] = useState<Draft>(
    property ?? {
      name: "",
      slug: "",
      city: "Port Stanley",
      region: "ON",
      country: "CA",
      property_type: "Cottage",
      status: "draft",
      featured: false,
      bedrooms: 2,
      bathrooms: 1,
      sleeps: 4,
      min_stay_nights: 30,
      utilities_included: true,
      wifi_included: true,
      pets_allowed: false,
      smoking_allowed: false,
      perfect_for: [],
      amenities: [],
      highlights: [],
      house_rules: [],
      headline: "",
      summary: "",
      description: ""
    }
  );

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof Property>(k: K, v: Property[K] | null) =>
    setD((prev) => ({ ...prev, [k]: v as never }));

  const num = (v: string): number | null => {
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };

  function toggleIn(key: "perfect_for" | "amenities", slug: string) {
    const current = (d[key] as string[] | undefined) ?? [];
    const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
    set(key, next);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setSaved(false);

    const payload = { ...d, slug: slugify(String(d.slug || d.name || "")) };

    try {
      const res = await fetch(
        editing ? `/api/admin/properties/${property!.id}` : "/api/admin/properties",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not save.");
        setBusy(false);
        return;
      }
      if (!editing && data.id) {
        router.push(`/admin/properties/${data.id}`);
        router.refresh();
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  async function destroy() {
    if (!property?.id) return;
    if (!confirm(`Delete "${property.name}" and all of its photographs? This cannot be undone.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/properties/${property.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Could not delete that listing.");
      setBusy(false);
    }
  }

  const grid = "grid gap-4 sm:grid-cols-3";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Group title="Basics">
        <div className={grid}>
          <Field label="Name" id="p-name" span={2}>
            <input
              id="p-name"
              className="field"
              value={d.name ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                setD((prev) => ({
                  ...prev,
                  name: v,
                  // Keep the slug in step until it has been edited by hand.
                  slug: !editing && (!prev.slug || prev.slug === slugify(prev.name ?? "")) ? slugify(v) : prev.slug
                }));
              }}
              placeholder="The Escape"
              required
            />
          </Field>

          <Field label="Status" id="p-status">
            <select
              id="p-status"
              className="field"
              value={d.status ?? "draft"}
              onChange={(e) => set("status", e.target.value as Property["status"])}
            >
              <option value="draft">Draft — hidden</option>
              <option value="published">Published — live</option>
            </select>
          </Field>

          <Field label="URL slug" id="p-slug" span={2}>
            <input
              id="p-slug"
              className="field"
              value={d.slug ?? ""}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="the-escape"
              required
            />
          </Field>

          <Field label="Property type" id="p-type">
            <select
              id="p-type"
              className="field"
              value={d.property_type ?? "Cottage"}
              onChange={(e) => set("property_type", e.target.value)}
            >
              {["Cottage", "House", "Duplex unit", "Apartment", "Suite", "Bungalow", "Studio"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Headline" id="p-headline" span={3}>
            <input
              id="p-headline"
              className="field"
              value={d.headline ?? ""}
              onChange={(e) => set("headline", e.target.value)}
              placeholder="Three bedrooms, a wood stove, and the harbour at the bottom of the hill"
            />
          </Field>

          <Field label="Summary — used on cards and as the meta description" id="p-summary" span={3}>
            <textarea
              id="p-summary"
              className="field"
              rows={2}
              maxLength={260}
              value={d.summary ?? ""}
              onChange={(e) => set("summary", e.target.value)}
            />
          </Field>

          <Field label="Description — blank lines separate paragraphs" id="p-desc" span={3}>
            <textarea
              id="p-desc"
              className="field"
              rows={9}
              value={d.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
        </div>

        <div className="mt-4">
          <Toggle
            id="p-featured"
            label="Feature this one — shows an “Owner favourite” badge and sorts first"
            checked={Boolean(d.featured)}
            onChange={(v) => set("featured", v)}
          />
        </div>
      </Group>

      <Group title="Address" hint="The civic number is never shown publicly — only the town.">
        <div className={grid}>
          <Field label="Street address" id="p-street" span={2}>
            <input
              id="p-street"
              className="field"
              value={d.street_address ?? ""}
              onChange={(e) => set("street_address", e.target.value)}
              placeholder="4490 East Road"
            />
          </Field>
          <Field label="Unit" id="p-unit">
            <input
              id="p-unit"
              className="field"
              value={d.unit ?? ""}
              onChange={(e) => set("unit", e.target.value || null)}
              placeholder="#1"
            />
          </Field>
          <Field label="Town or city" id="p-city">
            <input id="p-city" className="field" value={d.city ?? ""} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label="Province" id="p-region">
            <input id="p-region" className="field" value={d.region ?? ""} onChange={(e) => set("region", e.target.value)} />
          </Field>
          <Field label="Postal code" id="p-postal">
            <input
              id="p-postal"
              className="field"
              value={d.postal_code ?? ""}
              onChange={(e) => set("postal_code", e.target.value || null)}
              placeholder="N5L 1B4"
            />
          </Field>
          <Field label="Latitude" id="p-lat">
            <input
              id="p-lat"
              className="field"
              inputMode="decimal"
              value={d.latitude ?? ""}
              onChange={(e) => set("latitude", num(e.target.value))}
              placeholder="42.6642"
            />
          </Field>
          <Field label="Longitude" id="p-lng">
            <input
              id="p-lng"
              className="field"
              inputMode="decimal"
              value={d.longitude ?? ""}
              onChange={(e) => set("longitude", num(e.target.value))}
              placeholder="-81.2151"
            />
          </Field>
        </div>
      </Group>

      <Group title="The place itself">
        <div className={grid}>
          {(
            [
              ["Bedrooms", "bedrooms", "1"],
              ["Bathrooms", "bathrooms", "0.5"],
              ["Sleeps", "sleeps", "1"],
              ["Beds", "beds", "1"],
              ["Square feet", "square_feet", "1"],
              ["Parking spaces", "parking_spaces", "1"]
            ] as [string, keyof Property, string][]
          ).map(([label, key, step]) => (
            <Field key={key} label={label} id={`p-${key}`}>
              <input
                id={`p-${key}`}
                type="number"
                min={0}
                step={step}
                inputMode="decimal"
                className="field"
                value={(d[key] as number | null | undefined) ?? ""}
                onChange={(e) => set(key, num(e.target.value) as never)}
              />
            </Field>
          ))}
        </div>
      </Group>

      <Group title="Off-season rates" hint="All figures in CAD. Leave a rate blank to hide that row.">
        <div className={grid}>
          {(
            [
              ["Monthly rate", "monthly_rate"],
              ["Weekly rate", "weekly_rate"],
              ["Nightly rate", "nightly_rate"],
              ["Security deposit", "security_deposit"],
              ["Cleaning fee", "cleaning_fee"],
              ["Pet fee", "pet_fee"]
            ] as [string, keyof Property][]
          ).map(([label, key]) => (
            <Field key={key} label={label} id={`p-${key}`}>
              <input
                id={`p-${key}`}
                type="number"
                min={0}
                inputMode="numeric"
                className="field"
                value={(d[key] as number | null | undefined) ?? ""}
                onChange={(e) => set(key, num(e.target.value) as never)}
              />
            </Field>
          ))}

          <Field label="Minimum stay (nights)" id="p-min">
            <input
              id="p-min"
              type="number"
              min={1}
              inputMode="numeric"
              className="field"
              value={d.min_stay_nights ?? 30}
              onChange={(e) => set("min_stay_nights", num(e.target.value) ?? 30)}
            />
          </Field>
          <Field label="Available from" id="p-from">
            <input
              id="p-from"
              className="field"
              value={d.available_from ?? ""}
              onChange={(e) => set("available_from", e.target.value || null)}
              placeholder="September"
            />
          </Field>
          <Field label="Available to" id="p-to">
            <input
              id="p-to"
              className="field"
              value={d.available_to ?? ""}
              onChange={(e) => set("available_to", e.target.value || null)}
              placeholder="May"
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Toggle id="p-util" label="Utilities included" checked={Boolean(d.utilities_included)} onChange={(v) => set("utilities_included", v)} />
          <Toggle id="p-wifi" label="Wi-Fi included" checked={Boolean(d.wifi_included)} onChange={(v) => set("wifi_included", v)} />
          <Toggle id="p-pets" label="Pets allowed" checked={Boolean(d.pets_allowed)} onChange={(v) => set("pets_allowed", v)} />
          <Toggle id="p-smoke" label="Smoking allowed" checked={Boolean(d.smoking_allowed)} onChange={(v) => set("smoking_allowed", v)} />
        </div>
      </Group>

      <Group title="Who it suits" hint="Drives the /perfect-for pages and the browse filters.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <Toggle
              key={a.slug}
              id={`aud-${a.slug}`}
              label={a.label}
              checked={((d.perfect_for as string[]) ?? []).includes(a.slug)}
              onChange={() => toggleIn("perfect_for", a.slug)}
            />
          ))}
        </div>
      </Group>

      <Group title="Amenities">
        <div className="space-y-5">
          {[...new Set(CATALOGUE.map((a) => a.group))].map((group) => (
            <div key={group}>
              <h3 className="text-[13px] font-bold uppercase tracking-wide text-[var(--muted)] mb-2">
                {group}
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {CATALOGUE.filter((a) => a.group === group).map((a) => (
                  <Toggle
                    key={a.slug}
                    id={`am-${a.slug}`}
                    label={a.label}
                    checked={((d.amenities as string[]) ?? []).includes(a.slug)}
                    onChange={() => toggleIn("amenities", a.slug)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Group>

      <Group title="Highlights and house rules" hint="One per line.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Highlights" id="p-highlights">
            <textarea
              id="p-highlights"
              className="field"
              rows={5}
              value={((d.highlights as string[]) ?? []).join("\n")}
              onChange={(e) => set("highlights", linesToArray(e.target.value))}
              placeholder={"Six-minute walk to Main Beach\nWood stove and a full cord included"}
            />
          </Field>
          <Field label="House rules" id="p-rules">
            <textarea
              id="p-rules"
              className="field"
              rows={5}
              value={((d.house_rules as string[]) ?? []).join("\n")}
              onChange={(e) => set("house_rules", linesToArray(e.target.value))}
              placeholder={"No smoking anywhere on the property\nQuiet hours after 10 pm"}
            />
          </Field>
        </div>
      </Group>

      {error ? (
        <p
          className="rounded-[var(--r-sm)] px-3 py-2 text-[14px]"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div
        className="sticky bottom-0 -mx-6 border-t bg-[var(--surface)] px-6 py-3 flex flex-wrap items-center gap-3"
        style={{ borderColor: "var(--line)" }}
      >
        <button type="submit" className="btn btn-dark" disabled={busy} aria-busy={busy}>
          {busy ? "Saving…" : editing ? "Save changes" : "Create listing"}
        </button>

        {saved ? (
          <span className="flex items-center gap-2 text-[14px]" style={{ color: "var(--ok)" }} role="status">
            <Icon name="check" size={16} strokeWidth={2.4} />
            Saved
          </span>
        ) : null}

        {editing ? (
          <>
            <Link href={`/rentals/${property!.slug}`} target="_blank" rel="noreferrer" className="btn btn-quiet btn-sm">
              Preview
            </Link>
            <button type="button" onClick={destroy} className="btn btn-quiet btn-sm ml-auto" style={{ color: "var(--danger)" }} disabled={busy}>
              <Icon name="trash" size={15} strokeWidth={2} />
              Delete listing
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
}
