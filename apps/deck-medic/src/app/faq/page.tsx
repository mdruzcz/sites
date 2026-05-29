import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { FAQ } from "@/components/FAQ";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ | Deck Staining & Restoration Questions Answered | Deck Medic",
  description:
    "Answers to common questions about deck staining, restoration, power washing, and wood care in Southern Ontario. Deck Medic's expert FAQ.",
  alternates: { canonical: "https://deckmedic.ca/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How often should I stain my deck in Ontario?", acceptedAnswer: { "@type": "Answer", text: "Due to our harsh winters and humid summers, we recommend staining horizontal surfaces every 2–3 years and vertical surfaces every 4–5 years." } },
    { "@type": "Question", name: "How long does the restoration process take?", acceptedAnswer: { "@type": "Answer", text: "Most projects are completed in 2–3 visits. We power wash first, let it dry 48–72 hours, then return for sanding and staining." } },
    { "@type": "Question", name: "Do I need to be home while you work?", acceptedAnswer: { "@type": "Answer", text: "No — as long as we have access to an outdoor water tap and power outlet, you don't need to be home." } },
    { "@type": "Question", name: "What is the difference between transparent, semi-transparent, and solid stains?", acceptedAnswer: { "@type": "Answer", text: "Transparent stains show the most wood grain. Solid stains hide imperfections best. Semi-transparent gives the best balance of beauty and UV protection." } },
    { "@type": "Question", name: "Do you sand before staining?", acceptedAnswer: { "@type": "Answer", text: "Yes — always. Sanding opens the wood grain so the stain penetrates deeper, preventing peeling and ensuring a smoother, longer-lasting finish." } },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
        <NavBar />
        <div className="pt-20">
          <div className="pt-8 pb-0" style={{ background: "var(--off-white)" }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>Frequently Asked Questions</p>
              <h1 className="font-display text-5xl font-extrabold leading-tight" style={{ color: "var(--slate)" }}>
                Your Deck Questions,{" "}
                <span className="text-gradient-blue">Answered</span>
              </h1>
            </div>
          </div>
          <FAQ />
        </div>
        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
