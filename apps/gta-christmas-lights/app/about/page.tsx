import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck, Sparkles, CheckCircle, Calendar, CreditCard } from "lucide-react";
import { site } from "@/lib/site";
import { getTestimonials } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About | GTA Christmas Lighting · Professional Holiday Lighting",
  description:
    "About GTA Christmas Lighting — bringing festive cheer to the Greater Toronto Area. Custom Christmas, Diwali, Hanukkah, and permanent lighting. Rental or purchase. Free quotes across the GTA.",
  openGraph: {
    title: "About GTA Christmas Lighting",
    description:
      "Bringing festive cheer to the Greater Toronto Area with custom holiday lighting for every celebration.",
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
          src="/images/project-night-2.jpg"
          alt="Stunning Christmas light display on a GTA home at night by GTA Christmas Lighting"
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
            Bringing Festive Cheer to the{" "}
            <span className="text-[var(--accent-gold)]">Greater Toronto Area</span>
          </h1>
          <p className="mt-6 text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            We specialize in transforming homes and businesses into festive
            wonderlands — whether you&apos;re celebrating Christmas, Diwali,
            Hanukkah, or any other festive occasion.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[var(--background)] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[var(--foreground)] leading-relaxed mb-6">
              At GTA Christmas Lighting, our mission is simple: take the hardest
              part of the holidays — climbing ladders, untangling lights,
              chasing dead bulbs — and turn it into something you actually look
              forward to.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              We&apos;re a Greater Toronto Area team of professional installers,
              designers, and seasonal-lighting specialists. Each year we plan,
              design, and install custom displays for hundreds of homes and
              businesses — from compact downtown Toronto rowhouses to sweeping
              estates in Kleinburg, Vaughan, and Oakville.
            </p>
            <p className="text-[var(--muted)] leading-relaxed mb-6">
              Our service is intentionally all-inclusive. You don&apos;t need
              to provide lights, ladders, equipment, or expertise — just
              power. We bring the rest: custom-cut professional LEDs,
              aerial-lift equipment, working-at-heights certification, full
              insurance, and design experience that makes every property look
              its best.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              We&apos;re a year-round business too. Our season runs October 1
              through January 31, with permanent LED installations and interior
              decorating available all year. Every install is backed by
              in-season maintenance — if a bulb fails or a strand needs
              adjustment, we&apos;re back to fix it.
            </p>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="bg-[var(--dark-surface)] py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: Calendar,
                title: "Our Season",
                desc: "October 1 – January 31. Installs continue right up until the week before Christmas. Permanent LED available year-round.",
              },
              {
                icon: Sparkles,
                title: "Every Celebration",
                desc: "Christmas, Diwali, Hanukkah, and special occasions. Custom lighting tailored to your tradition and your property.",
              },
              {
                icon: CreditCard,
                title: "Payment Options",
                desc: "Visa, MasterCard, American Express, cash, and cheques. Transparent quotes — no surprises.",
              },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-[var(--accent)]/10 mb-4">
                  <f.icon className="h-5 w-5 text-[var(--accent-gold)]" />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{f.desc}</p>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "Experienced Professionals",
                desc: "Our team has years of experience in holiday lighting and decoration — we bring expertise and creativity to every project.",
              },
              {
                icon: Sparkles,
                title: "Customized Designs",
                desc: "Custom lighting designs that enhance the beauty of your property, making it stand out during the festive season.",
              },
              {
                icon: Sparkles,
                title: "High-Quality Materials",
                desc: "We use only the best materials and energy-efficient LED lights to ensure your display is bright, beautiful, and durable.",
              },
              {
                icon: CheckCircle,
                title: "Full-Service Installation",
                desc: "From planning and installation to maintenance and takedown, we handle everything so you can enjoy a stress-free holiday season.",
              },
              {
                icon: ShieldCheck,
                title: "Safety First",
                desc: "We prioritize safety in all our installations, following strict guidelines to ensure your home and our team remain safe.",
              },
              {
                icon: Star,
                title: "Five-Star Reviews",
                desc: "Hundreds of 5-star reviews from clients across Toronto, Mississauga, Oakville, Richmond Hill, Markham, and beyond.",
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
      <section id="testimonials" className="bg-[var(--dark-bg)] py-20 md:py-24">
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
                <p className="text-xs text-white/55">
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
            Ready to Light Up Your Home?
          </h2>
          <p className="text-white/85 mb-8 text-lg">
            Send us a photo — get a free quote the same day. Installs run
            October through December.
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
