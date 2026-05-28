import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Users, Calendar, Truck, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Us — London's Professional Christmas Light Installers",
  description:
    "Meet the Christmas Lights London team — 7 professionals with 5+ years serving London, ON. Custom-cut LED lights, aerial lift equipment, no ladders. Learn our story.",
  openGraph: {
    title: "About Christmas Lights London | Professional Lighting Team in London, ON",
    description: "7-person team, 5+ years experience, aerial lift equipment. We make Christmas lights completely hands-free for London Ontario homeowners and businesses.",
    url: `${site.url}/about`,
  },
};

const values = [
  {
    icon: Users,
    title: "A Team You Can Trust",
    description: "Our 7-person team is fully trained, professional, and respectful of your property. We treat every home as if it were our own.",
  },
  {
    icon: Calendar,
    title: "5+ Years of Experience",
    description: "We've been transforming homes and businesses across Southwestern Ontario for over five years, building a reputation for quality and reliability.",
  },
  {
    icon: Truck,
    title: "Professional Equipment",
    description: "Two aerial lift vehicles with 30-foot platform height let us safely reach any part of your home without ladders or scaffolding.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
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
      <section className="relative bg-[var(--dark-bg)] py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/IMG_8251-scaled-1.jpg"
          alt="Christmas Lights London team installing professional holiday lights on a home"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-bg)]/50 to-[var(--dark-bg)]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-[var(--accent-gold)] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
            About Us
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            London&apos;s Most Trusted Christmas Light Installers
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            We&apos;re a dedicated team of 7 professionals who have spent over five years making
            Christmas lights completely stress-free for homeowners and businesses across London, Ontario.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-5xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/IMG_7746-scaled-1.jpg"
                alt="Christmas Lights London team members installing custom holiday lights on London Ontario home"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                Our Story
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                Making Holidays Brighter Since Day One
              </h2>
              <div className="space-y-4 text-[var(--muted)] text-sm leading-relaxed">
                <p>
                  Christmas Lights London was founded with a simple mission: take the stress, danger,
                  and hassle out of Christmas lights for London, Ontario homeowners and businesses.
                </p>
                <p>
                  Over the past five years, our team has grown to 7 dedicated professionals who care
                  deeply about the quality of every installation. We&apos;ve invested in professional
                  equipment — including two aerial lift vehicles with 30-foot platforms — so we can
                  safely and efficiently work on any property.
                </p>
                <p>
                  We custom-cut every strand to fit your specific home, use only professional-grade
                  LED lights, and handle everything from installation to end-of-season takedown and
                  storage. Our clients don&apos;t lift a finger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--dark-bg)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-[var(--accent-gold)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            Why We&apos;re Different
          </p>
          <h2
            className="text-center text-3xl md:text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            What Sets Us Apart
          </h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card-dark p-8 text-center">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-[var(--accent)]/10 mb-5">
                    <Icon className="h-8 w-8 text-[var(--accent)]" />
                  </div>
                  <h3
                    className="text-lg font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Photo */}
      <section className="bg-[var(--background)] py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-[var(--accent)] text-xs tracking-[0.25em] uppercase font-semibold mb-4">
                Our Commitment
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight mb-6"
                style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
              >
                A Team That Goes the Extra Mile
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  "Fully trained, professional team of 7",
                  "Aerial lift equipment for any height",
                  "Custom-cut lights for every home",
                  "Season-long guarantee on all work",
                  "On standby for repairs all season",
                  "Organized takedown and labelled storage",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm text-[var(--muted)]">
                    <CheckCircle className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    {point}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn btn-primary min-h-[48px]">
                  Get a Free Quote
                </Link>
                <a
                  href={site.phoneHref}
                  className="btn btn-ghost-dark min-h-[48px] flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {site.phone}
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/27256059-7F7B-4F87-84D9-B8145D09FABC-scaled-1.jpg"
                alt="Christmas Lights London team ready for a professional holiday light installation job"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--accent)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
          >
            Ready to Experience the Difference?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of London homeowners who trust us with their holiday lighting every year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn bg-white text-[var(--accent)] hover:bg-white/90 min-h-[48px] px-8 font-bold"
            >
              Get a Free Quote
            </Link>
            <a
              href={site.phoneHref}
              className="btn border-2 border-white/50 text-white hover:border-white min-h-[48px] px-8 flex items-center gap-2 justify-center"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
