import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { blurDataURL } from "@/lib/blur";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About K&M Kitchen Renovations | Meet Kyle & Matt",
  description:
    "Meet Kyle and Matt — the founders of K&M Kitchen Renovations. Learn how their shared passion for property renovation led to Southwestern Ontario's most trusted kitchen renovation team.",
  openGraph: {
    title: "About K&M Kitchen Renovations | Meet the Team",
    description: "Learn about K&M's founders, their philosophy, and why London homeowners trust them with their kitchens.",
    images: [{ url: "/images/kitchen-1.jpg" }],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/kitchen-1.jpg" alt="K&M Kitchen Renovations team at work" fill className="object-cover" priority placeholder="blur" blurDataURL={blurDataURL(8, 5)} />
          <div className="absolute inset-0 bg-[var(--navy-900)]/85" />
        </div>
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <div className="eyebrow justify-center">Our Story</div>
          <h1 className="h-display text-white text-5xl lg:text-6xl mb-6">
            Passionate About{" "}
            <span className="text-[var(--gold)]">Beautiful Kitchens</span>
          </h1>
          <p className="text-white/75 text-xl max-w-2xl mx-auto">
            Two renovation enthusiasts who found their calling — and built Southwestern Ontario&apos;s most trusted kitchen renovation company.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="eyebrow">The Journey</div>
              <h2 className="h-display text-[var(--navy)] text-4xl mb-6">
                From Renovation Projects to Kitchen Specialists
              </h2>
              <div className="space-y-5 text-[var(--slate)] leading-relaxed">
                <p>
                  K&M Kitchen Renovations was born from a simple realization. Kyle and Matt had spent years renovating properties across Southwestern Ontario, and every single time, it was the kitchen that made the biggest difference — to the home&apos;s value, its functionality, and how much families loved living in it.
                </p>
                <p>
                  That insight changed everything. Instead of being generalists, Kyle and Matt made a bold decision: specialize completely in kitchens (and the spaces connected to them). Put all their energy, expertise, and relationships into becoming the absolute best kitchen renovation team in the region.
                </p>
                <p>
                  More than a decade later, that decision has paid off for hundreds of homeowners across London, St. Thomas, Woodstock, and beyond. K&M Kitchen Renovations has built a reputation for exceptional craftsmanship, honest pricing, and a renovation experience that feels remarkably smooth.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden img-overlay">
                <Image src="/images/kitchen-4.jpg" alt="K&M kitchen renovation – custom cabinetry project" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-2xl overflow-hidden img-overlay">
                  <Image src="/images/kitchen-3.jpg" alt="Completed kitchen renovation by K&M" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
                </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden img-overlay">
                  <Image src="/images/kitchen-5.jpg" alt="White shaker kitchen by K&M Kitchen Renovations" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-[var(--navy)]">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="eyebrow justify-center">Our Philosophy</div>
          <h2 className="h-display text-white text-4xl lg:text-5xl mb-6">
            The Kitchen is the{" "}
            <span className="text-[var(--gold)]">Heart of the Home</span>
          </h2>
          <p className="text-white/75 text-xl mb-14 max-w-3xl mx-auto leading-relaxed">
            We believe a great kitchen isn&apos;t just about looks. It&apos;s about how your family lives, connects, and creates memories. Every kitchen we build is designed around the people who will use it every day.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { title: "Tailored Designs", icon: "📐", desc: "No two kitchens are identical. We design every space around your specific lifestyle, preferences, and home's architecture." },
              { title: "Quality Craftsmanship", icon: "🏆", desc: "We use only premium materials and experienced craftsmen. Every cabinet, countertop, and finish is chosen for durability and beauty." },
              { title: "Client-First Process", icon: "🤝", desc: "You're involved at every step. We keep communication open, timelines transparent, and surprises to zero." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-white text-xl mb-3">{v.title}</h3>
                <p className="text-white/65 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team + Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden img-overlay">
              <Image src="/images/kitchen-9.jpg" alt="Beautiful kitchen renovation completed by K&M in Southwestern Ontario" fill className="object-cover" placeholder="blur" blurDataURL={blurDataURL()} />
            </div>
            <div>
              <div className="eyebrow">Our Team</div>
              <h2 className="h-display text-[var(--navy)] text-4xl mb-6">
                A Small Team with High Standards
              </h2>
              <p className="text-[var(--slate)] text-lg leading-relaxed mb-6">
                We deliberately keep our team small. K&M takes on {SITE.projectsPerYear} kitchen renovation projects per year — not because we can&apos;t handle more, but because we refuse to compromise on quality or client experience.
              </p>
              <p className="text-[var(--slate)] leading-relaxed mb-8">
                That means Kyle or Matt is hands-on at every project, our installers are experienced and consistent, and our clients always know who&apos;s working in their home. We&apos;re not a faceless renovation company — we&apos;re your renovation team.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { n: "10+", l: "Years in Business" },
                  { n: "2 Wks", l: "Average Timeline" },
                  { n: "5–10", l: "Projects Per Year" },
                  { n: "100%", l: "Client Satisfaction" },
                ].map((s) => (
                  <div key={s.l} className="p-4 bg-[var(--surface)] rounded-xl border border-[var(--border)] text-center">
                    <div className="text-3xl font-extrabold text-[var(--gold)]">{s.n}</div>
                    <div className="text-xs font-semibold text-[var(--slate)] mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-primary">
                Work With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--gold)]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="h-display text-[var(--navy-900)] text-3xl lg:text-4xl mb-4">
            Ready to Transform Your Kitchen?
          </h2>
          <p className="text-[var(--navy-800)] text-lg mb-8">
            Get a free, no-obligation quote from Kyle and Matt. We serve London, St. Thomas, Woodstock, and surrounding communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-navy">Get a Free Quote</Link>
            <a href={`tel:${SITE.phonePlain}`} className="btn bg-white text-[var(--navy)] hover:bg-[var(--stone)] shadow-sm">
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
