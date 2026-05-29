import Image from "next/image";
import Link from "next/link";

export function WhoItsFor() {
  const cards = [
    {
      title: "DIY Kits",
      tag: "Most popular",
      body: "Complete soffit-track kits from 50–200 ft. Install in a weekend with included instructions.",
      href: "/diy-kits",
      image: "/images/showcase/install-home-1.jpg"
    },
    {
      title: "Residential",
      tag: "Homeowners",
      body: "Make your home the standout on the block. Year-round accent + every holiday from one install.",
      href: "/about",
      image: "/images/showcase/residential.webp"
    },
    {
      title: "Pro Installers",
      tag: "Wholesale",
      body: "Tier pricing, priority shipping, and referral leads from homeowners in your area.",
      href: "/professional-installer",
      image: "/images/showcase/install-home-2.jpg"
    }
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="max-w-3xl">
          <p className="eyebrow text-[var(--color-brand)]">What are you looking for?</p>
          <h2 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
            One product line.<br />
            <span className="gradient-text">Three ways to get it.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-night)]/80 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--color-brand)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {c.tag}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-display text-2xl">{c.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-slate-600">{c.body}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)]">
                  Learn more →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
