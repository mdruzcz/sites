import { scrapeListing } from "@/lib/import-listing";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Scrape only — this route reads the listing and hands back what it found.
 *
 * Creating the property and downloading the photographs happen in separate
 * calls from the client, so a slow remote host cannot blow a single request
 * budget and the admin can show real progress instead of a spinner.
 */
export async function POST(req: Request) {
  const { url } = (await req.json().catch(() => ({}))) as { url?: string };

  const raw = url?.trim();
  if (!raw) return Response.json({ error: "Paste a listing URL first." }, { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return Response.json({ error: "That does not look like a URL." }, { status: 400 });
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return Response.json({ error: "Only http and https links can be imported." }, { status: 400 });
  }

  try {
    const listing = await scrapeListing(parsed.toString());
    return Response.json({ ok: true, listing });
  } catch (err) {
    const message = (err as Error).message;
    console.error("Listing import failed:", message);
    return Response.json(
      { error: message.includes("FIRECRAWL_API_KEY") ? message : `Could not read that listing: ${message}` },
      { status: 502 }
    );
  }
}
