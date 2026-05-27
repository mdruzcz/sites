import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/about` },
  title: "About Master Decker | London's Outdoor Living Experts Since 2014",
  description: "Learn about Master Decker Inc. — a London, Ontario outdoor living company dedicated to quality decks, fences, and concrete work since 2014.",
  openGraph: {
    title: "About Master Decker",
    description: "London's outdoor living experts since 2014.",
    url: `${site.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[var(--surface)] section">
          <div className="container max-w-3xl">
            <p className="eyebrow mb-2">Our Story</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Master Decker Inc.</h1>
            <p className="text-lg text-[var(--ink)]/70 leading-relaxed mb-8">
              Welcome to Master Decker Inc., where we specialize in crafting exceptional outdoor living spaces. Based just outside of London, Ontario, we serve a broad range of areas including Kitchener-Waterloo, Hamilton, the Greater Toronto Area, and beyond.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container max-w-3xl space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Journey</h2>
              <div className="space-y-6 text-[var(--ink)]/80 leading-relaxed">
                <div>
                  <h3 className="font-bold mb-2">The Beginnings</h3>
                  <p>Master Decker was founded on a passion for transforming outdoor environments into stunning living spaces. Our journey began with a focus on deck building, which quickly expanded to encompass a full suite of outdoor living solutions.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Growth and Expansion</h3>
                  <p>As we grew, so did our services. Recognizing the need for comprehensive outdoor solutions, we began offering fence installation, deck and fence staining, concrete driveways, and retaining walls. Each project is handled with the same level of precision and care that we brought to our first deck builds.</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Vision for the Future</h3>
                  <p>We continue to innovate and expand our services, always aiming to provide the best in functionality and design. Our vision is to exceed client expectations — ensuring every outdoor space we create stands as a testament to our dedication and craftsmanship.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Mission and Values</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "Dedication to Craftsmanship", desc: "We use premium materials and meticulous craftsmanship to ensure every outdoor space is not only beautiful but durable." },
                  { title: "Customized Solutions", desc: "Every property is unique. We tailor our services to the specific needs and desires of each client." },
                  { title: "Sustainability Practices", desc: "We use eco-friendly materials and non-toxic stains and sealants wherever possible." },
                  { title: "Fast, Reliable Execution", desc: "We complete projects efficiently without disrupting your daily life — on time and to your satisfaction." },
                ].map((v) => (
                  <div key={v.title} className="border border-[var(--border)] rounded-lg p-5">
                    <div className="w-6 h-0.5 bg-[var(--accent)] mb-3" />
                    <h3 className="font-bold mb-2">{v.title}</h3>
                    <p className="text-sm text-[var(--ink)]/70 leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--surface)] rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Ready to start your project?</h2>
              <p className="text-[var(--ink)]/70 mb-6">Contact us today for a free, no-obligation estimate.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn-primary">Get a Free Estimate</Link>
                <a href={site.phoneHref} className="btn-outline">{site.phone}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
