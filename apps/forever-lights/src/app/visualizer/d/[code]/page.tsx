import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import { getVisualizerCatalog } from '@/lib/visualizer/catalog';
import { loadStoredDesign, publicView } from '@/lib/visualizer/server';
import { VZ_SITE } from '@/lib/visualizer/site';
import { estimate, formatMoney, kitContents, resolveSelection, OUTLET_OPTIONS } from '@/lib/visualizer/engine';
import { Breadcrumbs } from '@/components/ui';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Your Light Plan',
  description: 'A saved permanent lighting plan drawn with the Forever Lights visualizer.',
  robots: { index: false, follow: false },
};

export default async function DesignPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const stored = await loadStoredDesign(VZ_SITE.site, code);
  if (!stored) notFound();
  const view = publicView(stored);
  const catalog = getVisualizerCatalog();
  const est = estimate(stored.design, catalog);
  const sel = resolveSelection(stored.design, est, catalog);
  const { w, h } = stored.design.image;
  const colour = catalog.colours.find((c) => c.key === stored.design.colour)?.label ?? '—';
  const outlet = OUTLET_OPTIONS.find((o) => o.key === stored.design.outlet)?.label ?? '—';
  const when = stored.submittedAt ? new Date(stored.submittedAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <section className="section-tight bg-white">
      <div className="wrap">
        <Breadcrumbs items={[{ href: '/visualizer', label: 'Light Visualizer' }, { label: 'Saved plan' }]} />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Saved light plan</span>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-ink">{view.who.firstName ? `${view.who.firstName}’s` : 'Your'} light plan{view.who.city ? ` · ${view.who.city}` : ''}</h1>
            <p className="mt-2 text-muted">{when ? `Sent ${when} · ` : ''}Plan code <span className="font-mono">{code}</span></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={`/visualizer?d=${code}`} className="btn btn-primary btn-sm">Open in the visualizer</Link>
            <a href={`/api/visualizer/${code}/image?kind=annotated`} download={`light-plan-${code}.jpg`} className="btn btn-outline btn-sm">Download picture</a>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="card overflow-hidden bg-black">
            <Image src={`/api/visualizer/${code}/image?kind=annotated`} alt={`Photo of a home with permanent lighting runs drawn on it by the Forever Lights visualizer${view.who.city ? ` in ${view.who.city}` : ''}`} width={w} height={h} unoptimized priority className="h-auto w-full" />
          </div>
          <aside className="space-y-4">
            <div className="card p-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-soft p-3"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Lights</p><p className="text-2xl font-bold text-ink">{est.hasScale ? `≈ ${est.litFeet} ft` : stored.design.manualFeet ? `${stored.design.manualFeet} ft` : '—'}</p></div>
                <div className="rounded-xl bg-soft p-3"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Unlit jumps</p><p className="text-2xl font-bold text-ink">{est.hasScale ? `≈ ${est.jumpFeet} ft` : '—'}</p></div>
              </div>
              <p className="mt-3 text-sm text-muted">Plan for ≈ <strong className="text-ink">{est.requiredFeet} ft</strong> including a fitting allowance.{est.separateBuildings ? ` ${est.separateBuildings} separate building.` : ''}</p>
            </div>
            {sel.kit && (
              <div className="card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-lg font-bold text-ink">{sel.kit.feet} ft permanent lighting kit</h2>
                  <span className="font-bold text-ink">{formatMoney(sel.kit.price)}</span>
                </div>
                <ul className="mt-3 grid gap-1 text-sm text-muted">
                  {kitContents(sel.kit, catalog).map(({ component, qty }) => <li key={component.key}><strong className="text-ink">{qty} ×</strong> {component.name}</li>)}
                </ul>
                <Link href={`/kits/${sel.kit.slug}`} className="mt-3 inline-block text-sm font-semibold underline">Kit details</Link>
              </div>
            )}
            <div className="card p-5">
              <h2 className="text-sm font-bold text-ink">Extras</h2>
              {sel.lines.length ? (
                <ul className="mt-2 space-y-1 text-sm text-muted">{sel.lines.map((l) => <li key={l.component.key}><strong className="text-ink">{l.qty} ×</strong> {l.component.name}</li>)}</ul>
              ) : <p className="mt-2 text-sm text-muted">None added.</p>}
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-muted">
                <dt className="font-semibold text-ink">Track colour</dt><dd>{colour}</dd>
                <dt className="font-semibold text-ink">Outlet distance</dt><dd>{outlet}</dd>
                {view.notes && <><dt className="font-semibold text-ink">Notes</dt><dd className="whitespace-pre-wrap">{view.notes}</dd></>}
              </dl>
              <p className="mt-4 text-sm text-muted">We review every plan before quoting. Questions? Call <a href={`tel:${site.phone.replace(/\D/g, '')}`} className="font-semibold underline">{site.phone}</a>.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
