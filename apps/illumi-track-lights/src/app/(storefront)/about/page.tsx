import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { INSTALL_CITIES } from "@/lib/installation";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Illumi Track Lights, London, Ontario",
  description: "Illumi Track Lights sells and installs permanent LED soffit track lighting from London, Ontario: 12V kits shipped Canada-wide and our own installation crew across Southwestern Ontario.",
  alternates: { canonical: `${SITE_URL}/about` }
};

export default function AboutPage() {
  return (
    <>
      <PageHero photo="home-install" eyebrow="About" title="Lighting people in London, Ontario." intro="We put soffit track on houses for a living, and we box the same hardware for people who would rather do it themselves." crumbs={[{ label: "About" }]} />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <article className="prose-clean max-w-[68ch] text-[var(--color-text-soft)]">
            <h2>Why we started</h2>
            <p>Permanent lighting arrived in Canada as a franchise product: a crew, a proprietary controller and an invoice of $25 to $40 a foot. The hardware underneath is not exotic. Aluminum channel, sealed 12V RGBW pucks, a WiFi controller and a good power supply. We started Illumi to sell that hardware straight to homeowners at a fair price, and to install it ourselves close to home.</p>
            <h2>What we sell</h2>
            <p>Six complete soffit track kits from 50 to 250 feet, every part in them sold separately, and nothing that is not 12V. The controller runs WLED, the open lighting firmware installers use worldwide, so you are never locked to an app that might disappear.</p>
            <h2>Where we install</h2>
            <p>Our own crew covers {INSTALL_CITIES.map((c) => c.city).join(", ")} and the towns between them. Free on-site measurement, colour-matched track, sealed wiring, an app walkthrough before we leave, and the same five-year warranty as the kits.</p>
            <h2>How we support it</h2>
            <p>Real people in London answer the inbox within a business day. Send a photo of the house and we will size the kit. Send a photo of a dead puck and we will ship the replacement.</p>
          </article>
          <div className="grid grid-cols-2 gap-4">
            <Photo name="home-install" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
            <Photo name="soffit-lights-perm" ratio="aspect-[4/5]" rounded="rounded-2xl" className="mt-8" sizes="300px" />
            <Photo name="detail-tracks" ratio="aspect-[4/5]" rounded="rounded-2xl" className="-mt-8" sizes="300px" />
            <Photo name="hero-home-twilight" ratio="aspect-[4/5]" rounded="rounded-2xl" sizes="300px" />
          </div>
        </div>
      </section>
      <section className="bg-[var(--color-surface)]">
        <div className="shell section grid gap-6 md:grid-cols-3">
          {[["12V", "Every part in the store, one voltage"], ["5 yr", "Parts warranty on kits, plus workmanship on installs"], ["London, ON", "Stock, shipping and support under one roof"]].map(([n, l]) => (
            <div key={n} className="card p-6 text-center">
              <p className="font-display text-4xl text-[var(--color-ink)]">{n}</p>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">{l}</p>
            </div>
          ))}
        </div>
        <div className="shell pb-16">
          <div className="flex flex-wrap gap-3">
            <Link href="/diy-kits" className="btn-primary">Shop kits</Link>
            <Link href="/installation" className="btn-secondary">Professional installation</Link>
            <Link href="/contact-us" className="btn-secondary">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
