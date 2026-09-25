import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getVisualizerCatalog } from "@/lib/visualizer/catalog";
import { loadStoredDesign, publicView } from "@/lib/visualizer/server";
import { VZ_SITE } from "@/lib/visualizer/site";
import { estimate, formatMoney, kitContents, resolveSelection, OUTLET_OPTIONS } from "@/lib/visualizer/engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Light Plan",
  description: "A saved permanent lighting plan drawn with the Permanent Lighting Direct visualizer.",
  robots: { index: false, follow: false },
};

export default async function DesignPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const stored = await loadStoredDesign(VZ_SITE.site, code);
  if (!stored) notFound();
  const view = publicView(stored);
  const catalog = await getVisualizerCatalog();
  const est = estimate(stored.design, catalog);
  const sel = resolveSelection(stored.design, est, catalog);
  const { w, h } = stored.design.image;
  const colour = catalog.colours.find((c) => c.key === stored.design.colour)?.label ?? "—";
  const outlet = OUTLET_OPTIONS.find((o) => o.key === stored.design.outlet)?.label ?? "—";
  const when = stored.submittedAt ? new Date(stored.submittedAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }) : "";

  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell py-10 md:py-14">
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--color-muted)]">
          <Link href="/" className="hover:underline">Home</Link><span className="mx-1.5">/</span>
          <Link href="/visualizer" className="hover:underline">Light Visualizer</Link><span className="mx-1.5">/</span>
          <span className="text-[var(--color-text)]">Saved plan</span>
        </nav>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-[var(--color-accent-dark)]">Saved light plan</p>
            <h1 className="font-display h1-fluid mt-3">{view.who.firstName ? `${view.who.firstName}’s` : "Your"} light plan{view.who.city ? ` · ${view.who.city}` : ""}</h1>
            <p className="mt-2 text-[var(--color-text-soft)]">{when ? `Sent ${when} · ` : ""}Plan code <span className="font-mono">{code}</span></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/visualizer?d=${code}`} className="btn-primary btn-sm">Open in the visualizer</Link>
            <a href={`/api/visualizer/${code}/image?kind=annotated`} download={`light-plan-${code}.jpg`} className="btn-secondary btn-sm">Download picture</a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="card overflow-hidden bg-black">
            <Image src={`/api/visualizer/${code}/image?kind=annotated`} alt={`Photo of a home with permanent lighting runs drawn on it by the Permanent Lighting Direct visualizer${view.who.city ? ` in ${view.who.city}` : ""}`} width={w} height={h} unoptimized priority className="h-auto w-full" />
          </div>
          <aside className="space-y-4">
            <div className="card p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[var(--color-bg-tint)] p-3"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Lights</p><p className="text-2xl font-bold">{est.hasScale ? `≈ ${est.litFeet} ft` : stored.design.manualFeet ? `${stored.design.manualFeet} ft` : "—"}</p></div>
                <div className="rounded-xl bg-[var(--color-bg-tint)] p-3"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Unlit jumps</p><p className="text-2xl font-bold">{est.hasScale ? `≈ ${est.jumpFeet} ft` : "—"}</p></div>
              </div>
              <p className="mt-3 text-sm text-[var(--color-text-soft)]">Plan for ≈ <strong className="text-[var(--color-text)]">{est.requiredFeet} ft</strong> including a fitting allowance.{est.separateBuildings ? ` ${est.separateBuildings} separate building.` : ""}</p>
            </div>
            {sel.kit && (
              <div className="card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-lg">{sel.kit.feet} ft permanent lighting kit</h2>
                  <span className="font-bold">{formatMoney(sel.kit.price)}</span>
                </div>
                <ul className="mt-3 grid gap-1 text-sm text-[var(--color-text-soft)]">
                  {kitContents(sel.kit, catalog).map(({ component, qty }) => <li key={component.key}><strong className="text-[var(--color-text)]">{qty} ×</strong> {component.name}</li>)}
                </ul>
                <Link href={`/product/${sel.kit.slug}`} className="mt-3 inline-block text-sm font-semibold text-[var(--color-accent-dark)] hover:underline">Kit details →</Link>
              </div>
            )}
            <div className="card p-5">
              <h2 className="text-sm font-bold">Extras</h2>
              {sel.lines.length ? (
                <ul className="mt-2 space-y-1 text-sm text-[var(--color-text-soft)]">{sel.lines.map((l) => <li key={l.component.key}><strong className="text-[var(--color-text)]">{l.qty} ×</strong> {l.component.name}{l.unitPrice !== null ? ` — ${formatMoney(l.unitPrice * l.qty)}` : ""}</li>)}</ul>
              ) : <p className="mt-2 text-sm text-[var(--color-text-soft)]">None added.</p>}
              {sel.total !== null && <p className="mt-3 border-t border-[var(--color-border)] pt-3 text-sm font-bold">Estimated total before shipping &amp; tax: {formatMoney(sel.total)}</p>}
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-[var(--color-text-soft)]">
                <dt className="font-semibold text-[var(--color-text)]">Track colour</dt><dd>{colour}</dd>
                <dt className="font-semibold text-[var(--color-text)]">Outlet distance</dt><dd>{outlet}</dd>
                {view.notes && <><dt className="font-semibold text-[var(--color-text)]">Notes</dt><dd className="whitespace-pre-wrap">{view.notes}</dd></>}
              </dl>
              <p className="mt-4 text-sm text-[var(--color-text-soft)]">We review every plan before quoting. Questions? <Link href="/contact-us" className="font-semibold underline">Contact us</Link>.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
