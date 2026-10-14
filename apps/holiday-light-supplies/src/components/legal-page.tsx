import { Breadcrumbs } from "@/components/ui";

export function LegalPage({ title, updated, sections, intro }: { title: string; updated: string; intro?: string; sections: { h: string; p: string[] }[] }) {
  const date = new Date(updated + "T00:00:00").toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="bg-white">
      <div className="shell py-10 md:py-14">
        <Breadcrumbs items={[{ label: title }]} />
        <article className="mx-auto mt-6 max-w-[72ch]">
          <h1 className="font-display text-3xl md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Last updated {date}</p>
          {intro && <p className="lead mt-6 text-[var(--color-text-soft)]">{intro}</p>}
          {sections.map((s) => (
            <section key={s.h} className="mt-10">
              <h2 className="font-display text-xl md:text-2xl">{s.h}</h2>
              {s.p.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-[var(--color-text-soft)]">{p}</p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
