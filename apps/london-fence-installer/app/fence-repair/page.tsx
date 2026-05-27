import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fence Repair Service in London, ON – Fast Free Quote",
  description: "Quick and dependable fence repair services in London, St Thomas, and Woodstock. Sagging fences, broken boards, rust, vandalism & more. Fully insured. Call today!",
  openGraph: {
    title: "Fence Repair Service | London Fence Installer",
    description: "Professional fence repair in London, ON. We fix wood, vinyl, metal, and chain-link fences.",
    url: `${site.url}/fence-repair`,
  },
};

const repairTypes = [
  { title: "Sagging Fence", body: "Exposure to strong winds, loose boards, soil erosion, or impact damage can cause your fence to sag or lean. We provide repair solutions tailored to the specific cause of the problem." },
  { title: "Broken Boards", body: "Aging fences are prone to weakening and breaking. Regardless of the cause, we efficiently repair or replace broken boards and links. In cases of extensive damage, we may recommend a full replacement." },
  { title: "Mould and Insect Damage", body: "Insect infestations and mould growth due to moisture buildup can erode your fence. We replace affected areas and implement measures to prevent recurrence." },
  { title: "Rusting and Corrosion", body: "Ornamental fences may develop rust due to moisture exposure. Our team can repair rust damage through sealant applications, restoring the fence&apos;s aesthetic and structural integrity." },
  { title: "Discolouration", body: "Fences may experience discolouration due to moisture exposure and regular wear and tear. We offer repainting services to match your fence with your property&apos;s overall appearance." },
  { title: "Vandalism", body: "If your fence has been vandalized, our team swiftly repairs the damage and reinforces security measures to prevent future breaches." },
];

const faqs = [
  { question: "Does London Fence Installer provide fence repair services?", answer: "Yes, we offer comprehensive fence repair services to address a variety of issues and ensure the longevity of your fencing." },
  { question: "What types of fences do you repair?", answer: "We specialize in repairing various types of fences, including wood, vinyl, metal, and chain-link. Our skilled team can handle a wide range of materials and styles." },
  { question: "How do I request a fence repair service?", answer: "Simply contact our customer service team via phone or the online form. We will schedule an on-site assessment to evaluate the extent of the damage and provide a detailed repair plan." },
  { question: "What kind of fence issues can you repair?", answer: "We can address a range of issues including damaged panels, posts, gates, and hardware — whether due to weather, wear and tear, or accidents." },
  { question: "Is there a consultation fee for fence repair?", answer: "No, we offer free consultations. Contact us to discuss your repair needs and we'll provide a no-obligation quote." },
];

export default function FenceRepairPage() {
  const service = serviceSchema("Fence Repair", "Professional fence repair services in London, St Thomas, and Woodstock, Ontario.", "/fence-repair");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: "Fence Repair", url: `${site.url}/fence-repair` },
  ]);
  const faq = faqSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <section className="bg-green py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <Link href="/services" className="hover:text-white">Services</Link>
                <span className="mx-2">›</span>
                <span>Fence Repair</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Repair Service</h1>
              <p className="text-gray-200">Fast free quote on fence repair in London, St Thomas, and Woodstock. Fully insured and warrantied.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-extrabold mb-4">Reliable Fence Repair in London</h2>
            <p className="text-[var(--muted)] leading-relaxed">
              London Fence Installer is your dedicated partner in safeguarding the integrity of your property. Whether your fences have endured severe weather conditions or unfortunate security breaches, our skilled repair technicians are here to promptly and efficiently address the issues. Our team has the expertise to handle problems with fences made from various materials.
            </p>
          </div>

          <h2 className="text-2xl font-extrabold mb-6">We Fix All Types of Fence Damage</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {repairTypes.map((r) => (
              <div key={r.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{r.title}</h3>
                <p className="text-sm text-[var(--muted)]" dangerouslySetInnerHTML={{ __html: r.body }} />
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 bg-[var(--surface)] rounded-xl p-6">
            {[
              { title: "Prompt Service", body: "Swift response to repair your fence efficiently and minimize disruptions." },
              { title: "Expertise", body: "Experienced team with skills to handle a variety of fence-related issues." },
              { title: "Customized Solutions", body: "Tailored repair solutions based on the specific needs and conditions of your fence." },
              { title: "Security Enhancement", body: "Reinforcement of your fence to make it more secure after vandalism or damage." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-bold text-[var(--green)] mb-1 text-sm">{item.title}</h3>
                <p className="text-xs text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.question} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{f.question}</h3>
                <p className="text-sm text-[var(--muted)]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
