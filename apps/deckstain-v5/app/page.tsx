import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { SERVICES, FINISHES, PROJECTS, REVIEWS, FAQS } from "@/lib/data";
import { Jsonld, faqPage } from "@/lib/schema";
import { HeroReveal } from "@/components/HeroReveal";
import { QuoteForm } from "@/components/QuoteForm";
import { Accordion } from "@/components/Accordion";
import { CtaBand } from "@/components/CtaBand";
import { Check, Stars, Heading, Arrow, BLUR } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck & Fence Staining in Southwestern Ontario",
  description: "Premium deck & fence staining with READY Seal® oil-based stains that never peel. Send a photo, get a real quote in 2 business days. 4.9★ · 500+ Ontario decks.",
};

export default function Home() {
  return (
    <>
      <Jsonld data={faqPage(FAQS)} />

      {/* ───── HERO: copy left, animated before/after right ───── */}
      <section className="bg-[var(--bg-deep)] relative overflow-hidden">
        {/* dimmed deck photo background — warm wood texture under the copy */}
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
          placeholder="blur"
          blurDataURL={BLUR}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,36,26,0.55) 0%, rgba(20,36,26,0.7) 60%, rgba(20,36,26,0.95) 100%)",
          }}
        />
        <div className="wrap relative z-10 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center py-16 md:py-28">
          <div>
            <span className="rise inline-flex items-center gap-2 chip bg-white/10 border-white/20 text-white mb-5">
              <Stars className="[&_svg]:w-3.5 [&_svg]:h-3.5" /> <span className="font-bold">{SITE.stats.rating}</span>
              <span className="opacity-80">· {SITE.stats.decks} decks · {SITE.stats.reviews} reviews</span>
            </span>
            <h1 className="rise rise-2 h-xl text-white text-[2.4rem] sm:text-[3rem] lg:text-[3.5rem]">
              Bring your tired deck <span className="text-[var(--gold)]">back to life.</span>
            </h1>
            <p className="rise rise-3 text-white/80 text-lg leading-relaxed mt-4 max-w-xl">
              Professional deck &amp; fence staining with {SITE.stainBrand} oil-based finishes that soak in and <strong className="text-white">never peel.</strong> {SITE.promise}
            </p>
            <div className="rise rise-4 flex flex-col sm:flex-row gap-3 mt-7">
              <Link href="/contact" className="btn btn-green btn-lg">Get My Free Photo Quote</Link>
              <a href={SITE.phoneHref} className="btn btn-clear btn-lg">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                {SITE.phone}
              </a>
            </div>
            <ul className="rise rise-4 flex flex-wrap gap-x-5 gap-y-2 mt-6 text-white/80 text-sm">
              {["No site visit needed", "READY Seal® oil-based", "100% satisfaction guarantee"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[var(--gold)]" /> {t}</li>
              ))}
            </ul>
          </div>

          <div className="rise rise-3 relative">
            <div className="relative aspect-[4/3] rounded-[var(--r-lg)] overflow-hidden shadow-[var(--shadow-lg)]">
              <HeroReveal before="/images/before-after-cleaning.jpg" after="/images/after-deck-cleaning-staining.jpg"
                beforeAlt="Weathered gray deck before staining by DeckStain.ca" afterAlt="The same deck restored with READY Seal stain by DeckStain.ca" priority />
            </div>
            <div className="hidden sm:flex absolute -bottom-4 -left-4 items-center gap-2.5 bg-white rounded-xl shadow-[var(--shadow-md)] px-4 py-3 border border-[var(--hair)]">
              <span className="w-9 h-9 rounded-full bg-[var(--green-tint)] flex items-center justify-center"><Check className="w-5 h-5" /></span>
              <span><span className="block text-sm font-bold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>Real transformation</span><span className="block text-xs text-[var(--ink-3)]">Watch the before → after</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── TRUST BAR ───── */}
      <section className="bg-white border-b border-[var(--hair)]">
        <div className="wrap grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--hair)]">
          {[
            { v: SITE.stats.rating + "★", l: "Google rated" },
            { v: SITE.stats.decks, l: "Decks completed" },
            { v: SITE.stats.years + " yrs", l: "In business" },
            { v: SITE.stats.cities, l: "Cities served" },
          ].map((s) => (
            <div key={s.l} className="py-5 text-center">
              <p className="h-xl text-[1.5rem] md:text-[1.9rem] text-[var(--green)]">{s.v}</p>
              <p className="text-[var(--ink-3)] text-xs md:text-sm mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── SERVICES ───── */}
      <section className="sec bg-white">
        <div className="wrap">
          <Heading eyebrow="What we do" title={<>One crew for every outdoor wood job.</>} intro="From a quick refresh to a full structural restoration — same premium materials, same prep-obsessed team." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card card-hover overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={s.image} alt={`${s.name} by DeckStain.ca in Ontario`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="h text-lg text-[var(--ink)] group-hover:text-[var(--green)] transition-colors">{s.name}</h3>
                  <p className="muted text-sm leading-relaxed mt-2">{s.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── WHY US ───── */}
      <section className="sec bg-[var(--bg-alt)]">
        <div className="wrap">
          <Heading eyebrow="Why DeckStain" wood title={<>Built on quality work and honest pricing.</>} />
          <div className="grid md:grid-cols-3 gap-7">
            {[
              { t: "Premium READY Seal® only", d: "Oil-based stain that penetrates deep and never peels — not the water-based products that fail in a season.", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { t: "Honest photo quotes", d: "No pushy in-person sales visit. Send photos, get an itemized quote in 2 business days. The price you see is what you pay.", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM15 13a3 3 0 11-6 0 3 3 0 016 0z" },
              { t: "100% satisfaction", d: "If you're not happy with the finished result, we come back and make it right. No questions asked.", icon: "M5 13l4 4L19 7" },
            ].map((c) => (
              <div key={c.t} className="card p-7 md:p-8">
                <span className="inline-flex w-12 h-12 rounded-lg bg-[var(--green-tint)] items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-[var(--green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d={c.icon} /></svg>
                </span>
                <h3 className="h text-lg text-[var(--ink)] mb-1.5">{c.t}</h3>
                <p className="muted text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      <section className="sec bg-white">
        <div className="wrap">
          <Heading eyebrow="How it works" title={<>Three steps. Zero hassle.</>} intro="No pushy in-person sales visit. Just send photos, get an honest quote, and we make your deck beautiful." />
          <div className="grid md:grid-cols-3 gap-7 md:gap-8">
            {[
              { n: "1", t: "Send a few photos", d: "Use our quick form or text us pictures of your deck — full view plus any problem spots. Takes about a minute." },
              { n: "2", t: "Get a real quote in 2 days", d: "We review your photos and email a detailed, itemized quote. The price you see is the price you pay." },
              { n: "3", t: "We make it beautiful", d: "We clean, prep, and stain with premium READY Seal®. Most decks are done in 1–2 days, yard left spotless." },
            ].map((s) => (
              <div key={s.n} className="relative card p-7 md:p-8">
                <span className="absolute -top-4 -left-2 w-10 h-10 rounded-full bg-[var(--green)] text-white font-bold flex items-center justify-center shadow-[var(--shadow-md)]" style={{ fontFamily: "var(--font-head)" }}>{s.n}</span>
                <h3 className="h text-lg text-[var(--ink)] mt-3 mb-2">{s.t}</h3>
                <p className="muted text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── QUOTE SPLIT ───── */}
      <section id="quote" className="sec bg-[var(--bg-alt)] scroll-mt-20">
        <div className="wrap grid lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-start">
          <div>
            <p className="eyebrow mb-2">Free photo quote</p>
            <h2 className="h text-[1.8rem] md:text-[2.4rem] text-[var(--ink)]">Get a real quote without anyone visiting.</h2>
            <p className="muted text-[1.05rem] mt-3 max-w-lg leading-relaxed">Tell us a little about your deck and send a few photos. We&apos;ll reply with a detailed, honest quote within {SITE.responseTime} — no pressure, no obligation.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-lg">
              {[
                { t: "Fast", d: "Real quote in 2 business days" },
                { t: "Transparent", d: "Itemized — no surprise charges" },
                { t: "Premium", d: "READY Seal® oil-based only" },
                { t: "Guaranteed", d: "100% satisfaction, every job" },
              ].map((b) => (
                <div key={b.t} className="rounded-xl bg-white border border-[var(--hair)] p-4">
                  <p className="font-bold text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>{b.t}</p>
                  <p className="text-sm muted mt-0.5">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-7 md:p-8 shadow-[var(--shadow-md)]">
            <h3 className="h text-xl text-[var(--ink)] mb-0.5">Request your free quote</h3>
            <p className="text-sm text-[var(--ink-3)] mb-4">Reply within 2 business days · No obligation</p>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* ───── WORK ───── */}
      <section className="sec bg-white">
        <div className="wrap">
          <Heading eyebrow="Recent work" title={<>Decks we&apos;ve transformed.</>} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROJECTS.slice(0, 8).map((p, i) => (
              <div key={i} className={`relative rounded-[var(--r-lg)] overflow-hidden group ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                <Image src={p.image} alt={`${p.title} — ${p.tag} by DeckStain.ca in ${p.place}, Ontario`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:768px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <p className="text-white text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-head)" }}>{p.tag}</p>
                  <p className="text-white/75 text-xs mt-0.5">{p.place}, ON</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><Link href="/work" className="btn btn-out">View the full gallery</Link></div>
        </div>
      </section>

      {/* ───── FINISHES ───── */}
      <section className="sec bg-[var(--bg-alt)]">
        <div className="wrap">
          <Heading eyebrow="Stain finishes" wood title={<>Eight {SITE.stainBrand} colors to choose from.</>} intro="Pick the tone that suits your home. We bring sample boards so you can see each color in your own light before we start." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto">
            {FINISHES.map((f) => (
              <div key={f.name} className="card card-hover overflow-hidden">
                <div className="aspect-[5/4]" style={{ background: f.hex }} />
                <div className="p-3.5"><p className="font-bold text-sm text-[var(--ink)]" style={{ fontFamily: "var(--font-head)" }}>{f.name}</p><p className="text-xs text-[var(--ink-3)] mt-0.5">{f.note}</p></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><Link href="/finishes" className="btn btn-out">Explore all finishes</Link></div>
        </div>
      </section>

      {/* ───── REVIEWS ───── */}
      <section className="sec bg-white">
        <div className="wrap">
          <Heading eyebrow="Reviews" title={<>Homeowners across Ontario trust us.</>} />
          <div className="grid md:grid-cols-3 gap-7">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="card p-7 md:p-8 flex flex-col">
                <Stars className="mb-3" />
                <blockquote className="text-[var(--ink)] leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="flex items-center gap-3 mt-5">
                  <span className="w-10 h-10 rounded-full bg-[var(--green)] text-white font-bold flex items-center justify-center" style={{ fontFamily: "var(--font-head)" }}>{r.name[0]}</span>
                  <span><span className="block font-bold text-[var(--ink)] text-sm" style={{ fontFamily: "var(--font-head)" }}>{r.name}</span><span className="block text-xs text-[var(--ink-3)]">{r.place}, Ontario</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───── AREAS ───── */}
      <section className="sec bg-[var(--bg-alt)]">
        <div className="wrap">
          <Heading eyebrow="Where we work" title={<>Serving {SITE.stats.cities} cities across {SITE.region}.</>} intro="Don't see your town? We probably still come there — just ask." />
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {["London", "Woodstock", "St. Thomas", "Stratford", "Brantford", "Kitchener", "Cambridge", "Guelph", "Tillsonburg", "Ingersoll"].map((c) => (
              <Link key={c} href={`/areas/${c.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`} className="chip bg-white hover:border-[var(--green)] hover:text-[var(--green)] transition-colors">{c}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="sec bg-white">
        <div className="wrap max-w-3xl">
          <Heading eyebrow="FAQ" title={<>Good questions, honest answers.</>} />
          <Accordion items={FAQS.slice(0, 6)} />
          <div className="text-center mt-10"><Arrow href="/faq">See all FAQs</Arrow></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
