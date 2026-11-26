import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <PageHero photo={site.photos.faq} photoAlt="Close view of white game lines on a blue sport court surface" eyebrow="404" title="That page is out of bounds." intro="The link may be old or mistyped. The court kits are all still here.">
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/court-kits" className="btn btn-cta">
          Browse court kits <span aria-hidden>→</span>
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </PageHero>
  );
}
