# turnstile-verify

Shared Cloudflare Worker that verifies Cloudflare Turnstile tokens for every site in this monorepo. One widget, one Worker, one secret — sites just POST tokens to this endpoint.

## How it works

```
[Browser] --(token from <Turnstile/>)--> [Site /api/contact]
                                              |
                                              v
                              POST {token} to TURNSTILE_VERIFY_ENDPOINT
                                              |
                                              v
                          [turnstile-verify Worker] --(secret)--> Cloudflare siteverify
                                              |
                                              v
                              {success: true|false, errors: [...]}
```

Each site's API route only knows the Worker URL. The Turnstile **secret** lives only inside the Worker, never in `.env.local` and never in Vercel.

## Request / response

**Request**
```http
POST /
Content-Type: application/json

{ "token": "<turnstile-token-from-widget>", "remoteip": "1.2.3.4" }
```

`remoteip` is optional — if omitted the Worker uses `CF-Connecting-IP`.

**Response**
```json
{
  "success": true,
  "errors": [],
  "hostname": "example.ca",
  "action": null,
  "cdata": null
}
```

On failure: `success: false` plus an `error` (top-level) or `errors` array from Cloudflare.

## Deploy

```bash
# 1. Install
npm install

# 2. Login (one-time)
npx wrangler login

# 3. Set the secret (interactive prompt)
npm run secret:set

# 4. Deploy
npm run deploy
```

After deploy, note the URL. It's either:
- `https://turnstile-verify.<your-subdomain>.workers.dev` (default), or
- `https://turnstile.masterdecker.com` (if the custom route in `wrangler.toml` is uncommented and the zone exists)

That URL goes into every site's Vercel project as `TURNSTILE_VERIFY_ENDPOINT`.

## Calling the Worker from a Next.js API route

```ts
const verifyRes = await fetch(process.env.TURNSTILE_VERIFY_ENDPOINT!, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token }),
});
const { success } = await verifyRes.json();
if (!success) return NextResponse.json({ error: "Invalid captcha" }, { status: 400 });
```

## Tail logs

```bash
npm run tail
```
