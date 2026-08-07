# Brand Envoy Africa

Marketing website for Brand Envoy Africa — a creative branding, advertising, and marketing agency headquartered in Lagos, Nigeria since 2015, with presence across Nigeria, Ghana, and Kenya.

## Run & Operate

- `pnpm --filter @workspace/brand-envoy-africa run dev` — run the frontend (port via env)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Poppins font, wouter routing
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/brand-envoy-africa/src/` — React frontend (pages, components, routing)
- `artifacts/api-server/src/routes/` — API route handlers (contact, affiliates, blog proxy)
- `lib/db/src/schema/` — DB schema: `contacts.ts`, `affiliates.ts`
- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API)
- `attached_assets/be-logo.png` — Brand Envoy Africa logo

## Pages

- `/` — Home (hero, numbers strip, flagship client, services, political teaser, founder message, brief form)
- `/why-us` — Why Us (proof, comparison vs. generic agencies)
- `/who-we-serve` — Explicit fit-filtering page
- `/our-work` — Case studies (Crafted NY-style, image-led)
- `/services/creative-branding` — Creative & Branding pillar
- `/services/media-pr` — Media & PR pillar
- `/services/market-entry` — Market Entry & Distribution (with FMCG + Agro)
- `/services/market-research` — Market Research Consulting
- `/political-campaigns` — Political Campaign Agency (standalone)
- `/markets` — Markets We Serve (Nigeria, Ghana, Kenya, SA, etc.)
- `/affiliate-marketing` — Public affiliate product listings
- `/affiliate-admin` — Affiliate management (submit/publish/edit)
- `/blog` — Blog listing (WordPress REST API proxy)
- `/blog/:slug` — Individual blog post
- `/talk-to-us` — Tier-routed contact (SME / Enterprise / Campaign)

## API Endpoints

- `POST /api/contact` — submit contact/brief (tier-routed)
- `GET /api/contact` — list submissions (admin)
- `GET /api/affiliates` — list published affiliate products
- `POST /api/affiliates` — create affiliate product (auto-generates copy)
- `GET /api/affiliates/stats` — affiliate stats
- `GET /api/affiliates/:id` — single affiliate
- `PUT /api/affiliates/:id` — update affiliate
- `DELETE /api/affiliates/:id` — delete affiliate
- `POST /api/affiliates/:id/publish` — toggle publish status
- `GET /api/blog/posts` — blog posts (proxied from brandsenvoy.com WordPress)
- `GET /api/blog/posts/:slug` — single blog post

## Architecture decisions

- Blog is proxied from the live WordPress site (brandsenvoy.com/wp-json/wp/v2) to preserve existing URLs and SEO — not rebuilt
- Affiliate copy is auto-generated server-side on create; the generated copy is stored in the DB and editable via /affiliate-admin
- Contact form routes into three tiers (SME, Enterprise, Campaign) — each tier has different fields surfaced
- Cookie consent uses localStorage with GDPR-grade categories (Strictly Necessary, Performance, Targeting, Functionality)
- No third-party auth or CMS dependency — all contact capture and affiliate management is self-hosted

## Contact Information

- Primary: business@brandsenvoy.com
- Secondary: dsfbrandenvoy@gmail.com

## User preferences

_Populate as you build._

## Gotchas

- After any OpenAPI spec change, re-run codegen before editing route handlers: `pnpm --filter @workspace/api-spec run codegen && pnpm run typecheck:libs`
- `type: integer` in the OpenAPI spec generates `zod.int()` (Zod v4 syntax) — use `type: number` instead with the current Orval + Zod v3 setup
- `format: email` and `format: uri` in the OpenAPI spec also generate Zod v4 syntax — omit those formats

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
