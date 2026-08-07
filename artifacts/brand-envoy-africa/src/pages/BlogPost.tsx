import { Layout } from "@/components/layout/Layout";
import { Link, useParams } from "wouter";
import { useGetBlogPost } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";
import { organizationSchema } from "@/lib/seo";

const WP_BLOG_URL = "https://brandsenvoy.com/blog";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useGetBlogPost(
    slug || "",
    { query: { queryKey: ["/api/blog/posts", slug], enabled: !!slug } }
  );

  const postTitle = post?.title ? `${post.title} | Brand Envoy Africa Blog` : undefined;
  const postDescription = post?.excerpt || "Marketing, branding, and African market insights from Brand Envoy Africa.";
  const postImage = post?.featuredImageUrl || undefined;

  return (
    <Layout
      title={postTitle}
      description={postDescription}
      canonical={slug ? `/blog/${slug}` : "/blog"}
      ogImage={postImage}
      structuredData={[organizationSchema()]}
    >
      <article className="pt-24 pb-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">

          <Link href="/blog" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-12">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Journal
          </Link>

          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-3/4 mb-8" />
              <Skeleton className="aspect-video w-full rounded-xl mb-10" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ) : error || !post ? (
            <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Post not found</h1>
              <p className="text-muted-foreground mb-8">
                The article you're looking for doesn't exist or has been moved.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2"
                >
                  Return to Blog
                </Link>
                <a
                  href={`${WP_BLOG_URL}/${slug ?? ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                  View on brandsenvoy.com <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : (
            <>
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-6 text-sm text-muted-foreground">
                  <time dateTime={post.date instanceof Date ? post.date.toISOString() : post.date}>
                    {format(new Date(post.date), "MMMM d, yyyy")}
                  </time>
                  {post.categories && post.categories.length > 0 && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span className="uppercase tracking-wider font-semibold text-primary">
                        {post.categories.join(", ")}
                      </span>
                    </>
                  )}
                </div>

                <h1
                  className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />

                {post.author && (
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{post.author}</div>
                      <div className="text-xs text-muted-foreground">Author</div>
                    </div>
                  </div>
                )}
              </header>

              {post.featuredImageUrl && (
                <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden mb-12 border bg-muted">
                  <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <hr className="my-16 border-border" />

              <div className="bg-primary/5 p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-4">Want to apply these insights to your brand?</h3>
                <Link
                  href="/talk-to-us"
                  className="inline-flex items-center justify-center rounded-md text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 py-2"
                >
                  Talk to Our Strategy Team
                </Link>
              </div>
            </>
          )}

        </div>
      </article>
    </Layout>
  );
}
