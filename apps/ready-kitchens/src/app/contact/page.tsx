import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact — Talk to a Real Human in Belmont",
  description: "Send Ready Kitchens a message — attach photos of your space, ask about kits or extras from Forever Cabinets, or arrange a warehouse visit in Belmont, ON.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <header className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Contact</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Get in touch.</h1>
        <p className="mt-3 text-lg text-[var(--color-ink-soft)]">
          Questions about a kit, contractor accounts, custom add-ons, or you just want to walk through the warehouse — send us a message and a real person will reply within one business day.
        </p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <ContactForm />

        <aside className="space-y-4">
          <div className="rounded-lg border border-[var(--color-line)] bg-white p-6">
            <h2 className="font-display text-xl">Call us</h2>
            <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="mt-2 block font-display text-3xl hover:text-[var(--color-accent)]">
              {SITE.phoneDisplay}
            </a>
            <p className="mt-1 text-xs text-[var(--color-ink-soft)]">Calls go straight to the warehouse during business hours.</p>
          </div>
          <div className="rounded-lg border border-[var(--color-line)] bg-white p-6">
            <h2 className="font-display text-xl">Visit</h2>
            <p className="mt-2 text-sm">50432 Yorke Line<br />Belmont, ON {SITE.postalCode}</p>
            <p className="mt-2 text-xs text-[var(--color-ink-soft)]">{SITE.pickupHours}</p>
          </div>
          <div className="rounded-lg border border-[var(--color-line)] bg-[var(--color-paper-warm)] p-6">
            <h2 className="font-display text-xl">Need extra cabinets?</h2>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              Individual cabinets, fillers, mouldings and finishing panels are available from our parent brand.
            </p>
            <a href={SITE.parentUrl} target="_blank" rel="noopener" className="btn-ghost mt-4 w-full justify-center">
              Shop {SITE.parentDomain} →
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
