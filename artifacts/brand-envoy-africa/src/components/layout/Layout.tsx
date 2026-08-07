import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";
import { ReactNode, useEffect } from "react";

const SITE_URL = "https://brandsenvoy.com";
const DEFAULT_OG_IMAGE = "/og-image.jpg";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  /** Canonical path, e.g. "/services/creative-branding" */
  canonical?: string;
  /** Open Graph image URL (absolute or root-relative) */
  ogImage?: string;
  /** Additional JSON-LD structured data objects to inject */
  structuredData?: object[];
  /** Page keywords (also used for meta keywords tag) */
  keywords?: string[];
}

function setMetaTag(selector: string, attrName: string, attrValue: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectStructuredData(schemas: object[]) {
  // Remove previously injected JSON-LD scripts
  document.querySelectorAll('script[data-bea-schema]').forEach((el) => el.remove());
  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-bea-schema", "true");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

export function Layout({
  children,
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
  keywords,
}: LayoutProps) {
  const fullTitle = title
    ? `${title} | Brand Envoy Africa`
    : "Brand Envoy Africa | Africa's Most Innovative Marketing Agency";

  const metaDesc =
    description ??
    "Brand Envoy Africa is a proof-led creative branding, advertising, and marketing agency headquartered in Lagos, Nigeria, operating since 2015 across Nigeria, Ghana, Kenya, and beyond.";

  const canonicalUrl = canonical
    ? `${SITE_URL}${canonical}`
    : SITE_URL;

  const ogImageUrl = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Description
    setMetaTag('meta[name="description"]', "name", "description", metaDesc);

    // Keywords
    if (keywords?.length) {
      setMetaTag('meta[name="keywords"]', "name", "keywords", keywords.join(", "));
    }

    // Robots
    setMetaTag('meta[name="robots"]', "name", "robots", "index, follow");

    // Canonical
    setLinkTag("canonical", canonicalUrl);

    // Open Graph
    setMetaTag('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMetaTag('meta[property="og:description"]', "property", "og:description", metaDesc);
    setMetaTag('meta[property="og:type"]', "property", "og:type", "website");
    setMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaTag('meta[property="og:image"]', "property", "og:image", ogImageUrl);
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "Brand Envoy Africa");
    setMetaTag('meta[property="og:locale"]', "property", "og:locale", "en_GB");

    // Twitter
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", metaDesc);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImageUrl);

    // JSON-LD
    if (structuredData?.length) {
      injectStructuredData(structuredData);
    } else {
      // Clean up any schemas from a previous page
      document.querySelectorAll('script[data-bea-schema]').forEach((el) => el.remove());
    }
  }, [fullTitle, metaDesc, canonicalUrl, ogImageUrl, keywords, structuredData]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
