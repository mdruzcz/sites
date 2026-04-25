# sites

Turborepo monorepo for client websites by Matt Druzcz. One repo, many sites,
each deployed as its own Vercel project.

## Layout

```
apps/
  matt-druzcz-real-estate/   Next.js app
  london-concrete-forming/   Next.js app
  ...
packages/
  ui/         Shared React components
  db/         Supabase client (multi-tenant via site_id)
  cms/        Sanity client (one project, dataset-per-site)
  tsconfig/   Shared TS configs
```

## Adding a new site

1. `cp -R apps/_template apps/<your-slug>` (template TBD), or scaffold inline.
2. Add the new site to `tsconfig.json` references.
3. Push.
4. In Vercel, create a new project pointing at this repo with **Root Directory** = `apps/<your-slug>`.
5. Set the per-site env vars (SITE_ID, NEXT_PUBLIC_SANITY_DATASET) in the new Vercel project.
6. Optionally add a custom domain.

## Local dev

```bash
pnpm install
pnpm dev          # runs all apps in parallel
pnpm dev --filter matt-druzcz-real-estate   # one at a time
pnpm build
```

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind · Sanity (content) ·
Supabase (data, multi-tenant via site_id + RLS) · Vercel (hosting) · Turborepo (monorepo)
