import { InstallerApplicationForm } from "@/components/installer-application-form";

export const metadata = {
  title: "Professional Installer Program",
  description:
    "Join the Holiday Light Supplies installer program for bulk pricing, free shipping, and priority service across Ontario."
};

export default function ProfessionalInstallerPage() {
  return (
    <div>
      <section className="bg-[var(--color-accent)] px-4 py-16 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">Professional Installer Program</h1>
          <p className="mt-3 text-lg text-emerald-50">
            Bulk pricing, faster fulfillment, and dedicated support — designed for Christmas-light installers,
            event lighting companies, and landscaping crews delivering stunning results across Canada.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <Benefit
            title="Exclusive bulk discounts"
            body="Lower per-unit pricing on C9 bulbs, G20 globes, mini strands, snowfall tubes, LED trees, and 3D displays."
          />
          <Benefit
            title="Free shipping on qualifying orders"
            body="Free Ontario-wide shipping over $150 — and tier-locked discounts on smaller restock orders."
          />
          <Benefit
            title="Priority order processing"
            body="Faster handling and dedicated support during peak install season (October–December)."
          />
          <Benefit
            title="Reliable, tested gear"
            body="Five-year warranty against manufacturing defects on all LED systems so your installs hold up."
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-8">
        <h2 className="text-2xl font-semibold tracking-tight">Apply now</h2>
        <p className="mt-2 text-sm text-slate-600">
          Fill out the form. We&rsquo;ll review your application and reach out within 1 business day to confirm
          your installer tier.
        </p>
        <InstallerApplicationForm tierSlug="installer" />
      </section>
    </div>
  );
}

function Benefit({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-[var(--color-accent)]">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{body}</p>
    </div>
  );
}
