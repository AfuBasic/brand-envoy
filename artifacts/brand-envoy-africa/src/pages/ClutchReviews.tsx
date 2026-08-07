import { Layout } from "@/components/layout/Layout";
import { ExternalLink, Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    client: "ANTtention Media Africa",
    industry: "Pan-African Media",
    reviewer: "Rufus Agbakoba",
    reviewerTitle: "Business Head, MENA Region",
    project: "Branding & marketing strategy",
    period: "July 2017 to present",
    rating: 5.0,
    quote:
      "Not only were they affordable, but they were also creative, efficient, and professional.",
  },
  {
    id: 2,
    client: "Innovation Hub Company",
    industry: "Technology",
    reviewer: "PHP Engineer",
    reviewerTitle: "Anonymous reviewer",
    project: "Branding & graphic design",
    period: "Jun to Jul 2018",
    rating: 4.5,
    quote: "They were adaptable and maintained the deadlines they set.",
  },
  {
    id: 3,
    client: "The Argentina Stores",
    industry: "Mini-Market, Bahrain",
    reviewer: "Praveen Kalkani",
    reviewerTitle: "Director",
    project: "Marketing & promotional campaign",
    period: "Mar to Dec 2018",
    rating: 5.0,
    quote:
      "They were disciplined and respected our views. They really listened to us, which is rare in this industry.",
  },
  {
    id: 4,
    client: "Global Trade Advisors",
    industry: "Real Estate, Canada",
    reviewer: "CEO",
    reviewerTitle: "Anonymous reviewer",
    project: "Market research",
    period: "Sep 2013 to Jan 2019",
    rating: 4.5,
    quote: "Brand Envoy Africa delivers quality work.",
  },
  {
    id: 5,
    client: "EaseR Lifestyle Africa",
    industry: "Logistics, Lagos",
    reviewer: "Anuli Ikwumere",
    reviewerTitle: "Managing Director",
    project: "Branding & research",
    period: "Mar 2019 to present",
    rating: 5.0,
    quote:
      "Their energy, creativity, and ability to not just conceptualize but birth ideas are impressive.",
  },
  {
    id: 6,
    client: "Temple's Counsel & Mind Academy",
    industry: "Education, Lagos",
    reviewer: "Sapphire Obike",
    reviewerTitle: "Head of Marketing",
    project: "Digital marketing",
    period: "Jan to Nov 2021",
    rating: 5.0,
    quote: "Their creativity and team spirit made work seamless.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= Math.floor(rating)
              ? "fill-primary text-primary"
              : star - 0.5 <= rating
              ? "fill-primary/50 text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
    </div>
  );
}

export function ClutchReviews() {
  const overallRating = (
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
  ).toFixed(1);

  return (
    <Layout
      title="Client Reviews | Brand Envoy Africa"
      description="6 verified client reviews on Clutch. Overall rating 4.8/5. Read what clients say about working with Brand Envoy Africa."
    >
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Header */}
          <div className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                What Clients Say.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Six verified reviews on Clutch. Every single one. We publish the full record, not a highlight reel.
              </p>
            </div>
            <div className="shrink-0 bg-card border rounded-2xl px-8 py-6 text-center">
              <div className="text-6xl font-black text-foreground mb-1">{overallRating}</div>
              <div className="flex justify-center mb-2">
                <StarRating rating={parseFloat(overallRating)} />
              </div>
              <div className="text-sm text-muted-foreground font-medium">Overall on Clutch</div>
              <a
                href="https://clutch.co/profile/brand-envoy-africa"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Verify on Clutch.co
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Review Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-card border rounded-2xl p-8 flex flex-col gap-6 hover:border-primary/30 transition-colors"
              >
                {/* Rating */}
                <StarRating rating={review.rating} />

                {/* Quote */}
                <blockquote className="text-lg font-medium text-foreground leading-relaxed flex-1">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="border-t border-border" />

                {/* Reviewer */}
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm">
                      {review.reviewer.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-foreground">{review.reviewer}</div>
                    <div className="text-xs text-muted-foreground">{review.reviewerTitle}</div>
                    <div className="text-xs font-semibold text-primary mt-1">{review.client}</div>
                    <div className="text-xs text-muted-foreground">{review.industry}</div>
                  </div>
                </div>

                {/* Project detail */}
                <div className="bg-muted/50 rounded-lg px-4 py-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Project</div>
                  <div className="text-sm text-foreground">{review.project}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{review.period}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 text-center border-t pt-16">
            <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
              All reviews are independently verified by Clutch. You can read the full interviews, including questions and answers, directly on the Clutch profile.
            </p>
            <a
              href="https://clutch.co/profile/brand-envoy-africa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/80 transition-colors text-lg"
            >
              View the full Clutch profile
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
