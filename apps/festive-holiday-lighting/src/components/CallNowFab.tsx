import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function CallNowFab() {
  return (
    <a href={site.phoneHref} className="btn-candy fixed bottom-5 right-5 z-50 lg:hidden" aria-label={`Call Festive Holiday Lighting at ${site.phone}`}>
      <PhoneIcon className="w-4 h-4" />
      Call Now
    </a>
  );
}
