# Brand Envoy Africa — Website Rebuild Brief

**Site:** brandsenvoy.com
**Prepared for:** Temple Obike, Brand Envoy Africa

## Instruction to the builder

Build every requirement in this brief in full. Before marking the build complete, go back through this document section by section and verify each item is actually present and working on the live site. Anything missing, incomplete, or partially built must be rebuilt — do not consider the build finished until every requirement below is verifiably in place.

---

## 1. Positioning & Purpose

- Brand Envoy Africa is a creative branding, advertising, and marketing agency headquartered in Lagos, Nigeria, active since 2015, with a footprint across Nigeria, Ghana, and Kenya.
- The site must read as proof-first: a visitor should sense within seconds that this agency has done real work and is actively doing it now — not a generic services brochure.
- Two audiences to design for simultaneously:
  - **Non-Nigerian companies** landing on the site doing due diligence — the site must read as trustworthy and workable from outside Nigeria.
  - **Nigerian companies** choosing between two engagement tiers — SME and Enterprise (see Section 4).
- Tone: functional, catchy, creative — but the site's real job is to get a visitor to reach out. No unnecessary friction between "interested" and "contacted us."
- Visual/UX direction: hybrid of two reference sites —
  - **Crafted (craftedny.com/featured-work)** — bold, image-led, one-line-hook case study presentation. Apply this to the Our Work page.
  - **Minuttia (minuttia.com)** — proof mechanics: a numbers strip, an explicit "Who We Serve" page, a personal message from leadership, a comparison block against alternatives. Apply this to Home and the Company nav section.

## 2. Navigation Structure

Top-level nav:

**Home | Company (dropdown) | Services (dropdown) | Political Campaigns | Markets We Serve | Affiliate Marketing | Our Work | Blog | Talk to Us**

**Company dropdown** (modeled on Minuttia's Company menu):
- Why Us
- Who We Serve
- Case Studies (can link to Our Work)
- Talk to Us

**Services dropdown** (five pillars):
- Creative & Branding
- Media & PR
- Market Entry & Distribution (includes FMCG Distribution + Agro Sourcing & Export as sub-sections)
- Market Research Consulting
- *(Do not list: Influencer Marketing, Programmatic Advertising — see Section 6)*

## 3. Homepage

Order of content, top to bottom:
1. Hero — strong positioning statement, not a generic tagline. Primary CTA: Talk to Us.
2. **Numbers strip** (Minuttia-style) — years active, countries served, election cycles worked, Clutch review rating, notable award (2019 African Brands Leadership Award — "Africa's Most Innovative Marketing/Creative Agency"). Pull real figures before building this section; do not use placeholder numbers.
3. Flagship ongoing client story — the long-running "one expert" engagement, told as a short narrative with a link through to the full case study.
4. Five service pillars, condensed, each linking to its full page.
5. Political Campaigns teaser — separate visual treatment, linking to the dedicated page.
6. Short "Message from the Founder" block — a personal, unscripted-sounding note from Temple, inviting visitors to check the agency out thoroughly before deciding to work together.
7. Brief-submission form, tier-routed (see Section 4).

## 4. Engagement Tiers

Two general tiers plus a separate campaign track:

- **SME tier** — single-market (Nigeria), project-scoped, fixed deliverables, shorter timelines. Self-serve: brief form → proposal → execution.
- **Enterprise tier** — multi-market, retained/ongoing, dedicated account team, quarterly strategy cycles.
- **Campaign tier** (political campaigns only) — scoped by office level (Local Government/State Assembly → Senatorial/Gubernatorial → Presidential) and election timeline. Routed directly to the political campaign team's contact, not the general brief form.

**Talk to Us page**: first question branches the visitor into SME flow, Enterprise flow, or Political Campaign flow.

## 5. Who We Serve (new page, under Company)

Modeled on Minuttia's explicit fit-filtering approach. State plainly who Brand Envoy is a good fit for and who isn't — including the distribution policy from Section 6, framed here as a fit criterion rather than buried in service copy.

## 6. Market Entry & Distribution (service pillar page)

Must include this policy, stated plainly near the top of the page:

> We distribute for brands that are ready to sell in-market — either you already have a presence here, or you're bringing your product in yourself. From there, we take it into stores and build the campaign that gets people buying. We don't finance market entry; we execute it.

Campaign tiers under distribution:
- **Entry tier** — product already landed/local presence confirmed → in-store placement + single-market awareness campaign.
- **Growth tier** — multi-city/multi-retailer rollout in one country → placement + fuller campaign (PR, influencer via partner, in-store experiential) with performance tracking.
- **Regional tier** — Nigeria + a second market → coordinated placement and campaign across both.

Includes Agro Sourcing & Export as a sub-service (not a standalone nav item — see Section 2).

## 7. Political Campaign Agency Page (standalone, top-level nav)

Content (adapted from the existing page at biz.antvt.com/political-campaign-agency/, being moved to Brand Envoy):

- Headline: "Political Campaign Agency in Nigeria"
- Subhead: "Convincing the electorate requires more than just a campaign."
- Body: ten-plus years across presidential, senatorial, and governorship elections; evolution from billboards/radio/TV to AI-assisted, data-driven targeting.
- Pull quote on the AI + digital + offline strategy approach.
- "Localized delivery" section: the literacy/rural-reach insight, and the four tactics — Mobile Marketing (robocalls, ward-level targeting), SMS Campaigns, Digital Display Campaigns, Video Ad Campaigns.
- 2027 election CTA: "We're already taking on campaign clients — presidential, gubernatorial, senatorial, House of Assembly, and local government. Talk to our political campaign team early."
- **Note on the client-logo carousel from the original page:** do not reuse the party-logo carousel. Replace with neutral language ("we've worked across the political spectrum, at every level of government") to keep the page welcoming to aspirants of any party.
- Routes to the Campaign tier contact flow (Section 4), not the general brief form.

## 8. Markets We Serve (new page)

One page, sectioned (not separate URLs) by market: Nigeria, Ghana, Kenya, South Africa, Mauritius, Seychelles, Uganda, Tanzania, Cameroon, Francophone Africa. Each section needs real, specific content (what's been done there, what a client gets) — not just keyword-stuffed headers.

## 9. Affiliate Marketing (new page/service)

Brand Envoy will act as an affiliate marketer for brands — promoting products under affiliate links.

**Functional requirement — build this as a lightweight system, not a manual blogging workflow:**
- Temple (or team) submits an affiliate link plus basic product info.
- Copy for the listing is generated in Brand Envoy's brand voice automatically (or with minimal editing) from that input.
- The listing publishes to the Affiliate Marketing page immediately — no separate blog-post publishing step required.
- This needs its own simple submission/management flow (e.g., a lightweight admin form or spreadsheet-to-page pipeline) — flag to the builder as a distinct technical component to scope and propose an approach for, since it's a mini-CMS feature, not a static page.

## 10. Blog

- Do not touch. Same URLs, same permalink structure, same category taxonomy as the current WordPress blog.
- Any post or listing currently ranking on Google must keep its exact URL. If anything must move, use 301 redirects — no exceptions.
- New theme/design wraps around the existing blog; presentation only, no structural changes.

## 11. Shop (WooCommerce)

- Removed from primary nav and footer. Not part of the rebuilt agency site's core experience.

## 12. Cookie Consent

- Full cookie consent banner: Strictly Necessary (locked on), Performance, Targeting, Functionality categories, with equally prominent Accept All / Decline All buttons.
- Must functionally block Performance/Targeting cookies until consent is given — not just display cosmetically while tracking runs regardless.
- Build to the fuller GDPR-style standard (category-by-category) rather than the lighter NDPR minimum, since it also needs to read as trustworthy to UK/EU visitors.

## 13. SEO & AI Search (AnswerEO)

- Every new page: minimum 20 target keywords, built from real content (country-specific proof, not keyword stuffing) — spanning Nigeria, Ghana, Kenya, South Africa, Mauritius, Seychelles, Uganda, Tanzania, Cameroon, Francophone Africa.
- Political Campaigns page keyword set should include office-level + geography + year variants (e.g. "political campaign agency Nigeria," "2027 Nigeria elections campaign agency," "governorship campaign strategy Nigeria").
- Structured data: Organization schema, Service schema, FAQ schema on every service page, LocalBusiness schema per market section.
- FAQ-formatted blocks on every pillar page and the Political Campaigns page.
- Consistent NAP (name/address/phone) and service descriptions across the site and all external listings (LinkedIn, Clutch, DesignRush, Sortlist) — flag and clean up drift, including retiring/redirecting the old brandenvoy.mobi presence if still live.
- Add an `llms.txt` file at the site root describing the site, its offerings, and key pages for AI crawlers.
- Team/founder bios with real credentials, to support AI engines' preference for citable, authoritative authorship.

## 14. Technical / Independence Requirement

The site must run on its own — it should not depend on third-party services to function, with the sole exception of what's required for embedded video to play (e.g. YouTube embeds). Contact/lead capture, the affiliate publishing flow, and core site functionality should not require an external platform to keep working. Flag to Temple, before build, any specific piece that genuinely requires a third-party dependency, and why, rather than assuming one is acceptable.

The build should also be easy to transition and move — avoid locking core functionality (forms, content, affiliate system) into a platform-specific plugin ecosystem that would make a future migration difficult.

## 15. Contact Information

- Primary email: business@brandsenvoy.com
- Secondary email: dsfbrandenvoy@gmail.com
- Both listed in footer and on Talk to Us page.

## 16. Removed From Scope

- Influencer Marketing and Programmatic Advertising: not listed as public services (delivered via white-label partner; not surfaced on the rebuilt site).

