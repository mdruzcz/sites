import Link from "next/link";
import { Photo } from "@/components/photo";
import { SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icons";
import { AUDIENCES, audienceHref } from "@/lib/site";

/** "Who we supply" — the five buyer segments, each with its own landing page. */
export function UseCases() {
  return (
    <section className="bg-warm">
      <div className="shell section">
        <SectionHeading
          eyebrow="Who we supply"
          title="Built for the people who light whole properties."
          sub="Every segment gets its own product picks, pricing structure and a direct line to a quote. Pick yours."
          action={{ href: "/commercial", label: "Commercial overview" }}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {AUDIENCES.map((a) => (
            <Link key={a.slug} href={audienceHref(a)} className="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]">
              <Photo name={a.photo} ratio="aspect-[4/3]" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px" imgClassName="transition duration-700 group-hover:scale-105" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg leading-tight text-[var(--color-text)] group-hover:text-[var(--color-brand)]">{a.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">{a.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]">
                  See picks &amp; pricing <Icon.arrow size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
