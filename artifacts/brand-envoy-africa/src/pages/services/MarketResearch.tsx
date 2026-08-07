import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, Search, Activity, FileSpreadsheet, Scale } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceSchema, faqSchema, organizationSchema } from "@/lib/seo";

const FAQS = [
  {
    question: "Do you use secondary data or conduct primary research?",
    answer: "While we review existing literature, our real value is primary research. We send field teams to markets, conduct interviews, and gather fresh, proprietary data.",
  },
  {
    question: "How long does a feasibility study take?",
    answer: "Depending on the sector and market complexity, a robust entry feasibility study takes between 4 to 8 weeks.",
  },
  {
    question: "Can you conduct research outside of major cities?",
    answer: "Yes. We have networks of field researchers capable of executing surveys and gathering data in peri-urban and rural areas, which is crucial for FMCG and agribusiness.",
  },
  {
    question: "What markets do you cover for research?",
    answer: "Our primary research coverage spans Nigeria, Ghana, Kenya, South Africa, Uganda, Tanzania, Cameroon, and Francophone West Africa. We have local field networks in each market.",
  },
  {
    question: "Do you provide ongoing brand tracking or just one-off studies?",
    answer: "Both. We can deliver a one-off feasibility or consumer study, or set up an ongoing brand health tracking programme with quarterly reporting to monitor shifts in awareness, sentiment, and equity.",
  },
];

export function MarketResearch() {
  return (
    <Layout
      title="Market Research Consulting in Africa | Brand Envoy Africa"
      description="Don't guess. Brand Envoy Africa provides on-the-ground, proprietary data and analysis to derisk your decisions in African markets: Nigeria, Ghana, Kenya, and beyond."
      canonical="/services/market-research"
      keywords={[
        "market research Nigeria", "consumer research Africa", "market research Ghana",
        "market research Kenya", "brand research Africa", "feasibility study Nigeria",
        "consumer insights Nigeria", "market data Africa", "market analysis Nigeria",
        "brand health tracking Africa", "competitive analysis Nigeria",
        "qualitative research Nigeria", "quantitative research Africa",
        "market entry research Nigeria", "African consumer behavior",
        "focus group Nigeria", "survey research Africa", "market research firm Lagos",
        "brand consulting Africa", "strategic research Nigeria",
      ]}
      structuredData={[
        organizationSchema(),
        serviceSchema(
          "Market Research Consulting",
          "Primary market research, consumer insights, feasibility studies, and brand health tracking across African markets.",
          "/services/market-research"
        ),
        faqSchema(FAQS),
      ]}
    >
      <section className="pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Market Research Consulting.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            Don't guess. We provide on-the-ground, proprietary data and analysis to derisk your decisions in African markets. 
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8 mb-24">
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <Search className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Entry Feasibility</h3>
              <p className="text-muted-foreground">Comprehensive evaluation of regulatory hurdles, supply chain viability, and total addressable market before you invest.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <Activity className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Consumer Insights</h3>
              <p className="text-muted-foreground">Focus groups, surveys, and ethnographic research to understand local buying behaviors and cultural drivers.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <Scale className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Competitive Landscape</h3>
              <p className="text-muted-foreground">Deep-dive analysis into local incumbents, pricing strategies, and distribution gaps you can exploit.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <FileSpreadsheet className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Brand Health Tracking</h3>
              <p className="text-muted-foreground">Ongoing measurement of brand awareness, sentiment, and equity over time.</p>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold text-lg">Do you use secondary data or conduct primary research?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  While we review existing literature, our real value is primary research. We send field teams to markets, conduct interviews, and gather fresh, proprietary data.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold text-lg">How long does a feasibility study take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Depending on the sector and market complexity, a robust entry feasibility study takes between 4 to 8 weeks.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold text-lg">Can you conduct research outside of major cities?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Yes. We have networks of field researchers capable of executing surveys and gathering data in peri-urban and rural areas, which is crucial for FMCG and agribusiness.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-primary text-primary-foreground p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need data you can trust?</h2>
            <Link href="/talk-to-us" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-white text-primary hover:bg-white/90 h-14 px-8 py-2">
              Talk to Our Analysts <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}