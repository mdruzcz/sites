import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const badges = [
  "Custom Concrete Pads",
  "Site Preparation",
  "High-Quality Materials",
  "Precision Leveling",
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-20">
      {/* ── Background image ── */}
      <Image
        src="/images/hero-bg.jpg"
        alt={`Professional hot tub pad installation by ${site.name} in Ontario`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* ── Gradient overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(34,48,53,0.92) 0%, rgba(34,48,53,0.7) 50%, rgba(34,48,53,0.35) 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 py-20 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge / pill */}
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange" />
            </span>
            Serving Ontario
          </span>

          {/* Heading */}
          <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            We Do Hot Tub Pads
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
            Expert Installation of Long-Lasting concrete pads for your spa.
          </p>

          {/* Checkmark badges */}
          <div className="mb-10 flex flex-wrap gap-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
              >
                <svg
                  className="h-4 w-4 shrink-0 text-orange"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {badge}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex min-h-11 items-center rounded-full bg-orange px-8 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-dark"
            >
              Get A Quote
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center rounded-full border-2 border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* ── Wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
            fill="#f1f3f1"
          />
        </svg>
      </div>
    </section>
  );
}
