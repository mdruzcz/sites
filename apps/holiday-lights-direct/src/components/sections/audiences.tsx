import Link from "next/link";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";

const PANELS: {
  tag: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  photo: PhotoKey;
  /** Colour wash rising from the bottom of the photo. */
  wash: string;
}[] = [
  {
    tag: "Homeowners",
    title: "Light it once.",
    body: "Complete kits sized to your roofline, with everything in the box.",
    cta: "Build your system",
    href: "/permanent-lights",
    photo: "home-cottage-evening",
    wash: "134, 96, 26"
  },
  {
    tag: "Pro installers",
    title: "Stock the truck.",
    body: "C9 bulbs, socket spools, clips and track with bulk pricing for crews.",
    cta: "See the Pro program",
    href: "/professional-installer",
    photo: "commercial-install-lift",
    wash: "35, 82, 51"
  },
  {
    tag: "Municipalities & BIAs",
    title: "Light up main street.",
    body: "Durable, serviceable lighting for streetscapes, parks and public buildings.",
    cta: "Plan a public display",
    href: "/municipalities",
    photo: "commercial-gable-install",
    wash: "130, 38, 34"
  }
];

/** Three full-bleed photo panels, one per kind of customer. */
export function Audiences() {
  return (
    <section aria-label="Who we supply" className="grid bg-[var(--color-ink-deep)] md:grid-cols-3">
      {PANELS.map((p) => (
        <Link
          key={p.tag}
          href={p.href}
          className="group relative isolate flex min-h-[440px] flex-col items-center justify-between overflow-hidden px-6 pb-10 pt-7 text-center text-white md:min-h-[580px]"
        >
          <div className="absolute inset-0 -z-10">
            <Photo
              name={p.photo}
              ratio="h-full w-full"
              sizes="(max-width: 768px) 100vw, 34vw"
              className="transition duration-700 group-hover:scale-[1.04]"
            />
          </div>
          <span
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background: `linear-gradient(to top, rgba(${p.wash}, 0.96) 0%, rgba(${p.wash}, 0.72) 26%, rgba(14, 17, 24, 0.18) 62%, rgba(14, 17, 24, 0.3) 100%)`
            }}
          />
          <span className="tag-pill">{p.tag}</span>
          <span className="block max-w-xs">
            <span className="font-display block text-[2.1rem] md:text-[2.5rem]">{p.title}</span>
            <span className="mt-3 block text-[0.9375rem] leading-relaxed text-white/90">{p.body}</span>
            <span className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold">
              {p.cta}
              <svg className="arrow-ne" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </Link>
      ))}
    </section>
  );
}
