import { InstallerApplicationForm } from "@/components/installer-application-form";

export const metadata = {
  title: "Municipalities & Government — Ontario LED lighting supplier",
  description:
    "Tax-exempt pricing, net-30 PO invoicing, and Canadian-made permanent LED lighting for Ontario municipalities, BIAs, parks departments, and downtown improvement areas."
};

export default function MunicipalitiesPage() {
  return (
    <div>
      <section className="bg-[var(--color-accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">For Ontario Municipalities & BIAs</h1>
          <p className="mt-3 text-lg text-emerald-50">
            Net-30 invoicing, tax-exempt pricing, RFP-friendly quotes, and Canadian-stocked permanent LED
            lighting systems for parks departments, downtown BIAs, and public works.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Pillar
            title="Net-30 invoicing"
            body="Issue a PO and receive an invoice with 30-day terms. No credit card required for municipal orders."
          />
          <Pillar
            title="Tax-exempt pricing"
            body="Upload your tax-exemption certificate once and your account is flagged for the right tax handling on every order."
          />
          <Pillar
            title="RFP-ready quotes"
            body="Need a formal quote for tender? Email us your display and product list and we&rsquo;ll respond with line-item pricing within 24 hours."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="text-2xl font-semibold tracking-tight">Register your municipality</h2>
        <p className="mt-2 text-sm text-slate-600">
          Tell us about your organization and we&rsquo;ll set up your account and email you next steps.
        </p>
        <InstallerApplicationForm tierSlug="municipality" />
      </section>
    </div>
  );
}

function Pillar({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-[var(--color-accent)]">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}
