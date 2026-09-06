import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PICKS } from "@/lib/photos";

export default function NotFound() {
  return (
    <>
      <PageHero photo={PICKS.heroServices} kicker="404" title="That slab isn't here." intro="The link may be old, or the page moved. Head back home or pick a service." crumbs={[{ label: "Not found" }]} />
      <section className="bg-white"><div className="shell section flex flex-wrap gap-3"><Link href="/" className="btn-orange">Back to home</Link><Link href="/services" className="btn-outline">Our services</Link><Link href="/contact" className="btn-outline">Free quote</Link></div></section>
    </>
  );
}
