import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { X, ExternalLink, MapPin } from "lucide-react";
import { organizationSchema } from "@/lib/seo";

interface CaseStudy {
  id: number;
  client: string;
  countries: string;
  type: string;
  hook: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string;
  fullUrl: string | null;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    client: "1xBet Africa",
    countries: "Liberia · Nigeria · Ghana · Kenya · Zambia",
    type: "Brand Activation",
    hook: "Pan-African Presence Built One Market at a Time.",
    challenge: "1xBet needed simultaneous physical brand presence across five African markets with no existing ground-level infrastructure.",
    solution: "Coordinated offline brand activations across all five markets at once: experiential events, sports viewing centres, street ambassadors, billboard and merch branding, and data capture.",
    impact: "Multi-country brand footprint established across West, East, and Southern Africa in a single coordinated campaign wave.",
    image: "https://brandsenvoy.com/wp-content/uploads/2025/05/IMG_20240429_113555_303-e1746975022311.jpg",
    fullUrl: "https://brandsenvoy.com/case-studies/1xbet-africa-brand-activation-campaign/",
  },
  {
    id: 2,
    client: "CoinCola",
    countries: "Nigeria, Abuja · Lagos · Kaduna",
    type: "Crypto Exchange Onboarding",
    hook: "Putting Crypto in the Hands of Everyday Nigerians.",
    challenge: "CoinCola needed rapid user acquisition across Nigeria's three largest cities with a largely crypto-unfamiliar audience.",
    solution: "Integrated nationwide campaign: newsletter outreach, PR placements, Google display ads, social media activation, and on-ground city events.",
    impact: "Nationwide onboarding drive that moved CoinCola from fringe awareness to active user base across Abuja, Lagos, and Kaduna.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/WhatsApp-Image-2019-10-19-at-07.51.33.jpeg",
    fullUrl: "https://brandsenvoy.com/case-studies/crypto-exchange-activation-campaign/",
  },
  {
    id: 3,
    client: "GTA Mining",
    countries: "China · Nigeria · Ghana",
    type: "Destination Branding & Export",
    hook: "From Sourcing to Shelf. Across Three Countries.",
    challenge: "GTA Mining needed a full-service partner to manage a complex cross-border product journey from sourcing through branding to in-market launch.",
    solution: "End-to-end destination branding strategy: product sourcing in China, brand build in Nigeria, and coordinated export and delivery into the Ghanaian market.",
    impact: "Seamless three-country product pipeline that turned a raw supply chain into a market-ready branded product.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/29ad1e7f-ba75-4b37-a0d3-560d2825e46c-600x600-1-300x300.jpg",
    fullUrl: "https://brandsenvoy.com/case-studies/destination-brandng-africa/",
  },
  {
    id: 4,
    client: "Mental Health Brand",
    countries: "Ghana · South Africa · Ethiopia · Nigeria",
    type: "Pan-African Brand Build",
    hook: "Breaking the Stigma. Building a Brand.",
    challenge: "Mental health advocacy in Africa carries deep cultural stigma. The brand needed credibility, positioning, and reach across four distinct market contexts.",
    solution: "Pan-African brand positioning strategy, SEO architecture, and content structure built for multi-market resonance, anchored by real survey data from Nigeria.",
    impact: "A credible, culturally grounded mental health brand with structured content reach across four African markets.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/FAVEICON_page-0001-300x300-1.png",
    fullUrl: "https://brandsenvoy.com/case-studies/building-a-mental-health-brand/",
  },
  {
    id: 5,
    client: "EaseR Lifestyle",
    countries: "Nigeria, Lagos",
    type: "Brand Identity & Go-to-Market",
    hook: "Logistics Brand Built for a Mobile-First Market.",
    challenge: "EaseR Lifestyle was an idea without a brand. They needed identity, positioning, service definition, and a path to market, all from scratch.",
    solution: "Complete brand identity system, service offering definition, and go-to-market strategy built specifically for Lagos's competitive logistics space.",
    impact: "Successfully launched logistics brand. MD Anuli Ikwumere described the team's energy, creativity, and ability to not just conceptualize but birth ideas as impressive.",
    image: "https://easerlifestyle.com/wp-content/uploads/2025/12/Easer-1.png",
    fullUrl: "https://easerlifestyle.com/",
  },
  {
    id: 6,
    client: "Furniture Brand",
    countries: "Nigeria",
    type: "E-Commerce Repositioning",
    hook: "Beautiful Furniture. Better Sold Online.",
    challenge: "A traditional furniture brand with a strong physical showroom needed to pivot to online commerce without losing its premium positioning.",
    solution: "New e-commerce site, professional product photography, sales copywriting, and a social selling strategy built for Instagram and WhatsApp commerce.",
    impact: "Complete digital repositioning from offline showroom to a functioning online sales operation.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/1603798314529.jpg",
    fullUrl: "https://brandsenvoy.com/case-studies/furniture-brand-campaign/",
  },
  {
    id: 7,
    client: "Jamaican NGO",
    countries: "Jamaica",
    type: "Branding & Strategy",
    hook: "Giving a Cause the Brand It Deserved.",
    challenge: "A Jamaican non-profit was doing meaningful work but presenting itself without the brand weight to attract donors, partners, and media.",
    solution: "Full brand identity system from scratch: visual identity, messaging architecture, and go-to-market strategy tailored to Caribbean NGO stakeholders.",
    impact: "Professionally branded Caribbean non-profit positioned to compete for attention alongside international development organisations.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/jamaica-ngo-e1681717681222.jpeg",
    fullUrl: "https://brandsenvoy.com/case-studies/branding-a-Jamaican-ngo/",
  },
  {
    id: 8,
    client: "Anttention Fresh",
    countries: "Pan-African, 100+ Countries",
    type: "Brand Identity & Content Strategy",
    hook: "Africa's Story. Told From the Inside.",
    challenge: "A pan-African news brand needed a credible identity, SEO infrastructure, and content strategy capable of attracting a continent-wide readership.",
    solution: "Brand identity build, SEO architecture, and content strategy designed for scale, combined with ongoing retained marketing strategy since 2017.",
    impact: "Pan-African media brand with 100+ country readership. Business head Rufus Agbakoba noted they were affordable, creative, efficient, and professional.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/20211231_113359_0000.png",
    fullUrl: "https://brandsenvoy.com/case-studies/building-a-pan-african-news-brand/",
  },
  {
    id: 9,
    client: "MTN / Arsenal FC",
    countries: "Nigeria",
    type: "Mobile / Telecom Campaign",
    hook: "Football Fandom Meets Telecom Revenue.",
    challenge: "MTN needed to activate its Arsenal FC partnership to drive CRBT (ringback tune) subscriptions among football fans on the MTN network.",
    solution: "Mobile-first marketing campaign targeting Arsenal supporters on MTN, using the football partnership to make a telecom product worth buying.",
    impact: "Successful CRBT promotion converting fan engagement into telecom revenue, leveraging one of Nigeria's most popular European football clubs.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/arsemtn.png",
    fullUrl: "https://brandsenvoy.com/case-studies/mtn-arsenal-crbt-mobile-campaign/",
  },
  {
    id: 10,
    client: "Cold Stone Creameries",
    countries: "Nigeria, Lagos",
    type: "Social Media Campaign",
    hook: "A Scoop of Social. A Cup of Growth.",
    challenge: "Cold Stone Creameries needed to drive measurable in-store foot traffic through a social media campaign during a competitive promotional period.",
    solution: "Targeted social media discount campaign with clear mechanics: shareable content designed to convert followers into walk-ins.",
    impact: "Lagos creamery social campaign driving measurable store visits and brand engagement with a young, food-culture audience.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/banner-600x600-1.png",
    fullUrl: "https://brandsenvoy.com/case-studies/a-creamery-social-media-campaign/",
  },
  {
    id: 11,
    client: "Real Estate Brand",
    countries: "Nigeria",
    type: "Content Production",
    hook: "Turning Properties Into Stories Worth Buying.",
    challenge: "A Nigerian real estate developer needed premium content production to match the quality of properties they were selling.",
    solution: "Full content production pipeline: video production, professional photography, sales copywriting, and social media management for premium property listings.",
    impact: "Content-led sales support giving a real estate brand the visual and narrative credibility to compete at the premium end of the Nigerian market.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/banner0.jpg",
    fullUrl: "https://brandsenvoy.com/case-studies/marketing-a-real-estate-brand/",
  },
  {
    id: 12,
    client: "Travel Agency",
    countries: "Nigeria, Lagos",
    type: "Referral Campaign",
    hook: "Video Tutorial Turned Referral Machine.",
    challenge: "A Lagos travel agency wanted to activate an affiliate referral program but had no content infrastructure to train or motivate referral partners.",
    solution: "Video tutorial series and referral campaign strategy, turning the video content itself into the activation mechanism for the affiliate network.",
    impact: "Video-led affiliate campaign converting ordinary viewers into active travel referral agents, building a self-sustaining acquisition channel.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/download-5.jpg",
    fullUrl: "https://brandsenvoy.com/case-studies/video-tutorial-media-campaign-lagos/",
  },
  {
    id: 13,
    client: "Domino's Pizza, Click a Piece",
    countries: "South Africa",
    type: "Hyperlocal Social Campaign",
    hook: "Click a Piece. Sell a Thousand.",
    challenge: "Domino's South Africa needed a social media and geo-fenced campaign that would drive store traffic at the hyperlocal level.",
    solution: "Social media campaign combined with geo-fenced digital targeting, reaching potential customers in proximity to each store location.",
    impact: "Hyperlocal digital campaign driving measurable store traffic for Domino's South Africa, with social sharing amplifying geographic reach.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/pizzaria.webp",
    fullUrl: "https://brandsenvoy.com/case-studies/a-pizzeria-social-media-campaign/",
  },
  {
    id: 14,
    client: "Forex Trading Company",
    countries: "3 African Countries",
    type: "Digital Acquisition Campaign",
    hook: "Making Forex Accessible Across Borders.",
    challenge: "A forex trading platform needed simultaneous signup campaigns across three African markets with different digital maturity levels.",
    solution: "Cross-border video and social media acquisition campaign with adapted messaging per market while maintaining a unified brand campaign architecture.",
    impact: "Pan-African digital acquisition campaign that drove trading platform signups across three African markets in a single coordinated push.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/olymp.webp",
    fullUrl: "https://brandsenvoy.com/case-studies/forex-trading-company-campaign/",
  },
  {
    id: 15,
    client: "HP (Hewlett Packard)",
    countries: "Nigeria, Lagos + 4 States",
    type: "Offline Trade Roadshow",
    hook: "Protecting HP's Brand at the Grassroots.",
    challenge: "Counterfeit HP hardware was eroding both consumer trust and HP's market share across Nigerian trade channels.",
    solution: "Offline trade roadshow across Lagos and four additional Nigerian states: educating retailers, distributors, and consumers on authentic HP products.",
    impact: "Five-state activation that put HP's brand protection narrative directly into the hands of trade channel partners most vulnerable to counterfeit substitution.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/portfolio_68374.jpg",
    fullUrl: "https://brandsenvoy.com/case-studies/offline-brand-activation-agency/",
  },
  {
    id: 16,
    client: "ChromePay",
    countries: "Nigeria, 15 States",
    type: "Fintech Onboarding Campaign",
    hook: "15 States. One Fintech. Zero Compromise.",
    challenge: "ChromePay needed to onboard agents and merchants at scale across Nigeria, covering 15 states simultaneously to build out their payments infrastructure.",
    solution: "Integrated offline and online agent and merchant onboarding campaign spanning 15 Nigerian states, combining field activations with digital support.",
    impact: "Nationwide fintech rollout that established ChromePay's payment agent network across 15 states in a single coordinated campaign.",
    image: "https://brandsenvoy.com/wp-content/uploads/2023/05/slider-e1683898611851-2048x1365-1.jpg",
    fullUrl: "https://brandsenvoy.com/case-studies/fintech-company-campaign/",
  },
];

export function OurWork() {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <Layout
      title="Our Work: Case Studies | Brand Envoy Africa"
      description="See how Brand Envoy Africa has built, launched, and grown brands across Nigeria, Ghana, Kenya, and beyond. Bold, image-led case studies from a decade of proof-first work."
      canonical="/our-work"
      keywords={[
        "Brand Envoy Africa case studies", "marketing agency portfolio Nigeria",
        "branding case studies Africa", "advertising agency work Nigeria",
        "marketing results Nigeria", "brand campaigns Africa", "creative agency portfolio Lagos",
        "HP Nigeria marketing", "MTN campaign Nigeria", "Cold Stone branding Nigeria",
        "CoinCola marketing", "ChromePay branding", "1xBet campaign Nigeria",
        "EaseR Lifestyle branding", "marketing agency results Africa",
        "brand launch case study Nigeria", "FMCG marketing case study Africa",
        "crypto brand marketing Africa", "agency work samples Nigeria", "pan-African campaigns",
      ]}
      structuredData={[organizationSchema()]}
    >
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-20 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
              Proof Over Promises.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Sixteen campaigns. Twelve countries. One consistent outcome: measurable market impact. Click any case to see the challenge, the execution, and the result.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {CASE_STUDIES.map((study) => (
              <button
                key={study.id}
                onClick={() => setSelected(study)}
                className="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-5 bg-muted">
                  <img
                    src={study.image}
                    alt={study.hook}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://brandsenvoy.com/wp-content/uploads/2023/06/BE-Logo-7.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="h-3 w-3" />
                      {study.countries.split("·")[0].trim().split(",")[0].trim()}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <span>{study.client}</span>
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>{study.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                    {study.hook}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal / Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-background rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-muted">
              <img
                src={selected.image}
                alt={selected.hook}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://brandsenvoy.com/wp-content/uploads/2023/06/BE-Logo-7.png";
                }}
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-8">
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {selected.countries}
                </span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span>{selected.type}</span>
              </div>

              <h2 className="text-3xl font-bold mb-2 leading-tight">{selected.client}</h2>
              <p className="text-xl text-primary font-semibold mb-8">{selected.hook}</p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                    The Challenge
                  </h4>
                  <p className="text-base text-foreground leading-relaxed">{selected.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-2">
                    What We Did
                  </h4>
                  <p className="text-base text-foreground leading-relaxed">{selected.solution}</p>
                </div>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-2">
                    The Result
                  </h4>
                  <p className="text-base text-foreground leading-relaxed font-medium">{selected.impact}</p>
                </div>
              </div>

              {selected.fullUrl && (
                <a
                  href={selected.fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Read the full case study
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
