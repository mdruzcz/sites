import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Us - Event Lighting Team",
  description:
    "Meet the team behind Bright Event Lighting: event lighting and holiday decor for weddings, corporate events and Christmas parties in London, Ontario. 200+ events lit.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Bright Event Lighting",
    description: "Event lighting and holiday decor team serving London, ON and Southwestern Ontario.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              as="h1"
              eyebrow="Our Story"
              headline="Lighting Is What We Do. Memories Are What We Make."
            />

            <div className="space-y-6 text-[var(--muted)] leading-relaxed text-lg">
              <p>
                Bright Event Lighting started with a simple observation: most venues, patios
                and backyards look incredible during the day, then fall flat the moment the
                sun goes down. Fluorescent overheads, a few tea lights and DIY string lights
                with one mode, <em>on</em>, are not enough for a wedding, a company gala or
                the office Christmas party.
              </p>
              <p>
                We set out to change that. With professional-grade wireless LED fixtures,
                DMX control, commercial string lighting rigged on proper cable, and a crew
                with lift certification and insurance, we have lit more than 200 events across
                Southwestern Ontario: weddings in barns and ballrooms, corporate galas and
                launches, holiday parties in offices and homes, and seasonal displays for
                lobbies, plazas and shopping malls.
              </p>
              <p>
                From October through January the same team installs holiday decor: lit
                garlands, oversized wreaths, decorated trees and exterior roofline lighting,
                maintained through the season and removed when it ends. Whatever the event,
                we design the light around your timeline, install it before guests arrive,
                run it live where a technician is included, and take it all down after.
                We do not set it and forget it. We perform it.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-12">
              <div className="card p-6 text-center">
                <p className="text-3xl font-extrabold text-[var(--accent)]">200+</p>
                <p className="text-sm text-[var(--muted)] mt-1">Events Lit</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-3xl font-extrabold text-[var(--accent)]">5.0</p>
                <p className="text-sm text-[var(--muted)] mt-1">Google Rating</p>
              </div>
              <div className="card p-6 text-center">
                <p className="text-3xl font-extrabold text-[var(--accent)]">9</p>
                <p className="text-sm text-[var(--muted)] mt-1">Lighting & Decor Services</p>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">What Sets Us Apart</h2>
              <div className="space-y-6">
                <div className="card p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-2">DMX Control, Not DIY Guesswork</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    Every fixture in our inventory is individually addressable via DMX.
                    That means precise colour matching, real-time dimming scenes, and
                    synchronized transitions that a consumer-grade setup simply cannot
                    achieve.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-2">Wireless Everything</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    Our LED uplights run on rechargeable batteries — no extension cords
                    snaking across the dance floor, no circuit breakers tripping at 10 PM.
                    Setup takes 90 minutes, teardown takes 30.
                  </p>
                </div>
                <div className="card p-6">
                  <h3 className="font-bold text-[var(--foreground)] mb-2">A Technician, Not Just Equipment</h3>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    Wedding, gala and party packages include an on-site technician for the
                    evening. They coordinate with your DJ or MC, react to your timeline and
                    make sure the lighting matches every moment, from the first speech to
                    last call. Seasonal decor installs get a mid-season check instead.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/contact" className="btn btn-primary min-h-[48px] px-8">
                Check Your Date
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
