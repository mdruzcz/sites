"use client";

import { useState, useRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { trackFormSubmission } from "@/lib/gtm";
import { site } from "@/lib/site";

const serviceOptions = [
  "Concrete Driveway Installation",
  "Concrete Patios",
  "Concrete Retaining Walls",
  "Stamped Concrete Driveway",
  "Concrete Removal",
  "Concrete Shed Pads",
  "Other / Not Sure",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<FormState>("idle");
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return;
    if (!turnstileToken) { alert("Please complete the security check."); return; }
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          phone: data.get("phone"),
          email: data.get("email"),
          services: data.getAll("services"),
          message: data.get("message"),
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setState("success");
      trackFormSubmission("contact_form", (data.getAll("services") as string[]).join(", "));
      setTimeout(() => { successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); }, 100);
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div ref={successRef} className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-green-500" aria-hidden="true">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Quote Request Received!</h3>
        <p className="text-green-700">Thank you for reaching out. We&apos;ll get back to you within {site.responseTime} to discuss your project.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className={compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
          <input id="firstName" name="firstName" type="text" required autoComplete="given-name" placeholder="John" className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">Last Name <span className="text-red-500">*</span></label>
          <input id="lastName" name="lastName" type="text" required autoComplete="family-name" placeholder="Smith" className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent" />
        </div>
      </div>
      <div className={compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
          <input id="phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" placeholder="519-XXX-XXXX" className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="john@example.com" className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent" />
        </div>
      </div>
      <div>
        <p className="block text-sm font-medium text-slate-700 mb-2">Services Needed</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {serviceOptions.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" name="services" value={s} className="rounded border-slate-300 text-[#F7931E] focus:ring-[#F7931E]" />
              {s}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Project Details</label>
        <textarea id="message" name="message" rows={compact ? 3 : 4} placeholder="Tell us about your project — size, timeline, any specific requirements..." className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F7931E] focus:border-transparent resize-none" />
      </div>
      <div>
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
          onSuccess={setTurnstileToken}
          options={{ theme: "light" }}
        />
      </div>
      {state === "error" && (
        <p className="text-red-600 text-sm">Something went wrong. Please try again or call us at <a href={site.phoneHref} className="underline">{site.phone}</a>.</p>
      )}
      <button type="submit" disabled={state === "submitting"} className="btn btn-primary w-full justify-center text-base" style={{ minHeight: 44 }}>
        {state === "submitting" ? (
          <><svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</>
        ) : "Get My Free Quote"}
      </button>
    </form>
  );
}
