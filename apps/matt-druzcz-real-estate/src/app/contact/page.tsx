import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Matt Druzcz — Free Real Estate Consultation",
  description:
    "Reach out to Matt Druzcz for a free home valuation, buyer consultation, or investment property discussion. Serving London, Aylmer, St. Thomas & Woodstock, Ontario.",
  openGraph: {
    title: "Contact Matt Druzcz — Free Real Estate Consultation",
    description:
      "Start a free, no-pressure conversation about buying, selling, or investing in SW Ontario real estate.",
  },
};

export default function ContactPage() {
  return (
    <section className="pt-36 pb-24 relative" style={{ background: "var(--navy)" }}>
      <div className="absolute inset-0 opacity-5"
        style={{ background: "radial-gradient(ellipse at 70% 50%, var(--gold) 0%, transparent 60%)" }} />
      <ContactForm />
    </section>
  );
}
