"use client";

import { useRef, useState, useTransition } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitApplication } from "@/lib/actions/application";
import { BRAND } from "@/lib/utils";

export function InstallerApplicationForm({ tierSlug }: { tierSlug: "installer" | "municipality" }) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const el = e.currentTarget;
    setState("idle");
    startTransition(async () => {
      try {
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
          turnstile_token: token
        });
        if (!res.ok) {
          setState("err");
          setMessage(res.error);
          return;
        }
        setState("ok");
        el.reset();
        setTimeout(() => successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
      } catch {
        setState("err");
        setMessage(`We could not reach the server. Try again, or email ${BRAND.email}.`);
      }
    });
  }

  if (state === "ok") {
    return (
      <div ref={successRef} role="status" className="scroll-mt-28 border border-[var(--color-green)] border-l-[3px] bg-[var(--color-green-soft)] p-5 md:p-6">
        <h3 className="font-display text-[1.3rem] !text-[var(--color-green)]">Application received. We reply within one business day.</h3>
        <p className="mt-2 text-[0.95rem] text-[var(--color-text-soft)]">
          We read every application ourselves. The reply will confirm your tier and set up your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 border border-[var(--color-border)] bg-white p-5 md:p-6">
      <Field label="Company name" name="company_name" required autoComplete="organization" />
      <Field label="Contact name" name="contact_name" required autoComplete="name" />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
      </div>
      {tierSlug === "installer" ? (
        <>
          <Field
            label="Business type"
            name="business_type"
            element="select"
            options={[
              "Professional Christmas Light Installer",
              "Event & Wedding Lighting Company",
              "Landscaping & Property Maintenance",
              "Other"
            ]}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Years of experience"
              name="years_experience"
              element="select"
              options={["0-1 years", "2-5 years", "6-10 years", "10+ years"]}
            />
            <Field
              label="Estimated annual volume"
              name="annual_volume"
              element="select"
              options={["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"]}
            />
          </div>
        </>
      ) : (
        <Field
          label="Organization type"
          name="business_type"
          element="select"
          options={["City / Town", "BIA / Downtown Association", "Parks & Recreation", "School Board", "Other public sector"]}
        />
      )}
      <Field label="Website (optional)" name="website" type="url" placeholder="https://" autoComplete="url" inputMode="url" />
      <Field label="Anything else we should know (optional)" name="additional_info" element="textarea" rows={4} />
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
      />
      {state === "err" && (
        <p role="alert" className="border-l-[3px] border-[var(--color-red)] bg-[var(--color-red-soft)] px-4 py-3 text-sm text-[var(--color-red)]">{message}</p>
      )}
      <button type="submit" disabled={pending} aria-busy={pending} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? "Processing…" : "Send application"}
      </button>
      <p className="text-sm text-[var(--color-muted)]">We reply within one business day, Monday to Friday.</p>
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
  const id = `ia-${name}`;
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      {element === "input" && (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className="input"
        />
      )}
      {element === "textarea" && <textarea id={id} name={name} rows={rows ?? 3} className="input" />}
      {element === "select" && (
        <select id={id} name={name} className="input" defaultValue="">
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
    </div>
  );
}
