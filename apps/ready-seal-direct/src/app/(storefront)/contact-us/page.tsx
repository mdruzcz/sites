import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Ready Seal Direct. Questions about colors, coverage, or shipping outside Ontario? Request a shipping quote or message our team.",
  alternates: { canonical: `${SITE_URL}/contact-us` }
};

export default async function ContactPage({
  searchParams
}: {
  searchParams: Promise<{ subject?: string }>;
}) {
  const { subject } = await searchParams;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="eyebrow text-[var(--color-brand)]">We&rsquo;re here to help</p>
      <h1 className="font-display mt-2 text-3xl md:text-4xl">Contact Ready Seal Direct</h1>
      <p className="mt-3 text-slate-600">
        Questions about colors, coverage, or contractor pricing? Outside Ontario and need a shipping
        quote? Fill out the form below and we&rsquo;ll reply within one business day.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Detail icon="📞" label="Phone" value="(877) 266-6415" href="tel:+18772666415" />
        <Detail icon="✉️" label="Email" value="sales@readysealdirect.ca" href="mailto:sales@readysealdirect.ca" />
        <Detail icon="📍" label="Location" value="Belmont, Ontario" />
      </div>

      <ContactForm defaultSubject={subject} />
    </div>
  );
}

function Detail({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const inner = (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-4">
      <p className="text-lg">{icon}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
