// Shared forms-submit Worker.
// Every Master Decker site POSTs its lead row here instead of writing to
// Supabase directly. The Supabase publishable key lives ONLY in this Worker
// (as the SUPABASE_KEY secret), so a key rotation is a one-place change
// rather than a 40-site redeploy.
//
// Request body: { hostname: "<apex-or-www>", row: { ...columns } }
// The Worker maps hostname -> table, then INSERTs the row via PostgREST.
// It is column-agnostic: each site still builds its own row object (it knows
// its own table's columns); the Worker only owns the key + hostname->table map.

const HOSTNAME_TO_TABLE = {
  "allsealconcretesealing.ca": "allseal_quote_requests",
  "brantfordconcreteforming.ca": "bcf_quote_requests",
  "brantfordretainingwalls.ca": "brw_quote_requests",
  "celebratelighting.ca": "celebratelighting_quote_requests",
  "christmaslightslondon.ca": "cll_quote_requests",
  "classicchristmaslighting.ca": "classic_christmas_leads",
  "concretedriveways.ca": "concretedriveways_quote_requests",
  "concretetilsonburg.ca": "concrete_tilsonburg_quote_requests",
  "deckheroes.ca": "deck_leads",
  "deckmedic.ca": "deck_medic_quote_requests",
  "deckrestaining.ca": "deck_restaining_quote_requests",
  "deckrevitalize.ca": "deckrevitalize_leads",
  "deckstain.ca": "deckstain_quote_requests",
  "festiveholidaylighting.ca": "festive_quote_requests",
  "foreverlights.ca": "foreverlights_leads",
  "getlegalbasements.ca": "glb_quote_requests",
  "gtachristmaslighting.ca": "gta_christmas_lights_leads",
  "haltonglowlighting.ca": "halton_glow_quote_requests",
  "hottubpads.ca": "hottubpads_quote_requests",
  "kmkitchenrenovations.ca": "km_kitchen_leads",
  "londonconcreteforming.ca": "lcf_contact_requests",
  "londonconcretesealing.ca": "lcs_contact_submissions",
  "londondeckbuilder.ca": "deck_leads",
  "londonfenceinstaller.ca": "lfi_quote_requests",
  "londonretainingwalls.ca": "lrw_quote_requests",
  "masterdecker.com": "masterdecker_quote_requests",
  "mattdruzcz.ca": "realtor_leads",
  "ontariolightshows.ca": "ontariolightshows_quote_requests",
  "ontariorampsolutions.ca": "ontariorampsolutions_quote_requests",
  "optimumhvac.ca": "optimum_hvac_leads",
  "restoremydeck.ca": "rmd_quote_requests",
  "spotlessdeckstaining.ca": "spotless_quote_requests",
  "spotlesspropertycleaning.ca": "spotless_quote_requests",
  "torontodeckstainers.ca": "deck_leads",
  "totalbrantfordconcrete.ca": "tbc_quote_requests",
  "tricityconcretesealing.ca": "tricity_concrete_sealing_quote_requests",
  "weinstallchristmaslights.ca": "wicl_quote_requests",
  "weinstallgoveelights.ca": "govee_quote_requests",
  "woodstockconcreteforming.ca": "wcf_quote_requests",
  "woodstockconcretepros.ca": "wcp_quote_requests",
  "woodstockdeckandfence.ca": "wdf_quote_requests",
};

// Expand each apex to also accept its www. subdomain.
const TABLE_MAP = (() => {
  const m = {};
  for (const [host, table] of Object.entries(HOSTNAME_TO_TABLE)) {
    m[host] = table;
    m[`www.${host}`] = table;
  }
  return m;
})();

const corsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
});

const json = (body, status, origin) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders(origin) },
  });

const resolveHostname = (claimed, origin, referer) => {
  if (claimed && typeof claimed === "string") return claimed.toLowerCase();
  for (const src of [origin, referer]) {
    if (!src) continue;
    try {
      return new URL(src).hostname.toLowerCase();
    } catch {}
  }
  return null;
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== "POST") {
      return json({ ok: false, error: "method-not-allowed" }, 405, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, error: "invalid-json" }, 400, origin);
    }

    const hostname = resolveHostname(
      payload && payload.hostname,
      origin,
      request.headers.get("Referer"),
    );
    if (!hostname) {
      return json({ ok: false, error: "missing-hostname" }, 400, origin);
    }

    const table = TABLE_MAP[hostname];
    if (!table) {
      return json({ ok: false, error: "unknown-hostname", hostname }, 400, origin);
    }

    const row = payload && payload.row;
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      return json({ ok: false, error: "missing-row" }, 400, origin);
    }

    if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
      return json({ ok: false, error: "worker-not-configured" }, 500, origin);
    }

    let insertRes;
    try {
      insertRes = await fetch(`${env.SUPABASE_URL}/rest/v1/${table}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: env.SUPABASE_KEY,
          Authorization: `Bearer ${env.SUPABASE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
      });
    } catch {
      return json({ ok: false, error: "supabase-fetch-failed" }, 502, origin);
    }

    if (!insertRes.ok) {
      const detail = await insertRes.text();
      return json(
        { ok: false, error: "insert-failed", status: insertRes.status, detail },
        502,
        origin,
      );
    }

    return json({ ok: true, table }, 200, origin);
  },
};
