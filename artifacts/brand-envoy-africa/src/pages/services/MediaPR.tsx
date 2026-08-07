import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, Mic, Radio, Newspaper, ShieldAlert } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceSchema, faqSchema, organizationSchema } from "@/lib/seo";

const FAQS = [
  {
    question: "Do you guarantee media placements?",
    answer: "For paid media, yes. For earned media (PR), we leverage our deep relationships with editors and journalists across the continent to secure high-probability coverage, but authentic editorial inclusion is never 'guaranteed' in credible publications.",
  },
  {
    question: "Can you handle a PR crisis over the weekend?",
    answer: "Yes. Our crisis comms team is available 24/7 for retained clients. We move immediately to control the narrative, draft holding statements, and liaise with media.",
  },
  {
    question: "Do you focus on digital or traditional media?",
    answer: "Both. In African markets, traditional media (radio, billboards, print) still commands massive influence, while digital drives engagement. We build integrated media plans.",
  },
  {
    question: "Which media outlets do you have relationships with in Nigeria?",
    answer: "We work with leading Nigerian and pan-African outlets including Channels TV, NTA, Punch, Vanguard, TechCabal, The Cable, and major radio networks, as well as outlets in Ghana, Kenya, and South Africa.",
  },
  {
    question: "How do you measure the ROI of PR?",
    answer: "We track earned media value, share of voice, sentiment analysis, and direct conversion attribution from media coverage to leads or site traffic, giving you a full picture beyond vanity metrics.",
  },
];

export function MediaPR() {
  return (
    <Layout
      title="Media & PR Agency in Nigeria, Ghana, Kenya | Brand Envoy Africa"
      description="Brand Envoy Africa manages your narrative across traditional media, digital platforms, and key stakeholder networks. Media buying, earned media, and crisis communications across Africa."
      canonical="/services/media-pr"
      keywords={[
        "PR agency Nigeria", "media agency Lagos", "public relations Africa",
        "media buying Nigeria", "earned media Africa", "press release Nigeria",
        "crisis communications Nigeria", "media relations Africa",
        "PR agency Ghana", "media PR Kenya", "Africa media agency",
        "brand PR Nigeria", "media planning Africa", "OOH advertising Nigeria",
        "billboard advertising Lagos", "radio advertising Nigeria",
        "TV media buying Africa", "media agency South Africa",
        "digital PR Nigeria", "stakeholder communications Africa",
      ]}
      structuredData={[
        organizationSchema(),
        serviceSchema(
          "Media & PR",
          "Integrated media buying, earned media, and PR strategy across African markets.",
          "/services/media-pr"
        ),
        faqSchema(FAQS),
      ]}
    >
      <section className="pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Media & PR.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            Influence isn't bought; it's engineered. We manage your narrative across traditional media, digital platforms, and key stakeholder networks.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8 mb-24">
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <Radio className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Media Buying</h3>
              <p className="text-muted-foreground">Strategic placement across TV, Radio, Print, and Digital to maximize reach and ROI.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <Newspaper className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Earned Media</h3>
              <p className="text-muted-foreground">Press releases, features, and editorial placements in top-tier African and global publications.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <Mic className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Public Relations</h3>
              <p className="text-muted-foreground">Stakeholder mapping, thought leadership, and narrative control for executives and brands.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border hover:border-primary transition-colors">
              <ShieldAlert className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Crisis Comms</h3>
              <p className="text-muted-foreground">Rapid response strategy and media management to protect brand equity during critical moments.</p>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-semibold text-lg">Do you guarantee media placements?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  For paid media, yes. For earned media (PR), we leverage our deep relationships with editors and journalists across the continent to secure high-probability coverage, but authentic editorial inclusion is never "guaranteed" in credible publications.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-semibold text-lg">Can you handle a PR crisis over the weekend?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Yes. Our crisis comms team is available 24/7 for retained clients. We move immediately to control the narrative, draft holding statements, and liaise with media.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-semibold text-lg">Do you focus on digital or traditional media?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Both. In African markets, traditional media (radio, billboards, print) still commands massive influence, while digital drives engagement. We build integrated media plans.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="bg-primary text-primary-foreground p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need to control the narrative?</h2>
            <Link href="/talk-to-us" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-white text-primary hover:bg-white/90 h-14 px-8 py-2">
              Talk to Our PR Team <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}