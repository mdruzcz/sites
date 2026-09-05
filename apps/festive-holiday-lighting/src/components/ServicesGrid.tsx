import Link from "next/link";
import { services } from "@/lib/site";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { ArrowRightIcon } from "./icons";

const SERVICE_PHOTO: Record<string, string> = {
  "christmas-light-installation": PICKS.heroClassic,
  "permanent-lighting": PICKS.heroPermanent,
  "residential-holiday-lighting": PICKS.heroResidential,
  "commercial-holiday-lighting": PICKS.heroCommercial,
  "municipal-bia-lighting": PICKS.heroMunicipal,
  "tree-lighting": PICKS.heroTree,
  "interior-holiday-decorating": PICKS.heroInterior,
};
export const servicePhoto = (slug: string) => SERVICE_PHOTO[slug] ?? PICKS.heroHome;

export function ServicesGrid() {
  const [classic, permanent, ...rest] = services;
  return (
    <section className="bg-[var(--snow)]">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill pine">Two ways to light your home</p>
          <h2 className="font-display h2-fluid mt-4">Up for the season, or up for good.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">Most families pick one. Plenty do both: permanent lights for every day of the year, and a classic program for the full Christmas look.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[classic, permanent].map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 580px" className="transition duration-500 group-hover:scale-[1.03]" />
              <div className="p-6 md:p-7">
                <p className={`eyebrow-pill ${svc.slug === "permanent-lighting" ? "candy" : "pine"}`}>{svc.slug === "permanent-lighting" ? "Year-round" : "Seasonal"}</p>
                <h3 className="font-display mt-3 text-2xl group-hover:text-[var(--candy)]">{svc.name}</h3>
                <p className="mt-2 text-[var(--ink-soft)]">{svc.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-[var(--candy-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {rest.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 240px" className="transition duration-500 group-hover:scale-[1.04]" />
              <div className="p-4">
                <h3 className="font-display text-base leading-snug group-hover:text-[var(--candy)]">{svc.name}</h3>
                <p className="mt-1 text-xs text-[var(--muted)]">{svc.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
