"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/Icon";
import { slugify } from "@/lib/format";

interface Listing {
  platform: string;
  sourceUrl: string;
  title: string;
  description: string;
  propertyType: string;
  city: string;
  region: string;
  bedrooms: number | null;
  bathrooms: number | null;
  sleeps: number | null;
  beds: number | null;
  amenities: string[];
  rawAmenities: string[];
  photos: string[];
}

/** Photos are downloaded a handful at a time so no single call runs long. */
const BATCH = 5;

export function ImportPanel({ propertyId }: { propertyId?: string }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [listing, setListing] = useState<Listing | null>(null);
  const [name, setName] = useState("");
  const [phase, setPhase] = useState<"idle" | "scraping" | "preview" | "saving">("idle");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function scrape(e: FormEvent) {
    e.preventDefault();
    if (phase === "scraping") return;
    setError(null);
    setListing(null);
    setPhase("scraping");
    setStatus("Reading the listing… this can take up to a minute.");

    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = (await res.json().catch(() => ({}))) as { listing?: Listing; error?: string };
      if (!res.ok || !data.listing) {
        setError(data.error ?? "Could not read that listing.");
        setPhase("idle");
        setStatus(null);
        return;
      }
      setListing(data.listing);
      setName(data.listing.title || "");
      setPhase("preview");
      setStatus(null);
    } catch {
      setError("Could not reach the server.");
      setPhase("idle");
      setStatus(null);
    }
  }

  /** Push photo URLs to the server in batches, reporting progress as we go. */
  async function importPhotos(targetId: string, urls: string[]) {
    let done = 0;
    let failed = 0;
    for (let i = 0; i < urls.length; i += BATCH) {
      const slice = urls.slice(i, i + BATCH);
      setStatus(`Downloading photographs… ${done}/${urls.length}`);
      try {
        const res = await fetch(`/api/admin/properties/${targetId}/photos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: slice })
        });
        const data = (await res.json().catch(() => ({}))) as { stored?: number; failed?: unknown[] };
        done += data.stored ?? 0;
        failed += data.failed?.length ?? 0;
      } catch {
        failed += slice.length;
      }
    }
    return { done, failed };
  }

  async function createFromListing() {
    if (!listing) return;
    setPhase("saving");
    setError(null);

    const trimmed = name.trim() || listing.title || "Untitled listing";

    try {
      const res = await fetch("/api/admin/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmed,
          slug: slugify(trimmed),
          city: listing.city || "Port Stanley",
          region: listing.region || "ON",
          property_type: listing.propertyType || "Cottage",
          summary: listing.description.slice(0, 220),
          description: listing.description,
          bedrooms: listing.bedrooms ?? 1,
          bathrooms: listing.bathrooms ?? 1,
          sleeps: listing.sleeps ?? 2,
          beds: listing.beds,
          amenities: listing.amenities,
          source_url: listing.sourceUrl,
          status: "draft"
        })
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok || !data.id) {
        setError(data.error ?? "Could not create the listing.");
        setPhase("preview");
        return;
      }

      const { done, failed } = await importPhotos(data.id, listing.photos);
      setStatus(`Imported ${done} photograph${done === 1 ? "" : "s"}${failed ? `, ${failed} failed` : ""}.`);
      router.push(`/admin/properties/${data.id}`);
      router.refresh();
    } catch {
      setError("Could not reach the server.");
      setPhase("preview");
    }
  }

  /** Attach the scraped photos to an existing property instead of a new one. */
  async function addPhotosToExisting() {
    if (!listing || !propertyId) return;
    setPhase("saving");
    const { done, failed } = await importPhotos(propertyId, listing.photos);
    setStatus(`Imported ${done} photograph${done === 1 ? "" : "s"}${failed ? `, ${failed} failed` : ""}.`);
    setPhase("preview");
    router.refresh();
  }

  const busy = phase === "scraping" || phase === "saving";

  return (
    <div className="card card-pad">
      <div className="flex items-start gap-3">
        <span
          className="grid place-items-center rounded-full shrink-0"
          style={{ width: 40, height: 40, background: "var(--lake-soft)", color: "var(--lake)" }}
          aria-hidden="true"
        >
          <Icon name="link" size={19} strokeWidth={2} />
        </span>
        <div>
          <h2 className="text-[18px] font-bold">Import from VRBO or Airbnb</h2>
          <p className="mt-1 text-[14px] text-[var(--muted)]">
            Paste a listing URL. We read the property details and pull the photographs across.
          </p>
        </div>
      </div>

      <form onSubmit={scrape} className="mt-5 flex flex-col sm:flex-row gap-3">
        <label className="sr-only" htmlFor="import-url">
          Listing URL
        </label>
        <input
          id="import-url"
          type="url"
          inputMode="url"
          className="field"
          placeholder="https://www.airbnb.ca/rooms/… or https://www.vrbo.com/…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-dark shrink-0" disabled={busy || !url}>
          {phase === "scraping" ? "Reading…" : "Read listing"}
        </button>
      </form>

      {status ? (
        <p className="mt-3 text-[14px] text-[var(--muted)]" role="status">
          {status}
        </p>
      ) : null}

      {error ? (
        <p
          className="mt-3 rounded-[var(--r-sm)] px-3 py-2 text-[14px]"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {listing ? (
        <div className="mt-6 rounded-[var(--r-md)] border p-5" style={{ borderColor: "var(--line)" }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="pill pill-lake">{listing.platform}</span>
            <span className="text-[13px] text-[var(--muted)]">
              {listing.photos.length} photograph{listing.photos.length === 1 ? "" : "s"} found
            </span>
          </div>

          <label className="field-label" htmlFor="import-name">
            Listing name on our site
          </label>
          <input
            id="import-name"
            className="field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="The Escape"
          />

          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[14px]">
            {[
              ["Bedrooms", listing.bedrooms],
              ["Bathrooms", listing.bathrooms],
              ["Sleeps", listing.sleeps],
              ["Type", listing.propertyType]
            ].map(([k, v]) => (
              <div key={String(k)} className="rounded-[var(--r-sm)] bg-[var(--surface-2)] p-3">
                <dt className="text-[12px] text-[var(--muted)]">{String(k)}</dt>
                <dd className="font-semibold">{v === null || v === undefined || v === "" ? "—" : String(v)}</dd>
              </div>
            ))}
          </dl>

          {listing.description ? (
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--muted)] clamp-4">
              {listing.description}
            </p>
          ) : (
            <p
              className="mt-4 rounded-[var(--r-sm)] px-3 py-2 text-[13px]"
              style={{ background: "var(--warn-soft)", color: "var(--warn)" }}
            >
              No description came across — both platforms hide theirs behind a “show more” control.
              Write the body copy on the next screen; off-season copy should read differently to a
              summer listing anyway.
            </p>
          )}

          {listing.amenities.length ? (
            <p className="mt-3 text-[13px] text-[var(--muted)]">
              Matched amenities: {listing.amenities.join(", ")}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            {propertyId ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={addPhotosToExisting}
                disabled={busy || !listing.photos.length}
              >
                {phase === "saving" ? "Importing…" : `Add ${listing.photos.length} photos to this listing`}
              </button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={createFromListing} disabled={busy}>
                {phase === "saving" ? "Creating…" : "Create draft listing"}
              </button>
            )}
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setListing(null);
                setStatus(null);
              }}
              disabled={busy}
            >
              Discard
            </button>
          </div>

          <p className="mt-4 text-[13px] text-[var(--muted)]">
            Both platforms only render their first few photographs into the page — a typical import
            brings across five to twenty. Drag and drop the rest onto the listing afterwards.
          </p>
        </div>
      ) : null}
    </div>
  );
}
