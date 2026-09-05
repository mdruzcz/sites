import Link from "next/link";
import { getCoreServices, servicePhoto } from "@/lib/content";
import { Photo } from "./Photo";
import { ArrowRightIcon } from "./icons";

const PILL: Record<string, string> = { "pressure-washing": "sky", sealing: "", repair: "cedar" };
const LABEL: Record<string, string> = { "pressure-washing": "Cleaning", sealing: "Staining & sealing", repair: "Repair" };

export function ServicesGrid({ title = "Everything a tired deck or fence needs.", intro = "One crew handles the whole job: cleaning, repairs, sanding and brush-applied stain. Fences get the same care." }: { title?: string; intro?: string }) {
  const services = getCoreServices();
  const [restoration, staining, ...rest] = services;
  return (
    <section className="bg-[var(--paper)]">
      <div className="shell section">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow-pill moss">What we do</p>
          <h2 className="font-display h2-fluid mt-4">{title}</h2>
          <p className="lead mt-4 text-[var(--ink-soft)]">{intro}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[restoration, staining].filter(Boolean).map((svc) => (
            <Link key={svc.slug} href={`/${svc.slug}`} className="card card-lift group overflow-hidden">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-[16/9]" sizes="(max-width: 768px) 100vw, 580px" className="transition duration-500 group-hover:scale-[1.03]" />
              <div className="p-6 md:p-7">
                <p className={`eyebrow-pill ${PILL[svc.category]}`}>{LABEL[svc.category]}</p>
                <h3 className="font-display mt-3 text-2xl group-hover:text-[var(--accent-deep)]">{svc.title}</h3>
                <p className="mt-2 text-[var(--ink-soft)]">{svc.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-[var(--accent-deep)]">Learn more <ArrowRightIcon className="w-4 h-4" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((svc) => (
            <Link key={svc.slug} href={`/${svc.slug}`} className="card card-lift group flex items-center gap-4 p-4">
              <Photo name={servicePhoto(svc.slug)} ratio="aspect-square w-20 shrink-0" rounded="rounded-xl" sizes="80px" />
              <div>
                <h3 className="font-display text-lg leading-snug group-hover:text-[var(--accent-deep)]">{svc.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">{svc.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
