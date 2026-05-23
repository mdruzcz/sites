import type { Metadata } from "next";
import { SITE } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact — Talk to a Real Human in Belmont",
  description: "Get in touch with Ready Kitchens — call, email, or visit our Belmont, ON warehouse to see kitchen kits in stock and ready for pickup.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <header>
        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">Contact</span>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Get in touch.</h1>
        <p className="mt-3 text-lg text-[var(--color-ink-soft)]">
          Questions, custom add-ons, contractor accounts, or you just want to come walk through the warehouse — we&rsquo;d love to hear from you.
        </p>
      </header>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <ContactCard title="Call" line1={SITE.phoneDisplay} href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} sub={SITE.pickupHours} />
        <ContactCard title="Email" line1={SITE.email} href={`mailto:${SITE.email}`} sub="Reply within 1 business day" />
        <ContactCard title="Visit" line1="50432 Yorke Line" sub={`Belmont, ON ${SITE.postalCode}`} />
      </div>

      <section className="mt-10 rounded-lg bg-[var(--color-paper-warm)] p-6 text-center">
        <h2 className="font-display text-2xl">Want a quote on a specific kit?</h2>
        <p className="mt-1 text-[var(--color-ink-soft)]">Browse the kits and submit your order directly — we&rsquo;ll reply with confirmation and a final total.</p>
        <a href="/kits" className="btn-primary mt-5 inline-flex">Shop kitchen kits</a>
      </section>
    </div>
  );
}

function ContactCard({ title, line1, href, sub }: { title: string; line1: string; href?: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-line)] bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">{title}</p>
      {href ? (
        <a href={href} className="mt-2 block font-display text-2xl hover:text-[var(--color-accent)]">{line1}</a>
      ) : (
        <p className="mt-2 font-display text-2xl">{line1}</p>
      )}
      {sub && <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{sub}</p>}
    </div>
  );
}
