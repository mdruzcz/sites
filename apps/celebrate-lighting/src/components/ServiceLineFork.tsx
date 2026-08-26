import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The two-path chooser: permanent track vs seasonal C9.
 *
 * These are different products for different buyers, and sending both
 * audiences down one funnel was costing conversions. This is the fork.
 *
 * On the permanent card we have a real install photo. On the seasonal card
 * we deliberately do NOT — every roofline photo in the library is permanent
 * track, and dressing one up as C9 would repeat the exact mislabelling this
 * redesign set out to fix. A stylised C9 swag reads as illustration, not as
 * a photograph of work we can't show yet. Swap in a real C9 photo the
 * moment one exists.
 */

function C9Illustration() {
  /* Two swags of large-bulb C9 on a catenary wire. Alternating classic
     multicolour so it reads instantly as "traditional Christmas lights". */
  const bulbs = [
    "#f2c14e", "#e05b4b", "#4bb3e0", "#5fbf6a", "#f2c14e",
    "#e05b4b", "#4bb3e0", "#5fbf6a", "#f2c14e", "#e05b4b",
  ];
  return (
    <svg viewBox="0 0 400 150" className="w-full h-full" role="img" aria-label="Illustration of classic large-bulb C9 Christmas lights strung along a roofline">
      <defs>
        <radialGradient id="c9glow">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* roofline */}
      <path d="M0 44 L200 14 L400 44" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" fill="none" />
      {bulbs.map((c, i) => {
        const t = i / (bulbs.length - 1);
        const x = 22 + t * 356;
        // follow the roof pitch, sagging slightly between fixings
        const roofY = x <= 200 ? 44 - (x / 200) * 30 : 14 + ((x - 200) / 200) * 30;
        const y = roofY + 16;
        return (
          <g key={i}>
            <line x1={x} y1={roofY} x2={x} y2={y - 7} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <circle cx={x} cy={y + 4} r="17" fill="url(#c9glow)" opacity="0.5" />
            <ellipse cx={x} cy={y + 3} rx="6.5" ry="8.5" fill={c} />
            <ellipse cx={x - 2} cy={y} rx="2" ry="2.6" fill="#fff" opacity="0.55" />
          </g>
        );
      })}
    </svg>
  );
}

export function ServiceLineFork({
  city,
  heading,
  compact = false,
}: {
  /** When set, the copy and links localise to this city. */
  city?: string;
  heading?: string;
  compact?: boolean;
}) {
  const citySuffix = city ? ` in ${city}` : "";
  const citySlug = city ? city.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "") : null;

  const cards = [
    {
      slug: "permanent-lighting",
      kicker: "Up all year",
      name: "Permanent Lighting",
      pitch:
        "Colour-matched LED track fitted into your soffit, controlled from your phone. One install, then every night is yours — Christmas, Halloween, game day, or just warm white.",
      points: ["One-time cost, no annual bill", "16 million+ colours, app-controlled", "Lifetime warranty, −40°C rated"],
      cta: site.demo.cta,
      ctaNote: "Free on-site demo first",
      accent: "var(--accent)",
      photo: "/images/project-brantford.jpg",
      photoAlt: `Bungalow with permanent LED roofline lighting in cool blue, installed by Celebrate Lighting${citySuffix || " in Brantford, Ontario"}`,
    },
    {
      slug: "seasonal-lighting",
      kicker: "Christmas only",
      name: "Seasonal C9 Lighting",
      pitch:
        "The classic big-bulb look, custom-cut to your rooflines. We hang it in the fall, service it all season, then take it down and store it in January.",
      points: ["Install, service, takedown & storage", "Rent or buy the lights", "Nothing to store, no ladders"],
      cta: site.seasonal.cta,
      ctaNote: `Book by ${site.seasonal.deadline} for best rates`,
      accent: "var(--gold)",
      photo: null,
      photoAlt: null,
    },
  ];

  return (
    <section
      className={compact ? "py-14" : "py-20 md:py-24"}
      style={{ background: "var(--surface-2)" }}
      aria-labelledby="line-fork-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <p className="section-eyebrow mb-3">Two ways to light your home</p>
          <h2
            id="line-fork-heading"
            className="font-display text-3xl md:text-[2.5rem] font-extrabold text-[var(--foreground)] tracking-tight text-balance"
          >
            {heading ??
              (city
                ? `Looking for permanent or seasonal lighting in ${city}?`
                : "Permanent or seasonal? Start here.")}
          </h2>
          <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
            {city
              ? "You're in the right place — we do both across the city. They suit different people, so pick the one that sounds like you."
              : "We do both, and they suit very different people. Pick the one that sounds like you and we'll take it from there."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.slug} className="card overflow-hidden flex flex-col">
              {/* Visual band */}
              <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "var(--deep)" }}>
                {card.photo ? (
                  <Image
                    src={card.photo}
                    alt={card.photoAlt ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <C9Illustration />
                  </div>
                )}
                <span
                  className="absolute top-4 left-4 text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: card.accent, color: "#04121a" }}
                >
                  {card.kicker}
                </span>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <h3 className="font-display text-xl font-bold text-[var(--foreground)] mb-2.5">{card.name}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">{card.pitch}</p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--foreground)]">
                      <svg
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: card.accent }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link
                    href={citySlug ? `/${card.slug}/${citySlug}` : `/${card.slug}`}
                    className="btn w-full justify-center"
                    style={{ background: card.accent, color: "#04121a" }}
                  >
                    {city ? `${card.name}${citySuffix}` : `Explore ${card.name}`}
                  </Link>
                  <p className="text-xs text-[var(--muted)] text-center mt-3">{card.ctaNote}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[var(--muted)] mt-8">
          Not sure which fits?{" "}
          <a href={site.phoneHref} className="font-semibold text-[var(--accent)] hover:underline">
            Call {site.phone}
          </a>{" "}
          and we&apos;ll talk it through — or see the{" "}
          <Link href="/permanent-lighting#compare" className="font-semibold text-[var(--accent)] hover:underline">
            side-by-side comparison
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
