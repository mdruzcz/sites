import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.name} now at ${site.phone}`}
      className="lg:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] shadow-warm-lg min-h-11"
    >
      <PhoneIcon className="w-5 h-5" />
      Call Now
    </a>
  );
}
