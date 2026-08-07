/**
 * SEO schema builders for Brand Envoy Africa.
 * Generates JSON-LD structured data objects per schema.org spec.
 */

const SITE_URL = "https://brandsenvoy.com";
const ORG_NAME = "Brand Envoy Africa";
const ORG_LOGO = `${SITE_URL}/logo.png`;
const ORG_EMAIL = "business@brandsenvoy.com";
const ORG_PHONE = "+234-000-000-0000";
const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Lagos",
  addressLocality: "Lagos",
  addressRegion: "Lagos State",
  addressCountry: "NG",
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    logo: ORG_LOGO,
    email: ORG_EMAIL,
    telephone: ORG_PHONE,
    address: ORG_ADDRESS,
    foundingDate: "2015",
    description:
      "Brand Envoy Africa is a proof-led creative branding, advertising, and marketing agency headquartered in Lagos, Nigeria, operating since 2015 across Nigeria, Ghana, Kenya, South Africa, and Francophone Africa.",
    areaServed: [
      "Nigeria", "Ghana", "Kenya", "South Africa",
      "Mauritius", "Seychelles", "Uganda", "Tanzania", "Cameroon",
    ],
    sameAs: [
      "https://www.linkedin.com/company/brand-envoy-africa",
    ],
    award: "2019 African Brands Leadership Award: Africa's Most Innovative Marketing/Creative Agency",
  };
}

export function serviceSchema(
  name: string,
  description: string,
  url: string,
  areaServed?: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
    areaServed: areaServed ?? [
      "Nigeria", "Ghana", "Kenya", "South Africa",
      "Uganda", "Tanzania", "Cameroon",
    ],
    serviceType: name,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function localBusinessSchema(
  country: string,
  description: string,
  addressLocality: string,
  addressCountry: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${ORG_NAME}: ${country}`,
    description,
    url: `${SITE_URL}/markets-we-serve#${country.toLowerCase().replace(/\s+/g, "-")}`,
    logo: ORG_LOGO,
    email: ORG_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality,
      addressCountry,
    },
    parentOrganization: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
