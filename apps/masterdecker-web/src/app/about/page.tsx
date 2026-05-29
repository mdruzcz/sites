import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MobileFab } from "@/components/mobile-fab";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";
import locations from "@/content/locations.json";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: `${site.url}/about` },
  title: "About Master Decker Inc. | Outdoor Living Experts Since 2014",
  description:
    "Master Decker Inc. is a London Ontario outdoor living company specializing in decks, fences, concrete, and retaining walls across Southwestern Ontario. Learn our story, mission, and values.",
};

const journey = [
  { title: "The Beginnings", desc: "Master Decker was founded on a passion for transforming outdoor environments into stunning living spaces. Our journey began with a focus on deck building, which quickly expanded to encompass a full suite of outdoor living solutions." },
  { title: "Growth and Expansion", desc: "As we grew, so did our services. Recognizing the need for comprehensive outdoor solutions, we began to offer fence installation, deck and fence staining, concrete driveways, and retaining walls. Each project is handled with the same level of precision and care that we brought to our first deck builds." },
  { title: "Vision for the Future", desc: "We continue to innovate and expand our services, always aiming to provide the best in functionality and design. Our vision is to not just meet, but exceed, the expectations of our clients, ensuring that every outdoor space we create is a testament to our dedication and expertise." },
];

const mission = [
  { title: "Dedication to Craftsmanship", desc: "At Master Decker, our mission is to deliver outdoor living solutions that stand the test of time. We use premium materials and meticulous craftsmanship to ensure that your outdoor spaces are not only beautiful but durable." },
  { title: "Customized Outdoor Solutions", desc: "Understanding that each property is unique, we tailor our services to fit the specific needs and desires of each client. Our team works closely with you to bring your vision to life, ensuring that every detail reflects your personal style and functional requirements." },
  { title: "Sustainability Practices", desc: "We are committed to sustainability, utilizing eco-friendly materials and practices whenever possible. This commitment extends to every aspect of our operations, from waste reduction in our building processes to the use of non-toxic stains and sealants." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="About"
          title="About Master Decker Inc."
          subtitle="Welcome to Master Decker Inc., where we specialize in crafting exceptional outdoor living spaces. Based just outside of London, Ontario, we serve a broad range of areas across Southwestern Ontario."
          background="/images/wp-cedar-deck.jpg"
          primaryCta={{ label: "Request Quote", href: "/contact" }}
          secondaryCta={{ label: "Our Projects", href: "/project-examples" }}
        />

        <section className="section bg-white">
          <div className="container">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">Our Story</p>
              <h2 className="h-display text-3xl md:text-4xl">Our Journey</h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {journey.map((j, i) => (
                <div key={j.title}>
                  <div className="text-[var(--accent)] font-extrabold text-6xl mb-3">0{i + 1}</div>
                  <h3 className="font-bold text-xl mb-3">{j.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{j.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-[var(--surface)] border-y border-[var(--border)]">
          <div className="container">
            <div className="text-center mb-14">
              <p className="eyebrow mb-3">What Drives Us</p>
              <h2 className="h-display text-3xl md:text-4xl">Our Mission and Values</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {mission.map((m) => (
                <div key={m.title} className="bg-white p-8 border border-[var(--border)]">
                  <div className="w-12 h-1 bg-[var(--accent)] mb-5" />
                  <h3 className="font-bold text-xl mb-3">{m.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="eyebrow mb-3">Coverage</p>
              <h2 className="h-display text-3xl md:text-4xl mb-5">Our Service Areas</h2>
              <p className="text-[var(--ink-soft)] leading-relaxed">
                While our main office is located just outside of London, Ontario, our services reach across Southwestern Ontario and beyond. We have traveled as far as Ottawa to meet our clients&apos; needs and are always willing to discuss projects outside our typical service areas.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {locations.regions.map((r) => (
                <div key={r.name} className="text-center">
                  <h3 className="font-bold text-xl text-[var(--accent)] mb-3">{r.name}</h3>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{r.cities.join(", ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative section text-white text-center overflow-hidden bg-[var(--ink)]">
          <div className="absolute inset-0" style={{ backgroundImage: "url(/images/wp-backyard-deck.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden="true" />
          <div className="absolute inset-0 bg-black/75" aria-hidden="true" />
          <div className="container relative max-w-3xl">
            <h2 className="h-display text-3xl md:text-4xl mb-5">Connect With Us</h2>
            <p className="text-white/85 mb-3 leading-relaxed">
              Master Decker Inc. is more than just an outdoor living company; we are partners in making your dream outdoor spaces a reality. Contact us today to schedule a consultation and begin the journey toward transforming your outdoor living space.
            </p>
            <p className="text-white/70 mb-8 italic">
              Experience the Master Decker difference – where your outdoor visions come to life with precision, passion, and professionalism.
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
