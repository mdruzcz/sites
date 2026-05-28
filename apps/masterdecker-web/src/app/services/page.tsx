import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { site } from "@/lib/site";
import services from "@/content/services.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/services` },
  title: "Our Services | Decks, Fences, Concrete | Master Decker",
  description:
    "Full list of Master Decker outdoor services — deck staining, deck building, fence installation, concrete driveways, retaining walls, pergolas, gazebos, and more across Southwestern Ontario.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[var(--accent-dark)] text-white">
          <div className="container section text-center">
            <p className="eyebrow text-[var(--accent-light)] mb-3">What We Do</p>
            <h1 className="h-display text-4xl md:text-5xl mb-6">Premium Outdoor Services</h1>
            <p className="text-lg text-white/85 max-w-3xl mx-auto leading-relaxed mb-8">
              Welcome to our professional outdoor services page! We are dedicated to providing exceptional service to our clients, and we offer a wide range of outdoor services to enhance the beauty and functionality of your outdoor spaces. Our team of experts has years of experience in the industry and is committed to ensuring your complete satisfaction.
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>

        {services.categories.map((cat, idx) => (
          <section key={cat.id} className={`section ${idx % 2 === 0 ? "bg-white" : "bg-[var(--surface)] border-y border-[var(--border)]"}`}>
            <div className="container">
              <div className="mb-10">
                <p className="eyebrow mb-2">Category</p>
                <h2 className="h-display text-3xl md:text-4xl mb-3">{cat.name}</h2>
                <p className="text-[var(--ink-soft)] max-w-2xl">{cat.blurb}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cat.services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`} className="group bg-white rounded border border-[var(--border)] p-6 hover:border-[var(--accent)] hover:shadow-md transition-all flex flex-col">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[var(--accent)] transition-colors">{s.title}</h3>
                    <p className="text-sm text-[var(--ink-soft)] leading-relaxed mb-4">{s.blurb}</p>
                    <span className="mt-auto text-xs font-bold uppercase tracking-widest text-[var(--accent)]">Learn More →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="section bg-[var(--accent-dark)] text-white text-center">
          <div className="container max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-4">Get a FREE Quote</h2>
            <p className="text-white/80 mb-8 text-lg">
              Don&apos;t see your service listed? Get in touch — we tackle a wide range of outdoor projects.
            </p>
            <Link href="/contact" className="btn-primary">Request Quote</Link>
          </div>
        </section>
      </main>
      <Footer />
      <MobileFab />
    </>
  );
}
