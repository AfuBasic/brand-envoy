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

## 17. Case Studies Index Fix

The current case-studies page (brandsenvoy.com/case-studies/) links out to 15 detailed case study pages, but the index itself shows a bare image grid with no titles, client names, country tags, or campaign type — none of the proof on the individual pages reaches a visitor browsing the index. Fix: every tile needs a title, one-line hook, and country tag (Crafted-style), linking through to the full write-up.

Full case study inventory to carry into the rebuild, with corrected country data:

| Campaign | Country/Countries | Nature of Campaign |
|---|---|---|
| 1xBet (sports betting) | Liberia, Nigeria, Ghana, Kenya (Nairobi), Zambia — *not Cameroon; that activation was deactivated after a while and did not continue* | Pan-African offline brand activation — experiential marketing, street events, sports viewing centres, billboard/merch branding, street ambassadors, data capture |
| CoinCola (crypto exchange) | Nigeria (Abuja, Lagos, Kaduna) | Nationwide onboarding campaign — newsletter, PR, Google display ads, social, events |
| GTA Mining (mining/energy) | Sourced in China, branded in Nigeria, delivered to Ghana | Destination branding + product sourcing/export |
| Mental health brand | Ghana, South Africa, Ethiopia, Nigeria (survey base) | Pan-African brand build — positioning, SEO, content structure |
| EaseR Lifestyle (logistics) | Nigeria (Lagos) | Brand identity, service offering, go-to-market (per Clutch review — see Section 18) |
| Furniture brand | Not stated (implied local/Nigeria) | E-commerce repositioning — new site, photography, copywriting, social selling |
| Jamaican NGO | Jamaica | Branding + go-to-market strategy |
| Anttention Fresh (Pan-African news) | Pan-African — 100+ country readership | Brand identity, SEO, content strategy |
| MTN/Arsenal FC | Nigeria | Mobile/telecom campaign — CRBT tune promotion |
| Cold Rush (creamery) | Nigeria (Lagos) | Social media discount campaign |
| Real estate brand | Nigeria (implied) | Video, photography, copywriting, social |
| Travel agency | Nigeria (Lagos) | Affiliate-program video tutorial + referral campaign |
| Pizzeria | South Africa | Social + geo-fenced local campaign |
| Forex trading company | 3 African countries (unnamed — confirm with Temple) | Video + social signup campaign |
| HP (Hewlett Packard) | Nigeria (Lagos + 4 other states) | Offline trade roadshow against counterfeit hardware |
| ChromePay (fintech) | Nigeria (15 states) | Offline + online agent/merchant onboarding |

This table also feeds the Markets We Serve page (Section 8) — cross-reference so country claims made there are backed by an actual case.

**Confirmed source links** (all 15 hosted case studies, plus 1 external):
1. brandsenvoy.com/case-studies/1xbet-africa-brand-activation-campaign/
2. brandsenvoy.com/case-studies/crypto-exchange-activation-campaign/
3. brandsenvoy.com/case-studies/destination-brandng-africa/
4. brandsenvoy.com/case-studies/building-a-mental-health-brand/
5. easerlifestyle.com/ — external, links to client's own site, not a hosted case study page
6. brandsenvoy.com/case-studies/furniture-brand-campaign/
7. brandsenvoy.com/case-studies/branding-a-Jamaican-ngo/
8. brandsenvoy.com/case-studies/building-a-pan-african-news-brand/
9. brandsenvoy.com/case-studies/mtn-arsenal-crbt-mobile-campaign/
10. brandsenvoy.com/case-studies/a-creamery-social-media-campaign/
11. brandsenvoy.com/case-studies/marketing-a-real-estate-brand/
12. brandsenvoy.com/case-studies/video-tutorial-media-campaign-lagos/
13. brandsenvoy.com/case-studies/a-pizzeria-social-media-campaign/
14. brandsenvoy.com/case-studies/forex-trading-company-campaign/
15. brandsenvoy.com/case-studies/offline-brand-activation-agency/
16. brandsenvoy.com/case-studies/fintech-company-campaign/

**Interaction spec:** clicking a case-study tile on the index does not navigate straight to a new page. Instead it opens a card (modal/lightbox) in place, showing: title, country tag, one-line hook, a short challenge → solution → impact summary, and the campaign image — with a "Read full case study" link inside the card through to the complete write-up (the existing full page at each URL above, content preserved as-is). This lets a visitor browse several case studies in sequence without losing their place on the index each time.

**Image sourcing — required cleanup:** 11 of the 15 case study images are currently hosted on `vtu.allpraise.ng`, an unrelated third-party domain (almost certainly a leftover from an old migration) rather than brandsenvoy.com. These must be re-uploaded into Brand Envoy's own media library before launch — hotlinking from an external domain risks the images breaking without warning. Only the 1xBet, CoinCola, and ChromePay case studies currently have their images hosted on-domain already.

**No stock or generated imagery:** every image used across the case studies section — on the index cards and on the full case study pages — must be real media from the actual project (the existing campaign photos already on each page). Do not substitute stock photography or AI-generated images for any case study. Where a full case study page includes video embeds, those carry through unchanged when a visitor clicks through from the card to the full page.

## 18. Clutch Reviews Page (new, popup-style)

Brand Envoy has 6 verified reviews on Clutch (clutch.co/profile/brand-envoy-africa), overall rating 4.8/5. Build a dedicated reviews page/popup that compiles all of them in full, so this proof point is visibly healthy rather than buried on a third-party site. Since Clutch does not expose separate permalinks per review, link each entry back to the main Clutch profile page and reproduce the reviewer, company, rating, and key quote directly on Brand Envoy's own page.

| Client / Company | Reviewer | Project | Rating | Key Quote |
|---|---|---|---|---|
| ANTtention Media Africa (Pan-African media) | Rufus Agbakoba, Business Head MENA Region | Branding & marketing strategy, July 2017–ongoing | 5.0 | "Not only were they affordable, but they were also creative, efficient, and professional." |
| Innovation Hub Company | PHP Engineer (anonymous) | Branding & graphic design, Jun–Jul 2018 | 4.5 | "They were adaptable and maintained the deadlines they set." |
| Argentina for Foodstuff (mini-market, Bahrain) | Praveen Kalkani, Director | Marketing & promotional campaign, Mar–Dec 2018 | 5.0 | "They were disciplined and respected our views—they really listened to us, which is rare in this industry." |
| Global Trade Advisors (real estate, Canada) | CEO (anonymous) | Market research, Sep 2013–Jan 2019 | 4.5 | "Brand Envoy Africa delivers quality work." |
| Easer Lifestyle Africa (logistics, Lagos) | Anuli Ikwumere, Managing Director | Branding & research, Mar 2019–ongoing | 5.0 | "Their energy, creativity, and ability to not just conceptualize but birth ideas are impressive." |
| Temple's Counsel & Mind Academy (Lagos) | Sapphire Obike, Head of Marketing | Digital marketing, Jan–Nov 2021 | 5.0 | "Their creativity and team spirit made work seamless." |

Link the page/popup to the live Clutch profile so visitors can verify independently: https://clutch.co/profile/brand-envoy-africa

**Visual treatment:** Clutch testimonials are text-only — no campaign photo exists per review. Rather than sourcing six different client logos (only ANTtention Media Africa's is readily available; the rest belong to clients or need to be supplied by Temple), default to a uniform quote-card design in Brand Envoy's own brand colors/typography for all six reviews, so the set looks intentional rather than having some cards with logos and others blank.

## 19. Trust Badges & Additional Client Credentials

**Badges to display** (verified, currently active):
- TechBehemoths "Verified Company" badge
- TechBehemoths "Awards Winner" badges — 2022, 2023, and 2024
- Place on the homepage trust strip alongside the Clutch rating (Section 3).
- Note: TechBehemoths' own profile summary for Brand Envoy currently flags the portfolio/review data as thin — worth strengthening that profile directly (more portfolio detail, more reviews) so it matches the badge being displayed.

**Not included (no verified badge asset found):**
- DesignRush — profile exists but no distinct award badge found; don't display a DesignRush badge unless Temple supplies the actual asset.
- The Manifest — confirmed feature on "Best Brand Strategy Companies in Nigeria," but no badge graphic located; check the Manifest profile directly for an embeddable badge/widget if one exists.

**Named clients confirmed via DesignRush portfolio (not previously documented):**
- Cold Stone Creameries — this is the "creamery" case study (Section 17)
- Domino's Pizza, "Click a Piece" campaign — this is the "pizzeria" case study (Section 17), South Africa
- Additional named clients to consider surfacing: Wakanow, Faspay Global, Infinix, Cadbury, Brand Market, Global Trade Advisors (Canada — also a Clutch reviewer, Section 18)

**New case study confirmed (not in the original 15):**
- **Press Release Case Study — Middle East expansion.** A client held an event and wanted press coverage extended into the Middle East market. The release ran across Dubai (UAE), Bahrain, Oman, and Qatar, opening the client to a brand-new region. Add as a 16th case study, and add UAE, Bahrain, Oman, and Qatar to the Markets We Serve page (Section 8) — this is the only confirmed case study reach outside Africa, and it's a strong non-Nigerian-trust signal worth its own visual treatment on Home or Our Work.
- The Bahrain mini-market Clutch review case study (Section 18) is confirmed as **The Argentina Stores**.

## 20. Removed From Scope

- Influencer Marketing and Programmatic Advertising: not listed as public services (delivered via white-label partner; not surfaced on the rebuilt site).

