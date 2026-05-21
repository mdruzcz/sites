import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact Deck Medic | Free Estimate for Deck Restoration & Staining",
  description:
    "Request a free estimate from Deck Medic. We serve Toronto, Mississauga, Oakville, and Burlington. Reach us by phone or use our online form for a no-obligation quote.",
  alternates: { canonical: "https://deckmedic.ca/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <NavBar />
      <div className="pt-20">
        <div className="pt-8 pb-0" style={{ background: "var(--off-white)" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Free Estimate</p>
            <h1 className="font-display text-5xl font-extrabold leading-tight" style={{ color: "var(--slate)" }}>
              Get in Touch with{" "}
              <span className="text-gradient-blue">Deck Medic</span>
            </h1>
          </div>
        </div>
        <Contact />
      </div>
      <Footer />
      <CallNowFab />
    </main>
  );
}
