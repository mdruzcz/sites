import type { Metadata } from "next";
import Image from "next/image";
import { NavBar, WhyUs, Testimonials, Contact, Footer } from "../_components/sections";

export const metadata: Metadata = {
  title: "About Woodstock Deck & Fence | Oxford County's Trusted Deck & Fence Builders",
  description:
    "Learn about Woodstock Deck & Fence — locally owned Oxford County deck and fence contractors committed to the Woodstock Standard: deep posts, premium materials, and a 5-year warranty.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Woodstock Deck & Fence", description: "Locally owned deck and fence contractors serving Woodstock and Oxford County with a 5-year workmanship warranty." },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <main>
      <NavBar homeHref="/" />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>About Us</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6">
            Expert Deck &amp; Fence Contractors in Woodstock, ON
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Woodstock&apos;s Trusted Deck &amp; Fence Builders — Quality Construction in Oxford County
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar)" }}>Our Story</p>
              <h2 className="font-serif text-4xl font-bold mb-6" style={{ color: "var(--forest)" }}>Built Different from Day One</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Woodstock Deck &amp; Fence was founded with a simple mission: to give our neighbours in Woodstock and the surrounding Oxford County area outdoor structures that are as durable as they are beautiful. We saw too many fences leaning after just one Ontario winter and too many decks failing due to poor footings. We decided to do things differently.
                </p>
                <p>
                  We don&apos;t just build &ldquo;projects&rdquo; — we build the backdrop for your family BBQs, your children&apos;s birthdays, and your summer relaxation. That means every detail matters, from the depth of the post holes to the grade of lumber we specify.
                </p>
                <p>
                  We&apos;re locally owned and operated. We live where we work, and our reputation in the Woodstock community is our most valuable asset. Every build we complete is a reference for the next homeowner who asks their neighbour: &ldquo;Who built that?&rdquo;
                </p>
              </div>
            </div>
            <div className="relative h-80 lg:h-full rounded-2xl overflow-hidden">
              <Image
                src="/images/legacy/Custom-Deck-Design-Installation.png"
                alt="Custom deck construction by Woodstock Deck and Fence in Oxford County, Ontario"
                fill className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Woodstock Standard */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-80 lg:h-full rounded-2xl overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/legacy/Professional-Fencing-Solutions.png"
                alt="Professional fence installation in Woodstock, Ontario by Woodstock Deck and Fence"
                fill className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Our Philosophy</p>
              <h2 className="font-serif text-4xl font-bold text-white mb-6">The &ldquo;Woodstock Standard&rdquo;</h2>
              <p className="text-white/70 leading-relaxed mb-8">
                We believe a deck or fence is only as good as what&apos;s underneath it. In our region, the heavy clay soil and deep winter freezes can wreak havoc on poorly installed structures. That&apos;s why we hold ourselves to the Woodstock Standard.
              </p>
              <div className="space-y-5">
                {[
                  { title: "Deep Foundations", desc: "Every post we set goes 4 feet deep — guaranteed. This ensures your structure stays plumb through decades of Ontario freeze-thaw cycles." },
                  { title: "Local Compliance", desc: "We are experts in City of Woodstock by-laws, pool safety codes and Oxford County permit requirements." },
                  { title: "Quality Materials", desc: "We source premium lumber and top-tier composites and vinyl designed to survive the Canadian climate — not big-box specials." },
                ].map((s) => (
                  <div key={s.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--cedar)" }}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{s.title}</h3>
                      <p className="text-sm text-white/65 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
