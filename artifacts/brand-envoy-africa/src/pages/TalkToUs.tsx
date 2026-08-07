import { Layout } from "@/components/layout/Layout";
import { useForm } from "react-hook-form";
import { organizationSchema } from "@/lib/seo";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useSubmitContact } from "@workspace/api-client-react";
import { toast } from "sonner";
import { Mail, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  tier: z.enum(["sme", "enterprise", "campaign"]),
  budget: z.string().optional(),
  market: z.string().optional(),
  officeLevel: z.enum(["local_government", "state_assembly", "senatorial", "gubernatorial", "presidential"]).optional().nullable(),
  message: z.string().min(10, "Please provide a brief description"),
});

export function TalkToUs() {
  const submitContact = useSubmitContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      tier: "enterprise",
      budget: "",
      market: "",
      officeLevel: null,
      message: "",
    },
  });

  const selectedTier = form.watch("tier");

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitContact.mutate({ data: values as any }, {
      onSuccess: () => {
        toast.success("Message received. Our team will review and contact you shortly.", {
          duration: 5000,
        });
        form.reset();
      },
      onError: () => {
        toast.error("Failed to send. Please try again or email us directly.");
      }
    });
  }

  return (
    <Layout
      title="Talk to Us: Start a Project with Brand Envoy Africa"
      description="Ready to build your brand in Africa? Submit your brief to Brand Envoy Africa. We work with SMEs, enterprises, and political campaigns across Nigeria, Ghana, Kenya, and beyond."
      canonical="/talk-to-us"
      keywords={[
        "contact Brand Envoy Africa", "hire marketing agency Nigeria",
        "submit brief marketing agency Africa", "talk to branding agency Lagos",
        "start marketing project Nigeria", "marketing agency contact Lagos",
        "brand agency quote Africa", "marketing proposal Nigeria",
        "hire advertising agency Nigeria", "creative agency Lagos contact",
        "enterprise marketing brief Africa", "SME marketing Nigeria contact",
        "political campaign agency contact Nigeria", "brand strategy consultation Africa",
        "marketing agency Lagos email", "branding project Nigeria",
        "agency briefing Africa", "marketing brief template Nigeria",
        "hire brand consultant Africa", "business@brandsenvoy.com",
      ]}
      structuredData={[organizationSchema()]}
    >
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="max-w-3xl mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">
              Let's build something real.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Skip the fluff. Tell us what you're trying to achieve, who you're trying to reach, and the reality of your current situation. We'll tell you exactly how we can execute.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-8 bg-card p-6 md:p-10 rounded-2xl border shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* First Question determines flow */}
                  <FormField
                    control={form.control}
                    name="tier"
                    render={({ field }) => (
                      <FormItem className="bg-muted/50 p-6 rounded-xl border">
                        <FormLabel className="text-lg">I am a...</FormLabel>
                        <Select onValueChange={(val) => {
                          field.onChange(val);
                          // Reset dependent fields
                          if (val !== 'campaign') form.setValue("officeLevel", null);
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 text-lg bg-background">
                              <SelectValue placeholder="Select your profile" />
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

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
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
                  </div>

                  {selectedTier !== "campaign" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Acme Corp" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="market"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Market(s)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Nigeria, Ghana" {...field} />
                            </FormControl>
                            <FormDescription>Where are you looking to launch/grow?</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {selectedTier === "campaign" && (
                    <FormField
                      control={form.control}
                      name="officeLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Office Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select campaign level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="local_government">Local Government</SelectItem>
                              <SelectItem value="state_assembly">State Assembly</SelectItem>
                              <SelectItem value="senatorial">Senatorial</SelectItem>
                              <SelectItem value="gubernatorial">Gubernatorial</SelectItem>
                              <SelectItem value="presidential">Presidential</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>The Brief</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={
                              selectedTier === "campaign" 
                              ? "Tell us about the candidate, the constituency, and the primary challenges..."
                              : "Tell us about your product, your goals, and what you need us to execute..."
                            }
                            className="min-h-[160px] resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full md:w-auto h-14 px-10 text-lg" disabled={submitContact.isPending}>
                    {submitContact.isPending ? "Submitting..." : "Submit Brief"}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="lg:col-span-4 space-y-10">
              <div>
                <h3 className="text-xl font-bold mb-6">Direct Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground mb-1">Business Inquiries</div>
                      <a href="mailto:business@brandsenvoy.com" className="text-muted-foreground hover:text-primary transition-colors">business@brandsenvoy.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground mb-1">General Contact</div>
                      <a href="mailto:dsfbrandenvoy@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">dsfbrandenvoy@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground mb-1">Headquarters</div>
                      <address className="text-muted-foreground not-italic">Lagos, Nigeria<br/>Operating across West & East Africa</address>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-xl">
                <h4 className="font-bold mb-2">What happens next?</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our strategy team reviews every brief. If there's a fit, we'll schedule a discovery call within 48 hours to dive deeper into your challenges and our capabilities.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}