import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, PenTool, LayoutTemplate, MessageSquare, Video } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceSchema, faqSchema, organizationSchema } from "@/lib/seo";

const FAQS = [
  {
    question: "Do you work with startups or just enterprises?",
    answer: "We work with both, provided the startup is funded and ready to scale. We are not a fit for bootstrapped MVP branding, but we are perfect for Series A+ companies needing serious market presence.",
  },
  {
    question: "How do you ensure the branding works across different African countries?",
    answer: "Our core strategy is pan-African, but our execution is hyper-local. We build flexible brand systems that maintain core identity while allowing for cultural adaptation in messaging and imagery per market.",
  },
  {
    question: "Do you handle the actual production of assets?",
    answer: "Yes. We have in-house creative directors and partner with the best local production houses to shoot commercials, handle photography, and produce physical collateral.",
  },
  {
    question: "What is a typical timeline for a rebrand?",
    answer: "A full strategic rebrand typically takes 6 to 10 weeks from discovery to final guideline delivery, depending on the complexity of the organisation.",
  },
  {
    question: "Can you adapt an international brand for the local market?",
    answer: "Absolutely. We often act as the local cultural translators for global brands, adapting their existing assets to resonate with Nigerian, Ghanaian, or Kenyan consumers.",
  },
];

export function CreativeBranding() {
  return (
    <Layout
      title="Creative & Branding Services in Africa | Brand Envoy Africa"
      description="Brand strategy, visual identity, and high-impact campaigns across Nigeria and Africa. We build brands people remember, trust, and buy from."
      canonical="/services/creative-branding"
      keywords={[
        "creative agency Nigeria", "branding agency Lagos", "brand strategy Africa",
        "visual identity design Nigeria", "brand identity Africa", "rebranding agency Nigeria",
        "logo design Lagos", "brand guidelines Africa", "creative branding Ghana",
        "print agency Nigeria", "branded merchandise Nigeria", "tote bags printing Lagos",
        "custom packaging Nigeria", "brand printing Africa", "advertising creative Nigeria",
        "creative direction Lagos", "brand agency for foreign companies Nigeria",
        "print and branding Nigeria", "brand design agency Africa", "merch printing Lagos",
      ]}
      structuredData={[
        organizationSchema(),
        serviceSchema(
          "Creative & Branding",
          "Strategic brand development, visual identity, content production, and print merchandise for African markets.",
          "/services/creative-branding"
        ),
        faqSchema(FAQS),
      ]}
    >
      <section className="pt-24 pb-12 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Services</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Creative & Branding.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl">
            We build brands that people remember, trust, and buy from. Our creative work is rooted in strategy, designed for impact, and executed flawlessly across African markets.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-8 rounded-xl border">
              <PenTool className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Brand Strategy</h3>
              <p className="text-muted-foreground">Positioning, architecture, and messaging frameworks that differentiate you in crowded markets.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border">
              <LayoutTemplate className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Visual Identity</h3>
              <p className="text-muted-foreground">Logos, typography, colour systems, and brand guidelines that ensure consistency everywhere.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border">
              <MessageSquare className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">High-Impact Campaigns</h3>
              <p className="text-muted-foreground">End-to-end campaign ideation and execution across digital, OOH, and experiential channels.</p>
            </div>
            <div className="bg-card p-8 rounded-xl border">
              <Video className="h-8 w-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-3">Content Production</h3>
              <p className="text-muted-foreground">Commercial video, photography, and copy that speaks authentically to local audiences.</p>
            </div>
          </div>

          {/* Cross-link to Prints & Fabrications */}
          <div className="bg-muted/40 border rounded-2xl p-8 mb-20 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Need printed or fabricated brand materials?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bags, boxes, merch, food packaging, branded structures, and custom builds are handled under our dedicated Prints & Fabrications service, with a full rate sheet and a direct quote form.
              </p>
            </div>
            <Link
              href="/services/prints-fabrications"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary text-white font-semibold text-sm h-11 px-6 hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              See Prints & Fabrications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i + 1}`}>
                  <AccordionTrigger className="text-left font-semibold text-lg">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="bg-primary text-primary-foreground p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a brand that commands respect?</h2>
            <Link href="/talk-to-us" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-white text-primary hover:bg-white/90 h-14 px-8 py-2">
              Talk to Our Creative Team <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}
