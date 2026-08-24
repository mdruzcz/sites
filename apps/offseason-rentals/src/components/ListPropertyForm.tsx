"use client";

import { useRef, useState, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { site } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { trackConversion, GTM_EVENTS } from "@/lib/gtm";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ListPropertyForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setError(null);
    setState("sending");

    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/list-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, turnstileToken: token })
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please call us instead.");
        setState("idle");
        return;
      }
      trackConversion(GTM_EVENTS.listing, { city: String(body.city ?? "") });
      setState("sent");
      requestAnimationFrame(() =>
        successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      );
    } catch {
      setError("We could not reach the server. Please call us instead.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div
        ref={successRef}
        className="card card-pad text-center"
        style={{ borderColor: "var(--ok)", background: "var(--ok-soft)" }}
        role="status"
        aria-live="polite"
      >
        <span
          className="mx-auto grid place-items-center rounded-full"
          style={{ width: 48, height: 48, background: "var(--ok)", color: "#fff" }}
        >
          <Icon name="check" size={24} strokeWidth={2.4} />
        </span>
        <h3 className="mt-4 text-[18px] font-bold">Got it — thank you</h3>
        <p className="mt-2 text-[15px] text-[var(--ink-soft)]">
          We will review the property and come back within {site.responseTime} with what we think the
          off season is worth on it. If you sent a VRBO or Airbnb link, we will pull your photographs
          and details across so there is nothing for you to re-upload.
        </p>
        <p className="mt-4 text-[14px] text-[var(--muted)]">
          Questions in the meantime?{" "}
          <a href={site.phoneHref} className="font-semibold text-[var(--ink)] underline">
            Call {site.phone}
          </a>
        </p>
      </div>
    );
  }

  const busy = state === "sending";

  return (
    <form onSubmit={onSubmit} noValidate>
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="lp-website">Website</label>
        <input id="lp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="text-[15px] font-bold mb-2 sm:col-span-2">About you</legend>

        <div>
          <label className="field-label" htmlFor="lp-name">
            Your name <span className="text-[var(--accent)]">*</span>
          </label>
          <input id="lp-name" name="name" required autoComplete="name" className="field" placeholder="Dana Whitfield" />
        </div>

        <div>
          <label className="field-label" htmlFor="lp-email">
            Email <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="lp-email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            className="field"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="lp-phone">
            Phone <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="lp-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className="field"
            placeholder="519-555-0134"
          />
        </div>
      </fieldset>

      <div className="my-7 rule" />

      <fieldset className="grid gap-4 sm:grid-cols-2">
        <legend className="text-[15px] font-bold mb-2 sm:col-span-2">About the property</legend>

        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="lp-address">
            Address <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="lp-address"
            name="propertyAddress"
            required
            autoComplete="street-address"
            className="field"
            placeholder="4488 East Road"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="lp-city">
            Town or city <span className="text-[var(--accent)]">*</span>
          </label>
          <input
            id="lp-city"
            name="city"
            required
            className="field"
            defaultValue="Port Stanley"
            autoComplete="address-level2"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="lp-type">
            Property type
          </label>
          <select id="lp-type" name="propertyType" className="field" defaultValue="Cottage">
            <option>Cottage</option>
            <option>House</option>
            <option>Duplex unit</option>
            <option>Apartment or suite</option>
            <option>Bunkie or studio</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="lp-beds">
            Bedrooms
          </label>
          <input id="lp-beds" name="bedrooms" type="number" min={0} max={12} inputMode="numeric" className="field" placeholder="3" />
        </div>

        <div>
          <label className="field-label" htmlFor="lp-baths">
            Bathrooms
          </label>
          <input id="lp-baths" name="bathrooms" type="number" min={0} max={12} step="0.5" inputMode="decimal" className="field" placeholder="2" />
        </div>

        <div>
          <label className="field-label" htmlFor="lp-months">
            Months you would release
          </label>
          <select id="lp-months" name="monthsAvailable" className="field" defaultValue="">
            <option value="">Select…</option>
            <option>The full off season, September to May</option>
            <option>Winter only, November to March</option>
            <option>Shoulder season only</option>
            <option>Flexible — depends on the tenant</option>
          </select>
        </div>

        <div>
          <label className="field-label" htmlFor="lp-rate">
            Monthly rate you have in mind
          </label>
          <input id="lp-rate" name="askingRate" className="field" placeholder="$2,200 — or ask us what it is worth" />
        </div>
      </fieldset>

      <div className="my-7 rule" />

      {/* The high-value field. An existing listing URL means we can build the
          page from their own photographs instead of asking for an upload. */}
      <div
        className="rounded-[var(--r-md)] p-5"
        style={{ background: "var(--lake-soft)", border: "1px solid rgba(14,90,99,0.18)" }}
      >
        <label className="field-label flex items-center gap-2" htmlFor="lp-listing">
          <Icon name="link" size={16} strokeWidth={2} />
          Already listed on VRBO or Airbnb? Paste the link
        </label>
        <input
          id="lp-listing"
          name="listingUrl"
          type="url"
          inputMode="url"
          className="field"
          placeholder="https://www.airbnb.ca/rooms/… or https://www.vrbo.com/…"
        />
        <p className="mt-2 text-[13px]" style={{ color: "var(--lake)" }}>
          We pull your photographs and property details straight from the listing — you do not have to
          re-photograph or re-type anything.
        </p>
      </div>

      <div className="mt-5">
        <label className="field-label" htmlFor="lp-message">
          Anything else
        </label>
        <textarea
          id="lp-message"
          name="message"
          className="field"
          rows={4}
          placeholder="Furnished or not, pets, parking, who looks after it in the winter…"
        />
      </div>

      {SITE_KEY ? (
        <div className="mt-4">
          <Turnstile siteKey={SITE_KEY} onSuccess={setToken} options={{ theme: "light", size: "flexible" }} />
        </div>
      ) : null}

      {error ? (
        <p
          className="mt-4 rounded-[var(--r-sm)] px-3 py-2 text-[14px]"
          style={{ background: "var(--danger-soft)", color: "var(--danger)" }}
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full mt-5" disabled={busy} aria-busy={busy}>
        {busy ? (
          <>
            <span
              className="inline-block rounded-full border-2 border-white/40 border-t-white animate-spin"
              style={{ width: 16, height: 16 }}
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          "Send my property"
        )}
      </button>

      <p className="mt-3 text-center text-[13px] text-[var(--muted)]">
        Nothing to pay up front. We reply within {site.responseTime}.
      </p>
    </form>
  );
}
