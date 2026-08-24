"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { audiences, amenities as CATALOGUE } from "@/lib/content";
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

function Field({ label, id, children, span = 1 }: { label: string; id: string; children: ReactNode; span?: 1 | 2 | 3 }) {
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

function Toggle({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-3 rounded-[var(--r-sm)] border px-3 cursor-pointer"
      style={{ minHeight: 48, borderColor: checked ? "var(--ink)" : "var(--line)" }}
    >
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[var(--ink)]" />
      <span className="text-[14px] font-medium">{label}</span>
    </label>
  );
}

const linesToArray = (v: string) => v.split("\n").map((s) => s.trim()).filter(Boolean);

/**
 * The owner's own editor.
 *
 * Deliberately narrower than the admin form: no slug, no status, no featured
 * flag, no sort rank. Those decide whether a listing is public and where it
 * ranks, and they are not the owner's to set — the server drops them too, so
 * this is honest rather than merely hidden.
 */
export function OwnerListingForm({ property }: { property?: Property }) {
  const router = useRouter();
  const editing = Boolean(property?.id);

  const [d, setD] = useState<Draft>(
    property ?? {
      name: "",
      city: "Port Stanley",
      region: "ON",
      property_type: "Cottage",
      bedrooms: 2,
      bathrooms: 1,
      sleeps: 4,
      min_stay_nights: 30,
      utilities_included: true,
      wifi_included: true,
      pets_allowed: false,
      smoking_allowed: false,
      available_from: "September",
      available_to: "May",
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
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof Property>(k: K, v: Property[K] | null) =>
    setD((prev) => ({ ...prev, [k]: v as never }));

  const num = (v: string): number | null => {
    const n = Number.parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };

  function toggleIn(key: "perfect_for" | "amenities", slug: string) {
    const current = (d[key] as string[] | undefined) ?? [];
    set(key, current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug]);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch(
        editing ? `/api/owners/properties/${property!.id}` : "/api/owners/properties",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(d)
        }
      );
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not save.");
        setBusy(false);
        return;
      }
      if (!editing && data.id) {
        router.push(`/owners/properties/${data.id}`);
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

  const grid = "grid gap-4 sm:grid-cols-3";
  const discountTooHigh =
    Boolean(d.discount_monthly_rate && d.monthly_rate && d.discount_monthly_rate >= d.monthly_rate);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Group title="The property">
        <div className={grid}>
          <Field label="What do you call it?" id="o-name" span={2}>
            <input
              id="o-name"
              className="field"
              value={d.name ?? ""}
              onChange={(e) => set("name", e.target.value)}
              placeholder="The Boathouse"
              required
            />
          </Field>
          <Field label="Type" id="o-type">
            <select
              id="o-type"
              className="field"
              value={d.property_type ?? "Cottage"}
              onChange={(e) => set("property_type", e.target.value)}
            >
              {["Cottage", "House", "Duplex unit", "Apartment", "Suite", "Bungalow", "Studio"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>

          <Field label="Street address" id="o-street" span={2}>
            <input
              id="o-street"
              className="field"
              value={d.street_address ?? ""}
              onChange={(e) => set("street_address", e.target.value)}
              placeholder="4488 East Road"
              autoComplete="street-address"
            />
          </Field>
          <Field label="Unit" id="o-unit">
            <input id="o-unit" className="field" value={d.unit ?? ""} onChange={(e) => set("unit", e.target.value || null)} placeholder="#2" />
          </Field>
          <Field label="Town" id="o-city">
            <input id="o-city" className="field" value={d.city ?? ""} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label="Province" id="o-region">
            <input id="o-region" className="field" value={d.region ?? ""} onChange={(e) => set("region", e.target.value)} />
          </Field>
          <Field label="Postal code" id="o-postal">
            <input id="o-postal" className="field" value={d.postal_code ?? ""} onChange={(e) => set("postal_code", e.target.value || null)} />
          </Field>
        </div>
        <p className="mt-3 text-[13px] text-[var(--muted)]">
          The civic number is never shown publicly — renters see the town only until a stay is
          confirmed.
        </p>
      </Group>

      <Group title="Size and sleeping">
        <div className={grid}>
          {([["Bedrooms", "bedrooms", "1"], ["Bathrooms", "bathrooms", "0.5"], ["Sleeps", "sleeps", "1"], ["Beds", "beds", "1"], ["Square feet", "square_feet", "1"], ["Parking spaces", "parking_spaces", "1"]] as [string, keyof Property, string][]).map(
            ([label, key, step]) => (
              <Field key={key} label={label} id={`o-${key}`}>
                <input
                  id={`o-${key}`}
                  type="number"
                  min={0}
                  step={step}
                  inputMode="decimal"
                  className="field"
                  value={(d[key] as number | null | undefined) ?? ""}
                  onChange={(e) => set(key, num(e.target.value) as never)}
                />
              </Field>
            )
          )}
        </div>
      </Group>

      <Group title="Your words" hint="This is what sells it. Write for someone moving in for a few months, not for a summer weekend.">
        <div className="grid gap-4">
          <Field label="Headline" id="o-headline">
            <input
              id="o-headline"
              className="field"
              value={d.headline ?? ""}
              onChange={(e) => set("headline", e.target.value)}
              placeholder="Two bedrooms above the harbour, five minutes from the beach"
            />
          </Field>
          <Field label="Short summary — shown on cards and in search results" id="o-summary">
            <textarea
              id="o-summary"
              className="field"
              rows={2}
              maxLength={260}
              value={d.summary ?? ""}
              onChange={(e) => set("summary", e.target.value)}
            />
            <p className="mt-1 text-[12px] text-[var(--muted)]">{(d.summary ?? "").length} / 260</p>
          </Field>
          <Field label="Full description — leave a blank line between paragraphs" id="o-desc">
            <textarea
              id="o-desc"
              className="field"
              rows={10}
              value={d.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
        </div>
      </Group>

      <Group title="Rates" hint="All figures in Canadian dollars, per the period shown.">
        <div className={grid}>
          <Field label="Monthly rate" id="o-monthly">
            <input
              id="o-monthly"
              type="number"
              min={0}
              inputMode="numeric"
              className="field"
              value={d.monthly_rate ?? ""}
              onChange={(e) => set("monthly_rate", num(e.target.value))}
              placeholder="2200"
            />
          </Field>
          <Field label="Security deposit" id="o-deposit">
            <input id="o-deposit" type="number" min={0} inputMode="numeric" className="field" value={d.security_deposit ?? ""} onChange={(e) => set("security_deposit", num(e.target.value))} />
          </Field>
          <Field label="Cleaning fee" id="o-clean">
            <input id="o-clean" type="number" min={0} inputMode="numeric" className="field" value={d.cleaning_fee ?? ""} onChange={(e) => set("cleaning_fee", num(e.target.value))} />
          </Field>
          <Field label="Minimum stay (nights)" id="o-min">
            <input id="o-min" type="number" min={1} inputMode="numeric" className="field" value={d.min_stay_nights ?? 30} onChange={(e) => set("min_stay_nights", num(e.target.value) ?? 30)} />
          </Field>
          <Field label="Available from" id="o-from">
            <input id="o-from" className="field" value={d.available_from ?? ""} onChange={(e) => set("available_from", e.target.value || null)} placeholder="September" />
          </Field>
          <Field label="Available to" id="o-to">
            <input id="o-to" className="field" value={d.available_to ?? ""} onChange={(e) => set("available_to", e.target.value || null)} placeholder="May" />
          </Field>
        </div>

        <div className="mt-5 rounded-[var(--r-md)] p-4" style={{ background: "var(--accent-soft)" }}>
          <p className="text-[14px] font-bold" style={{ color: "var(--accent-dark)" }}>
            Running an offer?
          </p>
          <p className="mt-1 mb-3 text-[13px]" style={{ color: "var(--accent-dark)" }}>
            Set a discounted rate and your normal price shows struck through, with the offer beneath
            it in red and the saving alongside. Leave blank for no offer.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Discounted monthly rate" id="o-disc">
              <input
                id="o-disc"
                type="number"
                min={0}
                inputMode="numeric"
                className={`field ${discountTooHigh ? "field-error" : ""}`}
                value={d.discount_monthly_rate ?? ""}
                onChange={(e) => set("discount_monthly_rate", num(e.target.value))}
                placeholder="1950"
              />
            </Field>
            <Field label="Offer label" id="o-discnote">
              <input
                id="o-discnote"
                className="field"
                value={d.discount_note ?? ""}
                onChange={(e) => set("discount_note", e.target.value || null)}
                placeholder="Winter special"
              />
            </Field>
          </div>
          {discountTooHigh ? (
            <p className="mt-2 text-[13px] font-semibold" style={{ color: "var(--danger)" }}>
              The offer has to be less than your ${d.monthly_rate} monthly rate.
            </p>
          ) : null}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Toggle id="o-util" label="Utilities included" checked={Boolean(d.utilities_included)} onChange={(v) => set("utilities_included", v)} />
          <Toggle id="o-wifi" label="Wi-Fi included" checked={Boolean(d.wifi_included)} onChange={(v) => set("wifi_included", v)} />
          <Toggle id="o-pets" label="Pets allowed" checked={Boolean(d.pets_allowed)} onChange={(v) => set("pets_allowed", v)} />
          <Toggle id="o-smoke" label="Smoking allowed" checked={Boolean(d.smoking_allowed)} onChange={(v) => set("smoking_allowed", v)} />
        </div>
      </Group>

      <Group title="Who it suits" hint="Pick any that apply — this puts your listing on those pages.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a) => (
            <Toggle
              key={a.slug}
              id={`o-aud-${a.slug}`}
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
              <h3 className="text-[13px] font-bold uppercase tracking-wide text-[var(--muted)] mb-2">{group}</h3>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {CATALOGUE.filter((a) => a.group === group).map((a) => (
                  <Toggle
                    key={a.slug}
                    id={`o-am-${a.slug}`}
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
          <Field label="Highlights" id="o-high">
            <textarea
              id="o-high"
              className="field"
              rows={5}
              value={((d.highlights as string[]) ?? []).join("\n")}
              onChange={(e) => set("highlights", linesToArray(e.target.value))}
              placeholder={"Five-minute walk to the beach\nWood stove, wood supplied"}
            />
          </Field>
          <Field label="House rules" id="o-rules">
            <textarea
              id="o-rules"
              className="field"
              rows={5}
              value={((d.house_rules as string[]) ?? []).join("\n")}
              onChange={(e) => set("house_rules", linesToArray(e.target.value))}
              placeholder={"No smoking\nQuiet after 10 pm"}
            />
          </Field>
        </div>
      </Group>

      {error ? (
        <p className="rounded-[var(--r-sm)] px-3 py-2 text-[14px]" style={{ background: "var(--danger-soft)", color: "var(--danger)" }} role="alert">
          {error}
        </p>
      ) : null}

      <div className="sticky bottom-0 -mx-6 border-t bg-[var(--surface)] px-6 py-3 flex items-center gap-3" style={{ borderColor: "var(--line)" }}>
        <button type="submit" className="btn btn-primary" disabled={busy} aria-busy={busy}>
          {busy ? "Saving…" : editing ? "Save changes" : "Save and add photos"}
        </button>
        {saved ? (
          <span className="flex items-center gap-2 text-[14px]" style={{ color: "var(--ok)" }} role="status">
            <Icon name="check" size={16} strokeWidth={2.4} />
            Saved
          </span>
        ) : null}
      </div>
    </form>
  );
}
