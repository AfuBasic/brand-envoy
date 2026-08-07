import { Layout } from "@/components/layout/Layout";
import { useListAffiliates } from "@workspace/api-client-react";
import { ExternalLink, Tag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { organizationSchema } from "@/lib/seo";

export function AffiliateMarketing() {
  const { data: affiliates, isLoading } = useListAffiliates(
    { publishedOnly: true },
    { query: { queryKey: ["/api/affiliates", { publishedOnly: true }] } }
  );

  return (
    <Layout
      title="Partner Products & Affiliate Picks | Brand Envoy Africa"
      description="Tools, resources, and products trusted and recommended by Brand Envoy Africa, curated for African businesses and marketers."
      canonical="/affiliate-marketing"
      keywords={[
        "Brand Envoy Africa recommended products", "marketing tools Africa",
        "branding resources Nigeria", "affiliate products Africa", "business tools Nigeria",
        "recommended software marketing Africa", "marketing technology Africa",
        "brand tools Nigeria recommendations", "trusted products Africa marketers",
        "affiliate marketing Africa", "business resources Nigeria",
        "marketing software recommendations Africa", "tools for African businesses",
        "brand agency product picks", "digital tools Nigeria business",
        "SaaS for African companies", "partner products marketing agency",
        "recommended business tools Nigeria", "agency preferred vendors Africa",
        "digital marketing tools Nigeria",
      ]}
      structuredData={[organizationSchema()]}
    >
      <section className="pt-24 pb-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          
          <div className="mb-16">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">Partner Products.</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Tools, resources, and products we trust, use, and recommend.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-card border rounded-xl p-6 space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              ))}
            </div>
          ) : !affiliates || affiliates.length === 0 ? (
            <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed">
              <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No products listed yet</h3>
              <p className="text-muted-foreground">Check back later for our curated recommendations.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {affiliates.map((product) => (
                <div key={product.id} className="bg-card border rounded-xl overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
                  {product.imageUrl ? (
                    <div className="aspect-video w-full bg-muted overflow-hidden">
                      <img src={product.imageUrl} alt={product.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-primary/5 flex items-center justify-center">
                      <Tag className="h-10 w-10 text-primary/40" />
                    </div>
                  )}
                  
                  <div className="p-6 flex flex-col flex-1">
                    {product.category && (
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                        {product.category}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-3">{product.productName}</h3>
                    
                    <p className="text-muted-foreground text-sm mb-6 flex-1">
                      {product.generatedCopy || product.productInfo}
                    </p>

                    <a 
                      href={product.affiliateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors bg-secondary text-white hover:bg-secondary/90 h-10 px-4 py-2 w-full"
                    >
                      View Product <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}