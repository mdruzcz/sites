import { site } from "@/lib/site";
import { ShieldIcon, StarIcon } from "./icons";

export function TrustBar() {
  return (
    <section
      className="py-8 border-y"
      style={{
        background: "linear-gradient(135deg, rgba(178,34,34,0.12) 0%, rgba(10,10,20,0.95) 50%, rgba(201,168,76,0.08) 100%)",
        borderColor: "rgba(201,168,76,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          <div className="flex items-center gap-2.5">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <StarIcon key={i} className="w-4 h-4 text-[var(--gold-bright)]" filled />
              ))}
            </div>
            <span className="text-sm font-semibold text-white">{site.googleRating} Stars</span>
            <span className="text-xs text-white/50">({site.reviewCount}+ reviews)</span>
          </div>

          <div className="w-px h-6 bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-2">
            <ShieldIcon className="w-4 h-4 text-[var(--gold-bright)]" />
            <span className="text-sm text-white/80">$5M Liability Insurance</span>
          </div>

          <div className="w-px h-6 bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--gold-bright)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-white/80">WSIB Compliant</span>
          </div>

          <div className="w-px h-6 bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--gold-bright)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-white/80">{site.yearsExperience}+ Years Experience</span>
          </div>

          <div className="w-px h-6 bg-white/15 hidden sm:block" />

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--gold-bright)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-sm text-white/80">Family Owned & Operated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
