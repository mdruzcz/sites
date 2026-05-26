import type { Metadata } from "next";
import { NavBar, Contact, Footer } from "../_components/sections";

export const metadata: Metadata = {
  title: "Contact Woodstock Deck & Fence | Free Estimate Woodstock ON",
  description: "Contact Woodstock Deck & Fence for a free on-site estimate. Call 519-914-5697 or fill out our form. We respond within 24 hours. Serving Woodstock, Oxford County, Brantford and Cambridge.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact Us | Free Estimate | Woodstock Deck & Fence", description: "Get your free deck or fence estimate in Woodstock, Ontario. We respond within 24 hours." },
};

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <main>
      <NavBar homeHref="/" />
      <section className="pt-32 pb-8 lg:pt-40" style={{ backgroundColor: "var(--forest)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--cedar-light)" }}>Get In Touch</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">Get Your Free Estimate</h1>
          <p className="text-xl text-white/70 max-w-xl mx-auto">We visit your property, measure, discuss your options, and deliver a transparent quote — at no charge.</p>
        </div>
      </section>
      <Contact />
      <Footer />
    </main>
  );
}
