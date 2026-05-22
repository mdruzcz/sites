import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="bg-[#E8751A] py-14">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          Ready to Transform Your Space?
        </h2>
        <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
          Get a free estimate from Brantford&apos;s concrete forming experts. We respond within {site.responseTime}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn btn-white text-base">
            Get a Free Quote
          </Link>
          <a href={site.phoneHref} className="btn border-2 border-white text-white hover:bg-white hover:text-[#E8751A] text-base transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
            </svg>
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
