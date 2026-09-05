import Link from "next/link";
import { getServices } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { ArrowRightIcon } from "./icons";

const SERVICE_PHOTO: Record<string, string> = {
  "driveway-sealing": PICKS.heroDriveway,
  "patio-sealing": PICKS.heroPatio,
  "stamped-concrete-sealing": PICKS.heroStamped,
  "walkway-sealing": PICKS.heroWalkway,
  "exposed-aggregate-sealing": PICKS.heroAggregate,
  "commercial-sealing": PICKS.heroCommercial,
};
export const servicePhoto = (slug: string) => SERVICE_PHOTO[slug] ?? PICKS.heroHome;

export function ServicesGrid() {
  const services = getServices();
  return (
    <section className="bg-[var(--stone)]">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill navy">What we seal</p>
          <h2 className="font-display h2-fluid mt-4">Every concrete surface on the property.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">One crew, one product line, one warranty. Pressure washed, prepped, sprayed and back-rolled with a high-quality solvent-based sealer in the finish you choose.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group flex flex-col overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/10]" sizes="(max-width: 640px) 100vw, 380px" className="transition duration-500 group-hover:scale-[1.03]" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl group-hover:text-[var(--accent-deep)]">{svc.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{svc.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
