import Link from "next/link";
import { Photo } from "@/components/photo";
import type { PhotoKey } from "@/lib/photos";

const SCENES: { photo: PhotoKey; caption: string; span?: string }[] = [
  { photo: "home-green-roofline", caption: "St. Patrick's green", span: "md:col-span-2 md:row-span-2" },
  { photo: "home-red-canada-day", caption: "Canada Day red & white" },
  { photo: "home-pink-magenta", caption: "Valentine's magenta" },
  { photo: "home-rainbow", caption: "Full-spectrum rainbow" },
  { photo: "home-blue-app-control", caption: "Cool blue, set from the app", span: "md:col-span-2" },
  { photo: "home-nighttime-lit", caption: "Warm white, every night" },
  { photo: "home-teal-backyard", caption: "Teal across the backyard" },
  { photo: "farmhouse-roofline-dusk", caption: "Farmhouse eaves at dusk" },
  { photo: "stone-bungalow-night", caption: "Bright white at the front entry" }
];

export function Gallery() {
  return (
    <section className="bg-[var(--color-bg-tint)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="reveal max-w-2xl">
            <p className="eyebrow-plain">Real installs</p>
            <h2 className="font-display h2-fluid mt-3 text-[var(--color-text)]">
              Every colour. Same set of lights.
            </h2>
            <p className="lead mt-5 text-[var(--color-text-soft)]">
              These are all the same aluminum-tracked RGBW system — the only thing that changes is the scene
              selected in the app.
            </p>
          </div>
          <Link href="/permanent-lights" className="btn-primary">
            Build your system
          </Link>
        </div>

        <div className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-4 md:auto-rows-[220px] md:grid-cols-4 md:gap-5">
          {SCENES.map((s) => (
            <figure
              key={s.photo}
              className={`reveal-sm group relative isolate overflow-hidden rounded-[14px] border border-[var(--color-border)] shadow-[var(--shadow-xs)] ${s.span ?? ""}`}
            >
              <Photo
                name={s.photo}
                ratio="h-full w-full"
                sizes="(max-width: 768px) 50vw, 25vw"
                scrim="soft"
                className="h-full transition duration-500 group-hover:scale-[1.05]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-xs font-semibold text-white md:text-sm">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
