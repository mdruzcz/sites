import Link from "next/link";
import { Photo } from "@/components/photo";
import { SectionHeading } from "@/components/ui";

const SHOTS: { key: string; label: string }[] = [
  { key: "downtown-boulevard", label: "Downtown boulevard, warm white wraps + blue uplights" },
  { key: "mall-atrium-tree", label: "Shopping mall atrium tree" },
  { key: "office-tower", label: "Office tower entrance" },
  { key: "town-park-arch", label: "Town park entrance arch" },
  { key: "lobby-archway", label: "Lobby light tunnel" },
  { key: "commercial-roofline", label: "Commercial roofline C9" },
  { key: "golden-cone-tree", label: "Giant cone tree, city plaza" },
  { key: "mall-santa-cabin", label: "Santa set, shopping centre" }
];

/** Real installs of the product we ship — the strongest proof on the page. */
export function ProjectsStrip() {
  return (
    <section className="bg-[var(--color-bg-warm)]">
      <div className="shell section">
        <SectionHeading
          eyebrow="Real installs"
          title="Seen on main streets, in malls and at town squares across Ontario."
          sub="The same C9 bulbs, tree wraps, displays and garland we ship to your door, photographed on site."
          action={{ href: "/gallery", label: "View the gallery" }}
        />
      </div>
      <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-8 sm:px-6">
        {SHOTS.map((s) => (
          <Link key={s.key} href="/gallery" className="group relative min-w-[260px] snap-start overflow-hidden rounded-2xl md:min-w-[320px]">
            <Photo name={s.key} ratio="aspect-[4/3]" sizes="320px" imgClassName="transition duration-700 group-hover:scale-105" scrim="strong" />
            <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-white">{s.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
