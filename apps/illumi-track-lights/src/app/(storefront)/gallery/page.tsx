import Link from "next/link";
import { SITE_URL } from "@/lib/utils";
import Image from "next/image";

export const metadata = {
  title: "Gallery — Illumi Track Lights",
  description: "Real Canadian homes with Illumi Track Lights installed. See the soffit-mounted LED systems by day and lit up at night.",
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: {
    title: "Gallery — Illumi Track Lights",
    description:
      "Real Canadian homes with Illumi Track Lights installed. See the soffit-mounted LED systems by day and lit up at night.",
    url: `${SITE_URL}/gallery`
  }
};

const SHOTS: Array<{ src: string; alt: string; tag: string; location: string }> = [
  { src: "/images/showcase/install-banner.jpg", alt: "Modern home with Illumi tracks installed", tag: "100 ft kit", location: "London, ON" },
  { src: "/images/showcase/install-home-1.jpg", alt: "Suburban home with soffit-mounted RGBW LEDs", tag: "150 ft kit", location: "Toronto, ON" },
  { src: "/images/showcase/install-home-2.jpg", alt: "Custom-color permanent lighting at night", tag: "200 ft kit", location: "Calgary, AB" },
  { src: "/images/showcase/security-house.webp", alt: "Home with security-white lighting mode", tag: "Security mode", location: "Halifax, NS" },
  { src: "/images/showcase/day.webp", alt: "Tracks blending into the soffit during the day", tag: "Daytime", location: "Ottawa, ON" },
  { src: "/images/showcase/night.webp", alt: "Same home lit up at night in colour", tag: "Nighttime", location: "Ottawa, ON" },
  { src: "/images/showcase/four-seasons.webp", alt: "Seasonal lighting scenes from the same install", tag: "Year-round", location: "Vancouver, BC" },
  { src: "/images/showcase/residential.webp", alt: "Residential property with Illumi tracks", tag: "Residential", location: "Winnipeg, MB" }
];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow text-[var(--color-brand)]">Project gallery</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight md:text-5xl">
        Real homes, <span className="gradient-text">real installs</span>.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        See how customers across Canada are using Illumi Track Lights to transform their homes &mdash;
        every holiday, every season, every night of the year.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHOTS.map((s, i) => (
          <figure
            key={i}
            className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-semibold text-white">
                {s.tag}
              </span>
            </div>
            <figcaption className="flex items-center justify-between gap-2 border-t border-[var(--color-border)] px-4 py-3 text-sm">
              <span className="text-slate-700">{s.location}</span>
              <span className="text-xs text-slate-500">Customer install</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-[var(--color-border)] bg-white p-6 md:flex md:items-center md:justify-between md:gap-6">
        <div>
          <h2 className="font-display text-2xl">Got a great install photo?</h2>
          <p className="mt-2 text-sm text-slate-600">
            Email us at <a className="text-[var(--color-brand)] underline" href="mailto:service@masterdecker.com">service@masterdecker.com</a>{" "}
            and we&rsquo;ll feature your install (with credit) and send you a 15% off code on your next order.
          </p>
        </div>
        <Link href="/diy-kits" className="btn-primary mt-5 inline-flex md:mt-0">Pick your own kit →</Link>
      </div>
    </div>
  );
}
