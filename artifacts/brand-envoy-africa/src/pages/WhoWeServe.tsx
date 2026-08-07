import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, X, Check } from "lucide-react";
import { organizationSchema } from "@/lib/seo";

const CRITERIA = [
  {
    topic: "Financing Market Entry",
    notFit: "Expects us to finance their market entry. Looking for a distributor to pay to land your product before you've committed anything yourself.",
    fit: "Already in-market, or bringing the product in themselves. You have a local presence already, or you're ready to bring your own product in. We take it from there into stores and build the campaign around it.",
  },
  {
    topic: "The Agency Relationship",
    notFit: "Treats the agency relationship as transactional. Sees us as a vendor to squeeze on price and drop the moment something gets hard.",
    fit: "Sees this as a partnership. Wants a long-term relationship. Some of our engagements have run for years because the work kept compounding.",
  },
  {
    topic: "Willingness to Move First",
    notFit: "Wants the same playbook everyone else is running. Every idea needs three case studies from other Nigerian agencies before they'll try it.",
    fit: "Ready to move first. Willing to back an idea because it's right for their brand, not because it's already been done by someone else. Some of our best results came from doing what nobody else in this market was doing yet.",
  },
  {
    topic: "How Leadership Sees Marketing",
    notFit: "Believes the product sells itself. Leadership treats marketing as an afterthought, throwing a small budget at 'the marketing stuff' while expecting the product to carry the business alone.",
    fit: "Knows the brand is part of the business, not decoration on top of it. Leadership sees getting seen and trusted as core to growth, not a side expense.",
  },
  {
    topic: "Commitment Level",
    notFit: "Wants to dabble or test small. Looking for a one-off post or a single campaign to see what happens.",
    fit: "Ready to build something that compounds. Thinking in campaigns and market presence, not single posts.",
  },
  {
    topic: "View of Visibility",
    notFit: "Treats brand-building as a checkbox. Getting on billboards, into stores, or in front of press is just something to tick off before moving on.",
    fit: "Sees visibility as the goal, not the formality. Wants to actually be known, remembered, and chosen in their market. Not just technically 'have marketing.'",
  },
  {
    topic: "Business Health",
    notFit: "In crisis, looking for a rescue. Bleeding money and needing a turnaround, not a campaign. We'd be doing them a disservice taking their money right now.",
    fit: "Growing and looking for the next leg up. Numbers are stable or climbing and ready to push further, not stop the bleeding.",
  },
  {
    topic: "Product-Market Fit",
    notFit: "No product-market fit yet. Customers aren't sticking and the product itself is still finding its footing. A campaign can't fix that.",
    fit: "Has something worth telling the world about. A real product or brand that now needs more of the right people to see it.",
  },
  {
    topic: "Decision Criteria",
    notFit: "Shopping for the cheapest quote. Comparing five agencies purely on price.",
    fit: "Knows what success is worth. Knows what winning this market means for their business and is ready to invest at the level that requires.",
  },
  {
    topic: "Political Campaigns",
    notFit: "Running for office without a real plan. Exploring a candidacy with no timeline, no budget, and no urgency.",
    fit: "A serious aspirant for 2027 and beyond. Building a real campaign from local government to presidential, with a team that has done this since 2015.",
  },
];

const CLOSING_REVIEWS = [
  {
    quote: "Their energy, creativity, and ability to not just conceptualize but birth ideas are impressive.",
    reviewer: "Anuli Ikwumere, MD, EaseR Lifestyle Africa",
  },
  {
    quote: "They were disciplined and respected our views. They really listened to us, which is rare in this industry.",
    reviewer: "Praveen Kalkani, Director, The Argentina Stores, Bahrain",
  },
];

export function WhoWeServe() {
  return (
    <Layout
      title="Who We Serve: Ideal Clients for Brand Envoy Africa"
      description="Brand Envoy Africa works best with enterprises, funded startups, foreign brands entering Africa, and serious political campaigns. See if we're the right fit for you."
      canonical="/who-we-serve"
      keywords={[
        "who does Brand Envoy Africa serve", "ideal client marketing agency Africa",
        "enterprise marketing agency Nigeria", "foreign brands entering Nigeria",
        "brand agency for international companies", "marketing agency fit Africa",
        "FMCG brand agency Nigeria", "market entry agency Africa", "SME marketing Nigeria",
        "enterprise branding agency Lagos", "political campaign agency clients",
        "brand agency for startups Africa", "who works with Brand Envoy",
        "agency for foreign companies Nigeria", "brand strategy for African markets",
        "brand agency client criteria", "marketing agency Nigeria fit",
        "best fit agency Africa", "branding agency client Nigeria", "agency for multinational brands Africa",
      ]}
      structuredData={[organizationSchema()]}
    >
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">

          <div className="mb-6">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Company</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-none">
            Brand Envoy Isn't<br />For Every Brand.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-20">
            We help brands get seen, get trusted, and get bought across Nigeria and beyond. That takes a specific kind of client, ready to build something real with us. If that's you, keep reading. If it's not, we'll save us both the call.
          </p>

          <div className="space-y-5">
            {CRITERIA.map((item, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border">
                <div className="bg-muted/60 p-6 md:p-8 flex gap-4 items-start">
                  <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center">
                    <X className="h-3.5 w-3.5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Not a fit</div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.notFit}</p>
                  </div>
                </div>
                <div className="bg-card p-6 md:p-8 flex gap-4 items-start border-l">
                  <div className="shrink-0 mt-0.5 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">A fit</div>
                    <p className="text-sm md:text-base text-foreground leading-relaxed font-medium">{item.fit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 mb-16">
            <h2 className="text-2xl font-bold mb-8 text-muted-foreground">What it sounds like when it's working:</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {CLOSING_REVIEWS.map((r, i) => (
                <div key={i} className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
                  <p className="text-lg font-medium text-foreground leading-relaxed mb-4">&ldquo;{r.quote}&rdquo;</p>
                  <p className="text-sm text-muted-foreground font-semibold">{r.reviewer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center bg-card border rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Sound like you?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              If the fit column sounds like where you are, let's have an honest conversation about what's possible.
            </p>
            <Link
              href="/talk-to-us"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 py-2"
            >
              Start the Conversation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}
