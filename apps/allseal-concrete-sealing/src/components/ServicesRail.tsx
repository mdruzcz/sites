import Link from "next/link";
import { getServices, servicePhoto } from "@/lib/content";
import { Photo } from "./Photo";
import { ArrowRightIcon } from "./icons";

export function ServicesRail({ exclude }: { exclude?: string }) {
  const services = getServices().filter((s) => s.slug !== exclude);
  return (
    <section className="bg-white">
      <div className="shell section">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker">What we seal</p>
            <h2 className="font-display h2-fluid mt-4">Every slab on the property.</h2>
          </div>
          <Link href="/services" className="btn-outline btn-sm">All services</Link>
        </div>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <li key={s.slug} className="group relative bg-white">
              <Link href={`/services/${s.slug}`} className="flex h-full flex-col">
                <div className="relative">
                  <Photo name={servicePhoto(s.slug)} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, 300px" className="transition duration-500 group-hover:scale-[1.03]" />
                  <span className="font-display absolute left-3 top-3 rounded bg-[var(--graphite)] px-2 py-0.5 text-sm font-bold text-[var(--orange)]">0{i + 1}</span>
                  <span className="font-display absolute bottom-3 right-3 rounded bg-white/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">{s.recommendedSheen}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl group-hover:text-[var(--orange-deep)]">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">{s.excerpt}</p>
                  <span className="font-display mt-4 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-[var(--orange-deep)]">Details <ArrowRightIcon className="w-4 h-4" /></span>
                </div>
              </Link>
            </li>
          ))}
          {services.length % 4 !== 0 && (
            <li className="flex flex-col justify-between bg-[var(--graphite)] p-6 text-white">
              <div><p className="kicker">Not sure which?</p><p className="font-display mt-3 text-3xl">Free inspection, sheen samples in hand.</p><p className="mt-3 text-sm text-white/70">We look at the slab, the old coating and the drainage, then recommend a finish you can see on your own concrete.</p></div>
              <a href="#quote" className="btn-orange mt-6 w-full">Book it</a>
            </li>
          )}
        </ol>
      </div>
    </section>
  );
}
