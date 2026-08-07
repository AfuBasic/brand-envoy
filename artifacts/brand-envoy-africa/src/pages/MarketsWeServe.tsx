import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";

const MARKETS = [
  {
    id: "nigeria",
    country: "Nigeria",
    region: "West Africa",
    flag: "🇳🇬",
    description:
      "Our headquarters and largest operational base. We navigate the complexities of Africa's largest economy with unmatched local intelligence: Lagos retail networks, Abuja policy circles, and grassroots political campaigns.",
    highlights: [
      "Deep retail penetration across Lagos, Abuja, Kano, and 15+ states",
      "Complex political campaign execution at all office levels",
      "Regulatory navigation and market entry for foreign brands",
      "FMCG distribution and trade activation",
      "Confirmed clients: HP, MTN/Arsenal, Cold Stone, EaseR Lifestyle, ChromePay, CoinCola",
    ],
    caseRef: "1xBet, CoinCola, ChromePay, HP, Cold Stone, MTN, EaseR Lifestyle",
  },
  {
    id: "ghana",
    country: "Ghana",
    region: "West Africa",
    flag: "🇬🇭",
    description:
      "A crucial gateway to West Africa. Ghana's stable business environment and Accra's growing creative economy make it the right launchpad for brands moving west.",
    highlights: [
      "Accra-based brand activation and on-ground execution",
      "FMCG distribution networks for imported products",
      "Destination branding and export coordination",
      "Cross-border campaign management from Nigeria",
    ],
    caseRef: "1xBet (Accra), GTA Mining (Ghana delivery)",
  },
  {
    id: "kenya",
    country: "Kenya",
    region: "East Africa",
    flag: "🇰🇪",
    description:
      "Our East African operational base. Kenya's mobile-first digital economy and Nairobi's position as the continent's tech hub make it the right market for brands scaling eastward.",
    highlights: [
      "Nairobi-based brand activation and field execution",
      "Mobile-first and digital campaign strategies",
      "East Africa gateway for brands expanding from West",
      "Pan-African campaign coordination from Nairobi",
    ],
    caseRef: "1xBet (Nairobi activation)",
  },
  {
    id: "south-africa",
    country: "South Africa",
    region: "Southern Africa",
    flag: "🇿🇦",
    description:
      "The continent's most sophisticated corporate market. We execute premium brand positioning, hyperlocal digital campaigns, and social media activations for brands navigating South Africa's competitive landscape.",
    highlights: [
      "Hyperlocal geo-fenced digital campaigns",
      "Premium brand positioning for consumer markets",
      "Social media campaign execution",
      "Pan-African mental health brand work",
    ],
    caseRef: "Domino's Pizza 'Click a Piece' (South Africa), Mental Health Brand",
  },
  {
    id: "zambia",
    country: "Zambia",
    region: "Southern Africa",
    flag: "🇿🇲",
    description:
      "Part of our pan-African activation reach, with on-ground brand presence established through large-scale multi-country campaigns.",
    highlights: [
      "Pan-African offline brand activation",
      "Street-level brand ambassador programmes",
      "Sports viewing centre activations",
    ],
    caseRef: "1xBet (Zambia activation)",
  },
  {
    id: "liberia",
    country: "Liberia",
    region: "West Africa",
    flag: "🇱🇷",
    description:
      "A growing part of our West African footprint, reached through integrated pan-African campaigns combining field execution with digital amplification.",
    highlights: [
      "Pan-African offline brand presence",
      "Experiential marketing and street events",
      "Data capture and community activation",
    ],
    caseRef: "1xBet (Liberia activation)",
  },
  {
    id: "ethiopia",
    country: "Ethiopia",
    region: "East Africa",
    flag: "🇪🇹",
    description:
      "Africa's second-most-populous nation and a fast-growing market for brands building continent-wide presence. We have executed brand and content strategy here as part of multi-country campaigns.",
    highlights: [
      "Multi-country content strategy execution",
      "Brand positioning for socially sensitive categories",
      "Pan-African audience research and data",
    ],
    caseRef: "Mental Health Brand (Ethiopia market)",
  },
  {
    id: "mauritius",
    country: "Mauritius",
    region: "Indian Ocean Africa",
    flag: "🇲🇺",
    description:
      "A strategic hub for brands entering Africa via the Indian Ocean corridor. Mauritius's financial services ecosystem and bilingual market make it ideal for brands bridging Africa and international markets.",
    highlights: [
      "Brand strategy for Indian Ocean market entry",
      "Bridge market for international brands entering Africa",
      "Bilingual campaign capability (English/French)",
    ],
    caseRef: "Pan-African market coverage",
  },
  {
    id: "seychelles",
    country: "Seychelles",
    region: "Indian Ocean Africa",
    flag: "🇸🇨",
    description:
      "Part of our Indian Ocean Africa coverage, with capacity for brand work targeting the premium island market and its international visitor base.",
    highlights: [
      "Premium brand positioning for island markets",
      "Bilingual campaign capability (English/French/Creole)",
      "International tourism-adjacent brand work",
    ],
    caseRef: "Indian Ocean market coverage",
  },
  {
    id: "uganda",
    country: "Uganda",
    region: "East Africa",
    flag: "🇺🇬",
    description:
      "Part of our growing East African presence. Kampala's young, digitally active population makes it a strong market for consumer brand activation.",
    highlights: [
      "East Africa multi-market campaign reach",
      "Consumer brand activation",
      "Digital and social media campaigns",
    ],
    caseRef: "East African market coverage",
  },
  {
    id: "tanzania",
    country: "Tanzania",
    region: "East Africa",
    flag: "🇹🇿",
    description:
      "Dar es Salaam and Arusha are growing centres for consumer brands moving into East Africa. We have operational capacity for brand entry and activation campaigns here.",
    highlights: [
      "Consumer brand entry campaigns",
      "Swahili-market messaging capability",
      "East Africa regional campaign coordination",
    ],
    caseRef: "East African market coverage",
  },
  {
    id: "cameroon",
    country: "Cameroon",
    region: "Central Africa",
    flag: "🇨🇲",
    description:
      "A bilingual Central African market bridging Anglophone and Francophone Africa. Ideal for brands scaling their presence across language boundaries.",
    highlights: [
      "Bilingual (English/French) campaign capability",
      "Central Africa brand activation",
      "Cross-border strategy from Nigeria and Francophone markets",
    ],
    caseRef: "Central Africa market coverage",
  },
  {
    id: "francophone",
    country: "Francophone Africa",
    region: "West & Central Africa",
    flag: "🌍",
    description:
      "Covering Côte d'Ivoire, Senegal, and Francophone West Africa. We bridge the linguistic and cultural divide for Anglophone brands expanding westward and for Francophone brands entering English-speaking markets.",
    highlights: [
      "Culturally translated messaging and creative",
      "French-language media buying",
      "Cross-border logistics advisory",
      "Côte d'Ivoire and Senegal market access",
    ],
    caseRef: "Francophone West Africa coverage",
  },
  {
    id: "middle-east",
    country: "Middle East",
    region: "UAE · Bahrain · Oman · Qatar",
    flag: "🌏",
    description:
      "Our most recent geographic expansion. A press release campaign for a client's event extended their brand into four Middle Eastern markets simultaneously, opening a new region in a single campaign. The only confirmed case study reach outside Africa, and a strong signal of cross-regional capability.",
    highlights: [
      "Dubai (UAE) press placement and media reach",
      "Bahrain, Oman, and Qatar media coverage",
      "International PR for African brands going global",
      "Confirmed: The Argentina Stores (Bahrain) as a direct client",
    ],
    caseRef: "Press Release Middle East Expansion: UAE, Bahrain, Oman, Qatar",
    featured: true,
  },
];

export function MarketsWeServe() {
  const featuredMarket = MARKETS.find((m) => m.featured);
  const regularMarkets = MARKETS.filter((m) => !m.featured);

  const localBusinessSchemas = [
    localBusinessSchema("Nigeria", "Brand Envoy Africa's headquarters and largest operational base in Lagos, Nigeria.", "Lagos", "NG"),
    localBusinessSchema("Ghana", "Brand Envoy Africa's West African gateway. Accra-based brand activation and FMCG distribution.", "Accra", "GH"),
    localBusinessSchema("Kenya", "Brand Envoy Africa's East African operational base in Nairobi: brand activation and digital campaigns.", "Nairobi", "KE"),
    localBusinessSchema("South Africa", "Brand Envoy Africa premium brand positioning and hyperlocal digital campaigns in South Africa.", "Johannesburg", "ZA"),
    localBusinessSchema("Uganda", "Brand Envoy Africa East Africa multi-market campaign reach in Kampala, consumer brand activation.", "Kampala", "UG"),
    localBusinessSchema("Tanzania", "Brand Envoy Africa brand entry and activation campaigns in Dar es Salaam and Arusha.", "Dar es Salaam", "TZ"),
    localBusinessSchema("Cameroon", "Brand Envoy Africa bilingual (English/French) Central Africa brand activation.", "Douala", "CM"),
  ];

  return (
    <Layout
      title="Markets We Serve: Nigeria, Ghana, Kenya & Across Africa | Brand Envoy Africa"
      description="Brand Envoy Africa operates across Nigeria, Ghana, Kenya, South Africa, Uganda, Tanzania, Cameroon, Francophone Africa, and beyond. Real operational presence, real campaigns."
      canonical="/markets-we-serve"
      keywords={[
        "marketing agency Nigeria Ghana Kenya", "Brand Envoy Africa markets",
        "advertising agency West Africa", "marketing agency East Africa",
        "branding agency South Africa", "pan-African marketing agency",
        "marketing agency Francophone Africa", "brand agency Nigeria Ghana",
        "marketing Nigeria Ghana Kenya South Africa", "market entry Africa countries",
        "brand agency Uganda Tanzania", "marketing agency Cameroon",
        "African market expansion agency", "brand agency Lagos Accra Nairobi",
        "FMCG distribution Africa countries", "brand activation multiple African markets",
        "marketing agency Mauritius Seychelles", "brand agency Middle East Africa",
        "multi-country marketing campaigns Africa", "regional marketing agency Africa",
      ]}
      structuredData={[organizationSchema(), ...localBusinessSchemas]}
    >
      <section className="pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Pan-African Footprint.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We don't sit in one city and guess what happens in another. We have deep, physical, and operational ties across 13+ markets, backed by real campaigns, not strategy decks.
            </p>
          </div>

          {/* Featured: Middle East — new, worth calling out */}
          {featuredMarket && (
            <div className="mb-8 bg-gradient-to-br from-primary/10 via-secondary/5 to-background border border-primary/20 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{featuredMarket.flag}</span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-0.5">
                    New: Cross-Regional Reach
                  </div>
                  <h2 className="text-3xl font-bold">{featuredMarket.country}</h2>
                  <div className="text-sm text-muted-foreground font-medium">
                    {featuredMarket.region}
                  </div>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-2xl">
                {featuredMarket.description}
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {featuredMarket.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Regular markets */}
          <div className="space-y-4">
            {regularMarkets.map((market) => (
              <div
                key={market.id}
                className="bg-card border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start hover:border-primary/30 transition-colors"
              >
                <div className="shrink-0 flex items-center gap-3 md:flex-col md:items-center md:w-24">
                  <span className="text-3xl">{market.flag}</span>
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center md:mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold">{market.country}</h2>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border rounded-full px-2 py-0.5">
                      {market.region}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {market.description}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {market.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  {market.caseRef && (
                    <div className="mt-4 text-xs text-muted-foreground">
                      <span className="font-semibold">Case evidence:</span> {market.caseRef}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <p className="text-xl font-medium mb-6">Entering a market not listed here?</p>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We've worked across every major African sub-region. Talk to our strategy team about what's possible.
            </p>
            <Link
              href="/talk-to-us"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors border border-primary text-primary hover:bg-primary/5 h-14 px-8 py-2"
            >
              Consult Our Strategy Team
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
