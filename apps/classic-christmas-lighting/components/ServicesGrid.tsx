import Link from "next/link";
import { getServices } from "@/lib/content";
import { PICKS } from "@/lib/photos";
import { Photo } from "./Photo";
import { ArrowRightIcon } from "./icons";

const SERVICE_PHOTO: Record<string, string> = {
  "christmas-lighting-installation": PICKS.heroInstall,
  "christmas-lighting-for-homes": PICKS.heroHomes,
  "christmas-lighting-for-businesses": PICKS.heroBusiness,
  "tree-lighting-services": PICKS.heroTree,
  "christmas-light-rental": PICKS.heroRental,
  "christmas-decoration-services": PICKS.heroDecor,
};
export const servicePhoto = (slug: string) => SERVICE_PHOTO[slug] ?? PICKS.heroHome;

const PILL: Record<string, { label: string; tone: string }> = {
  "christmas-lighting-installation": { label: "Full service", tone: "candy" },
  "christmas-lighting-for-homes": { label: "Residential", tone: "pine" },
  "christmas-lighting-for-businesses": { label: "Commercial", tone: "sky" },
  "tree-lighting-services": { label: "Trees", tone: "pine" },
  "christmas-light-rental": { label: "Events & BIAs", tone: "" },
  "christmas-decoration-services": { label: "Décor", tone: "candy" },
};

export function ServicesGrid() {
  const services = getServices();
  const [homes, businesses] = [services.find((s) => s.slug === "christmas-lighting-for-homes")!, services.find((s) => s.slug === "christmas-lighting-for-businesses")!];
  const rest = services.filter((s) => s.slug !== "christmas-lighting-for-homes" && s.slug !== "christmas-lighting-for-businesses");
  return (
    <section className="bg-[var(--snow)]">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill pine">What we do</p>
          <h2 className="font-display h2-fluid mt-4">Homes, storefronts, trees and everything in between.</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">One crew handles the whole season: design, commercial-grade LEDs, installation, a mid-season check and takedown. You never touch a ladder.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[homes, businesses].map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 580px" className="transition duration-500 group-hover:scale-[1.03]" />
              <div className="p-6 md:p-7">
                <p className={`eyebrow-pill ${PILL[svc.slug].tone}`}>{PILL[svc.slug].label}</p>
                <h3 className="font-display mt-3 text-2xl group-hover:text-[var(--candy)]">{svc.title}</h3>
                <p className="mt-2 text-[var(--ink-soft)]">{svc.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-[var(--candy-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 280px" className="transition duration-500 group-hover:scale-[1.04]" />
              <div className="p-4">
                <p className={`eyebrow-pill ${PILL[svc.slug].tone}`}>{PILL[svc.slug].label}</p>
                <h3 className="font-display mt-2 text-lg leading-snug group-hover:text-[var(--candy)]">{svc.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">{svc.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
