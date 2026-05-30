# forms-submit Worker

Shared Cloudflare Worker that writes lead/quote form submissions into the shared
Supabase project for every Master Decker site.

## Why this exists

Sites used to POST directly to Supabase's PostgREST endpoint with a Supabase key
baked into each site's Vercel env. When the project's JWT secret was rotated, the
legacy anon key died everywhere at once and every form silently dropped leads
(insert 401'd, route still returned success). Centralizing the key here means a
rotation is a **one-place** change (`wrangler secret put SUPABASE_KEY`) instead of
~40 site redeploys.

## Contract

`POST https://forms.masterdecker.com` (or the `*.workers.dev` URL)

```json
{
  "hostname": "londonconcreteforming.ca",
  "row": { "first_name": "Jane", "phone": "519...", "email": "...", "services": ["Patios"] }
}
```

- `hostname` — the site's apex or `www.` domain. Mapped to its table in `src/index.js`.
  If omitted, the Worker falls back to the request `Origin`/`Referer` host.
- `row` — the exact object to INSERT. **The calling site owns its column names**;
  the Worker is column-agnostic and just forwards `row` to `/rest/v1/<table>`.

Response: `{ ok: true, table }` on success; `{ ok: false, error, ... }` otherwise.
Callers MUST check `ok` and surface a real error instead of faking success.

## Config

- `SUPABASE_URL` — non-secret var in `wrangler.toml`.
- `SUPABASE_KEY` — secret. Use the modern `sb_publishable_...` publishable key
  (survives JWT-secret rotation). Set with `npm run secret:set`.

## Adding a new site

Add one line to `HOSTNAME_TO_TABLE` in `src/index.js` (`"<apex>": "<table>"`; the
`www.` variant is added automatically) and redeploy the Worker. No site redeploy
needed for the mapping itself — only when the site's route is first migrated.

## Tables covered

40 lead/quote tables across 43 hostnames (some sites share a table, e.g.
`deck_leads` is used by deckheroes.ca, londondeckbuilder.ca, torontodeckstainers.ca).
Stripe ecommerce sites (`ecom_*` tables) are intentionally NOT handled here.

## Deploy

```bash
npm install
npm run secret:set   # paste the sb_publishable_... key
npm run deploy
```
