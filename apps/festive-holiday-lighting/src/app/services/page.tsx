import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { services } from "@/lib/site";
import { ArrowRightIcon } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Holiday Lighting Services: Classic & Permanent Lights",
  description:
    "Two ways to light your home or business in Southern Ontario: classic seasonal Christmas light installation, or permanent app-controlled LED roofline systems. Plus commercial, municipal, tree and interior lighting.",
  alternates: { canonical: "https://festiveholidaylighting.ca/services" },
};

export default function ServicesPage() {
  return (
    <>
      <NavBar />
      <section className="pt-32 pb-20" style={{ backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition">Home</Link>
            <span>/</span>
            <span className="text-white/60">Services</span>
          </nav>
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--crimson-bright)" }}>All Services</p>
            <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-5">
              Complete Holiday Lighting{" "}
              <span className="text-gradient-gold">Solutions</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Classic Christmas lights that go up each November, or permanent LED systems that stay up all year. Many clients do both. We handle everything for homes and businesses across Southern Ontario.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group relative p-8 rounded-2xl border transition-all hover:border-[var(--crimson)]/40 hover:bg-white/[0.03] flex flex-col"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                {svc.slug === "permanent-lighting" && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: "linear-gradient(135deg, var(--crimson-bright), var(--crimson-deep))", color: "#fff" }}>
                    Year-Round
                  </span>
                )}
                <div className="text-4xl mb-5">{svc.icon}</div>
                <h2 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[var(--gold-bright)] transition">{svc.name}</h2>
                <p className="text-sm text-white/55 mb-5 leading-relaxed flex-1">{svc.description}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--crimson-bright)] group-hover:text-[var(--gold-bright)] transition">
                  Learn more <ArrowRightIcon className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
