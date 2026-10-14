"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { submitQuoteRequest } from "@/lib/actions/quote";
import { Icon } from "@/components/icons";
import { SITE_EMAIL } from "@/lib/site";

const Turnstile = dynamic(() => import("@marsidev/react-turnstile").then((m) => m.Turnstile), { ssr: false });

const ORG_TYPES = ["Mall / shopping centre", "BIA / downtown association", "Municipality / parks & rec", "Property manager / REIT", "Hotel / restaurant / venue", "Professional installer", "Retail store / dealership", "Other business"];
const TIMELINES = ["Install in the next 4 weeks", "This season (Oct–Dec)", "Planning for next season", "Budgeting / RFP stage"];
const BUDGETS = ["Under $2,500", "$2,500 – $10,000", "$10,000 – $25,000", "$25,000 – $75,000", "$75,000+", "Not sure yet"];
const INTERESTS = ["C9 / roofline lighting", "Tree wraps & mini lights", "3D displays & photo-ops", "Pole-mount décor", "Overhead spans", "Wreaths, garland & bows", "Commercial trees", "Permanent LED lighting", "Install help / referrals"];
const PROVINCES = ["ON", "QC", "BC", "AB", "MB", "SK", "NS", "NB", "NL", "PE", "NT", "YT", "NU"];

interface Props {
  source: string;
  defaultOrgType?: string;
  defaultInterests?: string[];
  compact?: boolean;
}

export function QuoteForm({ source, defaultOrgType, defaultInterests = [], compact = false }: Props) {
  const [pending, start] = useTransition();
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [captchaFailed, setCaptchaFailed] = useState(false);
  const [interests, setInterests] = useState<string[]>(defaultInterests);
  const [showCaptcha, setShowCaptcha] = useState(false);
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

  function toggle(i: string) {
    setInterests((list) => (list.includes(i) ? list.filter((x) => x !== i) : [...list, i]));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError("");
    start(async () => {
      try {
        const res = await submitQuoteRequest({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          organization: String(fd.get("organization") ?? ""),
          org_type: String(fd.get("org_type") ?? ""),
          city: String(fd.get("city") ?? ""),
          province: String(fd.get("province") ?? ""),
          timeline: String(fd.get("timeline") ?? ""),
          budget: String(fd.get("budget") ?? ""),
          interests,
          message: String(fd.get("message") ?? ""),
          website: String(fd.get("website") ?? ""),
          turnstile_token: token || null,
          source
        });
        if (!res.ok) {
          setState("err");
          setError(res.error);
          return;
        }
        setState("ok");
        setTimeout(() => doneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
      } catch {
        setState("err");
        setError(`We couldn't reach the server. Please try again, or email ${SITE_EMAIL}.`);
      }
    });
  }

  if (state === "ok") {
    return (
      <div ref={doneRef} className="rounded-3xl border border-[var(--color-brand)]/20 bg-[var(--color-brand-soft)] p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-full bg-[var(--color-brand)] text-white">
          <Icon.check size={22} />
        </span>
        <h3 className="font-display mt-4 text-2xl text-[var(--color-brand-dark)]">Got it. We&rsquo;re on it.</h3>
        <p className="mt-2 text-[var(--color-text-soft)]">
          A real person will reply by email <strong>within one business day</strong> with line-item pricing, shipping and lead times. If it&rsquo;s urgent, reply to that email and we&rsquo;ll call you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} onFocus={() => setShowCaptcha(true)} className="card space-y-5 p-6 md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Organization / property" name="organization" required autoComplete="organization" placeholder="e.g. Downtown Guelph BIA" />
        <Field label="Email" name="email" type="email" required autoComplete="email" inputMode="email" />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        <label className="block">
          <span className="label">I&rsquo;m buying for a</span>
          <select name="org_type" defaultValue={defaultOrgType ?? ""} className="input">
            <option value="" disabled>Select…</option>
            {ORG_TYPES.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </label>
        <div className="grid grid-cols-[1fr_90px] gap-3">
          <Field label="City / town" name="city" autoComplete="address-level2" />
          <label className="block">
            <span className="label">Prov.</span>
            <select name="province" defaultValue="ON" className="input">
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>
        </div>
        {!compact && (
          <>
            <label className="block">
              <span className="label">Timeline</span>
              <select name="timeline" defaultValue="" className="input">
                <option value="" disabled>Select…</option>
                {TIMELINES.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="label">Approximate budget (optional)</span>
              <select name="budget" defaultValue="" className="input">
                <option value="">Prefer not to say</option>
                {BUDGETS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
          </>
        )}
      </div>

      <div>
        <p className="label">What are you looking at? (pick any)</p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <button key={i} type="button" onClick={() => toggle(i)} aria-pressed={interests.includes(i)} className={`chip min-h-[38px] transition ${interests.includes(i) ? "!border-[var(--color-brand)] !bg-[var(--color-brand-soft)] !text-[var(--color-brand)]" : ""}`}>
              {i}
            </button>
          ))}
        </div>
      </div>

      <label className="block">
        <span className="label">Project details</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Pole count, tree sizes, roofline feet, ceiling height, product names or SKUs, install dates — whatever you have. We'll fill the gaps."
          className="input"
        />
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

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

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className="btn-accent min-w-[220px] text-base disabled:opacity-60">
          {pending ? "Sending…" : "Send my quote request"} {!pending && <Icon.arrow size={18} />}
        </button>
        <p className="text-xs text-[var(--color-muted)]">Reply within one business day. No payment, no obligation.</p>
      </div>
      {state === "err" && <p className="rounded-xl bg-[var(--color-berry-soft)] px-4 py-3 text-sm text-[var(--color-berry-dark)]">{error}</p>}
    </form>
  );
}

function Field({ label, name, required, type = "text", autoComplete, inputMode, placeholder }: { label: string; name: string; required?: boolean; type?: string; autoComplete?: string; inputMode?: "tel" | "text" | "email" | "url" | "numeric"; placeholder?: string }) {
  return (
    <label className="block">
      <span className="label">
        {label}
        {required && " *"}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} inputMode={inputMode} placeholder={placeholder} className="input" />
    </label>
  );
}
