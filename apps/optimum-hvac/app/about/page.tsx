import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "About Dino | Optimum HVAC | Burgessville, Oxford County",
  description: `Meet Dino — founder of Optimum HVAC, TSSA G2 certified gas technician based in Burgessville, ON. Originally from Greece, serving Oxford County since 2019 with honesty and hard work.`,
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--navy)] text-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow-cool">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Meet Dino — The Tech Behind Optimum HVAC
          </h1>
          <p className="text-white/70 text-lg max-w-2xl">
            TSSA G2 certified gas technician. Founded 2019. Based in Burgessville, Oxford County.
            Hard work, honesty, and genuine care for every customer.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div>
                <p className="eyebrow">Our Story</p>
                <h2 className="text-3xl font-extrabold text-[var(--navy)] mb-5">
                  Built on Hard Work & Honesty
                </h2>
                <div className="space-y-4 text-[var(--slate)] leading-relaxed">
                  <p>
                    My name is Dino. I came to Canada from Greece with a simple belief: if you work hard,
                    treat people right, and do quality work, the rest takes care of itself.
                  </p>
                  <p>
                    I founded Optimum HVAC in 2019 right here in Burgessville. Since then, I&apos;ve built
                    a reputation across Oxford County for being straight with people — no upsells they don&apos;t
                    need, no inflated quotes, no runarounds. You call me, I show up, I tell you exactly what&apos;s
                    going on, and I fix it properly.
                  </p>
                  <p>
                    As a TSSA G2 certified gas technician, I&apos;m licensed to do the work right and legally.
                    Every furnace I install, every heat pump I commission, every gas line I touch is done to
                    code and backed by my name. That matters to me — and it should matter to you.
                  </p>
                  <p>
                    Whether it&apos;s a furnace dying at midnight in January or a family that needs help
                    navigating heat pump rebates, I&apos;m here. Oxford County neighbours deserve honest,
                    skilled HVAC service — and that&apos;s what I&apos;ve been delivering since day one.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { icon: "💪", title: "Hard Work", desc: "On every job, start to finish. No shortcuts." },
                  { icon: "🤝", title: "Honesty", desc: "Straight talk. You hear the truth, not a sales pitch." },
                  { icon: "❤️", title: "Helping People", desc: "Your comfort and safety come first, always." },
                ].map((v) => (
                  <div key={v.title} className="card p-4 text-center">
                    <div className="text-3xl mb-2">{v.icon}</div>
                    <h3 className="font-bold text-[var(--navy)] text-sm mb-1">{v.title}</h3>
                    <p className="text-xs text-[var(--slate)] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>

              {/* Credentials */}
              <div>
                <h2 className="text-xl font-extrabold text-[var(--navy)] mb-4">Credentials & Certifications</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { cert: "TSSA G2 Certified", note: "Licensed gas technician — required by Ontario law" },
                    { cert: "HRAI Member", note: "Heating, Refrigeration & Air Conditioning Institute" },
                    { cert: "WSIB Clearance", note: "Fully covered — you're protected on every job" },
                    { cert: "Fully Insured", note: "Commercial liability insurance on all work" },
                  ].map(({ cert, note }) => (
                    <div key={cert} className="card px-4 py-3 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[var(--cool)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm font-bold text-[var(--navy)]">{cert}</span>
                      </div>
                      <p className="text-xs text-[var(--slate)] pl-6">{note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--slate)] bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded-full">
                    🗓️ Serving Oxford County since 2019
                  </span>
                  <span className="text-xs font-semibold text-[var(--slate)] bg-[var(--surface)] border border-[var(--border)] px-3 py-1.5 rounded-full">
                    🇬🇷 Originally from Greece
                  </span>
                </div>
              </div>
            </div>

            {/* Photos grid */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] col-span-2">
                  <Image
                    src="/images/dino-brazing-hvac.jpg"
                    alt="Dino performing brazing work on an HVAC evaporator coil — Optimum HVAC, Oxford County"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <Image
                    src="/images/dino-inspecting-coil.jpg"
                    alt="Dino inspecting an evaporator coil during HVAC repair — Optimum HVAC"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-square">
                  <Image
                    src="/images/dino-hvac-work.jpg"
                    alt="Dino performing refrigerant brazing on an HVAC system — Optimum HVAC Oxford County"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
              <div className="card p-5 bg-[var(--surface)] text-center">
                <p className="text-sm text-[var(--slate)] italic leading-relaxed">
                  &ldquo;I believe in hard work, helping people, and being straight and honest.
                  That&apos;s what Optimum HVAC is built on.&rdquo;
                </p>
                <p className="mt-2 font-bold text-[var(--navy)] text-sm">— Dino, Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work photos gallery */}
      <section className="section-sm bg-[var(--surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="eyebrow">Real Work, Real Results</p>
            <h2 className="text-2xl font-extrabold text-[var(--navy)]">From the Job Site</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="/images/furnace-installation-basement.jpg"
                alt="High-efficiency furnace installation in Oxford County basement — Optimum HVAC"
                fill className="object-cover" sizes="33vw"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="/images/payne-furnace-installation.jpg"
                alt="Payne furnace installation by Optimum HVAC, Burgessville ON"
                fill className="object-cover" sizes="33vw"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="/images/dino-brazing-close.jpg"
                alt="Dino brazing refrigerant lines during AC service — Optimum HVAC Oxford County"
                fill className="object-cover" sizes="33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-extrabold text-[var(--navy)] mb-4">Brands Dino Works With</h2>
              <div className="flex flex-wrap gap-2">
                {site.brands.map((brand) => (
                  <span key={brand} className="px-3 py-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-sm font-semibold text-[var(--slate)]">
                    {brand}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-[var(--slate)] leading-relaxed">
                Dino services and installs all major HVAC brands. If you have it, he can fix it —
                and if you need something new, he&apos;ll recommend what&apos;s right for your home and budget,
                not whatever has the biggest margin.
              </p>
            </div>
            <QuoteForm formType="contact" variant="card" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Ready to Work with a Tech Who Tells It Straight?
          </h2>
          <p className="text-white/70 mb-6">No-obligation estimates. Same-day service available across Oxford County.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn btn-primary">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-outline-white">{site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
