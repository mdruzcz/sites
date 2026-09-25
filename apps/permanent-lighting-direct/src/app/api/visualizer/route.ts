import { getVisualizerCatalog } from "@/lib/visualizer/catalog";
import { handleVisualizerSubmit } from "@/lib/visualizer/server";
import { VZ_SITE } from "@/lib/visualizer/site";
import { getStore } from "@/lib/catalog";
import { getServiceSupabase } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: Request) {
  const catalog = await getVisualizerCatalog();
  return handleVisualizerSubmit(req, VZ_SITE, catalog, {
    // PLD inquiries live in ecom_contact_messages so they show up in the admin Contact Messages page.
    async storeLead({ contact, summary, designUrl }) {
      const store = await getStore();
      if (!store) return false;
      const message = ["LIGHT VISUALIZER DESIGN", `Open: ${designUrl}`, "", summary, contact.notes ? `\nNotes: ${contact.notes}` : "", contact.address || contact.city || contact.postal ? `\nAddress: ${[contact.address, contact.city, contact.postal].filter(Boolean).join(", ")}` : ""].join("\n");
      const { error } = await getServiceSupabase().from("ecom_contact_messages").insert({
        store_id: store.id,
        name: contact.name,
        email: contact.email.toLowerCase(),
        phone: contact.phone || null,
        province: null,
        subject: "Permanent Lighting Direct — Light visualizer design",
        message,
        source: "visualizer",
      });
      if (error) console.error("ecom_contact_messages insert failed:", error.message);
      return !error;
    },
  });
}
