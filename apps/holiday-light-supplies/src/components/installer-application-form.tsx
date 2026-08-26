"use client";

import { useState, useTransition } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { submitApplication } from "@/lib/actions/application";

export function InstallerApplicationForm({ tierSlug }: { tierSlug: "installer" | "municipality" }) {
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [message, setMessage] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      setState("err");
      setMessage("Please complete the captcha.");
      return;
    }
    const form = new FormData(e.currentTarget);
    setState("idle");
    startTransition(async () => {
      try {
        await submitApplication({
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
        setState("ok");
        (e.target as HTMLFormElement).reset();
      } catch (err) {
        setState("err");
        setMessage((err as Error).message);
      }
    });
  }

  if (state === "ok") {
    return (
      <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="text-lg font-semibold text-emerald-800">Application received</h3>
        <p className="mt-1 text-sm text-emerald-900">
          Thanks! We&rsquo;ll review your application and email you within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-5">
      <Field label="Company name" name="company_name" required />
      <Field label="Contact name" name="contact_name" required />
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" required autoComplete="tel" inputMode="tel" />
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
          <div className="grid gap-3 md:grid-cols-2">
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
      <Field label="Website (optional)" name="website" type="url" placeholder="https://" />
      <Field label="Additional information" name="additional_info" element="textarea" rows={4} />
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
      />
      <button type="submit" disabled={pending || !token} className="btn-primary mt-2 disabled:opacity-50">
        {pending ? "Submitting…" : "Submit application"}
      </button>
      {state === "err" && <p className="text-sm text-rose-700">{message}</p>}
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
  const className = "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm";
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}{required && " *"}</span>
      {element === "input" && (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          className={className}
        />
      )}
      {element === "textarea" && <textarea name={name} rows={rows ?? 3} className={className} />}
      {element === "select" && (
        <select name={name} className={className} defaultValue="">
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
