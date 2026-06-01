import type { Metadata } from "next";
import { FAQS } from "@/lib/data";
import { PageHead } from "@/components/PageHead";
import { CtaBand } from "@/components/CtaBand";
import { Accordion } from "@/components/Accordion";
import { Jsonld, faqPage } from "@/lib/schema";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about deck staining, sealing, and restoration in Ontario — how often to re-stain, the photo-quote process, guarantees, and more.",
};

export default function FaqPage() {
  return (
    <>
      <Jsonld data={faqPage(FAQS)} />
      <PageHead eyebrow="FAQ" title="Good questions, honest answers."
        intro="Everything you might want to know about deck staining, sealing, and how we work. Still curious? Just reach out."
        image="/images/hero-faq.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <section className="sec bg-white"><div className="wrap max-w-3xl"><Accordion items={FAQS} /></div></section>
      <CtaBand />
    </>
  );
}
