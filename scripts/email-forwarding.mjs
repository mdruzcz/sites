#!/usr/bin/env node
/**
 * Give every satellite domain a forwarding address using Cloudflare Email Routing (free, no mailbox).
 *
 *   node scripts/email-forwarding.mjs --dest service@masterdecker.com [--local service] [--catch-all] [--zone example.ca] [--dry] [--force]
 *
 * Needs a Cloudflare API token with:  Zone → Email Routing Rules: Edit,  Zone → DNS: Edit,
 * and Account → Email Routing Addresses: Edit. Pass it as CF_EMAIL_TOKEN (the DNS-only token in CLAUDE.md is not enough).
 *
 * What it does per zone:
 *   1. Skips zones that already have MX records (mxroute, Google Workspace) unless --force, so real mailboxes are never broken.
 *   2. Enables Email Routing (Cloudflare writes the MX + SPF records).
 *   3. Creates a rule  <local>@<zone> → <dest>   (or a catch-all with --catch-all).
 * The destination address must be verified once in Cloudflare (a verification email is sent on first use).
 */
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const flag = (k) => args.includes(k);
const TOKEN = process.env.CF_EMAIL_TOKEN;
const DEST = opt("--dest");
const LOCAL = opt("--local", "service");
const ONLY = opt("--zone");
const DRY = flag("--dry");
const FORCE = flag("--force");
const CATCH_ALL = flag("--catch-all");
if (!TOKEN || !DEST) { console.error("CF_EMAIL_TOKEN env and --dest are required"); process.exit(1); }

const api = async (path, method = "GET", body) => {
  const r = await fetch("https://api.cloudflare.com/client/v4" + path, { method, headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json();
  if (!j.success) throw new Error(`${method} ${path}: ${JSON.stringify(j.errors)}`);
  return j.result;
};

const zones = [];
for (let page = 1; ; page++) {
  const r = await api(`/zones?per_page=50&page=${page}${ONLY ? `&name=${ONLY}` : ""}`);
  zones.push(...r);
  if (r.length < 50) break;
}
const accountId = zones[0]?.account?.id;

// Make sure the destination address exists (Cloudflare emails a verification link the first time).
const dests = await api(`/accounts/${accountId}/email/routing/addresses?per_page=50`);
if (!dests.find((d) => d.email === DEST)) {
  console.log(`Registering destination ${DEST} (check the inbox for Cloudflare's verification email)`);
  if (!DRY) await api(`/accounts/${accountId}/email/routing/addresses`, "POST", { email: DEST });
}

for (const z of zones) {
  const mx = await api(`/zones/${z.id}/dns_records?type=MX`);
  const foreign = mx.filter((m) => !/mx\.cloudflare\.net$/.test(m.content));
  if (foreign.length && !FORCE) { console.log(`${z.name.padEnd(36)} skip: existing MX ${foreign.map((m) => m.content).join(", ")}`); continue; }
  const routing = await api(`/zones/${z.id}/email/routing`);
  if (routing.enabled !== true) {
    console.log(`${z.name.padEnd(36)} enable email routing`);
    if (!DRY) await api(`/zones/${z.id}/email/routing/dns`, "POST");
  }
  const rules = await api(`/zones/${z.id}/email/routing/rules`);
  const wanted = CATCH_ALL ? null : `${LOCAL}@${z.name}`;
  const exists = rules.find((r) => (CATCH_ALL ? r.matchers?.some((m) => m.type === "all") : r.matchers?.some((m) => m.value === wanted)));
  if (exists) { console.log(`${z.name.padEnd(36)} rule exists → ${exists.actions?.[0]?.value?.join(",")}`); continue; }
  console.log(`${z.name.padEnd(36)} create ${CATCH_ALL ? "catch-all" : wanted} → ${DEST}`);
  if (DRY) continue;
  if (CATCH_ALL) await api(`/zones/${z.id}/email/routing/rules/catch_all`, "PUT", { enabled: true, name: "catch-all to inbox", matchers: [{ type: "all" }], actions: [{ type: "forward", value: [DEST] }] });
  else await api(`/zones/${z.id}/email/routing/rules`, "POST", { name: `${LOCAL} forward`, enabled: true, matchers: [{ type: "literal", field: "to", value: wanted }], actions: [{ type: "forward", value: [DEST] }] });
}
console.log(DRY ? "dry run complete" : "done");
