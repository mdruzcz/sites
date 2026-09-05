import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PICKS } from "@/lib/photos";

export default function NotFound() {
  return (
    <>
      <PageHero photo={PICKS.heroFaq} eyebrow="404" title="That page has come down for the season." intro="The link may be old, or the page moved. Head back home or pick a service below." crumbs={[{ label: "Not found" }]} compact form={false} />
      <section className="bg-[var(--snow)]">
        <div className="shell section flex flex-wrap gap-3">
          <Link href="/" className="btn-candy">Back to home</Link>
          <Link href="/services" className="btn-outline">Our services</Link>
          <Link href="/contact" className="btn-outline">Get a free quote</Link>
        </div>
      </section>
    </>
  );
}
