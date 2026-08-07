import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { organizationSchema } from "@/lib/seo";

export function WhyUs() {
  return (
    <Layout
      title="Why Brand Envoy Africa: Our Proof-Led Approach"
      description="A decade of pan-African experience, multi-market local knowledge, and a proof-led approach that separates Brand Envoy Africa from generic marketing agencies."
      canonical="/why-us"
      keywords={[
        "why Brand Envoy Africa", "proof-led marketing agency", "African marketing agency credentials",
        "marketing agency Nigeria experience", "branding agency track record", "Africa marketing expertise",
        "best marketing agency Nigeria", "creative agency Lagos credentials", "marketing results Africa",
        "brand strategy Nigeria results", "marketing agency awards Africa", "African Brands Leadership Award",
        "marketing agency case studies Nigeria", "trusted branding agency Africa", "marketing ROI Africa",
        "agency for foreign brands Africa", "brand agency Lagos Nigeria", "Nigerian marketing agency reviews",
        "brand agency reputation Africa", "top marketing company Nigeria",
      ]}
      structuredData={[organizationSchema()]}
    >
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">
              Why Brand Envoy Africa?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              A decade of pan-African experience, multi-market local knowledge, and a proof-led approach that separates action from noise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6">Built for the Reality of African Markets</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Many agencies sell the idea of Africa. We operate in its reality. With over 10 years of active operations across Nigeria, Ghana, and Kenya, we understand that what works in Lagos might fail in Accra.
              </p>
              <p className="text-lg text-muted-foreground">
                We don't just supply creative assets. We provide the distribution networks, the cultural translations, and the localized execution required to actually move product and shift opinion.
              </p>
            </div>
            <div className="bg-card p-8 rounded-xl border shadow-sm">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-primary/10 text-primary flex items-center justify-center rounded-full font-bold">10+</div>
                  <div>
                    <h3 className="font-bold text-lg">Years of Execution</h3>
                    <p className="text-muted-foreground text-sm">Active since 2015, surviving and thriving through market shifts.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-primary/10 text-primary flex items-center justify-center rounded-full font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-lg">Core Hubs</h3>
                    <p className="text-muted-foreground text-sm">Deep, physical presence in Nigeria, Ghana, and Kenya.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 bg-primary/10 text-primary flex items-center justify-center rounded-full font-bold">360°</div>
                  <div>
                    <h3 className="font-bold text-lg">Cross-Sector Expertise</h3>
                    <p className="text-muted-foreground text-sm">FMCG, Tech, Politics, Agriculture, and Retail.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Block */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-12 text-center">How We Differ</h2>
            <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl border">
              
              <div className="bg-muted p-8 md:p-12">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-muted-foreground">
                  <XCircle className="text-destructive h-6 w-6" /> Generic Agencies
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-3">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span className="text-muted-foreground">Sell "one size fits all" African strategies from a single office.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span className="text-muted-foreground">Hand over creative assets and leave you to figure out distribution.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span className="text-muted-foreground">Rely on third-party data that is often outdated or out of touch with grassroots realities.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-destructive font-bold mt-0.5">✕</span>
                    <span className="text-muted-foreground">Over-promise market entry without understanding local supply chain nuances.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary text-primary-foreground p-8 md:p-12">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white">
                  <CheckCircle2 className="text-white h-6 w-6" /> Brand Envoy Africa
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-3">
                    <span className="text-white font-bold mt-0.5">✓</span>
                    <span className="text-white/90">Execute hyper-local strategies based on physical presence and cultural fluency.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-white font-bold mt-0.5">✓</span>
                    <span className="text-white/90">Combine creative firepower with actual in-market retail distribution and logistics.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-white font-bold mt-0.5">✓</span>
                    <span className="text-white/90">Deploy proprietary, on-the-ground research mixed with AI-assisted targeting.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-white font-bold mt-0.5">✓</span>
                    <span className="text-white/90">Tell you the hard truths about what it takes to succeed before taking your money.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to execute?</h2>
            <Link href="/talk-to-us" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 py-2">
              Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
}