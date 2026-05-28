import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Service Areas | London Concrete Forming",
  description: "London Concrete Forming serves London, St. Thomas, Woodstock, Stratford, Sarnia, Chatham, and Port Stanley. Get a free concrete quote in your area.",
  openGraph: { title: "Service Areas | London Concrete Forming", description: "Concrete contractor serving London, St. Thomas, Woodstock, Stratford, Sarnia, Chatham, and Port Stanley, Ontario." },
};

const cities = [
  { href: "/woodstock-concrete-contractor", name: "Woodstock", desc: "Expert concrete driveways, patios, and retaining walls in Woodstock, ON." },
  { href: "/st-thomas-concrete-contractor", name: "St. Thomas", desc: "Professional concrete services throughout St. Thomas and Elgin County." },
  { href: "/sarnia-concrete-contractor", name: "Sarnia", desc: "Quality concrete contractor serving Sarnia and Lambton County." },
  { href: "/port-stanley-concrete-contractor", name: "Port Stanley", desc: "Concrete driveway and patio installation in Port Stanley, ON." },
  { href: "/chatham-concrete-contractor", name: "Chatham", desc: "Trusted concrete services in Chatham-Kent, Ontario." },
  { href: "/stratford-concrete-contractor", name: "Stratford", desc: "Premium concrete contractor in Stratford and Perth County." },
];

export default function ServiceAreasPage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Service Areas", url: `${site.url}/service-areas` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Service Areas</h1>
          <p className="text-slate-300 text-lg">London Concrete Forming serves London and the surrounding communities across Southwestern Ontario.</p>
        </div>
      </section>

      <section className="section bg-[#f8fafc]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <Link key={city.href} href={city.href} className="card p-6 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F7931E]/10 flex items-center justify-center flex-shrink-0 text-[#F7931E]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.203-4.599 3.203-7.327C19.5 7.116 15.964 3.5 12 3.5 8.037 3.5 4.5 7.116 4.5 12c0 2.728 1.259 5.244 3.203 7.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#1a2332] mb-1 group-hover:text-[#F7931E] transition-colors">{city.name}, ON</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">{city.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-[#1a2332] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-extrabold text-white mb-3">Don&apos;t See Your City?</h2>
            <p className="text-slate-300 mb-6">We serve the entire Southwestern Ontario region. Contact us to check availability in your area.</p>
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
