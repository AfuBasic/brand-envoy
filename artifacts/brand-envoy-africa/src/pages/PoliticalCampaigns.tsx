import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, Smartphone, MessageSquare, MonitorPlay, Video } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceSchema, faqSchema, organizationSchema } from "@/lib/seo";

export function PoliticalCampaigns() {
  return (
    <Layout
      title="Political Campaign Agency in Nigeria | Brand Envoy Africa"
      description="Over 10 years running presidential, gubernatorial, senatorial, and House of Assembly campaigns in Nigeria. AI-assisted, data-driven targeting combined with grassroots mobilisation. Now taking 2027 election clients."
      canonical="/political-campaigns"
      keywords={[
        "political campaign agency Nigeria", "election campaign agency Nigeria",
        "governance campaign Nigeria", "campaign agency Nigeria",
        "2027 Nigeria elections campaign agency", "gubernatorial campaign Nigeria",
        "presidential campaign agency Nigeria", "senatorial campaign Nigeria",
        "House of Assembly campaign Nigeria", "local government campaign Nigeria",
        "election strategy Nigeria", "political marketing Nigeria",
        "governance marketing Nigeria", "public sector campaign Nigeria",
        "campaign mobilisation Nigeria", "voter outreach Nigeria",
        "political consultancy Nigeria", "election consulting agency Nigeria",
        "2027 governorship campaign Nigeria", "2027 presidential campaign Nigeria",
        "political campaign digital marketing Nigeria", "ward-level campaign Nigeria",
        "grassroots political campaign Nigeria", "AI political campaign Nigeria",
        "best campaign agency Nigeria", "top political marketing agency Nigeria",
      ]}
      structuredData={[
        organizationSchema(),
        serviceSchema(
          "Political Campaign Management",
          "AI-assisted, data-driven political campaign strategy and execution for presidential, gubernatorial, senatorial, and local government elections in Nigeria.",
          "/political-campaigns",
          ["Nigeria"]
        ),
        faqSchema(FAQS),
      ]}
    >
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-black overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: 'url("/attached_assets/generated_images/cs_political.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white">
          <div className="max-w-4xl">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Political Campaign Agency in Nigeria</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Convincing the electorate requires more than just a campaign.
            </h1>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We bring over 10 years of experience across presidential, senatorial, and governorship elections. The landscape has evolved from simple billboards and radio jingles to sophisticated, AI-assisted, data-driven targeting combined with rigorous grassroots mobilization.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-8 py-2 my-16 bg-muted/30 rounded-r-2xl p-8">
            <h3 className="text-2xl font-bold italic text-foreground mb-4">
              "Elections in Africa are won where high-tech digital precision meets deep, culturally fluent offline strategy."
            </h3>
          </div>

          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-6">Localized Delivery</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
              We understand literacy levels and rural-reach dynamics. Our strategies are built to penetrate every ward, not just the capital cities.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-xl border border-border">
                <Smartphone className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-3">Mobile Marketing</h3>
                <p className="text-muted-foreground">Automated robocalls in local dialects and highly specific ward-level targeting to reach voters where internet penetration is low.</p>
              </div>

              <div className="bg-card p-8 rounded-xl border border-border">
                <MessageSquare className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-3">SMS Campaigns</h3>
                <p className="text-muted-foreground">High-volume, personalized text messaging frameworks that bypass the need for smartphones and data plans.</p>
              </div>

              <div className="bg-card p-8 rounded-xl border border-border">
                <MonitorPlay className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-3">Digital Display Campaigns</h3>
                <p className="text-muted-foreground">Programmatic advertising across local blogs, news sites, and apps targeting urban and peri-urban demographics.</p>
              </div>

              <div className="bg-card p-8 rounded-xl border border-border">
                <Video className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-3">Video Ad Campaigns</h3>
                <p className="text-muted-foreground">Persuasive, culturally resonant video content optimized for WhatsApp sharing, YouTube, and traditional TV broadcast.</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 md:p-12 text-center mb-16">
            <h3 className="text-xl font-semibold mb-2">A Note on Partisanship</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are execution partners, not political ideologues. We've worked across the political spectrum, at every level of government, prioritizing candidates who are serious about structured, professional campaigning.
            </p>
          </div>

          {/* FAQ Section */}
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

          <div className="bg-card border shadow-lg p-10 md:p-16 rounded-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Preparing for the 2027 Election Cycle?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're already taking on campaign clients: presidential, gubernatorial, senatorial, House of Assembly, and local government. Talk to our political campaign team early.
            </p>
            <Link href="/talk-to-us?tier=campaign" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 py-2">
              Talk to Our Campaign Team <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}

const FAQS = [
  {
    question: "What office levels do you run campaigns for?",
    answer: "We handle campaigns at every level: Presidential, Gubernatorial, Senatorial, House of Assembly, and Local Government. Each tier is scoped differently in terms of team size, budget, and strategy.",
  },
  {
    question: "Do you work with candidates from any political party?",
    answer: "Yes. We are execution partners, not political ideologues. We've worked across the political spectrum at every level of government, prioritizing candidates who are serious about structured, professional campaigning.",
  },
  {
    question: "How early should we engage you before the 2027 elections?",
    answer: "As early as possible. Data collection, voter profiling, and narrative development require a long lead time. We recommend engaging at least 12 to 18 months before election day for gubernatorial and presidential campaigns.",
  },
  {
    question: "Do you do door-to-door canvassing and grassroots mobilization?",
    answer: "Yes. Our strategy combines AI-assisted digital targeting with deep grassroots mobilization: ward-level robocalls, SMS campaigns, and field teams that can reach voters where internet penetration is low.",
  },
  {
    question: "How do you handle the AI and data-driven side of campaigns?",
    answer: "We use data analytics to identify persuadable voter segments, model likely turnout, and target digital ads with precision. This is layered on top of traditional offline tactics, not a replacement for them.",
  },
  {
    question: "Can you run campaigns in multiple states simultaneously?",
    answer: "Yes. We have the operational infrastructure to run multi-state campaigns simultaneously, with dedicated state coordinators reporting to a central campaign strategist.",
  },
];
