"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

/* --- Types --- */

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
};

const MAX_MESSAGE_LENGTH = 600;
const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

/* --- Component --- */

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [dragActive, setDragActive] = useState(false);
  const [loadedAt] = useState(() => Date.now());
  const [token, setToken] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /* scroll to success message after submission */
  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  /* --- Field change handler --- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /* --- Photo handling --- */
  const addPhotos = useCallback(
    (files: FileList | File[]) => {
      const incoming = Array.from(files);
      const valid: File[] = [];
      for (const file of incoming) {
        if (!ACCEPTED_TYPES.includes(file.type)) {
          setErrorMessage(
            `"${file.name}" is not an accepted image type. Please use JPG, PNG, WEBP, or HEIC.`,
          );
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          setErrorMessage(
            `"${file.name}" exceeds the 10 MB file size limit.`,
          );
          return;
        }
        valid.push(file);
      }
      setPhotos((prev) => {
        const combined = [...prev, ...valid];
        if (combined.length > MAX_PHOTOS) {
          setErrorMessage(`You can upload a maximum of ${MAX_PHOTOS} photos.`);
          return prev;
        }
        setErrorMessage("");
        return combined;
      });
    },
    [],
  );

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  /* --- Drag and drop --- */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addPhotos(e.dataTransfer.files);
    }
  };

  /* --- Client-side validation --- */
  const validate = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    if (!form.first_name.trim()) errors.first_name = "First name is required.";
    if (!form.last_name.trim()) errors.last_name = "Last name is required.";

    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(form.email)
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) errors.message = "Message is required.";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* --- Submit --- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;
    if (!token) {
      setStatus("error");
      setErrorMessage("Please complete the captcha.");
      return;
    }

    setStatus("submitting");

    try {
      const body = new FormData();
      body.append("first_name", form.first_name.trim());
      body.append("last_name", form.last_name.trim());
      body.append("email", form.email.trim());
      body.append("phone", form.phone.trim());
      body.append("message", form.message.trim());
      body.append("_loaded", String(loadedAt));
      body.append("token", token);

      // Honeypot
      const honeypotInput = formRef.current?.querySelector<HTMLInputElement>(
        'input[name="website"]',
      );
      if (honeypotInput) {
        body.append("website", honeypotInput.value);
      }

      // Photos
      for (const photo of photos) {
        body.append("photos", photo);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("success");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
      });
      setPhotos([]);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Unable to send your request. Please check your connection and try again.",
      );
    }
  };

  /* --- Render --- */

  if (status === "success") {
    return (
      <div
        ref={successRef}
        className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
        role="alert"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-display text-xl font-bold text-green-800">
          Thank you!
        </h3>
        <p className="text-green-700">
          Your quote request has been received. We&apos;ll get back to you
          within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg"
    >
      <h2 className="mb-6 font-display text-2xl font-bold text-navy">
        Request a Free Quote
      </h2>

      {/* Global error */}
      {status === "error" && errorMessage && (
        <div
          className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      {/* Honeypot - hidden from real users */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* First Name / Last Name */}
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            required
            autoComplete="given-name"
            placeholder="John"
            className={`block w-full rounded-lg border px-4 py-3 text-navy shadow-sm transition-colors placeholder:text-slate-muted/50 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 ${
              fieldErrors.first_name
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          />
          {fieldErrors.first_name && (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {fieldErrors.first_name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="mb-1.5 block text-sm font-medium text-navy"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            required
            autoComplete="family-name"
            placeholder="Smith"
            className={`block w-full rounded-lg border px-4 py-3 text-navy shadow-sm transition-colors placeholder:text-slate-muted/50 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 ${
              fieldErrors.last_name
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
            }`}
          />
          {fieldErrors.last_name && (
            <p className="mt-1 text-xs text-red-600" role="alert">
              {fieldErrors.last_name}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="john@example.com"
          className={`block w-full rounded-lg border px-4 py-3 text-navy shadow-sm transition-colors placeholder:text-slate-muted/50 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 ${
            fieldErrors.email
              ? "border-red-300 bg-red-50"
              : "border-gray-200 bg-white"
          }`}
        />
        {fieldErrors.email && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-medium text-navy"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
          placeholder="(519) 555-0123"
          className="block w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-navy shadow-sm transition-colors placeholder:text-slate-muted/50 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20"
        />
      </div>

      {/* Message */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="message" className="text-sm font-medium text-navy">
            Message / Description <span className="text-red-500">*</span>
          </label>
          <span
            className={`text-xs ${
              form.message.length >= MAX_MESSAGE_LENGTH
                ? "font-semibold text-red-500"
                : "text-slate-muted"
            }`}
            aria-live="polite"
          >
            {form.message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="Let us know your location, thickness, width, and length."
          className={`block w-full resize-none rounded-lg border px-4 py-3 text-navy shadow-sm transition-colors placeholder:text-slate-muted/50 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/20 ${
            fieldErrors.message
              ? "border-red-300 bg-red-50"
              : "border-gray-200 bg-white"
          }`}
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-red-600" role="alert">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Photo Upload */}
      <div className="mb-6">
        <label className="mb-1.5 block text-sm font-medium text-navy">
          Photos{" "}
          <span className="font-normal text-slate-muted">
            (optional, up to {MAX_PHOTOS} images, 10 MB each)
          </span>
        </label>

        {/* Drop zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Upload photos by clicking or dragging files here"
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 transition-colors ${
            dragActive
              ? "border-orange bg-orange-pale"
              : "border-gray-200 bg-gray-50 hover:border-orange/50 hover:bg-orange-pale/50"
          }`}
        >
          <svg
            className="mb-2 h-8 w-8 text-slate-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
          <p className="text-sm text-slate-muted">
            <span className="font-semibold text-orange">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="mt-1 text-xs text-slate-muted">
            JPG, PNG, WEBP, or HEIC
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.heic,.heif"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addPhotos(e.target.files);
            e.target.value = "";
          }}
        />

        {/* Photo previews */}
        {photos.length > 0 && (
          <ul className="mt-3 space-y-2">
            {photos.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <svg
                    className="h-5 w-5 shrink-0 text-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                  <span className="truncate text-sm text-navy">
                    {file.name}
                  </span>
                  <span className="shrink-0 text-xs text-slate-muted">
                    ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  aria-label={`Remove ${file.name}`}
                  className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-muted transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* File-level error (too many, wrong type, too large) */}
        {errorMessage && status !== "error" && (
          <p className="mt-2 text-xs text-red-600" role="alert">
            {errorMessage}
          </p>
        )}
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
        onSuccess={setToken}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting" || !token}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-orange px-8 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-orange-dark focus:outline-none focus:ring-2 focus:ring-orange/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <svg
              className="mr-2 h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          "Send Request"
        )}
      </button>

      <p className="mt-4 text-center text-xs text-slate-muted">
        We typically respond within 24 hours on business days.
      </p>
    </form>
  );
}
