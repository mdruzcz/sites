import Link from "next/link";
import type { Service } from "@/lib/content";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="card card-glow p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-accent mb-5 shrink-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(124, 58, 237, 0.15))",
          border: "1px solid rgba(0, 229, 255, 0.25)",
        }}
      >
        <ServiceIcon icon={service.icon} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-accent transition-colors">
        {service.title}
      </h3>
      <p className="text-sm text-muted-strong leading-relaxed flex-1">
        {service.shortDescription}
      </p>
      <div className="mt-5 inline-flex items-center text-sm font-semibold text-accent">
        Explore
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </Link>
  );
}
