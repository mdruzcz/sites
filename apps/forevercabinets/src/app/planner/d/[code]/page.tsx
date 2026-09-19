import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PlannerClient } from "@/components/planner/planner-client";
import { fetchDesignByCode } from "@/lib/planner/cloud";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shared Kitchen Design — Kitchen Planner",
  description: "A kitchen design shared from the Forever Cabinets planner. Open it, edit it, and request a quote.",
  robots: { index: false, follow: false },
};

export default async function SharedDesignPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const design = await fetchDesignByCode(code);
  if (!design) redirect("/planner");
  return <PlannerClient initialDesign={design} />;
}
