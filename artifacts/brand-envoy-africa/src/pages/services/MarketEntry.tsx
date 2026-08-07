import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, Info, Package, Store, Map, Plane } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceSchema, faqSchema, organizationSchema } from "@/lib/seo";

export function MarketEntry() {
  return (
    <Layout
      title="Market Entry & FMCG Distribution in Africa | Brand Envoy Africa"
      description="Brand Envoy Africa gets your product on the shelf and moving in African markets. FMCG distribution, retail placement, trade activation, and agro sourcing across Nigeria, Ghana, and Kenya."
      canonical="/services/market-entry"
      keywords={[
        "market entry Nigeria", "FMCG distribution Nigeria", "retail distribution Africa",
        "product launch Nigeria", "distribution agency Lagos", "market entry Ghana",
        "FMCG distribution Kenya", "trade activation Nigeria", "retail placement Africa",
        "consumer goods distribution Nigeria", "brand launch Africa",
        "market expansion Nigeria", "in-store marketing Africa",
        "agro sourcing Nigeria", "agricultural export Nigeria",
        "food distribution Nigeria", "FMCG Africa market entry",
        "foreign brand distribution Nigeria", "distribution partner Africa",
        "supply chain Africa", "market entry strategy Nigeria",
      ]}
      structuredData={[
        organizationSchema(),
        serviceSchema(
          "Market Entry & Distribution",
          "FMCG distribution, retail placement, trade activation, and market entry strategy across African markets.",
          "/services/market-entry"
        ),
        faqSchema(FAQS),
      ]}
    >
      <section className="pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Market Entry & Distribution.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            Marketing is useless if the product isn't on the shelf. We solve the hardest part of African expansion: getting your goods into stores and moving them.
          </p>

          <div className="bg-primary/10 border border-primary/20 p-6 md:p-8 rounded-xl mb-16 flex items-start gap-4">
            <Info className="h-6 w-6 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2 text-foreground">Our Distribution Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                We distribute for brands that are ready to sell in-market. Either you already have a presence here, or you're bringing your product in yourself. From there, we take it into stores and build the campaign that gets people buying. We don't finance market entry; we execute it.
              </p>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-8">Execution Tiers</h2>
          <div className="space-y-6 mb-24">
            <div className="bg-card p-8 rounded-xl border flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                <Store className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Entry Tier (Single-Market)</h3>
                <p className="text-muted-foreground mb-4">Focused rollout in a primary commercial hub (e.g., Lagos or Accra). We handle modern trade listing (supermarkets), initial retail distribution, and localized launch marketing.</p>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-xl border flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Growth Tier (Multi-City)</h3>
                <p className="text-muted-foreground mb-4">Expansion across secondary cities. Integration of open-market (traditional trade) strategies alongside modern retail. Aggressive trade marketing and merchandising.</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl border flex flex-col md:flex-row gap-6 items-start border-primary/50 shadow-md">
              <div className="bg-primary text-white p-4 rounded-lg shrink-0">
                <Map className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Regional Tier (Nigeria + Second Market)</h3>
                <p className="text-muted-foreground mb-4">Concurrent distribution operations across multiple countries. Synchronized logistics coordination and pan-African marketing campaigns.</p>
              </div>
            </div>
          </div>

          <div className="mb-24 bg-muted p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Plane className="h-8 w-8 text-primary" />
              Agro Sourcing & Export
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Beyond consumer goods, we operate a specialized division facilitating the sourcing and export of African agricultural commodities. We connect international buyers with verified, quality-controlled local farming cooperatives, managing the supply chain from farm gate to port.
            </p>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold text-lg">Do you handle customs clearance?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  We have trusted logistics partners who handle freight and customs. We do not act as the importer of record or finance the inventory, but we coordinate the handover to ensure smooth retail integration.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold text-lg">Do you cover traditional open markets or just modern supermarkets?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Both. Modern trade (supermarkets) is essential for brand positioning, but traditional open markets often drive the real volume in Africa. We build strategies for both.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold text-lg">How do we track sales and inventory?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  We provide regular reporting on retail off-take, stock levels, and merchandising compliance using our on-ground reps and tracking software.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-primary text-primary-foreground p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to hit the shelves?</h2>
            <Link href="/talk-to-us" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-white text-primary hover:bg-white/90 h-14 px-8 py-2">
              Discuss Your Launch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}

const FAQS = [
  {
    question: "Do you handle customs clearance?",
    answer: "We have trusted logistics partners who handle freight and customs. We do not act as the importer of record or finance the inventory, but we coordinate the handover to ensure smooth retail integration.",
  },
  {
    question: "Do you cover traditional open markets or just modern supermarkets?",
    answer: "Both. Modern trade (supermarkets) is essential for brand positioning, but traditional open markets often drive the real volume in Africa. We build strategies for both.",
  },
  {
    question: "How do we track sales and inventory?",
    answer: "We provide regular reporting on retail off-take, stock levels, and merchandising compliance using our on-ground reps and tracking software.",
  },
  {
    question: "Do you finance market entry for brands?",
    answer: "No. We distribute for brands that are ready to sell in-market. Either you already have a presence here, or you're bringing your product in yourself. We don't finance market entry; we execute it.",
  },
  {
    question: "Which markets can you distribute in?",
    answer: "Our primary distribution footprint covers Nigeria (all major states), Ghana, and Kenya. We can coordinate regional rollouts across multiple markets simultaneously via our partner network.",
  },
];
