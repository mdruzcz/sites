import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Star, ShieldCheck, Sparkles, CheckCircle } from "lucide-react";
import { site } from "@/lib/site";
import { getTestimonials } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About GTA Christmas Lights | 35+ Years · 3× Award of Excellence",
  description:
    "Learn about GTA Christmas Lights — three-time Landscape Ontario Award of Excellence winner. 35+ years designing and installing professional Christmas lighting across the Greater Toronto Area.",
  openGraph: {
    title: "About GTA Christmas Lights",
    description:
      "Three-time Landscape Ontario Award of Excellence winner. 35+ years lighting GTA homes and businesses.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  const testimonials = getTestimonials();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: site.url },
              { name: "About", url: `${site.url}/about` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--dark-bg)] py-24 md:py-28 overflow-hidden">
        <Image
          src="/images/gallery-12.png"
          alt="Landscape Ontario Award of Excellence trophy presented to GTA Christmas Lights"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/60 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            About Us
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Lighting the GTA for{" "}
            <span className="text-[var(--accent-gold)]">35+ Years</span>
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            We&apos;re the team behind the most photographed Christmas displays
            in the Greater Toronto Area. Three Landscape Ontario Awards of
            Excellence. Hundreds of returning clients. One promise: a holiday
            you actually enjoy.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
              GTA Christmas Lights — formerly known as LawnSavers Christmas
              Decorators — was founded in Vaughan, Ontario in the late 1980s
              with a simple idea: take the worst part of the holidays (climbing
              ladders, untangling lights, replacing dead bulbs) and turn it into
              the best part — a custom-designed display you come home to.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              Three decades later, we&apos;ve installed on some of the finest
              homes in Toronto, Vaughan, Markham, Oakville, and the rest of the
              GTA. Our team has decorated St. Joseph&apos;s Hospital, the CNE
              grounds, Locale Restaurant, and even film productions including
              Netflix&apos;s <em>The Christmas Chronicles</em>.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              Along the way we&apos;ve earned three Landscape Ontario Awards of
              Excellence for Christmas Holiday Lighting Design and Installation,
              plus the Landscape Lighting Program&apos;s Award of Excellence —
              recognition from our industry for what our clients already know:
              we sweat every detail, and we don&apos;t leave until it looks
              perfect.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Every install includes our Perfect-Until-Christmas-Eve Guarantee.
              If anything stops working, we&apos;re back to fix it. If you want
              to tweak the design, we&apos;ll come adjust. When the season&apos;s
              over, we remove, inventory, and store everything until next year.
              That&apos;s what 35+ years of doing this taught us: the install
              is just the start.
            </p>
          </div>
        </div>
      </section>

      {/* Awards strip */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                src: "/images/award-2018.jpg",
                title: "2018 Award of Excellence",
                desc: "Landscape Ontario · Christmas Holiday Lighting Design &amp; Installation",
              },
              {
                src: "/images/award-2020.jpg",
                title: "2020 Award of Excellence",
                desc: "Landscape Ontario · Christmas Holiday Lighting Design &amp; Installation",
              },
              {
                src: "/images/gallery-12.png",
                title: "Award of Excellence",
                desc: "Landscape Lighting Program",
              },
            ].map((a) => (
              <div key={a.title} className="text-center">
                <div className="relative aspect-[3/4] max-w-[180px] mx-auto rounded-lg overflow-hidden mb-4 border border-[var(--border-dark)]">
                  <Image
                    src={a.src}
                    alt={`${a.title} trophy for GTA Christmas Lights`}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
                <h3 className="font-bold text-white text-base mb-1">
                  {a.title}
                </h3>
                <p
                  className="text-xs text-white/55"
                  dangerouslySetInnerHTML={{ __html: a.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-[var(--background)] py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            What Sets Us Apart
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Why GTA Homeowners Trust Us
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Award,
                title: "Award-Winning Design",
                desc: "3× Landscape Ontario Award of Excellence for Christmas Holiday Lighting. Our designers don't just install — they curate.",
              },
              {
                icon: Sparkles,
                title: "Commercial-Grade LED",
                desc: "Bulbs that shine 5–6× brighter than retail and last 5–10× longer. You own them after year one.",
              },
              {
                icon: ShieldCheck,
                title: "Fully Insured & Certified",
                desc: "WSIB-covered, fully insured, certified for aerial-platform operation and working at heights. Real protection.",
              },
              {
                icon: CheckCircle,
                title: "Hassle-Free Guarantee",
                desc: "Perfect-Until-Christmas-Eve. If anything stops working, we're back to fix it — no charge, no hassle.",
              },
              {
                icon: Star,
                title: "Decades of Reviews",
                desc: "Hundreds of 5-star reviews on Google, HomeStars, and Yelp. The same families come back year after year.",
              },
              {
                icon: Sparkles,
                title: "Full-Service Always",
                desc: "Design, install, maintain, take down, store. The only thing you provide is power.",
              },
            ].map((p) => (
              <div key={p.title} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent)]/10 mb-4">
                  <p.icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-bold text-[var(--foreground)] mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="bg-[var(--dark-bg)] py-20 md:py-24"
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Client Reviews
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Real Clients Say
          </h2>
          <div className="grid gap-5 md:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[var(--accent-gold)] text-[var(--accent-gold)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-white/75 leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-xs text-white/50">
                  <strong className="text-white/80">{t.author}</strong> ·{" "}
                  {t.location} · {t.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--accent)] py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-5"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Add Your Home to the List.
          </h2>
          <p className="text-white/85 mb-8 text-lg">
            Get a free, no-obligation quote. Slots fill fast in October &amp;
            November.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="btn bg-white text-[var(--accent)] hover:bg-white/90 px-10"
            >
              Get a Free Quote
            </Link>
            <Link href="/gallery" className="btn btn-ghost">
              View Our Gallery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
