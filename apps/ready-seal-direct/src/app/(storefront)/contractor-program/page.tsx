import { InstallerApplicationForm } from "@/components/installer-application-form";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contractor Program — Skid & Freight Pricing on Ready Seal",
  description:
    "Deck and fence contractors get special freight pricing on full-skid Ready Seal orders, plus priority support and consistent color across every job. Apply for wholesale pricing.",
  alternates: { canonical: `${SITE_URL}/contractor-program` }
};

export default function ContractorProgramPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--color-brand-deep)] px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow text-[var(--color-gold)]">Ready Seal Direct · For the pros</p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            Buy Ready Seal by the skid. Save on every job.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-orange-50/90">
            Deck stainers, fence builders, painters and property managers get exclusive wholesale
            pricing on full-skid quantities shipped by freight — plus priority support and the same
            consistent color, batch after batch.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="#apply" className="btn-gold">Apply for contractor pricing →</Link>
            <a href="tel:+18772666415" className="btn-ghost-light">Or call (877) 266-6415</a>
          </div>
        </div>
      </section>

      {/* Freight / skid pricing explainer */}
      <section className="mx-auto max-w-5xl px-4 py-14">
        <p className="eyebrow text-[var(--color-brand)]">How skid pricing works</p>
        <h2 className="font-display mt-2 text-3xl">Bigger quantities, freight delivery, better rates.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Step
            n="01"
            title="Apply once"
            body="Tell us about your business and typical volume. Approval usually takes one business day — no cost, no obligation."
          />
          <Step
            n="02"
            title="Order by the skid"
            body="Full-skid quantities of 1- or 5-gallon pails ship by freight (LTL) across Ontario at special contractor rates."
          />
          <Step
            n="03"
            title="Lock in your color"
            body="Get consistent Ready Seal color across every project, priority restocking, and a dedicated point of contact."
          />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[var(--color-bg)]">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <div className="grid gap-6 md:grid-cols-2">
            <Benefit title="Wholesale freight pricing" body="Special per-pail pricing on full-skid orders delivered by LTL freight — the lowest cost per gallon we offer." />
            <Benefit title="Consistent color, every batch" body="Trans-oxide pigments and tight batch control mean the Mission Brown you used in May matches the one in September." />
            <Benefit title="Priority support" body="A direct line for reorders, color advice, and scheduling — so your crews are never waiting on stain." />
            <Benefit title="Net terms available" body="Established contractors can apply for invoice terms on recurring skid orders. Ask us during approval." />
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="font-display text-3xl">Apply for contractor pricing</h2>
        <p className="mt-2 text-sm text-slate-600">
          Fill out the form and we&rsquo;ll review your application and reach out within one business
          day with your wholesale pricing. Buying outside Ontario? Note it below and we&rsquo;ll quote
          freight to your province.
        </p>
        <InstallerApplicationForm tierSlug="installer" />
      </section>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="relative rounded-2xl border border-[var(--color-border)] bg-white p-7">
      <span className="font-display absolute -top-5 left-6 grid size-12 place-items-center rounded-full bg-[var(--color-brand)] text-lg font-bold text-white">
        {n}
      </span>
      <h3 className="mt-6 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}

function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-5">
      <h3 className="text-base font-semibold text-[var(--color-brand)]">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}
