const HOSTNAME_TO_GROUP = {
  "1stchoicebasementrenovations.ca": 1,
  "www.1stchoicebasementrenovations.ca": 1,
  "allsealconcretesealing.ca": 1,
  "www.allsealconcretesealing.ca": 1,
  "azpatiosdriveways.ca": 1,
  "www.azpatiosdriveways.ca": 1,
  "brantfordconcreteforming.ca": 1,
  "www.brantfordconcreteforming.ca": 1,
  "brantfordretainingwalls.ca": 1,
  "www.brantfordretainingwalls.ca": 1,
  "brighteventlighting.ca": 2,
  "www.brighteventlighting.ca": 2,
  "celebratelighting.ca": 2,
  "www.celebratelighting.ca": 2,
  "christmaslightslondon.ca": 2,
  "www.christmaslightslondon.ca": 2,
  "classicchristmaslighting.ca": 2,
  "www.classicchristmaslighting.ca": 2,
  "commercialholidaydecor.ca": 2,
  "www.commercialholidaydecor.ca": 2,
  "concretedriveways.ca": 3,
  "www.concretedriveways.ca": 3,
  "concretetilsonburg.ca": 3,
  "www.concretetilsonburg.ca": 3,
  "deckheroes.ca": 3,
  "www.deckheroes.ca": 3,
  "deckmedic.ca": 3,
  "www.deckmedic.ca": 3,
  "deckrestaining.ca": 3,
  "www.deckrestaining.ca": 3,
  "deckrevitalize.ca": 4,
  "www.deckrevitalize.ca": 4,
  "deckstain.ca": 4,
  "www.deckstain.ca": 4,
  "festiveholidaylighting.ca": 4,
  "www.festiveholidaylighting.ca": 4,
  "forevercabinets.ca": 4,
  "www.forevercabinets.ca": 4,
  "foreverecabinets.ca": 4,
  "www.foreverecabinets.ca": 4,
  "foreverlights.ca": 5,
  "www.foreverlights.ca": 5,
  "getlegalbasements.ca": 5,
  "www.getlegalbasements.ca": 5,
  "gtachristmaslighting.ca": 5,
  "www.gtachristmaslighting.ca": 5,
  "haltonglowlighting.ca": 5,
  "www.haltonglowlighting.ca": 5,
  "heateddrivewaypros.ca": 5,
  "www.heateddrivewaypros.ca": 5,
  "holidaylightsdirect.ca": 6,
  "www.holidaylightsdirect.ca": 6,
  "holidaylightsupplies.ca": 6,
  "www.holidaylightsupplies.ca": 6,
  "homeenhance.ca": 6,
  "www.homeenhance.ca": 6,
  "homeserviceawards.ca": 6,
  "www.homeserviceawards.ca": 6,
  "hottubpads.ca": 6,
  "www.hottubpads.ca": 6,
  "illumitracklights.ca": 7,
  "www.illumitracklights.ca": 7,
  "kmkitchenrenovations.ca": 7,
  "www.kmkitchenrenovations.ca": 7,
  "listinglift.ca": 7,
  "www.listinglift.ca": 7,
  "londonconcreteforming.ca": 7,
  "www.londonconcreteforming.ca": 7,
  "londonconcretesealing.ca": 7,
  "www.londonconcretesealing.ca": 7,
  "londondeckbuilder.ca": 8,
  "www.londondeckbuilder.ca": 8,
  "londonfenceinstaller.ca": 8,
  "www.londonfenceinstaller.ca": 8,
  "londonretainingwalls.ca": 8,
  "www.londonretainingwalls.ca": 8,
  "masterdecker.app": 8,
  "www.masterdecker.app": 8,
  "masterdecker.com": 8,
  "www.masterdecker.com": 8,
  "mattdruzcz.ca": 9,
  "www.mattdruzcz.ca": 9,
  "mortgage-right.ca": 9,
  "www.mortgage-right.ca": 9,
  "mregresswindow.ca": 9,
  "www.mregresswindow.ca": 9,
  "ontariolightshows.ca": 9,
  "www.ontariolightshows.ca": 9,
  "ontariorampsolutions.ca": 9,
  "www.ontariorampsolutions.ca": 9,
  "optimumhvac.ca": 10,
  "www.optimumhvac.ca": 10,
  "permanentlightingdirect.ca": 10,
  "www.permanentlightingdirect.ca": 10,
  "readykitchens.ca": 10,
  "www.readykitchens.ca": 10,
  "readysealdirect.ca": 10,
  "www.readysealdirect.ca": 10,
  "restoremydeck.ca": 10,
  "www.restoremydeck.ca": 10,
  "rtacabinetscanada.ca": 11,
  "www.rtacabinetscanada.ca": 11,
  "seniorsafe.ca": 11,
  "www.seniorsafe.ca": 11,
  "serviceexcellenceawards.ca": 11,
  "www.serviceexcellenceawards.ca": 11,
  "spotlessdeckstaining.ca": 11,
  "www.spotlessdeckstaining.ca": 11,
  "spotlesspropertycleaning.ca": 11,
  "www.spotlesspropertycleaning.ca": 11,
  "tentasticpartyrentals.ca": 12,
  "www.tentasticpartyrentals.ca": 12,
  "torontodeckstainers.ca": 12,
  "www.torontodeckstainers.ca": 12,
  "totalbrantfordconcrete.ca": 12,
  "www.totalbrantfordconcrete.ca": 12,
  "tricityconcretesealing.ca": 12,
  "www.tricityconcretesealing.ca": 12,
  "weinstallchristmaslights.ca": 12,
  "www.weinstallchristmaslights.ca": 12,
  "weinstallgoveelights.ca": 13,
  "www.weinstallgoveelights.ca": 13,
  "woodstockconcreteforming.ca": 13,
  "www.woodstockconcreteforming.ca": 13,
  "woodstockconcretepros.ca": 13,
  "www.woodstockconcretepros.ca": 13,
  "woodstockdeckandfence.ca": 13,
  "www.woodstockdeckandfence.ca": 13
};

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const corsHeaders = (origin) => ({
  "Access-Control-Allow-Origin": origin || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
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
      return json({ success: false, error: "method-not-allowed" }, 405, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ success: false, error: "invalid-json" }, 400, origin);
    }

    const token = payload && payload.token;
    if (!token || typeof token !== "string") {
      return json({ success: false, error: "missing-token" }, 400, origin);
    }

    const hostname = resolveHostname(
      payload && payload.hostname,
      origin,
      request.headers.get("Referer"),
    );
    if (!hostname) {
      return json({ success: false, error: "missing-hostname" }, 400, origin);
    }

    const group = HOSTNAME_TO_GROUP[hostname];
    if (!group) {
      return json(
        { success: false, error: "unknown-hostname", hostname },
        400,
        origin,
      );
    }

    const secret = env[`TURNSTILE_SECRET_${group}`];
    if (!secret) {
      return json(
        { success: false, error: "secret-not-bound", group },
        500,
        origin,
      );
    }

    const remoteip =
      (payload && payload.remoteip) ||
      request.headers.get("CF-Connecting-IP") ||
      "";

    const form = new FormData();
    form.append("secret", secret);
    form.append("response", token);
    if (remoteip) form.append("remoteip", remoteip);

    let verifyData;
    try {
      const verifyRes = await fetch(SITEVERIFY_URL, {
        method: "POST",
        body: form,
      });
      verifyData = await verifyRes.json();
    } catch {
      return json({ success: false, error: "verify-fetch-failed" }, 502, origin);
    }

    // Defense in depth: assert siteverify's hostname matches what the caller claimed
    const verifiedHostname = (verifyData.hostname || "").toLowerCase();
    if (verifyData.success === true && verifiedHostname && verifiedHostname !== hostname) {
      return json(
        {
          success: false,
          error: "hostname-mismatch",
          claimed: hostname,
          verified: verifiedHostname,
        },
        400,
        origin,
      );
    }

    return json(
      {
        success: verifyData.success === true,
        errors: verifyData["error-codes"] || [],
        hostname: verifiedHostname || hostname,
        group,
      },
      200,
      origin,
    );
  },
};
