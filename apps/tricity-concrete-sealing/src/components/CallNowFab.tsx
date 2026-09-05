import { site } from "@/lib/site";
import { MailIcon } from "./icons";

export function CallNowFab() {
  return (
    <a href="#contact" className="btn-accent fixed bottom-5 right-5 z-50 rounded-full lg:hidden" aria-label={`Request a free quote from ${site.name}`}>
      <MailIcon className="w-4 h-4" />
      Free Quote
    </a>
  );
}
