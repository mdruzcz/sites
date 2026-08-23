import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { site } from "@/lib/site";
import { serviceAreas } from "@/lib/content";

export const revalidate = 3600;

const TITLE = "About — Commercial Holiday Decor";
const DESCRIPTION =
  "A London, Ontario commercial holiday decor contractor: we design, supply, install, service and store Christmas decor for commercial and municipal properties across Southwestern Ontario.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${site.url}/about` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${site.url}/about` }
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        photo="tree-lighting-row"
        photoAlt="Large illuminated commercial Christmas trees lighting a property at night"
        eyebrow="About us"
        title="One contractor for the whole season."
        intro="We supply the decor, install it, look after it while it is up, and take it down in January. No coordinating three vendors."
        crumb="About"
      />

      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="prose-clean max-w-none">
              <h2 className="font-display text-[1.9rem] md:text-[2.4rem]">What we actually do</h2>
              <p>
                Commercial Holiday Decor is a {site.addressLine} contractor working exclusively on commercial
                and municipal properties across Southwestern Ontario. We are not a residential Christmas light
                company that also takes business work — the product, the crews and the insurance are all built
                around commercial sites.
              </p>
              <p>
                That matters mostly because of scale and accountability. Retail decor does not survive a
                season on an exposed building front, and a property manager cannot have a contractor on site
                without liability and WSIB coverage. So everything we hang is steel-framed and commercially
                lit, and every crew that goes up a lift is covered.
              </p>

              <h2 className="font-display text-[1.6rem] md:text-2xl">Why one contractor</h2>
              <p>
                The usual arrangement is messy: one supplier sells the decor, a second company installs it, and
                when a run goes dark in mid-December nobody owns the problem. We do all of it — design, supply,
                install, in-season service, January takedown and off-season storage — so there is one number to
                call and one invoice to approve.
              </p>
              <p>
                Storage is the part people underestimate. Everything comes back to our facility in January,
                gets inspected and repaired, and is labelled by property and section. Year two is cheaper and
                faster because the plan and the parts already exist.
              </p>

              <h2 className="font-display text-[1.6rem] md:text-2xl">Where we work</h2>
              <p>
                Crews run out of London and cover {serviceAreas.map((a) => a.name).join(", ")}, plus the
                smaller centres in between. For larger contracts and multi-site programs we travel further —
                ask.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/quote" className="btn-primary">{site.quote.cta}</Link>
                <Link href="/installation" className="btn-secondary">How installation works</Link>
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              <Photo name="wreath-building-front" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 460px" rounded="rounded-3xl" />
              <Photo name="tree-lighting-row" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 460px" rounded="rounded-3xl" />
              <div className="rounded-2xl border border-[var(--color-border)] bg-white p-7">
                <p className="eyebrow text-[var(--color-muted)]">At a glance</p>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    ["Based in", site.addressLine],
                    ["Works on", "Commercial & municipal only"],
                    ["Booking opens", site.season.bookingOpens],
                    ["Install window", site.season.installWindow],
                    ["Takedown", site.season.takedownWindow],
                    ["Coverage", "Southwestern Ontario"]
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-[var(--color-border)] pb-2.5 last:border-0">
                      <dt className="text-[var(--color-muted)]">{k}</dt>
                      <dd className="text-right font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
