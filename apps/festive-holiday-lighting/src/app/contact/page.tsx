import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Festive Holiday Lighting | Free Quote Southern Ontario",
  description:
    "Get your free holiday lighting quote. Call (289) 426-5764 or fill out our form. We respond within 24 hours. Serving Hamilton, Burlington, Oakville & Southern Ontario.",
  alternates: { canonical: "https://festiveholidaylighting.ca/contact" },
};

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <div className="pt-24" style={{ backgroundColor: "var(--night-deep)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60">Home</Link>
            <span>/</span>
            <span className="text-white/60">Contact</span>
          </nav>
          <h1 className="font-display text-3xl font-extrabold text-white mb-2">
            Get Your <span className="text-gradient-gold">Free Quote</span>
          </h1>
          <p className="text-white/60">We respond within 24 hours — usually same day.</p>
        </div>
      </div>
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
