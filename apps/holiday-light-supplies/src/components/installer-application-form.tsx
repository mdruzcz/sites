"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { submitApplication } from "@/lib/actions/application";
import { Icon } from "@/components/icons";
import { SITE_EMAIL } from "@/lib/site";

const Turnstile = dynamic(() => import("@marsidev/react-turnstile").then((m) => m.Turnstile), { ssr: false });

export function InstallerApplicationForm({ tierSlug }: { tierSlug: "installer" | "municipality" }) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const doneRef = useRef<HTMLDivElement>(null);

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
    const form = new FormData(e.currentTarget);
    const el = e.currentTarget;
    setState("idle");
    startTransition(async () => {
      const res = await submitApplication({
        tierSlug,
        company_name: String(form.get("company_name") ?? ""),
        contact_name: String(form.get("contact_name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        business_type: String(form.get("business_type") ?? "") || null,
        years_experience: String(form.get("years_experience") ?? "") || null,
        annual_volume: String(form.get("annual_volume") ?? "") || null,
        website: String(form.get("website") ?? "") || null,
        additional_info: String(form.get("additional_info") ?? "") || null,
        turnstile_token: token || null
      });
      if (!res.ok) {
        setState("err");
        setMessage(res.error);
        return;
      }
      setState("ok");
      el.reset();
      setTimeout(() => doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    });
  }

  if (state === "ok") {
    return (
      <div ref={doneRef} className="rounded-3xl border border-[var(--color-brand)]/20 bg-[var(--color-brand-soft)] p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--color-brand)] text-white">
          <Icon.check size={22} />
        </span>
        <h3 className="font-display mt-4 text-2xl text-[var(--color-brand-dark)]">Application received</h3>
        <p className="mt-2 text-[var(--color-text-soft)]">
          Thanks. We review it and email you <strong>within one business day</strong> to confirm your {tierSlug === "installer" ? "installer tier" : "account terms"}.
        </p>
      </div>
    );
  }

  const municipal = tierSlug === "municipality";

  return (
    <form onSubmit={onSubmit} onFocus={() => setShowCaptcha(true)} className="card space-y-4 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={municipal ? "Organization" : "Company name"} name="company_name" required autoComplete="organization" />
        <Field label="Contact name" name="contact_name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" inputMode="email" />
        <Field label="Phone" name="phone" required autoComplete="tel" inputMode="tel" />
      </div>
      {municipal ? (
        <Field label="Organization type" name="business_type" element="select" options={["City / Town / Township", "BIA / Downtown Association", "Parks & Recreation", "School Board", "Conservation Authority", "Other public sector"]} />
      ) : (
        <>
          <Field label="Business type" name="business_type" element="select" options={["Professional Christmas Light Installer", "Event & Wedding Lighting Company", "Landscaping & Property Maintenance", "Electrical Contractor", "Other"]} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Years installing" name="years_experience" element="select" options={["0–1 years", "2–5 years", "6–10 years", "10+ years"]} />
            <Field label="Estimated annual lighting spend" name="annual_volume" element="select" options={["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"]} />
          </div>
        </>
      )}
      <Field label="Website (optional)" name="website" type="url" placeholder="https://" />
      <Field
        label={municipal ? "What are you planning? (sites, poles, displays, tender dates)" : "What do you install and where? (optional)"}
        name="additional_info"
        element="textarea"
        rows={4}
      />

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

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button type="submit" disabled={pending} className="btn-accent min-w-[200px] disabled:opacity-60">
          {pending ? "Submitting…" : municipal ? "Register organization" : "Apply for installer pricing"} {!pending && <Icon.arrow size={16} />}
        </button>
        <p className="text-xs text-[var(--color-muted)]">Reply within one business day.</p>
      </div>
      {state === "err" && <p className="rounded-xl bg-[var(--color-berry-soft)] px-4 py-3 text-sm text-[var(--color-berry-dark)]">{message}</p>}
    </form>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  element = "input",
  options,
  rows,
  placeholder,
  autoComplete,
  inputMode
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  element?: "input" | "textarea" | "select";
  options?: string[];
  rows?: number;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "tel" | "text" | "email" | "url" | "numeric";
}) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && " *"}
      </span>
      {element === "input" && <input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} inputMode={inputMode} className="input" />}
      {element === "textarea" && <textarea name={name} rows={rows ?? 3} className="input" />}
      {element === "select" && (
        <select name={name} className="input" defaultValue="">
          <option value="" disabled>
            Select…
          </option>
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}
