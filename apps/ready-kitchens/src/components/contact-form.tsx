"use client";

import { useRef, useState, useTransition } from "react";
import { submitContact } from "@/lib/actions/contact";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState<{ id: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ name: string; url: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setPreviews(
      files.slice(0, 5).map((f) => ({
        name: f.name,
        url: URL.createObjectURL(f),
      })),
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const res = await submitContact(formData);
        if (res.ok) {
          setDone({ id: res.id });
          previews.forEach((p) => URL.revokeObjectURL(p.url));
          setPreviews([]);
          formRef.current?.reset();
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          setError(res.error);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
      }
    });
  }

  if (done) {
    return (
      <div className="rounded-lg border border-[var(--color-sage-soft)] bg-[var(--color-sage-soft)]/60 p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--color-sage)] text-white">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="mt-5 font-display text-3xl">Message received.</h2>
        <p className="mt-2 text-[var(--color-ink-soft)]">
          Thanks — we&rsquo;ll reply within one business day.
        </p>
        <p className="mt-3 font-mono text-[10px] text-[var(--color-ink-soft)]">Ref: {done.id}</p>
        <button
          type="button"
          onClick={() => setDone(null)}
          className="btn-ghost mt-6"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="rounded-lg border border-[var(--color-line)] bg-white p-6 md:p-8">
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" />
        <Field label="Subject" name="subject" />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium" htmlFor="message">
          Your message <span className="text-[var(--color-accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us about your kitchen — measurements, photos of the space, which kit you're considering, any questions about extras from forevercabinets.ca."
          className="mt-1 w-full rounded border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">Attach photos (optional)</label>
        <p className="mt-1 text-xs text-[var(--color-ink-soft)]">JPEG / PNG / WebP / HEIC up to 10MB each, max 5 images.</p>
        <input
          ref={fileRef}
          type="file"
          name="attachments"
          accept="image/jpeg,image/png,image/webp,image/gif,image/heic"
          multiple
          onChange={onFileChange}
          className="mt-2 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-[var(--color-ink)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:cursor-pointer"
        />
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {previews.map((p) => (
              <figure key={p.url} className="relative overflow-hidden rounded border border-[var(--color-line)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.name} className="aspect-square w-full object-cover" />
                <figcaption className="truncate bg-white/90 px-1 py-0.5 text-[10px]">{p.name}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending…" : "Send Message"}
      </button>
      <p className="mt-3 text-center text-[11px] text-[var(--color-ink-soft)]">
        🔒 Stored securely · we never share your details
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>
        {label}{required && <span className="text-[var(--color-accent)]"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="mt-1 w-full rounded border border-[var(--color-line)] bg-white px-3 py-2.5 text-sm focus:border-[var(--color-accent)] focus:outline-none"
      />
    </div>
  );
}
