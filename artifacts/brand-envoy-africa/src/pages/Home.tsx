import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { ArrowRight, Trophy, Target, TrendingUp, BarChart3, Globe2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  tier: z.enum(["sme", "enterprise", "campaign"]),
  message: z.string().min(10, "Please tell us a bit about your needs"),
});

export function Home() {
  const submitContact = useSubmitContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      tier: "enterprise",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContact.mutate({ data: values }, {
      onSuccess: () => {
        toast.success("Brief submitted successfully! We'll be in touch shortly.");
        form.reset();
      },
      onError: () => {
        toast.error("Something went wrong. Please try again or email us directly.");
      }
    });
  }

  const seoSchemas = [
    organizationSchema(),
    breadcrumbSchema([{ name: "Home", url: "/" }]),
  ];

  return (
    <Layout 
      title="Best Marketing Agency in Africa: Nigeria, Ghana & Kenya"
      description="Brand Envoy Africa is Africa's most innovative marketing and brand agency, based in Lagos. We build, launch, and distribute brands across Nigeria, Ghana, Kenya, South Africa, and beyond. Proven across 16+ markets."
      canonical="/"
      keywords={[
        "best marketing agency in Africa", "marketing agency Nigeria", "brand agency Nigeria",
        "marketing company in Nigeria", "best marketing agency Nigeria", "advertising agency Lagos",
        "campaign agency Nigeria", "branding agency Africa", "creative agency Nigeria",
        "marketing agency Ghana", "marketing agency Kenya", "best distribution company Nigeria",
        "FMCG distribution Nigeria", "African market entry", "brand strategy Africa",
        "political campaign agency Nigeria", "governance campaign Nigeria",
        "sports betting marketing agency Nigeria", "fintech marketing agency Nigeria",
        "Brand Envoy Africa", "pan-African marketing agency", "advertising agency Africa",
        "marketing agency for Nigeria", "top marketing agency Africa", "brand consultancy Africa",
        "PR agency Nigeria", "media buying Nigeria", "market research Africa",
        "digital marketing Nigeria", "branding Lagos Nigeria", "leading brand agency Africa",
      ]}
      structuredData={seoSchemas}
    >
      {/* 1. Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-black overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center"
          style={{ backgroundImage: 'url("/attached_assets/generated_images/home_hero.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
              <Trophy className="h-4 w-4 text-primary" />
              <span>Africa's Most Innovative Marketing Agency</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              We Discovered Our Markets<br/>
              <span className="text-primary">On Foot.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-4 leading-relaxed font-light italic">
              Not in a deck. Not from a YouTube trend report. On foot, in the market, where the buying actually happens.
            </p>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mb-10 leading-relaxed font-light">
              Street activations. Market storming. Billboards you can't scroll past. Programmatic advertising and digital campaigns that meet people exactly where they already are. We go beyond the desk and the research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/talk-to-us" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 py-2">
                Talk to Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/our-work" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-white/30 text-white hover:bg-white/10 h-14 px-8 py-2">
                See Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Numbers Strip */}
      <section className="bg-primary text-primary-foreground py-12 border-b-4 border-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x divide-white/20 text-center">
            <div className="px-4">
              <div className="text-4xl font-black mb-1">10+</div>
              <div className="text-sm font-medium opacity-90 uppercase tracking-wider">Years Active</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-black mb-1">13+</div>
              <div className="text-sm font-medium opacity-90 uppercase tracking-wider">Countries</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-black mb-1">5+</div>
              <div className="text-sm font-medium opacity-90 uppercase tracking-wider">Election Cycles</div>
            </div>
            <div className="px-4">
              <div className="text-4xl font-black mb-1">4.8</div>
              <div className="text-sm font-medium opacity-90 uppercase tracking-wider">Clutch Rating</div>
            </div>
            <div className="px-4 col-span-2 md:col-span-1">
              <div className="text-2xl font-bold mb-1">Winner</div>
              <div className="text-xs font-medium opacity-90 uppercase tracking-wider leading-tight">African Brands Leadership Award 2019</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Strip */}
      <section className="py-6 bg-muted/40 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-bold text-foreground">TechBehemoths</span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">Verified Company</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">TechBehemoths Awards Winner</span>
              <span className="bg-secondary/20 text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full border border-secondary/30">2022</span>
              <span className="bg-secondary/20 text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full border border-secondary/30">2023</span>
              <span className="bg-secondary/20 text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded-full border border-secondary/30">2024</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <Link href="/clutch-reviews" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
              <span className="font-bold text-foreground">Clutch</span>
              <span className="text-muted-foreground">4.8 / 5 · 6 reviews</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Flagship Client Story Teaser — full-bleed cinematic */}
      <section className="relative overflow-hidden bg-black min-h-[580px] flex items-center">
        {/* Campaign activation photo — portrait image, right half, object-top shows the action */}
        <img
          src="/1xbet-activation.jpg"
          alt="Sports betting brand activation, prize wheel event on the ground in West Africa"
          className="absolute right-0 top-0 h-full w-full md:w-[55%] object-cover object-top"
        />
        {/* Gradient: opaque black on left fading into the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40 md:to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 py-20">
          <div className="max-w-xl">
            <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/40 text-primary font-semibold text-xs tracking-wider uppercase rounded-full mb-6">
              2024 to 2026 · Pan-African Ground Activation
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              16 People Per Country.<br className="hidden sm:block" /> Five Countries.<br className="hidden sm:block" /> 100 FTDs a Day.
            </h2>
            <p className="text-white/75 text-lg mb-5 leading-relaxed">
              From 2024 through 2026, Brand Envoy deployed 16 people per country across Nigeria, Ghana, Kenya, Liberia, and Zambia. Every day, five days a week, we went out, found people, told the story, got them on the app, and recorded the first-time deposit. Minimum 100 FTDs a day. We didn't just run a campaign. We moved a business.
            </p>
            <p className="text-white/60 text-base mb-6 leading-relaxed">
              Part activation. Part movement. All Brand Envoy. If you're bringing your brand into Africa and you need an agency that has walked the ground in over 16 markets. We know exactly how to position you, country by country.
            </p>

            {/* Industries understood */}
            <div className="mb-8">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Industries we now understand deeply</p>
              <div className="flex flex-wrap gap-2">
                {["Sports Betting", "Gaming", "Fintech", "Governance", "Crypto", "FMCG", "Telecom", "Real Estate", "Media"].map((ind) => (
                  <span key={ind} className="text-xs font-semibold px-3 py-1 rounded-full bg-white/8 border border-white/15 text-white/70">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="https://brandsenvoy.com/case-studies/1xbet-africa-brand-activation-campaign/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              Read the 1xBet case study <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Country tags */}
        <div className="absolute bottom-6 left-0 right-0 z-10">
          <div className="container mx-auto px-4 md:px-6 flex gap-2 flex-wrap">
            {["Liberia", "Nigeria", "Ghana", "Kenya", "Zambia"].map((c) => (
              <span key={c} className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 uppercase tracking-wider">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Five Service Pillars */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">Our Core Disciplines</h2>
            <p className="text-xl text-muted-foreground">Specialized expertise built over a decade of executing in Africa's most challenging and rewarding markets.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/services/creative-branding" className="group block bg-card p-8 rounded-xl border hover:border-primary transition-colors hover:shadow-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Target className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Creative & Branding</h3>
              <p className="text-muted-foreground leading-relaxed">Brand strategy, visual identity, and high-impact campaigns that cut through the noise.</p>
            </Link>

            <Link href="/services/media-pr" className="group block bg-card p-8 rounded-xl border hover:border-primary transition-colors hover:shadow-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <TrendingUp className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Media & PR</h3>
              <p className="text-muted-foreground leading-relaxed">Strategic media buying, earned media placements, and crisis communications.</p>
            </Link>

            <Link href="/services/market-entry" className="group block bg-card p-8 rounded-xl border hover:border-primary transition-colors hover:shadow-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <Globe2 className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Market Entry & Distribution</h3>
              <p className="text-muted-foreground leading-relaxed">Taking your product into stores and building the campaign that gets people buying.</p>
            </Link>

            <Link href="/services/market-research" className="group block bg-card p-8 rounded-xl border hover:border-primary transition-colors hover:shadow-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <BarChart3 className="h-6 w-6 text-primary group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Market Research</h3>
              <p className="text-muted-foreground leading-relaxed">Consumer insights, competitive landscape analysis, and entry feasibility studies.</p>
            </Link>

            <Link href="/political-campaigns" className="group block bg-card p-8 rounded-xl border hover:border-primary transition-colors hover:shadow-lg lg:col-span-2 bg-gradient-to-br from-card to-muted">
              <h3 className="text-xl font-bold mb-3">Political Campaigns</h3>
              <p className="text-muted-foreground leading-relaxed max-w-md">Comprehensive campaign management combining grassroots strategy with AI-assisted targeting across all levels of government.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Political Campaigns Teaser */}
      <section className="py-24 relative bg-black text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30 mix-blend-luminosity bg-cover bg-center"
          style={{ backgroundImage: 'url("/attached_assets/generated_images/cs_political.jpg")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Convincing the Electorate Requires More Than Just a Campaign.</h2>
          <p className="text-xl text-white/80 mb-10 font-light leading-relaxed">
            With over 10 years of experience across presidential, senatorial, and governorship elections, we blend digital precision with deep grassroots understanding.
          </p>
          <Link href="/political-campaigns" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-semibold transition-colors bg-white text-black hover:bg-white/90 h-14 px-8 py-2">
            Explore Political Services
          </Link>
        </div>
      </section>

      {/* 6. Founder Message */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto border-l-4 border-secondary pl-8 md:pl-12 py-4">
            <p className="text-2xl md:text-3xl font-medium text-foreground leading-snug mb-8">
              "We have partnered with brands that are serious about winning in Africa and the Middle East. For every time we found that golden synergy, we ended up creating magical moments."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-muted overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-xl">
                  JO
                </div>
              </div>
              <div>
                <div className="font-bold text-lg">Jade Obike</div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">MD / CEO, Brand Envoy Africa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Brief Form */}
      <section className="py-24 bg-card border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-6 tracking-tight">Let's Talk About Your Next Move.</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Whether you're an SME looking for a breakout campaign, an enterprise entering a new market, or a candidate preparing for the next election cycle.
              </p>
              <div className="space-y-6">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Email Us</div>
                  <a href="mailto:business@brandsenvoy.com" className="text-xl font-medium hover:text-primary transition-colors">business@brandsenvoy.com</a>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">Headquarters</div>
                  <address className="text-lg font-medium not-italic text-foreground">Lagos, Nigeria</address>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-xl border shadow-sm">
              <h3 className="text-2xl font-bold mb-6">Send a Brief</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am a...</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your tier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sme">Small/Medium Enterprise</SelectItem>
                            <SelectItem value="enterprise">Large Enterprise / Multi-market</SelectItem>
                            <SelectItem value="campaign">Political Campaign</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Brief</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us what you're trying to achieve..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-lg" disabled={submitContact.isPending}>
                    {submitContact.isPending ? "Sending..." : "Submit Brief"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
