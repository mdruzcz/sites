"""Register every deployed app in the self-hosted Umami and inject the tracker into its root layout.

Idempotent: re-running only fills gaps. Umami's tables live in the shared Supabase project, so
registration is a direct insert into `website` (no Umami API login needed).

Usage:  python scripts/umami-rollout.py [--dry]
Requires SUPABASE_SERVICE_ROLE_KEY in apps/holiday-light-supplies/.env.local (or env).
"""
import json, os, re, sys, uuid, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APPS = os.path.join(ROOT, "apps")
SUPABASE = "https://symgxmokposzjcgikgnz.supabase.co"
UMAMI_HOST = "https://analytics.masterdecker.com"
ADMIN_USER = "41e2b680-648e-4b09-bcd7-3e2b10c06264"
DRY = "--dry" in sys.argv

SKIP = {"admin", "ledger", "deckstain-v2", "deckstain-v3", "deckstain-v4", "deckstain", "woodstock-deck-fence",
        "professional-concrete-sealers", "spotless-property-cleaning", "get-legal-basements", "brantford-retaining-walls"}
# Domains the site.ts scan cannot infer, and corrections for placeholder registrations.
DOMAIN_OVERRIDES = {
    "forever-lights": "foreverlights.ca", "forevercabinets": "forevercabinets.ca",
    "holiday-light-supplies": "holidaylightsupplies.ca", "holiday-lights-direct": "holidaylightsdirect.ca",
    "illumi-track-lights": "illumitracklights.ca", "permanent-lighting-direct": "permanentlightingdirect.ca",
    "ready-kitchens": "readykitchens.ca", "ready-seal-direct": "readysealdirect.ca",
    "service-excellence-awards": "serviceexcellenceawards.ca", "matt-druzcz-real-estate": "mattdruzcz.ca",
    "deck-heroes": "deckheroes.ca", "gta-christmas-lights": "gtachristmaslighting.ca",
}

def key():
    k = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    if not k:
        for line in open(os.path.join(APPS, "holiday-light-supplies", ".env.local"), encoding="utf-8"):
            if line.startswith("SUPABASE_SERVICE_ROLE_KEY="):
                k = line.split("=", 1)[1].strip().strip('"')
    return k

KEY = key()

def rest(method, path, body=None, prefer=None):
    req = urllib.request.Request(SUPABASE + "/rest/v1/" + path, method=method, data=json.dumps(body).encode() if body is not None else None)
    req.add_header("apikey", KEY); req.add_header("Authorization", "Bearer " + KEY); req.add_header("Content-Type", "application/json")
    if prefer: req.add_header("Prefer", prefer)
    with urllib.request.urlopen(req) as r:
        t = r.read().decode()
        return json.loads(t) if t else None

def find_layout(app):
    for p in ("app/layout.tsx", "src/app/layout.tsx"):
        if os.path.exists(os.path.join(APPS, app, p)): return os.path.join(APPS, app, p)
    return None

def find_domain(app):
    if app in DOMAIN_OVERRIDES: return DOMAIN_OVERRIDES[app]
    for dp, _, files in os.walk(os.path.join(APPS, app)):
        if "node_modules" in dp or ".next" in dp: continue
        for f in files:
            if f == "site.ts":
                m = re.search(r'url:\s*["\']https?://(?:www\.)?([a-z0-9.-]+)', open(os.path.join(dp, f), encoding="utf-8", errors="ignore").read())
                if m: return m.group(1)
    lay = find_layout(app)
    if lay:
        m = re.search(r'metadataBase: new URL\(["\']https?://(?:www\.)?([a-z0-9.-]+)', open(lay, encoding="utf-8", errors="ignore").read())
        if m: return m.group(1)
    return None

def pretty(app):
    return " ".join(w.capitalize() for w in app.replace("-ca", "").split("-"))

websites = {w["domain"]: w for w in rest("GET", "website?select=website_id,name,domain&deleted_at=is.null")}
by_id = {w["website_id"]: w for w in websites.values()}
sites = {s["site_id"]: s for s in rest("GET", "sites?select=site_id,domain,umami_website_id,name")}

TAG = '<Script defer src="{host}/script.js" data-website-id="{id}" strategy="afterInteractive" />'
summary = []
for app in sorted(os.listdir(APPS)):
    if app in SKIP or not os.path.isdir(os.path.join(APPS, app)): continue
    lay = find_layout(app); dom = find_domain(app)
    if not lay or not dom:
        summary.append((app, "SKIP no layout/domain")); continue
    src = open(lay, encoding="utf-8").read()
    existing_id = None
    m = re.search(r'websiteId="([0-9a-f-]{36})"', src) or re.search(r'data-website-id="([0-9a-f-]{36})"', src)
    if m: existing_id = m.group(1)
    # 1) Umami website row
    w = websites.get(dom) or (by_id.get(existing_id) if existing_id else None)
    if w and w["domain"] != dom:
        if not DRY: rest("PATCH", f"website?website_id=eq.{w['website_id']}", {"domain": dom, "name": pretty(app)})
        w["domain"] = dom
    if not w:
        w = {"website_id": existing_id or str(uuid.uuid4()), "name": pretty(app), "domain": dom}
        if not DRY:
            rest("POST", "website", {**w, "user_id": ADMIN_USER, "created_by": ADMIN_USER}, prefer="return=minimal")
        websites[dom] = w
    wid = w["website_id"]
    # 2) sites registry row
    s = sites.get(app)
    if not DRY:
        if s:
            if s.get("umami_website_id") != wid or s.get("domain") != dom:
                rest("PATCH", f"sites?site_id=eq.{app}", {"umami_website_id": wid, "domain": dom})
        else:
            rest("POST", "sites", {"site_id": app, "name": pretty(app), "domain": dom, "umami_website_id": wid, "is_active": True}, prefer="return=minimal")
    # 3) tracker in layout
    action = "already tracked"
    if not existing_id:
        tag = TAG.format(host=UMAMI_HOST, id=wid)
        if "</body>" not in src:
            summary.append((app, "NO </body> in layout")); continue
        new = src.replace("</body>", "        " + tag + "\n      </body>", 1)
        if 'from "next/script"' not in new:
            new = re.sub(r'(import [^\n]*from "next";\n)', r'\1import Script from "next/script";\n', new, count=1) if 'from "next";' in new else 'import Script from "next/script";\n' + new
        if not DRY: open(lay, "w", encoding="utf-8").write(new)
        action = "injected"
    summary.append((app, f"{dom} {wid[:8]} {action}"))

for a, s in summary: print(f"{a:32} {s}")
print("dry run" if DRY else "done")
