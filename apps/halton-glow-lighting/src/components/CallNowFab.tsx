import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function CallNowFab() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call ${site.name} at ${site.phone}`}
      className="lg:hidden fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center text-[var(--night-deep)] gold-glow"
      style={{
        background:
          "linear-gradient(135deg, var(--gold-bright), var(--amber))",
      }}
    >
      <PhoneIcon className="w-6 h-6" />
    </a>
  );
}
